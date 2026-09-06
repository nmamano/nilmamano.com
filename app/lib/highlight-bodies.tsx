import Link from "next/link";

// Inline link used inside the highlight blurbs. Styling (color, hover) comes
// from the parent via [&_a] utilities, so it matches wherever it's rendered.
function A({ href, children }: { href: string; children: React.ReactNode }) {
  const external = href.startsWith("http");
  return (
    <Link
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
    >
      {children}
    </Link>
  );
}

// Blurb per highlight, with links woven into the prose (keyed by id).
// Shared by the desktop orbit center and the mobile list so they stay in sync.
export const HIGHLIGHT_BODIES: Record<string, React.ReactNode> = {
  "agentic-tooling": (
    <>
      <A href="https://isomux.com">Isomux</A> is a meta-harness: multi-device,
      multi-user, multi-agent collaboration across Claude, Codex, and more, in a
      cute office (<A href="/blog/isomux">writeup</A>,{" "}
      <A href="https://github.com/nmamano/isomux">GitHub</A>).{" "}
      <A href="https://github.com/nmamano/context-composer">Context Composer</A>{" "}
      lets you edit an agent&apos;s context mid-conversation.
    </>
  ),
  "full-stack-ai": (
    <>
      <A href="https://wallgame.io">Wall Game</A>, an online board game I
      invented, with a superhuman{" "}
      <A href="/blog/wall-game-ai">AlphaZero-style AI</A> I trained via
      self-play (<A href="https://github.com/nmamano/wallgame">GitHub</A>).
    </>
  ),
  "author-educator": (
    <>
      Co-author of{" "}
      <A href="https://www.amazon.com/dp/195570600X">
        Beyond Cracking the Coding Interview
      </A>{" "}
      and creator of the <A href="https://dsatoolkit.com">DS&amp;A Toolkit</A>.
    </>
  ),
  "build-in-public": (
    <>
      <A href="/blog">40+ posts</A> on agentic engineering, AI, algorithms,
      and how I build my projects - all{" "}
      <A href="https://github.com/nmamano">open source</A>.
    </>
  ),
  research: (
    <>
      <A href="https://scholar.google.bg/citations?user=LIuIigEAAAAJ&hl=en">
        10 peer-reviewed papers
      </A>{" "}
      with 180 citations in computational geometry, graphs, computational
      biology, and recreational math - all{" "}
      <A href="/research">publicly available</A>.
    </>
  ),
};
