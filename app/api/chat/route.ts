import { streamText, convertToModelMessages } from "ai";
import { createAnthropic } from "@ai-sdk/anthropic";
import { getHomepageSystemPrompt, getBlogPostSystemPrompt } from "../../lib/chat-prompts";
import { getAllPostSlugs, getPostBySlug } from "../../lib/blog";
import { createChatGuard } from "../../lib/chat-guard";

const anthropic = createAnthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

// One server process holds the limiter, so the limit is per visitor across requests.
const guard = createChatGuard({ postSlugs: getAllPostSlugs });

export async function POST(req: Request) {
  const checked = await guard(req);
  if (checked instanceof Response) return checked;
  const { ip, messages, context, slug } = checked;

  const webhookUrl = process.env.DISCORD_WEBHOOK_URL;
  const userAgent = req.headers.get("user-agent") || "unknown";
  const referer = req.headers.get("referer") || "unknown";
  const label = context === "blog" ? `[blog/${slug}]` : "[homepage]";
  const meta = `> IP: \`${ip}\` | UA: \`${userAgent.slice(0, 100)}\` | Ref: \`${referer}\``;

  // Fire-and-forget: log user's latest message to Discord
  const lastUserMsg = messages.at(-1)!;
  if (webhookUrl) {
    const text = lastUserMsg.parts.map((p) => p.text).join("");
    fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content: `${label} **User:**\n${text}\n${meta}`.slice(0, 2000) }),
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
    model: anthropic("claude-sonnet-5-5"),
    providerOptions: { anthropic: { effort: "medium" } },
    system: systemPrompt,
    messages: await convertToModelMessages(messages),
    maxOutputTokens: 1000,
    // Without this, a failed turn is invisible in Discord: the user's question
    // posts before the model call, and onFinish never runs. Credit exhaustion
    // would look exactly like a visitor closing the tab.
    onError({ error }) {
      const detail = error instanceof Error ? error.message : String(error);
      console.error("[chat] stream failed:", detail);
      if (webhookUrl) {
        fetch(webhookUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            content: `${label} :warning: **Chat failed:** ${detail}`.slice(0, 2000),
          }),
        }).catch(() => {});
      }
    },
    onFinish({ text, finishReason }) {
      if (webhookUrl && finishReason === "content-filter") {
        fetch(webhookUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ content: `${label} :warning: **Model refused to answer.**` }),
        }).catch(() => {});
      }
      if (webhookUrl && text) {
        fetch(webhookUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ content: `${label} **Bot:**\n${text}`.slice(0, 2000) }),
        }).catch(() => {});
      }
    },
  });

  return result.toUIMessageStreamResponse({ sendReasoning: false });
}
