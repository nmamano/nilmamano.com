"use client";

import { useLayoutEffect, useRef, useState } from "react";
import Link from "next/link";

const SECTIONS = [
  { href: "/blog", label: "Blog", route: "blog" },
  { href: "/posts", label: "Feed", route: "posts" },
  { href: "/papers", label: "Papers", route: "papers" },
];

// Blog / Feed / Papers toggle. The pill slides to the clicked tab at once,
// before the route loads: its leading edge moves first and the trailing edge
// catches up, so the pill stretches and then settles with a small overshoot.
// The pill holds a white copy of the labels that stays aligned with the real
// ones, so a label turns white exactly where the pill covers it.
export function SectionToggle({ currentRoute }: { currentRoute?: string }) {
  const [clicked, setClicked] = useState<string | null>(null);
  const [lastRoute, setLastRoute] = useState(currentRoute);
  if (lastRoute !== currentRoute) {
    setLastRoute(currentRoute);
    setClicked(null);
  }
  const active = clicked ?? currentRoute;

  const navRef = useRef<HTMLElement>(null);
  const tabRefs = useRef<Record<string, HTMLAnchorElement | null>>({});
  const [pill, setPill] = useState<{
    left: number;
    right: number;
    dir: "left" | "right" | null;
  } | null>(null);

  useLayoutEffect(() => {
    const measure = () => {
      const nav = navRef.current;
      const tab = active ? tabRefs.current[active] : null;
      if (!nav || !tab) return setPill(null);
      const left = tab.offsetLeft;
      const right = nav.clientWidth - tab.offsetLeft - tab.offsetWidth;
      setPill((prev) => ({
        left,
        right,
        dir: !prev ? null : left > prev.left ? "right" : left < prev.left ? "left" : prev.dir,
      }));
    };
    measure();
    window.addEventListener("resize", measure);
    document.fonts?.ready.then(measure);
    return () => window.removeEventListener("resize", measure);
  }, [active]);

  const spring = "cubic-bezier(0.34, 1.56, 0.64, 1)";
  const lead = `380ms ${spring}`;
  const trail = `520ms ${spring} 90ms`;
  const reduceMotion =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const [leftT, rightT] =
    reduceMotion || !pill?.dir
      ? ["0s", "0s"]
      : pill.dir === "right"
        ? [trail, lead]
        : [lead, trail];

  const tabClass = "px-4 py-1.5 rounded-full leading-none whitespace-nowrap";

  return (
    <nav
      ref={navRef}
      aria-label="Blog, feed or papers"
      className="relative flex items-center overflow-hidden rounded-full border border-border p-0.5 text-sm font-medium"
    >
      {SECTIONS.map(({ href, label, route }) => (
        <Link
          key={route}
          href={href}
          ref={(el) => {
            tabRefs.current[route] = el;
          }}
          onClick={() => route !== currentRoute && setClicked(route)}
          aria-current={currentRoute === route ? "page" : undefined}
          className={`${tabClass} transition-colors ${
            // Before the pill is measured (server HTML), mark the tab itself.
            !pill && active === route
              ? "bg-primary text-primary-foreground"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          {label}
        </Link>
      ))}
      {pill && (
        <span
          aria-hidden="true"
          className="pointer-events-none absolute top-0.5 bottom-0.5 overflow-hidden rounded-full bg-primary shadow-sm"
          style={{
            left: pill.left,
            right: pill.right,
            transition: `left ${leftT}, right ${rightT}`,
          }}
        >
          <span
            className="absolute -top-0.5 flex items-center p-0.5 text-primary-foreground"
            style={{ left: -pill.left, transition: `left ${leftT}` }}
          >
            {SECTIONS.map(({ label, route }) => (
              <span key={route} className={tabClass}>
                {label}
              </span>
            ))}
          </span>
        </span>
      )}
    </nav>
  );
}
