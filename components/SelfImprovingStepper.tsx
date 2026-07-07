"use client";

import React, { useState } from "react";

// Interactive stepper over the self-improving-agent diagram sequence.
// Prototype for the "interactive vs static" decision on the
// self-improving-agents post. If we go static, delete this file and its
// registration in MdxComponents.tsx.

const STAGES = [
  {
    src: "/blog/self-improving-agents/stage1.svg",
    title: "Stage 1: The hand-coded agent",
    blurb: "Humans maintain everything. The improvement loop runs through human brains.",
  },
  {
    src: "/blog/self-improving-agents/stage2.svg",
    title: "Stage 2: The meta agent",
    blurb: "A meta agent reads results and traces and edits the task agent's code.",
  },
  {
    src: "/blog/self-improving-agents/stage3.svg",
    title: "Stage 3: The self-referential meta agent",
    blurb: "Task agent and meta agent merge into one program that modifies its own code.",
  },
  {
    src: "/blog/self-improving-agents/stage4.svg",
    title: "Stage 4: The archive",
    blurb: "A hand-coded outer loop keeps every variant as a stepping stone. The agent doesn't know it exists.",
  },
  {
    src: "/blog/self-improving-agents/stage5.svg",
    title: "Stage 5: Opening the outer loop",
    blurb: "The archive machinery itself becomes editable by the system.",
  },
  {
    src: "/blog/self-improving-agents/direction-memory.svg",
    title: "Direction 1: Memory",
    blurb: "The system designs its own memory: store, update rules, retrieval rules.",
  },
  {
    src: "/blog/self-improving-agents/direction-tasks.svg",
    title: "Direction 2: Tasks",
    blurb: "A task generator replaces the curated task set. Humans just seed the domain.",
  },
  {
    src: "/blog/self-improving-agents/direction-model.svg",
    title: "Direction 3: The model",
    blurb: "The last frozen box: what if the system could finetune its own weights?",
  },
  {
    src: "/blog/self-improving-agents/final.svg",
    title: "The final destination",
    blurb: "Everything is self-modifiable. Humans only plant the seed.",
  },
];

export function SelfImprovingStepper() {
  const [i, setI] = useState(0);
  const stage = STAGES[i];

  return (
    <div
      style={{
        margin: "1.5rem 0",
        borderRadius: "16px",
        overflow: "hidden",
        border: "1px solid #2a3550",
        background: "#0e1526",
      }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={stage.src} alt={stage.title} style={{ width: "100%", display: "block" }} />
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "12px",
          padding: "10px 14px",
          borderTop: "1px solid #2a3550",
        }}
      >
        <button
          onClick={() => setI((i + STAGES.length - 1) % STAGES.length)}
          aria-label="Previous stage"
          style={btnStyle}
        >
          &#8592;
        </button>
        <button
          onClick={() => setI((i + 1) % STAGES.length)}
          aria-label="Next stage"
          style={btnStyle}
        >
          &#8594;
        </button>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ color: "#e8ecf4", fontSize: "0.85rem", fontWeight: 600 }}>
            {stage.title}
          </div>
          <div style={{ color: "#8fa0b8", fontSize: "0.78rem" }}>{stage.blurb}</div>
        </div>
        <div style={{ color: "#8fa0b8", fontSize: "0.8rem", whiteSpace: "nowrap" }}>
          {i + 1} / {STAGES.length}
        </div>
      </div>
    </div>
  );
}

const btnStyle: React.CSSProperties = {
  background: "#1a2440",
  color: "#e8ecf4",
  border: "1px solid #2a3550",
  borderRadius: "8px",
  width: "34px",
  height: "34px",
  fontSize: "1rem",
  cursor: "pointer",
  flexShrink: 0,
};

export default SelfImprovingStepper;
