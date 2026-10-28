// Captures the cover of "Isomux: Backstory and Evolution" (public/blog/isomux-backstory/cover.png,
// also the OG image): the demo office's Conference Room in LIGHT mode (daytime), framed as the
// whole isometric room floating on the light background, so it reads apart from the isomux
// post's dark, tight-cropped cover. Renders at 3x, then downsamples to exactly 1200x630 in Chrome.
//
//   node _source_assets/isomux_backstory_cover_capture.mjs [demo-url] [out.png]
//
// demo-url defaults to https://isomux.com/demo?embed. When that hits a bot checkpoint or auth,
// build the demo from source: `git archive` HEAD of ~/nil/isomux into a fresh /tmp dir, symlink
// node_modules from ~/nil/isomux, `bun scripts/build-demo.ts`, then
// `python3 -m http.server 9871 --bind 127.0.0.1` in its site/ dir and pass
// http://127.0.0.1:9871/demo/?embed. The 2026-10-28 cover came from isomux HEAD 3cbc860f.
// ?embed opens on the Conference Room with no demo banner, top bars or zoom buttons.
// Needs playwright-core (here from the ~/nil/wallgame checkout) and Chrome.
import { writeFileSync } from "node:fs";
import { chromium } from "/home/nil/nil/wallgame/node_modules/playwright-core/index.mjs";

const [url = "https://isomux.com/demo?embed", out = "public/blog/isomux-backstory/cover.png"] = process.argv.slice(2);
const W = 1200, H = 630, SCALE = 3;
// The room renders at a fixed size (about 872x662 CSS px) centered a bit below the middle of
// the viewport; this 1320x693 clip (1200:630) holds it whole with a small margin.
const CLIP = { x: 140, y: 212, width: 1320, height: 693 };

const b = await chromium.launch({ channel: "chrome" });
const ctx = await b.newContext({ viewport: { width: 1600, height: 1000 }, deviceScaleFactor: SCALE, colorScheme: "light" });
await ctx.addInitScript(() => localStorage.setItem("isomux-theme", "light"));
const p = await ctx.newPage();
await p.goto(url, { waitUntil: "networkidle", timeout: 90000 });
await p.waitForTimeout(4000);
const shot = await p.screenshot({ clip: CLIP });

// Downsample 3960x2079 -> 1200x630 on a canvas (high-quality smoothing), so edges stay crisp.
const q = await b.newPage();
const dataUrl = await q.evaluate(async ({ b64, W, H }) => {
  const img = new Image();
  img.src = "data:image/png;base64," + b64;
  await img.decode();
  const c = document.createElement("canvas");
  c.width = W; c.height = H;
  const g = c.getContext("2d");
  g.imageSmoothingEnabled = true;
  g.imageSmoothingQuality = "high";
  g.drawImage(img, 0, 0, W, H);
  return c.toDataURL("image/png");
}, { b64: shot.toString("base64"), W, H });
writeFileSync(out, Buffer.from(dataUrl.split(",")[1], "base64"));
console.log(`wrote ${out}`);
await b.close();
