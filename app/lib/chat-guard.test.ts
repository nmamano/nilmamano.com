// Run: bun test app/lib
import { describe, expect, test } from "bun:test";
import { createChatGuard, MAX_BODY_BYTES, MAX_MESSAGES, MAX_USER_CHARS } from "./chat-guard";

const user = (text: string) => ({ id: "u", role: "user", parts: [{ type: "text", text }] });
const bot = (text: string) => ({ id: "a", role: "assistant", parts: [{ type: "text", text }] });

function setup() {
  let time = 1_000_000;
  const guard = createChatGuard({ postSlugs: () => ["binary-search"], now: () => time });
  const send = (body: unknown, xff = "203.0.113.7", raw?: string) =>
    guard(
      new Request("https://nilmamano.com/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json", "X-Forwarded-For": xff },
        body: raw ?? JSON.stringify(body),
      })
    );
  const ok = { messages: [user("hi")], context: "homepage" };
  return { send, ok, tick: (ms: number) => (time += ms) };
}

const status = (r: unknown) => (r instanceof Response ? r.status : 200);

describe("shared chat rate rule: 5 a minute and 20 an hour, keyed on the first X-Forwarded-For address", () => {
  test("the sixth request in a minute waits", async () => {
    const { send, ok } = setup();
    for (let i = 0; i < 5; i++) expect(status(await send(ok))).toBe(200);
    const blocked = await send(ok);
    expect(status(blocked)).toBe(429);
    expect((blocked as Response).headers.get("Retry-After")).toBe("60");
  });

  test("the 21st request in an hour waits, even when spread over minutes", async () => {
    const { send, ok, tick } = setup();
    for (let i = 0; i < 20; i++) {
      expect(status(await send(ok))).toBe(200);
      tick(61_000);
    }
    expect(status(await send(ok))).toBe(429);
    tick(3_600_000);
    expect(status(await send(ok))).toBe(200);
  });

  test("the key is the first X-Forwarded-For address", async () => {
    const { send, ok } = setup();
    for (let i = 0; i < 5; i++) expect(status(await send(ok, `198.51.100.1, 10.0.0.${i}`))).toBe(200);
    expect(status(await send(ok, "198.51.100.1, 10.0.0.9"))).toBe(429);
    // Another visitor behind the same proxy has its own count.
    expect(status(await send(ok, "198.51.100.2, 10.0.0.1"))).toBe(200);
  });
});

describe("request caps", () => {
  test("a body over 32 KB is refused", async () => {
    const { send } = setup();
    const r = await send(null, undefined, JSON.stringify({ messages: [user("x".repeat(MAX_BODY_BYTES))] }));
    expect(status(r)).toBe(413);
  });

  test("more than 20 messages are refused", async () => {
    const { send } = setup();
    const messages = Array.from({ length: MAX_MESSAGES + 1 }, (_, i) => (i % 2 ? bot("ok") : user("hi")));
    expect(status(await send({ messages }))).toBe(400);
    expect(status(await send({ messages: messages.slice(0, MAX_MESSAGES) }))).toBe(400); // ends with the assistant
    expect(status(await send({ messages: messages.slice(1) }))).toBe(200);
  });

  test("a user message over 2,000 characters is refused", async () => {
    const { send } = setup();
    expect(status(await send({ messages: [user("x".repeat(MAX_USER_CHARS + 1))] }))).toBe(400);
    expect(status(await send({ messages: [user("x".repeat(MAX_USER_CHARS))] }))).toBe(200);
  });

  test("the last message must come from the user", async () => {
    const { send } = setup();
    expect(status(await send({ messages: [user("hi"), bot("hello")] }))).toBe(400);
  });

  test("the slug must be a known post", async () => {
    const { send } = setup();
    expect(status(await send({ messages: [user("hi")], context: "blog", slug: "../ops-private/README" }))).toBe(404);
    const r = await send({ messages: [user("hi")], context: "blog", slug: "binary-search" });
    expect(r).toMatchObject({ context: "blog", slug: "binary-search", ip: "203.0.113.7" });
  });

  test("only text parts reach the model", async () => {
    const { send } = setup();
    expect(status(await send({ messages: [{ role: "user", parts: [{ type: "file", url: "x" }] }] }))).toBe(400);
    const r = await send({
      messages: [user("hi"), { role: "assistant", parts: [{ type: "step-start" }, { type: "text", text: "yo" }] }, user("q")],
    });
    expect(r).toMatchObject({ messages: [{ parts: [{ text: "hi" }] }, { parts: [{ type: "text", text: "yo" }] }, {}] });
  });
});
