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

  const submit = html.match(/function submitForm\(btn\)\s*\{[\s\S]*?(?=\n\s*function leadFormBox)/)?.[0];
  if (!submit) continue;
  test(name + ': the form distinguishes failed delivery from accepted delivery', async () => {
    const fields = { 'First Name': 'Test', Phone: '417-555-0100', 'Garage Size': '2-Car Garage', 'Floor Condition': 'Cracks near the door' };
    const box = {
      dataset: { serviceCity: 'Lebanon, MO' },
      querySelectorAll() { return Object.entries(fields).map(([label, value]) => ({
        querySelector(selector) { return selector === 'label' ? { textContent: label } : { value }; }
      })); }
    };
    let accepted = false;
    let payload;
    const alerts = [];
    const context = vm.createContext({
      document: { title: 'Garage Floors' }, window: { location: { href: originForTest(name) } },
      leadFormBox: () => box, alert: message => alerts.push(message),
      sendLead: async data => { payload = data; return accepted; }
    });
    vm.runInContext(submit, context);
    const button = { textContent: 'Request Quote', disabled: false };
    context.submitForm(button);
    await new Promise(resolve => setImmediate(resolve));
    assert.match(alerts.pop(), /couldn't send/i);
    assert.equal(button.disabled, false);
    assert.equal(button.textContent, 'Request Quote');
    assert.equal(payload.city_zip, 'Lebanon, MO');
    assert.equal(payload.sqft, '2-Car Garage');
    assert.equal(payload.notes, 'Cracks near the door');
    accepted = true;
    context.submitForm(button);
    await new Promise(resolve => setImmediate(resolve));
    assert.match(alerts.pop(), /Thank you/i);
    assert.equal(button.disabled, false);
  });
}

function originForTest(name) { return 'https://shippmatesepoxy.com/' + name; }
