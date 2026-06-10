"use client";
import { useState } from "react";

export default function ResearchBanner() {
  const [visible, setVisible] = useState(true);
  if (!visible) return null;

  return (
    <div className="relative flex items-center justify-center px-8 py-2 text-center"
      style={{ background: "#f5f5f7", borderBottom: "1px solid rgba(0,0,0,0.06)" }}>
      <p className="t-caption" style={{ color: "var(--t3)" }}>
        All products are for in vitro and preclinical research use only. Not for human consumption or therapeutic application.
      </p>
      <button
        onClick={() => setVisible(false)}
        className="absolute right-4 top-1/2 -translate-y-1/2"
        style={{ color: "var(--t3)", fontSize: 18, lineHeight: 1, background: "none", border: "none", cursor: "pointer" }}
        aria-label="Dismiss"
      >
        ×
      </button>
    </div>
  );
}
