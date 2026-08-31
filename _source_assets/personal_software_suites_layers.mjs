// Generates the nested-layer diagram: Model / Harness / Meta-harness.
// Mirrors the "Harness vs Meta-harness" section: each layer carries the
// question it answers and the examples named in the text.
// Run from the repo root: node _source_assets/personal_software_suites_layers.mjs
import { writeFileSync } from "node:fs";

const W = 1000, H = 348;

// Outermost first; each band is drawn on top of the previous one. Top padding
// holds the label and its question, so the bottom padding is deliberately tighter.
const bands = [
  {
    x: 50, y: 26, w: 900, h: 292,
    label: "Meta-harness",
    question: "How can humans make the most out of agents?",
    examples: "Omnigent, qm, Isomux",
    stroke: "#6b46c1", fill: "#f0e9ff",
  },
  {
    x: 110, y: 110, w: 780, h: 180,
    label: "Harness",
    question: "How can we make the most out of a model?",
    examples: "Claude Code, Codex",
    stroke: "#2b6cb0", fill: "#e7f2ff",
  },
];

const inner = { x: 190, y: 194, w: 620, h: 72, stroke: "#b45309", fill: "#fdf0e0" };

let body = "";
for (const b of bands) {
  body += `  <rect x="${b.x}" y="${b.y}" width="${b.w}" height="${b.h}" rx="14" fill="${b.fill}" stroke="${b.stroke}" stroke-width="2"/>\n`;
  body += `  <text x="${b.x + 26}" y="${b.y + 36}" font-size="21" font-weight="700" fill="${b.stroke}">${b.label}</text>\n`;
  body += `  <text x="${b.x + 26}" y="${b.y + 62}" font-size="16" font-weight="500" fill="${b.stroke}" opacity="0.78">${b.question}</text>\n`;
  body += `  <text x="${b.x + b.w - 26}" y="${b.y + 36}" text-anchor="end" font-size="16" font-weight="500" fill="${b.stroke}" opacity="0.78">${b.examples}</text>\n\n`;
}

body += `  <rect x="${inner.x}" y="${inner.y}" width="${inner.w}" height="${inner.h}" rx="12" fill="${inner.fill}" stroke="${inner.stroke}" stroke-width="2"/>\n`;
body += `  <text x="${inner.x + inner.w / 2}" y="${inner.y + inner.h / 2 + 7}" text-anchor="middle" font-size="21" font-weight="700" fill="${inner.stroke}">Model</text>\n`;

const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" font-family="Inter, -apple-system, 'Segoe UI', Helvetica, Arial, sans-serif">
  <rect x="0" y="0" width="${W}" height="${H}" fill="#ffffff"/>

${body}</svg>
`;

writeFileSync("public/blog/personal-software-suites/layers.svg", svg);
console.log("written", svg.length, "bytes");
