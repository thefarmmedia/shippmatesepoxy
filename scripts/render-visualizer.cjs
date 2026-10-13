// Regenerate after changing the sample photo, mask, palette or compositor.
// Requires @napi-rs/canvas; run: node scripts/render-visualizer.cjs
// The production page's own compositor produces these previews.
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const { createCanvas, loadImage } = require('@napi-rs/canvas');
const root = path.resolve(__dirname, '..');
const html = fs.readFileSync(path.join(root, 'floor-visualizer.html'), 'utf8');
const context = vm.createContext({ console, setTimeout,
  document: { createElement: () => createCanvas(1, 1) } });
vm.runInContext(
  html.slice(html.indexOf('var ROOMS ='), html.indexOf('var ROOM_ORDER')) +
  html.slice(html.indexOf('const FLAKE_COLORS ='), html.indexOf('var FLOOR_SYSTEMS')) +
  html.slice(html.indexOf('var fvCanvasCache ='), html.indexOf('function fvUpdateQuoteLink')),
  context
);
context.fvLoadImage = async src => {
  const img = await loadImage(path.join(root, src));
  Object.defineProperties(img, { naturalWidth: { value: img.width }, naturalHeight: { value: img.height } });
  return img;
};
(async () => {
  const room = context.ROOMS.garage;
  const output = path.join(root, 'visualizer-previews', room.previewSet);
  fs.mkdirSync(output, { recursive: true });
  const colors = vm.runInContext('FLAKE_COLORS', context).filter(color => process.argv.length <= 2 || process.argv.slice(2).includes(color.slug));
  for (const color of colors) {
    const url = await new Promise(resolve => context.fvComposite(room, color, resolve));
    if (!url || !url.startsWith('data:')) throw new Error('Could not render ' + color.slug);
    const preview = await loadImage(Buffer.from(url.split(',')[1], 'base64'));
    const canvas = createCanvas(preview.width, preview.height);
    canvas.getContext('2d').drawImage(preview, 0, 0);
    fs.writeFileSync(path.join(output, color.slug + '.webp'), canvas.toBuffer('image/webp', 88));
    const swatch = await loadImage(path.join(root, color.texture));
    const thumb = createCanvas(300, 300);
    thumb.getContext('2d').drawImage(swatch, 0, 0, 300, 300);
    fs.writeFileSync(path.join(output, color.slug + '-swatch.webp'), thumb.toBuffer('image/webp', 85));
    console.log('Rendered ' + color.name);
  }
})().catch(error => { console.error(error); process.exitCode = 1; });
