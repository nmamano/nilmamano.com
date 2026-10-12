import { chromium } from "/home/nil/nil/commit-plot/node_modules/playwright-core/index.mjs";
const b = await chromium.launch({ channel: "chrome" });
for (const slug of ["integer-multiplication"]) {
  const p = await b.newPage({ viewport: { width: 1100, height: 900 }, deviceScaleFactor: 3, colorScheme: "dark" });
  await p.goto(`https://bigospeedrun.com/${slug}`, { waitUntil: "networkidle" });
  await p.waitForTimeout(1500);
  await p.addStyleTag({content: "button[aria-label*=hat i], .chat-launcher {display:none !important}"});
  const area = p.locator(".plot-area").first();
  await area.scrollIntoViewIfNeeded(); await p.waitForTimeout(800);
  const box = await area.boundingBox(); console.log(slug, JSON.stringify(box));
  const parent = area.locator("xpath=..");
  await parent.screenshot({ path: `/tmp/bos-cap/chart-${slug}.png` });
  await p.close();
}
await b.close(); console.log("ok");
