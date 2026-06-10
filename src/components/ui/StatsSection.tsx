"use client";
import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";

const STATS = [
  { value: 99.1, suffix: "%+",  label: "Minimum purity",    decimals: 1 },
  { value: 48,   suffix: "hr",  label: "Avg. dispatch time", decimals: 0 },
  { value: 2500, suffix: "+",   label: "Research orders",    decimals: 0 },
  { value: 100,  suffix: "%",   label: "CoA verified",       decimals: 0 },
];

function Counter({ target, decimals, suffix }: { target: number; decimals: number; suffix: string }) {
  const [n, setN] = useState(0);
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    const STEPS = 60, MS = 1200 / STEPS;
    let s = 0;
    const t = setInterval(() => {
      s++;
      const p = 1 - Math.pow(1 - s / STEPS, 3);
      setN(parseFloat((target * p).toFixed(decimals)));
      if (s >= STEPS) { setN(target); clearInterval(t); }
    }, MS);
    return () => clearInterval(t);
  }, [inView, target, decimals]);

  return <span ref={ref as React.RefObject<HTMLSpanElement>}>{n.toFixed(decimals)}{suffix}</span>;
}

export default function StatsSection() {
  return (
    <section className="s-gray" style={{ borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)" }}>
      <div className="con-lg px-6 py-14">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4">
          {STATS.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="text-center md:text-left"
            >
              <div
                style={{
                  fontSize: "clamp(36px, 5vw, 56px)", fontWeight: 600,
                  letterSpacing: "-0.025em", lineHeight: 1,
                  color: "var(--t1)", marginBottom: 6,
                }}
              >
                <Counter target={s.value} decimals={s.decimals} suffix={s.suffix} />
              </div>
              <p style={{ fontSize: 13, color: "var(--t3)", fontWeight: 400 }}>{s.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
