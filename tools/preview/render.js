// Render one layout (Liquid) with sample post data into a standalone HTML page that
// uses the TRMNL framework, wrapped like the platform does (screen > view / mashup).
// usage: node render.js <layout> <device> <out.html> <data.json> [srcDir]
const { Liquid } = require('liquidjs');
const QR = require('qrcode');
const fs = require('fs');
const path = require('path');

const [, , layout, device, out, dataFile, srcDir = path.join(__dirname, '..', '..', 'src')] = process.argv;

// TRMNL's qr_code filter fills its container; an inline SVG with width/height 100% does the same here.
const engine = new Liquid();
engine.registerFilter('qr_code', (s) => {
  const qr = QR.create(String(s), { errorCorrectionLevel: 'M' });
  const n = qr.modules.size;
  let d = '';
  for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) if (qr.modules.get(x, y)) d += `M${x} ${y}h1v1h-1z`;
  return `<svg class="qr-code" viewBox="0 0 ${n} ${n}" style="width:100%;height:100%" shape-rendering="crispEdges"><path d="${d}"/></svg>`;
});

// og = TRMNL OG 1-bit, ogv2 = TRMNL OG 2-bit (the portal preview default), lg = large 4-bit screen (V2, 1040x780).
const SCREEN = {
  og: 'screen screen--og screen--md screen--1bit screen--1x',
  ogv2: 'screen screen--ogv2 screen--md screen--2bit screen--1x',
  lg: 'screen screen--v2 screen--lg screen--4bit screen--1x',
}[device];
const VIEW = { full: 'view view--full', half_horizontal: 'view view--half_horizontal', half_vertical: 'view view--half_vertical', quadrant: 'view view--quadrant' }[layout];
const WRAP = {
  full: ['', ''],
  half_vertical: ['<div class="mashup mashup--1Lx1R">', '<div class="view view--half_vertical"></div></div>'],
  half_horizontal: ['<div class="mashup mashup--1Tx1B">', '<div class="view view--half_horizontal"></div></div>'],
  quadrant: ['<div class="mashup mashup--2x2">', '<div class="view view--quadrant"></div><div class="view view--quadrant"></div><div class="view view--quadrant"></div></div>'],
}[layout];
if (!SCREEN || !VIEW) throw new Error(`unknown layout/device: ${layout}/${device}`);

const data = JSON.parse(fs.readFileSync(dataFile, 'utf8'));
const markup = fs.readFileSync(path.join(srcDir, `${layout}.liquid`), 'utf8');

engine.parseAndRender(markup, data).then((html) => {
  const css = path.join(__dirname, 'framework', 'plugins.css');
  const js = path.join(__dirname, 'framework', 'plugins.js');
  fs.writeFileSync(out, `<!doctype html><html><head><meta charset="utf-8"><link rel="stylesheet" href="${css}"></head>` +
    `<body class="environment trmnl"><div class="${SCREEN}">${WRAP[0]}<div class="${VIEW}">${html}</div>${WRAP[1]}</div><script src="${js}"></script></body></html>`);
});
