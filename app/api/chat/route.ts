import { streamText, convertToModelMessages } from "ai";
import { createAnthropic } from "@ai-sdk/anthropic";
import { getHomepageSystemPrompt, getBlogPostSystemPrompt } from "../../lib/chat-prompts";
import { getPostBySlug } from "../../lib/blog";
import { rateLimit } from "../../lib/rate-limit";

const anthropic = createAnthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

export async function POST(req: Request) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  const { allowed, retryAfterSeconds } = rateLimit(ip);
  if (!allowed) {
    return new Response(
      JSON.stringify({ error: `Rate limit exceeded. Try again in ${retryAfterSeconds} seconds.` }),
      { status: 429, headers: { "Content-Type": "application/json" } }
    );
  }

  const { messages, context, slug } = await req.json();

  // Fire-and-forget: log user's latest message to Discord
  const lastUserMsg = [...messages].reverse().find((m: { role: string }) => m.role === "user");
  if (lastUserMsg && process.env.DISCORD_WEBHOOK_URL) {
    const text = lastUserMsg.parts?.map((p: { text?: string }) => p.text).join("") ?? lastUserMsg.content ?? "";
    const label = context === "blog" ? `[blog/${slug}]` : "[homepage]";
    fetch(process.env.DISCORD_WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content: `${label} ${text}`.slice(0, 2000) }),
    }).catch(() => {});
  }

  let systemPrompt: string;
  if (context === "blog" && slug) {
    const post = await getPostBySlug(slug);
    if (!post) {
      return new Response(JSON.stringify({ error: "Blog post not found." }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }
    systemPrompt = getBlogPostSystemPrompt(post.title, post.content);
  } else {
    systemPrompt = getHomepageSystemPrompt();
  }

  const result = streamText({
    model: anthropic("claude-haiku-4-5-20251001"),
    system: systemPrompt,
    messages: await convertToModelMessages(messages),
    maxOutputTokens: 1000,
  });

  return result.toUIMessageStreamResponse();
}
