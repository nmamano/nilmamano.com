"use client";

import { memo, useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { getHighlights } from "@/app/lib/highlights";
import { HIGHLIGHT_BODIES } from "@/app/lib/highlight-bodies";

// Floyd's tortoise & hare cycle detection, animated around the pentagon.
// The animals render *behind* the node circles, so they're only visible while
// crossing an edge and hidden (occluded) whenever they rest at a node.
function TortoiseHareImpl({ count, radius }: { count: number; radius: number }) {
  const tortoiseRef = useRef<HTMLSpanElement>(null);
  const hareRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const tEl = tortoiseRef.current;
    const hEl = hareRef.current;
    if (!tEl || !hEl) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const N = count;
    const coords = Array.from({ length: N }, (_, i) => {
      const a = (-90 + (360 / N) * i) * (Math.PI / 180);
      return { x: 50 + radius * Math.cos(a), y: 50 + radius * Math.sin(a) };
    });

    const TICK = 10000; // ms per tortoise step (a move every 10s)
    const MOVE = 2100; // travel time; the rest of the tick (~7.9s) is a pause at a node
    const ease = (p: number) =>
      p < 0.5 ? 2 * p * p : 1 - Math.pow(-2 * p + 2, 2) / 2;
    const lerp = (a: number, b: number, p: number) => a + (b - a) * p;

    tEl.style.opacity = "1";
    hEl.style.opacity = "1";

    let raf = 0;
    let start = 0;
    const frame = (ts: number) => {
      if (!start) start = ts;
      const elapsed = ts - start;
      const step = Math.floor(elapsed / TICK);
      const e = elapsed - step * TICK;
      const p = e < MOVE ? ease(e / MOVE) : 1; // hold at the node during the pause

      // Tortoise: one edge per tick.
      const ta = coords[step % N];
      const tb = coords[(step + 1) % N];
      tEl.style.left = `${lerp(ta.x, tb.x, p)}%`;
      tEl.style.top = `${lerp(ta.y, tb.y, p)}%`;

      // Hare: two edges per tick (passes behind the middle node at half-time).
      const h0 = coords[(2 * step) % N];
      const h1 = coords[(2 * step + 1) % N];
      const h2 = coords[(2 * step + 2) % N];
      let hx: number;
      let hy: number;
      if (p < 0.5) {
        const q = p / 0.5;
        hx = lerp(h0.x, h1.x, q);
        hy = lerp(h0.y, h1.y, q);
      } else {
        const q = (p - 0.5) / 0.5;
        hx = lerp(h1.x, h2.x, q);
        hy = lerp(h1.y, h2.y, q);
      }
      hEl.style.left = `${hx}%`;
      hEl.style.top = `${hy}%`;

      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(raf);
  }, [count, radius]);

  return (
    <>
      <span
        ref={tortoiseRef}
        aria-hidden="true"
        className="pointer-events-none absolute -translate-x-1/2 -translate-y-1/2 select-none text-xl leading-none md:text-2xl"
        style={{ left: "50%", top: "12%", opacity: 0 }}
      >
        🐢
      </span>
      <span
        ref={hareRef}
        aria-hidden="true"
        className="pointer-events-none absolute -translate-x-1/2 -translate-y-1/2 select-none text-xl leading-none md:text-2xl"
        style={{ left: "50%", top: "12%", opacity: 0 }}
      >
        🐇
      </span>
    </>
  );
}

const TortoiseHare = memo(TortoiseHareImpl);

export default function HighlightsOrbit() {
  const highlights = getHighlights();
  const [active, setActive] = useState(0);
  // Desktop has hover + a fine pointer; touch devices have neither. On touch a
  // tap selects a node (previewing its content below) instead of navigating.
  const [canHover, setCanHover] = useState(true);
  // Pull the ring inward on small screens so node labels don't run off the
  // edges; full radius on desktop where there's room to spare.
  const [R, setR] = useState(38); // % radius of node centers from the middle
  const n = highlights.length;
  const cur = highlights[active];

  const pentagonRef = useRef<HTMLDivElement>(null);
  const boxRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  // Measured "clear zone" in the middle of the ring where the blurb can live,
  // centered on the geometric middle of the pentagon.
  const [fit, setFit] = useState<{ w: number; h: number } | null>(null);

  useEffect(() => {
    const hover = window.matchMedia("(hover: hover) and (pointer: fine)");
    const wide = window.matchMedia("(min-width: 768px)");
    const sync = () => {
      setCanHover(hover.matches);
      setR(wide.matches ? 38 : 34);
    };
    sync();
    hover.addEventListener("change", sync);
    wide.addEventListener("change", sync);
    return () => {
      hover.removeEventListener("change", sync);
      wide.removeEventListener("change", sync);
    };
  }, []);

  // Measure the empty zone between the top node and the two bottom nodes, so the
  // active blurb can be sized to sit inside the pentagon. Re-measures on resize.
  useEffect(() => {
    const el = pentagonRef.current;
    if (!el) return;
    const measure = () => {
      const c = el.clientWidth; // square: width === height
      if (!c) return;
      const nodeR = R === 38 ? 56 : 32; // circle radius (md:h-28 vs h-16)
      const sin54 = Math.sin((54 * Math.PI) / 180);
      const cos18 = Math.cos((18 * Math.PI) / 180);
      const padX = 12; // gap to the inner edge of the two upper side nodes
      const padY = 8;
      // Vertical room above/below the ring center, capped by the nearest node
      // (single node above, two nodes below). Symmetric so the text stays
      // centered on the geometric middle of the pentagon.
      const up = (c * R) / 100 - nodeR;
      const down = (c * R * sin54) / 100 - nodeR;
      const halfH = Math.max(24, Math.min(up, down) - padY);
      // Horizontal room to the inner edge of the upper side nodes.
      const halfW = (c * R * cos18) / 100 - nodeR - padX;
      setFit({ w: Math.max(80, 2 * halfW), h: 2 * halfH });
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, [R]);

  // Shrink the blurb until it fits the clear zone (longer blurbs end up smaller).
  useEffect(() => {
    const t = textRef.current;
    const b = boxRef.current;
    if (!t || !b || !fit) return;
    let size = 14;
    t.style.fontSize = `${size}px`;
    let guard = 0;
    while (size > 7 && t.scrollHeight > b.clientHeight && guard < 40) {
      size -= 0.5;
      guard += 1;
      t.style.fontSize = `${size}px`;
    }
  }, [active, fit, cur.id]);

  // Switching nodes swaps the active content out from under any text selection,
  // which the browser would otherwise leave visually highlighted. Clear it
  // whenever the active node actually changes.
  const selectNode = (i: number) => {
    if (i !== active) {
      window.getSelection()?.removeAllRanges();
      setActive(i);
    }
  };

  const nodes = highlights.map((_, i) => {
    const a = (-90 + (360 / n) * i) * (Math.PI / 180); // start at top, clockwise
    return { x: 50 + R * Math.cos(a), y: 50 + R * Math.sin(a) };
  });

  return (
    <section aria-label="What I work on" className="block pt-6 pb-8">
      <style>{`
        .orbit-node { opacity: 0; animation: orbit-in 0.6s ease forwards; }
        @keyframes orbit-in { to { opacity: 1; } }
        @media (prefers-reduced-motion: reduce) { .orbit-node { opacity: 1; animation: none; } }
      `}</style>
      <div
        ref={pentagonRef}
        className="relative mx-auto aspect-square w-full max-w-[600px]"
      >
        {/* pentagon ring connecting the nodes */}
        <svg
          viewBox="0 0 100 100"
          className="pointer-events-none absolute inset-0 h-full w-full text-border"
          fill="none"
          stroke="currentColor"
          strokeWidth={0.3}
          aria-hidden="true"
        >
          <polygon points={nodes.map((p) => `${p.x},${p.y}`).join(" ")} />
        </svg>

        {/* tortoise & hare travel behind the nodes (below them in the DOM) */}
        <TortoiseHare count={n} radius={R} />

        {/* center: active highlight details, dynamically sized to fit inside
            the ring (smaller on mobile and for longer blurbs) */}
        <div
          ref={boxRef}
          className="absolute left-1/2 flex items-center justify-center overflow-hidden text-center"
          style={
            fit
              ? {
                  top: "50%",
                  width: fit.w,
                  height: fit.h,
                  transform: "translate(-50%, -50%)",
                }
              : { top: "50%", width: "44%", transform: "translate(-50%, -50%)" }
          }
        >
          <p
            ref={textRef}
            className="w-full leading-tight text-muted-foreground [&_a:hover]:underline [&_a]:font-medium [&_a]:text-primary"
            style={{ fontSize: 14 }}
          >
            {HIGHLIGHT_BODIES[cur.id] ?? cur.blurb}
          </p>
        </div>

        {/* nodes */}
        {highlights.map((h, i) => {
          const isSvg = h.image.endsWith(".svg");
          const isVideo = h.image.endsWith(".mp4");
          const isActive = active === i;
          // Bottom-half nodes get their label below, so labels never collide
          // with the center text.
          const labelBelow = nodes[i].y > 55;
          // The node itself links to the highlight's primary destination.
          const primary = h.links[0];
          return (
            <Link
              key={h.id}
              href={primary.href}
              target={primary.external ? "_blank" : undefined}
              rel={primary.external ? "noopener noreferrer" : undefined}
              onMouseEnter={() => {
                if (canHover) selectNode(i);
              }}
              onFocus={() => {
                if (canHover) selectNode(i);
              }}
              onClick={(e) => {
                // On touch (no hover), a tap selects the node and previews its
                // content below rather than navigating; links live in that panel.
                if (!canHover) {
                  e.preventDefault();
                  selectNode(i);
                }
              }}
              aria-label={h.statement}
              style={{
                left: `${nodes[i].x}%`,
                top: `${nodes[i].y}%`,
                animationDelay: `${i * 0.1}s`,
              }}
              className="orbit-node absolute -translate-x-1/2 -translate-y-1/2 rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
            >
              <span
                className={`absolute left-1/2 -translate-x-1/2 whitespace-nowrap text-xs font-semibold leading-tight transition-colors md:text-lg ${
                  labelBelow ? "top-full mt-1 md:mt-2" : "bottom-full mb-1 md:mb-2"
                } ${isActive ? "text-foreground" : "text-muted-foreground"}`}
              >
                {h.statement}
              </span>
              <span
                className={`block h-16 w-16 overflow-hidden rounded-full border-2 shadow-sm transition-all duration-300 md:h-28 md:w-28 ${
                  isActive
                    ? "border-primary scale-110 shadow-md"
                    : "border-border"
                } ${isSvg ? "bg-white" : "bg-background"}`}
              >
                {isVideo ? (
                  <video
                    src={h.image}
                    autoPlay
                    loop
                    muted
                    playsInline
                    aria-hidden="true"
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <Image
                    src={h.image}
                    alt={h.statement}
                    width={112}
                    height={112}
                    className={`h-full w-full ${isSvg ? "object-contain p-2" : "object-cover"}`}
                  />
                )}
              </span>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
