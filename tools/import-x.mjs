// Import X (Twitter) archive -> site "posts" content files.
// Zero-dependency Node ESM script. Run from repo root:
//   node tools/import-x.mjs [path-to-archive-root]
//
// Reads the unzipped X archive (default ~/social-archives/twitter), reconstructs
// self-reply threads into single posts (segments joined with `---`), expands t.co
// links, recovers full text of long Premium posts from note-tweet.js, copies media
// into public/posts/<slug>/, and writes posts/<slug>.md with frontmatter.
//
// Imported posts are marked `status: imported` (hidden from the public feed until
// promoted). Retweets and replies-to-others are skipped (the raw archive is kept,
// so nothing is discarded).

import fs from "fs";
import path from "path";
import os from "os";

const ARCHIVE = process.argv[2] || path.join(os.homedir(), "social-archives/twitter");
const DATA = path.join(ARCHIVE, "data");
const MEDIA_SRC = path.join(DATA, "tweets_media");
const REPO = process.cwd();
const POSTS_DIR = path.join(REPO, "posts");
const MEDIA_OUT = path.join(REPO, "public", "posts");
const HANDLE = "Nil053";

function loadJs(name) {
  const s = fs.readFileSync(path.join(DATA, name), "utf8");
  return JSON.parse(s.slice(s.indexOf("[")));
}

function decodeEntities(s) {
  return s
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'");
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

function pad(n) {
  return String(n).padStart(2, "0");
}
function ymd(d) {
  return `${d.getUTCFullYear()}-${pad(d.getUTCMonth() + 1)}-${pad(d.getUTCDate())}`;
}

// ---- load data ----
const account = loadJs("account.js");
const accountId = account[0].account.accountId;

const tweets = loadJs("tweets.js").map((e) => e.tweet);
const byId = new Map(tweets.map((t) => [t.id_str, t]));

// global t.co -> expanded url map (covers note text too)
const urlMap = new Map();
// t.co links that point at attached media -> strip from text
const mediaUrlSet = new Set();
for (const t of tweets) {
  for (const u of t.entities?.urls || []) {
    if (u.url && u.expanded_url) urlMap.set(u.url, u.expanded_url);
  }
  for (const m of t.extended_entities?.media || t.entities?.media || []) {
    if (m.url) mediaUrlSet.add(m.url);
  }
}

// long-post full text, matched to tweets by created-at epoch second (+ prefix tiebreak)
const notesByEpoch = new Map();
for (const n of loadJs("note-tweet.js")) {
  const nt = n.noteTweet;
  const ep = Math.floor(new Date(nt.createdAt).getTime() / 1000);
  if (!notesByEpoch.has(ep)) notesByEpoch.set(ep, []);
  notesByEpoch.get(ep).push(nt.core.text);
  // note tweets carry their own t.co expansions (different field names)
  for (const u of nt.core.urls || []) {
    if (u.shortUrl && u.expandedUrl) urlMap.set(u.shortUrl, u.expandedUrl);
  }
}
function fullTextFor(t) {
  const ep = Math.floor(new Date(t.created_at).getTime() / 1000);
  const cands = notesByEpoch.get(ep);
  if (cands && cands.length) {
    if (cands.length === 1) return cands[0];
    const head = t.full_text.replace(/\s*https?:\/\/t\.co\/\S+\s*$/, "").slice(0, 20);
    const hit = cands.find((c) => c.startsWith(head.slice(0, 15)));
    if (hit) return hit;
  }
  return t.full_text;
}

// media files grouped by leading tweet id
const mediaByTweet = new Map();
if (fs.existsSync(MEDIA_SRC)) {
  for (const f of fs.readdirSync(MEDIA_SRC)) {
    const dash = f.indexOf("-");
    if (dash < 0) continue;
    const id = f.slice(0, dash);
    if (!mediaByTweet.has(id)) mediaByTweet.set(id, []);
    mediaByTweet.get(id).push(f);
  }
}

function cleanText(t) {
  let s = fullTextFor(t);
  // strip media t.co links
  for (const mu of mediaUrlSet) s = s.split(mu).join("");
  // expand remaining t.co links
  s = s.replace(/https?:\/\/t\.co\/\w+/g, (m) => urlMap.get(m) || m);
  s = decodeEntities(s);
  return s.replace(/[ \t]+$/gm, "").replace(/\n{3,}/g, "\n\n").trim();
}

// ---- classify ----
const isRT = (t) => t.full_text.startsWith("RT @");
const isReplyToOther = (t) =>
  t.in_reply_to_user_id_str && t.in_reply_to_user_id_str !== accountId;
const isSelfReply = (t) => t.in_reply_to_user_id_str === accountId;

// children map for self-reply chains
const children = new Map();
for (const t of tweets) {
  if (isRT(t) || isReplyToOther(t)) continue;
  if (isSelfReply(t) && t.in_reply_to_status_id_str && byId.has(t.in_reply_to_status_id_str)) {
    const p = t.in_reply_to_status_id_str;
    if (!children.has(p)) children.set(p, []);
    children.get(p).push(t);
  }
}

// roots = top-level, non-RT, non-reply
const roots = tweets.filter(
  (t) => !isRT(t) && !t.in_reply_to_user_id_str
);

function threadOf(root) {
  const seq = [root];
  let cur = root;
  while (children.has(cur.id_str)) {
    const kids = children.get(cur.id_str).sort(
      (a, b) => new Date(a.created_at) - new Date(b.created_at)
    );
    const next = kids[0]; // linear thread
    seq.push(next);
    cur = next;
  }
  return seq;
}

// ---- write ----
fs.rmSync(POSTS_DIR, { recursive: true, force: true });
fs.mkdirSync(POSTS_DIR, { recursive: true });
fs.rmSync(MEDIA_OUT, { recursive: true, force: true });
fs.mkdirSync(MEDIA_OUT, { recursive: true });

const usedSlugs = new Set();
let count = 0,
  withMedia = 0,
  threadCount = 0;

for (const root of roots) {
  const seq = threadOf(root);
  const body = seq.map(cleanText).filter((s) => s.length).join("\n\n---\n\n");
  if (!body.trim() && !seq.some((t) => mediaByTweet.has(t.id_str))) continue;

  const d = new Date(root.created_at);
  const words = slugify(cleanText(root).split("\n")[0] || "");
  const idTail = root.id_str.slice(-7);
  let slug = (words ? words + "-" : "") + idTail;
  while (usedSlugs.has(slug)) slug = slug + "x";
  usedSlugs.add(slug);

  // media
  const images = [];
  for (const t of seq) {
    for (const f of mediaByTweet.get(t.id_str) || []) {
      const destDir = path.join(MEDIA_OUT, slug);
      fs.mkdirSync(destDir, { recursive: true });
      fs.copyFileSync(path.join(MEDIA_SRC, f), path.join(destDir, f));
      images.push(`/posts/${slug}/${f}`);
    }
  }
  if (images.length) withMedia++;
  if (seq.length > 1) threadCount++;

  const fm = [
    "---",
    `date: "${ymd(d)}"`,
    `timestamp: "${d.toISOString()}"`,
    `source: "x"`,
    `status: "imported"`,
    `xUrl: "https://x.com/${HANDLE}/status/${root.id_str}"`,
    `tweetId: "${root.id_str}"`,
    `segments: ${seq.length}`,
    images.length
      ? `images:\n${images.map((i) => `  - "${i}"`).join("\n")}`
      : `images: []`,
    "---",
    "",
    body,
    "",
  ].join("\n");

  fs.writeFileSync(path.join(POSTS_DIR, `${slug}.md`), fm);
  count++;
}

console.log(`Wrote ${count} posts (${threadCount} multi-part threads, ${withMedia} with media)`);
console.log(`  posts dir: ${POSTS_DIR}`);
console.log(`  media dir: ${MEDIA_OUT}`);
