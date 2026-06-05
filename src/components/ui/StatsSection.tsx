"use client";
import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";

const stats = [
  { value: 99.1, suffix: "%", label: "Minimum Purity", decimals: 1 },
  { value: 48, suffix: "hr", label: "Avg. Dispatch Time", decimals: 0 },
  { value: 2500, suffix: "+", label: "Research Orders", decimals: 0 },
  { value: 100, suffix: "%", label: "CoA Verified", decimals: 0 },
];

function Counter({ target, decimals, suffix }: { target: number; decimals: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const steps = 60;
    const increment = target / steps;
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) { setCount(target); clearInterval(timer); }
      else setCount(parseFloat(start.toFixed(decimals)));
    }, 18);
    return () => clearInterval(timer);
  }, [inView, target, decimals]);

  return <span ref={ref}>{count.toFixed(decimals)}{suffix}</span>;
}

export default function StatsSection() {
  return (
    <section className="bg-[#f8f9fc] border-y border-[#e2e8f0] py-14">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
            className="text-center"
          >
            <div className="text-3xl md:text-4xl font-black text-[#2563eb]" style={{ fontFamily: "var(--font-orbitron)" }}>
              <Counter target={stat.value} decimals={stat.decimals} suffix={stat.suffix} />
            </div>
            <div className="text-xs text-[#94a3b8] font-medium mt-1.5 tracking-wide uppercase">{stat.label}</div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
