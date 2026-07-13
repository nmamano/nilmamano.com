// Import LinkedIn archive shares -> site "posts" content files.
// Zero-dependency Node ESM script. Run from repo root:
//   node tools/import-linkedin.mjs [path-to-Shares.csv] [--dry-run]
//
// ADDITIVE: run this AFTER import-x.mjs (which wipes posts/). For each LinkedIn
// share this either
//   (a) matches an existing X post -> upgrade that post to source: "both" and
//       add linkedinUrl, or
//   (b) has no X twin -> write a new posts/<slug>.md with source: "linkedin".
// Nothing is deleted. Imported posts are marked status: imported (hidden).
//
// --dry-run: report match stats + write a review report, change no files.

import fs from "fs";
import path from "path";
import os from "os";

const args = process.argv.slice(2);
const DRY = args.includes("--dry-run");
const CSV =
  args.find((a) => !a.startsWith("--")) ||
  path.join(
    os.homedir(),
    "social-archives/linkedin/full-2026-07-08/extracted/Shares_782477452.csv"
  );

const REPO = process.cwd();
const POSTS_DIR = path.join(REPO, "posts");
const MATCH_DAYS = 14; // date window to confirm an X<->LinkedIn twin

// ---- tiny CSV parser (RFC4180-ish, handles quoted newlines) ----
function parseCSV(text) {
  const rows = [];
  let row = [],
    field = "",
    inQ = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (inQ) {
      if (c === '"') {
        if (text[i + 1] === '"') {
          field += '"';
          i++;
        } else inQ = false;
      } else field += c;
    } else {
      if (c === '"') inQ = true;
      else if (c === ",") {
        row.push(field);
        field = "";
      } else if (c === "\n") {
        row.push(field);
        rows.push(row);
        row = [];
        field = "";
      } else if (c === "\r") {
        // ignore
      } else field += c;
    }
  }
  if (field.length || row.length) {
    row.push(field);
    rows.push(row);
  }
  const header = rows.shift();
  return rows
    .filter((r) => r.length > 1)
    .map((r) => Object.fromEntries(header.map((h, i) => [h, r[i] ?? ""])));
}

// LinkedIn's CSV encodes newlines inside commentary as `"\n"` (each internal
// line wrapped in quotes). Decode back to plain newlines.
function decodeLI(s) {
  return s.split('"\n"').join("\n").replace(/\r/g, "").trim();
}

// ---- text normalization for dedup ----
function normalize(s) {
  return s
    .toLowerCase()
    .replace(/https?:\/\/\S+/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}
function prefix(s, n = 45) {
  return normalize(s).slice(0, n);
}
function tokenSet(s, n = 40) {
  return new Set(normalize(s).split(" ").filter(Boolean).slice(0, n));
}
function jaccard(a, b) {
  if (!a.size || !b.size) return 0;
  let inter = 0;
  for (const x of a) if (b.has(x)) inter++;
  return inter / (a.size + b.size - inter);
}

function slugify(s) {
  return s
    .toLowerCase()
    .normalize("NFKD")
    .replace(/https?:\/\/\S+/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 7)
    .join("-")
    .slice(0, 55)
    .replace(/-+$/g, "");
}
const pad = (n) => String(n).padStart(2, "0");
const ymd = (d) =>
  `${d.getUTCFullYear()}-${pad(d.getUTCMonth() + 1)}-${pad(d.getUTCDate())}`;

// parse gray-matter-ish frontmatter without a dep
function readPost(file) {
  const raw = fs.readFileSync(file, "utf8");
  const m = raw.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
  if (!m) return null;
  const fm = {};
  for (const line of m[1].split("\n")) {
    const mm = line.match(/^(\w+):\s*(.*)$/);
    if (mm) fm[mm[1]] = mm[2].replace(/^"(.*)"$/, "$1");
  }
  return { fm, fmRaw: m[1], body: m[2], raw, file };
}

// ---- load existing X posts ----
const postFiles = fs.existsSync(POSTS_DIR)
  ? fs.readdirSync(POSTS_DIR).filter((f) => f.endsWith(".md"))
  : [];
const xPosts = [];
for (const f of postFiles) {
  const p = readPost(path.join(POSTS_DIR, f));
  if (!p) continue;
  p.slug = f.replace(/\.md$/, "");
  p.pref = prefix(p.body);
  p.tokens = tokenSet(p.body);
  p.time = p.fm.timestamp
    ? new Date(p.fm.timestamp)
    : p.fm.date
    ? new Date(p.fm.date)
    : null;
  xPosts.push(p);
}

const shareUrl = (s) => decodeURIComponent(s.ShareLink || "");

function findTwin(share, body) {
  const shTokens = tokenSet(body);
  const shPref = prefix(body);
  const shTime = new Date(share.Date.replace(" ", "T") + "Z");
  let best = null,
    bestScore = 0;
  for (const x of xPosts) {
    if (x.claimed) continue;
    // date gate
    if (x.time) {
      const days = Math.abs(shTime - x.time) / 86400000;
      if (days > MATCH_DAYS) continue;
    }
    let score = 0;
    if (shPref && x.pref && (shPref.startsWith(x.pref.slice(0, 30)) || x.pref.startsWith(shPref.slice(0, 30))))
      score = 0.9;
    const j = jaccard(shTokens, x.tokens);
    score = Math.max(score, j);
    if (score > bestScore) {
      bestScore = score;
      best = x;
    }
  }
  return bestScore >= 0.55 ? { x: best, score: bestScore } : null;
}

// ---- process ----
const shares = parseCSV(fs.readFileSync(CSV, "utf8"));
const usedSlugs = new Set(xPosts.map((x) => x.slug));
let matched = 0,
  created = 0,
  reworded = 0;
const report = [];

for (const share of shares) {
  const body = decodeLI(share.ShareCommentary);
  if (!body) continue;
  const twin = findTwin(share, body);
  const url = shareUrl(share);

  if (twin) {
    twin.x.claimed = true;
    matched++;
    report.push(["MATCH", twin.score.toFixed(2), twin.x.slug, body.slice(0, 60).replace(/\n/g, " ")]);
    if (!DRY) {
      // upgrade the X post -> both
      let fm = twin.x.fmRaw
        .replace(/^source:\s*".*"$/m, `source: "both"`)
        .replace(/^linkedinUrl:.*$\n?/m, "");
      if (!/^linkedinUrl:/m.test(fm))
        fm = fm.replace(/^source:.*$/m, (l) => `${l}\nlinkedinUrl: "${url}"`);
      // keep the LinkedIn wording alongside the X wording (curation picks one)
      // unless the two texts are effectively identical.
      if (normalize(body) !== normalize(twin.x.body)) {
        reworded++;
        const block = body
          .split("\n")
          .map((l) => (l.trim() ? "  " + l : ""))
          .join("\n");
        fm += `\nlinkedinText: |-\n${block}`;
      }
      const out = `---\n${fm}\n---\n${twin.x.body}`;
      fs.writeFileSync(twin.x.file, out);
    }
  } else {
    created++;
    const d = new Date(share.Date.replace(" ", "T") + "Z");
    const first = body.split("\n").find((l) => l.trim()) || "";
    let slug = slugify(first) || "li";
    slug = `${slug}-li${created}`;
    while (usedSlugs.has(slug)) slug += "x";
    usedSlugs.add(slug);
    report.push(["NEW", "", slug, body.slice(0, 60).replace(/\n/g, " ")]);
    if (!DRY) {
      const fm = [
        "---",
        `date: "${ymd(d)}"`,
        `timestamp: "${d.toISOString()}"`,
        `source: "linkedin"`,
        `status: "imported"`,
        `linkedinUrl: "${url}"`,
        `segments: 1`,
        `images: []`,
        "---",
        "",
        body,
        "",
      ].join("\n");
      fs.writeFileSync(path.join(POSTS_DIR, `${slug}.md`), fm);
    }
  }
}

// report
const reportPath = path.join(REPO, "tools", "linkedin-import-report.tsv");
const rlines = ["TYPE\tSCORE\tSLUG\tPREVIEW", ...report.map((r) => r.join("\t"))];
fs.writeFileSync(reportPath, rlines.join("\n"));

console.log(`${DRY ? "[DRY RUN] " : ""}LinkedIn shares: ${shares.length}`);
console.log(`  matched to existing X post (-> source: both): ${matched}`);
console.log(`    of which reworded (LinkedIn text kept in linkedinText): ${reworded}`);
console.log(`  new LinkedIn-only posts: ${created}`);
console.log(`  report: ${reportPath}`);
