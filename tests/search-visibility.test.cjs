const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const root = path.resolve(__dirname, '..');
const origin = 'https://shippmatesepoxy.com';
const files = fs.readdirSync(root).filter(name => name.endsWith('.html'));
const sitemap = fs.readFileSync(path.join(root, 'sitemap.xml'), 'utf8');
const submitted = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m => m[1]);
const redirects = fs.readFileSync(path.join(root, '_redirects'), 'utf8');
const rules = new Map(redirects.split('\n').filter(line => line && !line.startsWith('#')).map(line => {
  const [from, to, status] = line.trim().split(/\s+/);
  return [from, { to, status }];
}));
const indexable = [];

for (const name of files) {
  const html = fs.readFileSync(path.join(root, name), 'utf8');
  const canonical = origin + (name === 'index.html' ? '/' : '/' + name);
  const excluded = /<meta\s+name="robots"\s+content="[^"]*noindex/i.test(html);
  if (!excluded) indexable.push(canonical);
  test(name + ': one document, heading and canonical; valid scripts', () => {
    for (const tag of ['html', 'body', 'h1']) {
      assert.equal((html.match(new RegExp('<' + tag + '(?:\\s|>)', 'gi')) || []).length, 1, tag);
    }
    assert.equal((html.match(/rel="canonical"/g) || []).length, 1);
    assert.ok(html.includes('rel="canonical" href="' + canonical + '"'));
    for (const [, declarations] of html.matchAll(/\.rev\s*\{([^}]+)\}/g)) {
      assert.equal(/opacity\s*:\s*0(?:\s*[;}])/.test(declarations + '}'), false, 'Text is hidden until scroll JavaScript runs');
    }
    for (const [, attrs, code] of html.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/gi)) {
      if (attrs.includes('application/ld+json')) JSON.parse(code);
      else if (!/\bsrc=/.test(attrs)) new vm.Script(code, { filename: name });
    }
  });
  if (name.endsWith('-mo.html')) {
    test(name + ': advertised service area can be indexed and is submitted', () => {
      assert.equal(excluded, false, 'Advertised local service page is blocked by noindex');
      assert.ok(submitted.includes(canonical), 'Missing from sitemap');
    });
  }
  if (name !== 'index.html') {
    test(name + ': URL aliases point directly to its canonical', () => {
      const slug = '/' + name.slice(0, -5);
      for (const from of [slug, slug + '/']) {
        assert.deepEqual(rules.get(from), { to: '/' + name, status: '301!' }, from);
      }
    });
  }
}

test('sitemap contains each indexable page exactly once', () => {
  assert.equal(new Set(submitted).size, submitted.length);
  assert.deepEqual([...submitted].sort(), indexable.sort());
});

test('homepage directs readers to actual guides and current business evidence', () => {
  const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
  assert.doesNotMatch(html, /No Reviews Yet|brand new company|first customers|Real pricing breakdowns/i);
  assert.doesNotMatch(html, /href="\/blog\.html" class="bc-lnk"/);
  const coverage = html.split('<!-- ALL SERVICE AREAS -->')[1].split('Before You Choose a Floor')[0];
  assert.equal((coverage.match(/href="\/[a-z-]+-mo\.html"/g) || []).length, 20, 'Coverage cards must link to the named town');
  for (const guide of ['one-day-garage-floor-coating', 'polyaspartic-vs-epoxy', 'why-garage-floors-fail', 'best-garage-floor-coating-missouri-weather', 'diy-epoxy-kits-truth', 'epoxy-floor-home-value']) {
    assert.ok(html.includes('href="/' + guide + '.html" class="bc-lnk"'), guide);
  }
});
