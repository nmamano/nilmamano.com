// Builds the system diagram for the "Academia 2.0" (Big O Speedrun) post.
// The template marks each agent avatar with <!--CHAR:name:x:y:height-->; the
// avatars are the real BOS agents' outfits, rendered from isomux's
// ui/office/Character.tsx (big_o_speedrun_chars_render.tsx, waiting pose).
// Run from the repo root: node _source_assets/big_o_speedrun_diagram.mjs
import { readFileSync, writeFileSync } from "node:fs";
const tpl = readFileSync("_source_assets/big_o_speedrun_diagram.template.svg", "utf8");
const out = tpl.replace(/<!--CHAR:([\w-]+):(\d+):(\d+):(\d+)-->/g, (_, name, x, y, h) => {
  const svg = readFileSync(`_source_assets/big_o_speedrun_chars/${name}.svg`, "utf8");
  const w = Math.round((h * 52) / 68);
  return svg
    .replace(/^<svg width="52" height="68"/, `<svg x="${x}" y="${y}" width="${w}" height="${h}"`)
    .replace(/ style="[^"]*"/, "")
    // Freeze the waving arm at the right end of its swing.
    .replace(/<g>(<rect x="34"[^>]*>(?:<\/rect>)?<circle cx="36"[^>]*>(?:<\/circle>)?)<animateTransform[^>]*>(?:<\/animateTransform>)?/, '<g transform="rotate(15 36 39)">$1');
});
writeFileSync("public/blog/big-o-speedrun/system-diagram.svg", out);
console.log("wrote public/blog/big-o-speedrun/system-diagram.svg");
