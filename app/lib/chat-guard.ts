// Request checks for /api/chat. The caps and the limiter follow bigOspeedrun's
// chat handler (bigospeedrun-site src/lib/chat-handler.ts); the handlers stay
// separate per repo, and chat-guard.test.ts asserts the shared rule.

export const MAX_BODY_BYTES = 32_768;
export const MAX_MESSAGES = 20;
export const MAX_USER_CHARS = 2_000;
// A reply has maxOutputTokens 1000 (about 4,000 characters); this leaves room.
export const MAX_ASSISTANT_CHARS = 8_000;
export const PER_MINUTE = 5;
export const PER_HOUR = 20;
const MINUTE = 60_000;
const HOUR = 3_600_000;
const MAX_TRACKED = 10_000;

export type ChatText = { type: "text"; text: string };
export type ChatMessage = { id: string; role: "user" | "assistant"; parts: ChatText[] };
export type ChatRequest = {
  ip: string;
  messages: ChatMessage[];
  context: "homepage" | "blog";
  slug?: string;
};

// Returns 0 when the request may go ahead, or the seconds to wait.
export function createLimiter(now = Date.now) {
  const hits = new Map<string, number[]>();
  return (ip: string): number => {
    const time = now();
    // Remove the keys whose newest hit is older than an hour.
    for (const [key, times] of hits) if (times.at(-1)! <= time - HOUR) hits.delete(key);
    const times = (hits.get(ip) ?? []).filter((t) => t > time - HOUR);
    const minute = times.filter((t) => t > time - MINUTE);
    if (minute.length >= PER_MINUTE) return Math.max(1, Math.ceil((minute[0] + MINUTE - time) / 1000));
    if (times.length >= PER_HOUR) return Math.max(1, Math.ceil((times[0] + HOUR - time) / 1000));
    // Bound memory without evicting active visitors and resetting their limits.
    if (!hits.has(ip) && hits.size >= MAX_TRACKED) return 60;
    hits.set(ip, [...times, time]);
    return 0;
  };
}

// Caddy replaces X-Forwarded-For with the one visitor address it resolved.
export const clientIp = (req: Request) =>
  req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";

async function readBody(req: Request): Promise<unknown> {
  if (Number(req.headers.get("content-length")) > MAX_BODY_BYTES) throw new RangeError();
  if (!req.body) throw new SyntaxError();
  const reader = req.body.getReader();
  const decoder = new TextDecoder();
  let bytes = 0;
  let text = "";
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      bytes += value.byteLength;
      if (bytes > MAX_BODY_BYTES) {
        await reader.cancel();
        throw new RangeError();
      }
      text += decoder.decode(value, { stream: true });
    }
    return JSON.parse(text + decoder.decode());
  } finally {
    reader.releaseLock();
  }
}

// Keeps only the text parts of each message. Returns null when the history
// breaks a cap or does not end with a visitor message.
export function parseMessages(value: unknown): ChatMessage[] | null {
  if (!Array.isArray(value) || !value.length || value.length > MAX_MESSAGES) return null;
  const messages: ChatMessage[] = [];
  for (const m of value) {
    if (!m || typeof m !== "object" || (m.role !== "user" && m.role !== "assistant")) return null;
    if (!Array.isArray(m.parts)) return null;
    const parts: ChatText[] = [];
    for (const p of m.parts) {
      if (p?.type === "text" && typeof p.text === "string") parts.push({ type: "text", text: p.text });
      else if (m.role === "user") return null; // visitors send text only
    }
    const length = parts.reduce((n, p) => n + p.text.length, 0);
    if (length > (m.role === "user" ? MAX_USER_CHARS : MAX_ASSISTANT_CHARS)) return null;
    if (m.role === "user" && !parts.some((p) => p.text.trim())) return null;
    messages.push({ id: typeof m.id === "string" ? m.id.slice(0, 64) : "", role: m.role, parts });
  }
  return messages.at(-1)!.role === "user" ? messages : null;
}

const json = (status: number, error: string, headers: Record<string, string> = {}) =>
  Response.json({ error }, { status, headers: { "Cache-Control": "no-store", ...headers } });

// Returns the checked request, or the error response to send.
export function createChatGuard(options: { postSlugs: () => string[]; now?: () => number }) {
  const limit = createLimiter(options.now);
  return async (req: Request): Promise<ChatRequest | Response> => {
    const ip = clientIp(req);
    const retry = limit(ip);
    if (retry) {
      return json(429, `Rate limit exceeded. Try again in ${retry} seconds.`, { "Retry-After": String(retry) });
    }
    let body: Record<string, unknown>;
    try {
      const parsed = await readBody(req);
      if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) throw new SyntaxError();
      body = parsed as Record<string, unknown>;
    } catch (e) {
      return json(e instanceof RangeError ? 413 : 400, "The message is invalid or too long.");
    }
    const messages = parseMessages(body.messages);
    if (!messages) return json(400, "Send a short message with a valid chat history.");
    if (body.context === "blog") {
      const slug = body.slug;
      if (typeof slug !== "string" || !options.postSlugs().includes(slug)) {
        return json(404, "Blog post not found.");
      }
      return { ip, messages, context: "blog", slug };
    }
    return { ip, messages, context: "homepage" };
  };
}
