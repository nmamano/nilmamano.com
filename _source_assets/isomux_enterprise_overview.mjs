// Generates the overview diagram for the "Isomux for Enterprise" post.
// Engineers and NTEs sit outside the Isomux box; the numbered badges match
// the four numbered sections of the post.
// Run from the repo root: node _source_assets/isomux_enterprise_overview.mjs
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

// Office characters, rendered once from isomux's ui/office/Character.tsx
// ("waiting" pose) into _source_assets/isomux_enterprise_chars/.
function character(file, x, y, h) {
  const svg = readFileSync(`_source_assets/isomux_enterprise_chars/${file}.svg`, "utf8");
  // Crop the 52x68 character box to the figure itself (it leaves room for props).
  return svg
    .replace(/^<svg xmlns="[^"]*" width="[^"]*" height="[^"]*"/, `<svg x="${x}" y="${y}" width="${Math.round((h * 40) / 56)}" height="${h}"`)
    .replace('viewBox="0 0 52 68"', 'viewBox="6 8 40 56"');
}

const W = 1000, H = 420;

const gray = { stroke: "#4a5568", fill: "#f4f5f7" };
const purple = { stroke: "#6b46c1", fill: "#f0e9ff" };
const blue = { stroke: "#2b6cb0", fill: "#e7f2ff" };
const green = { stroke: "#2f855a", fill: "#e8f6ee" };
const arrow = "#4a5568";

// Numbers follow the post's 3-step dance (IT sets up, normies play, IT steps in);
// apps stay unnumbered.
const CHARS = ["report-maker", "data-visualizer"];
const VARIANTS = [
  { file: "overview-normies.svg", eng: "Engineers", users: "Normies", n: { setup: 1, invite: 2, join: 3 } },
];

function build(v) {
  let body = "";
  const rect = (x, y, w, h, c, rx = 14) =>
    (body += `  <rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${rx}" fill="${c.fill}" stroke="${c.stroke}" stroke-width="2"/>\n`);
  const text = (x, y, s, { size = 16, weight = 500, fill = "#1a202c", anchor = "start", opacity = 1 } = {}) =>
    (body += `  <text x="${x}" y="${y}" font-size="${size}" font-weight="${weight}" fill="${fill}" text-anchor="${anchor}"${opacity < 1 ? ` opacity="${opacity}"` : ""}>${s}</text>\n`);
  const path = (d, dashed = false) =>
    (body += `  <path d="${d}" fill="none" stroke="${arrow}" stroke-width="2"${dashed ? ` stroke-dasharray="7 5"` : ""} marker-end="url(#arrow)"/>\n`);
  const badge = (x, y, n) => {
    body += `  <circle cx="${x}" cy="${y}" r="12" fill="${purple.stroke}"/>\n`;
    text(x, y + 5, n, { size: 14, weight: 700, fill: "#ffffff", anchor: "middle" });
  };

  // Isomux box.
  rect(220, 14, 760, 390, purple);
  text(244, 48, "Isomux", { size: 21, weight: 700, fill: purple.stroke });
  text(244, 74, "Runs in your infra, with the harnesses you choose", { fill: purple.stroke, opacity: 0.78 });

  // People.
  rect(20, 110, 160, 84, gray);
  text(100, 159, v.eng, { size: 19, weight: 700, fill: gray.stroke, anchor: "middle" });
  rect(20, 270, 160, 84, gray);
  text(100, 319, v.users, { size: 19, weight: 700, fill: gray.stroke, anchor: "middle" });

  // Agents panel.
  rect(440, 96, 260, 234, blue);
  text(462, 130, "Agents", { size: 19, weight: 700, fill: blue.stroke });
  text(462, 152, "shared conversations", { size: 14, fill: blue.stroke, opacity: 0.78 });
  const agents = [["Report Maker", "Claude Code"], ["Data Visualizer", "Codex"]];
  agents.forEach(([name, harness], i) => {
    const y = 166 + i * 80;
    body += `  <rect x="460" y="${y}" width="220" height="70" rx="10" fill="#ffffff" stroke="${blue.stroke}" stroke-width="1.5"/>\n`;
    body += `  ${character(CHARS[i], 470, y + 5, 60)}\n`;
    text(520, y + 31, name, { size: 16, weight: 700, fill: "#1a365d" });
    text(520, y + 51, harness, { size: 13, fill: blue.stroke, opacity: 0.85 });
  });

  // Apps panel.
  rect(760, 96, 200, 234, green);
  text(780, 130, "Apps", { size: 19, weight: 700, fill: green.stroke });
  text(780, 152, "links, not ports", { size: 14, fill: green.stroke, opacity: 0.78 });
  const apps = [["churn-dashboard", "churn.acme.isomux.app"], ["weekly-report", "report.acme.isomux.app"]];
  apps.forEach(([name, url], i) => {
    const y = 166 + i * 80;
    body += `  <rect x="776" y="${y}" width="168" height="70" rx="10" fill="#ffffff" stroke="${green.stroke}" stroke-width="1.5"/>\n`;
    text(790, y + 31, name, { size: 15, weight: 700, fill: "#1c4532" });
    text(790, y + 51, url, { size: 11.5, fill: green.stroke, opacity: 0.9 });
  });

  // 2: engineers set up the agents.
  path("M 180 134 L 436 134");
  badge(250, 134, v.n.setup);
  text(270, 124, "set up the agents", { size: 14, fill: arrow });
  // 3: engineers join the conversation.
  path("M 180 172 L 436 172", true);
  badge(250, 172, v.n.join);
  text(270, 162, "step in when stuck", { size: 14, fill: arrow });
  // 1: NTEs join with one click and chat.
  path("M 180 300 L 436 300");
  badge(250, 300, v.n.invite);
  text(270, 290, "chat with the agents", { size: 14, fill: arrow });
  // 4: agents register apps.
  path("M 700 213 L 756 213");
  if (v.n.register) badge(730, 213, v.n.register);
  text(730, 192, "register", { size: 13, fill: arrow, anchor: "middle" });
  // NTEs open the apps with the same login.
  path("M 100 354 L 100 376 L 860 376 L 860 334");
  text(270, 366, "open the app link, same login", { size: 14, fill: arrow });

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" font-family="Inter, -apple-system, 'Segoe UI', Helvetica, Arial, sans-serif">
    <defs>
      <marker id="arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
        <path d="M 0 0 L 10 5 L 0 10 z" fill="${arrow}"/>
      </marker>
    </defs>
    <rect x="0" y="0" width="${W}" height="${H}" fill="#ffffff"/>

  ${body}</svg>
  `;

  mkdirSync("public/blog/isomux-enterprise", { recursive: true });
  writeFileSync(`public/blog/isomux-enterprise/${v.file}`, svg);
  console.log(v.file, svg.length, "bytes");
}

VARIANTS.forEach(build);
