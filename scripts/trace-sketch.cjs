// Trace a pencil sketch into theme-aware SVG layers for a post's specimen plate.
//
//   npm run sketch -- <input.png|jpg> <sketch-id> [inkLum=105] [toneLum=190]
//
// The input is a pencil/ink sketch on a plain white or chroma-green background.
// Output goes to public/assets/sketches/<sketch-id>/ as paper.svg, tone.svg, ink.svg and meta.json.
// Use it from a post with `sketch: <sketch-id>` in the front matter. The Sketch component
// paints each layer through a CSS mask in the theme's colours, so it works in light and dark mode.
// Raise inkLum to keep more light strokes as solid ink; raise toneLum to keep more faint hatching.
const fs = require('node:fs');
const path = require('node:path');
const Jimp = require('jimp');
const potrace = require('potrace');

const [input, id, inkArg, toneArg] = process.argv.slice(2);
if (!input || !id) {
	console.error('Usage: npm run sketch -- <input.png|jpg> <sketch-id> [inkLum=105] [toneLum=190]');
	process.exit(1);
}
const INK = Number(inkArg ?? 105);
const TONE = Number(toneArg ?? 190);
const outDir = path.join(__dirname, '..', 'public', 'assets', 'sketches', id);

const trace = (img, opts) =>
	new Promise((res, rej) => potrace.trace(img, { threshold: 128, blackOnWhite: true, ...opts }, (e, svg) => (e ? rej(e) : res(svg))));

// Join every path in a potrace SVG and round coordinates to 0.1px to keep files small.
const pathData = (svg) =>
	[...svg.matchAll(/ d="([^"]+)"/g)]
		.map((m) => m[1])
		.join(' ')
		.replace(/-?\d+\.\d+/g, (n) => String(Math.round(parseFloat(n) * 10) / 10))
		.replace(/,\s*/g, ',')
		.replace(/\s+/g, ' ')
		.replace(/ ?([MCLZ]) ?/g, '$1')
		.replace(/[ ,]-/g, '-');

(async () => {
	const src = await Jimp.read(input);
	const { width: W, height: H } = src.bitmap;

	// Background = transparent, chroma green, or near-white paper. Luminance comes from red and blue,
	// because green spill on anti-aliased edges inflates the green channel.
	const isBg = new Uint8Array(W * H);
	const lum = new Uint8Array(W * H);
	src.scan(0, 0, W, H, function (x, y, i) {
		const d = this.bitmap.data;
		const r = d[i], g = d[i + 1], b = d[i + 2], a = d[i + 3];
		const k = y * W + x;
		const l = Math.round((r + b) / 2);
		isBg[k] = a < 32 || g - Math.max(r, b) > 70 || (l > 245 && g > 245) ? 1 : 0;
		lum[k] = l;
	});

	let x0 = W, y0 = H, x1 = 0, y1 = 0;
	for (let y = 0; y < H; y++)
		for (let x = 0; x < W; x++)
			if (!isBg[y * W + x]) {
				x0 = Math.min(x0, x); y0 = Math.min(y0, y); x1 = Math.max(x1, x); y1 = Math.max(y1, y);
			}
	if (x1 < x0) throw new Error('No drawing found: the whole image looks like background.');
	const M = 8;
	x0 = Math.max(0, x0 - M); y0 = Math.max(0, y0 - M); x1 = Math.min(W - 1, x1 + M); y1 = Math.min(H - 1, y1 + M);
	const w = x1 - x0 + 1, h = y1 - y0 + 1;

	const mask = (pred) => {
		const img = new Jimp(w, h, 0xffffffff);
		for (let y = 0; y < h; y++)
			for (let x = 0; x < w; x++) if (pred((y + y0) * W + (x + x0))) img.setPixelColor(0x000000ff, x, y);
		return img;
	};

	const layers = {
		paper: await trace(mask((k) => !isBg[k]), { turdSize: 40, optTolerance: 0.6 }),
		tone: await trace(mask((k) => !isBg[k] && lum[k] < TONE), { turdSize: 3, optTolerance: 0.35 }),
		ink: await trace(mask((k) => !isBg[k] && lum[k] < INK), { turdSize: 2, optTolerance: 0.3 }),
	};

	fs.mkdirSync(outDir, { recursive: true });
	for (const [name, svg] of Object.entries(layers)) {
		const file = path.join(outDir, `${name}.svg`);
		fs.writeFileSync(file, `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}"><path fill-rule="evenodd" d="${pathData(svg)}"/></svg>\n`);
		console.log(`${path.relative(process.cwd(), file)}  ${(fs.statSync(file).size / 1024).toFixed(0)} KB`);
	}
	fs.writeFileSync(
		path.join(outDir, 'meta.json'),
		JSON.stringify({ width: w, height: h, source: path.basename(input), inkLum: INK, toneLum: TONE }, null, 2) + '\n',
	);
})().catch((e) => {
	console.error(e.message ?? e);
	process.exit(1);
});
