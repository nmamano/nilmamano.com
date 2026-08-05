// Renders a short-form post body to safe HTML.
// Posts are plain text (imported tweets contain raw <, {, > that would break MDX),
// so we escape everything first, then linkify and preserve line breaks. Thread
// segments are separated by a `---` line and rendered with an <hr> between them.

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function linkify(escaped: string): string {
  // URLs — schemed (http://x.com/a) OR bare (x.com/a). Operate on already-escaped
  // text (URLs have no <>&"). Bare domains are limited to a known TLD set so we
  // don't linkify prose like "Node.js", "e.g.", or "big O".
  const URL_RE =
    /\b((?:https?:\/\/)?(?:[a-z0-9-]+\.)+(?:com|org|net|io|ai|dev|gg|xyz|app|blog|sh|edu|gov|co)\b(?:\/[^\s<]*)?)/gi;
  let out = escaped.replace(URL_RE, (raw) => {
    // peel trailing sentence punctuation back out of the link
    const m = raw.match(/[.,;:!?)]+$/);
    const trail = m ? m[0] : "";
    const url = trail ? raw.slice(0, -trail.length) : raw;
    const href = /^https?:\/\//.test(url) ? url : `https://${url}`;
    const label = url.replace(/^https?:\/\//, "");
    return `<a href="${href}" target="_blank" rel="noopener noreferrer" class="text-primary hover:underline break-words">${label}</a>${trail}`;
  });
  // @mentions -> x.com/<handle>
  out = out.replace(
    /(^|[^\w/@])@(\w{1,15})/g,
    (_m, pre, handle) =>
      `${pre}<a href="https://x.com/${handle}" target="_blank" rel="noopener noreferrer" class="text-primary hover:underline">@${handle}</a>`
  );
  // #hashtags -> x.com search
  out = out.replace(
    /(^|[^\w&])#(\w+)/g,
    (_m, pre, tag) =>
      `${pre}<a href="https://x.com/hashtag/${tag}" target="_blank" rel="noopener noreferrer" class="text-primary hover:underline">#${tag}</a>`
  );
  return out;
}

// `[label](/internal/path)` -> an internal link. Site-relative hrefs only, so
// this can't introduce javascript: or an off-site target; external links are
// already handled by linkify. Runs after linkify, and the label excludes `<`
// so it never matches across an anchor linkify just inserted.
function internalLinks(html: string): string {
  return html.replace(
    /\[([^\]<]+)\]\((\/[^)\s]*)\)/g,
    (_m, label, href) =>
      `<a href="${href}" class="text-primary hover:underline">${label}</a>`
  );
}

function renderSegment(text: string): string {
  const html = internalLinks(linkify(escapeHtml(text))).replace(/\n/g, "<br/>");
  return `<p>${html}</p>`;
}

export function renderPostBody(content: string): string {
  const segments = content
    .split(/\n-{3,}\n/)
    .map((s) => s.trim())
    .filter(Boolean);
  return segments
    .map(renderSegment)
    .join('<hr class="my-4 border-border" />');
}
