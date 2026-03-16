import { streamText, convertToModelMessages } from "ai";
import { createAnthropic } from "@ai-sdk/anthropic";
import { getHomepageSystemPrompt, getBlogPostSystemPrompt } from "../../lib/chat-prompts";
import { getPostBySlug } from "../../lib/blog";
import { rateLimit } from "../../lib/rate-limit";

const anthropic = createAnthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

export async function POST(req: Request) {
  if (!process.env.ANTHROPIC_API_KEY) {
    const envKeys = Object.keys(process.env).filter(k => k.includes("ANTHROPIC") || k.includes("anthropic"));
    return new Response(
      JSON.stringify({ error: `API key not found. Env keys matching anthropic: [${envKeys.join(", ")}]. Total env keys: ${Object.keys(process.env).length}` }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  const { allowed, retryAfterSeconds } = rateLimit(ip);
  if (!allowed) {
    return new Response(
      JSON.stringify({ error: `Rate limit exceeded. Try again in ${retryAfterSeconds} seconds.` }),
      { status: 429, headers: { "Content-Type": "application/json" } }
    );
  }

  const { messages, context, slug } = await req.json();

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
