// Captures the cover's agent from the live demo office (isomux.com/demo, dark mode, 6x),
// renamed to Report Maker. Writes 24 frames of the wave to /tmp/wave-NN.png; the cover uses
// the frame with the hand furthest right, copied to _source_assets/isomux_enterprise_michael.png.
// Needs playwright-core (here from the ~/nil/enterprise-reel scratch project) and Chrome.
import { chromium } from "/home/nil/nil/enterprise-reel/node_modules/playwright-core/index.mjs";
const b = await chromium.launch({ channel: "chrome" });
const p = await b.newPage({ viewport: { width: 1600, height: 1000 }, deviceScaleFactor: 6, colorScheme: "dark" });
await p.goto("https://isomux.com/demo?embed", { waitUntil: "networkidle", timeout: 90000 });
await p.waitForTimeout(4000);
await p.evaluate(() => {
  const map = { "/worlds-best": "/reports", "-boss": "", "Michael": "Report Maker", "Drafting team motivation speech": "Building a sales dashboard" };
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  const nodes = []; let n; while ((n = walker.nextNode())) nodes.push(n);
  for (const n of nodes) if (n.nodeValue in map) n.nodeValue = map[n.nodeValue];
});
for (let i = 0; i < 24; i++) {
  await p.screenshot({ path: `/tmp/wave-${String(i).padStart(2, "0")}.png`, clip: { x: 814, y: 350, width: 153, height: 167 } });
  await p.waitForTimeout(90);
}
await b.close();
