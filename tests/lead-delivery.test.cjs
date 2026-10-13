const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const root = path.resolve(__dirname, '..');

for (const name of fs.readdirSync(root).filter(name => name.endsWith('.html'))) {
  const html = fs.readFileSync(path.join(root, name), 'utf8');
  const regular = html.match(/  function sendLead\(payload\)\{[\s\S]*?\n    return attempt\(1\);\n  \}/);
  const calculator = html.match(/  async function sendLead\(payload\) \{[\s\S]*?\n    return false;\n  \}/);
  const code = regular?.[0] || calculator?.[0];
  if (!code) continue;
  test(name + ': only acknowledged webhook requests show success', async () => {
    let calls = 0;
    const context = vm.createContext({
      LEAD_WEBHOOK_URL: 'https://example.invalid', WEBHOOK_URL: 'https://example.invalid',
      console: { error() {} }, Blob,
      navigator: { sendBeacon: () => true },
      fetch: async () => { calls++; return { ok: false, status: 500 }; }
    });
    vm.runInContext(code, context);
    assert.equal(await context.sendLead({ name: 'Test' }), false);
    assert.equal(calls, 2);
    calls = 0;
    context.fetch = async () => { calls++; throw new Error('Network failure'); };
    assert.equal(await context.sendLead({ name: 'Test' }), false);
    assert.equal(calls, 2);
    context.fetch = async () => ({ ok: true });
    assert.equal(await context.sendLead({ name: 'Test' }), true);
  });
}
