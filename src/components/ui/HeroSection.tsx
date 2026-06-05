"use client";
import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { ArrowRight, FlaskConical, Shield, Zap } from "lucide-react";
import dynamic from "next/dynamic";

const MoleculeOrb = dynamic(() => import("@/components/3d/MoleculeOrb"), { ssr: false });

const TYPED_TEXTS = [
  "BPC-157 Research",
  "TB-500 Studies",
  "Preclinical Models",
  "The Wolverine Stack",
];

function TypedText() {
  const [index, setIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const target = TYPED_TEXTS[index];
    let timeout: ReturnType<typeof setTimeout>;
    if (!deleting && displayed.length < target.length) {
      timeout = setTimeout(() => setDisplayed(target.slice(0, displayed.length + 1)), 60);
    } else if (!deleting && displayed.length === target.length) {
      timeout = setTimeout(() => setDeleting(true), 2200);
    } else if (deleting && displayed.length > 0) {
      timeout = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 35);
    } else if (deleting && displayed.length === 0) {
      setDeleting(false);
      setIndex((i) => (i + 1) % TYPED_TEXTS.length);
    }
    return () => clearTimeout(timeout);
  }, [displayed, deleting, index]);

  return (
    <span className="text-[#2563eb]">
      {displayed}
      <span className="animate-pulse ml-0.5">|</span>
    </span>
  );
}

export default function HeroSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section ref={ref} className="relative min-h-screen flex items-center justify-center overflow-hidden bg-white">
      {/* Dot grid background */}
      <div className="absolute inset-0 dot-grid opacity-60 pointer-events-none" />

      {/* Subtle radial fade at center */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 70% 60% at 50% 50%, rgba(255,255,255,0.95) 0%, transparent 100%)" }}
      />

      {/* Soft blue accent top-right */}
      <div
        className="absolute top-0 right-0 w-[600px] h-[600px] pointer-events-none"
        style={{ background: "radial-gradient(circle at top right, rgba(37,99,235,0.06) 0%, transparent 60%)" }}
      />

      <motion.div
        style={{ y, opacity }}
        className="relative z-10 max-w-7xl mx-auto px-6 py-24 flex flex-col lg:flex-row items-center gap-12 lg:gap-16"
      >
        {/* Left: text */}
        <div className="flex-1 text-center lg:text-left space-y-7">
          {/* Label pill */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold bg-[#eff6ff] text-[#2563eb] border border-[#bfdbfe]"
          >
            <FlaskConical className="w-3.5 h-3.5" />
            RESEARCH GRADE PEPTIDES
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="text-5xl md:text-6xl lg:text-7xl font-black text-[#0f172a] leading-tight tracking-tight"
            style={{ fontFamily: "var(--font-orbitron)" }}
          >
            Advancing{" "}
            <br className="hidden md:block" />
            <TypedText />
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
            className="text-base md:text-lg text-[#64748b] max-w-xl leading-relaxed"
          >
            Ultra-high purity research peptides for in vitro and preclinical investigations.
            Verified by third-party analysis. Shipped cold-chain direct.
          </motion.p>

          {/* Trust chips */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.42 }}
            className="flex flex-wrap gap-3 justify-center lg:justify-start"
          >
            {[
              { icon: Shield, label: "≥99% Purity" },
              { icon: Zap, label: "48hr Dispatch" },
              { icon: FlaskConical, label: "CoA Included" },
            ].map(({ icon: Icon, label }) => (
              <div
                key={label}
                className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-[#475569] bg-[#f8f9fc] border border-[#e2e8f0]"
              >
                <Icon className="w-4 h-4 text-[#2563eb]" />
                {label}
              </div>
            ))}
          </motion.div>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex flex-wrap gap-4 justify-center lg:justify-start"
          >
            <Link
              href="/products"
              className="group inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-sm text-white bg-[#2563eb] hover:bg-[#1d4ed8] transition-colors duration-200 shadow-[0_4px_14px_rgba(37,99,235,0.35)]"
            >
              Shop Research Peptides
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </Link>
            <Link
              href="/products/wolverine-stack"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-sm text-[#d97706] bg-amber-50 border border-[#fde68a] hover:bg-amber-100 transition-colors duration-200"
            >
              <Zap className="w-4 h-4" />
              The Wolverine Stack
            </Link>
          </motion.div>
        </div>

        {/* Right: 3D orb */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.7 }}
          className="flex-shrink-0 flex items-center justify-center animate-float"
        >
          <div className="relative">
            {/* Soft halo behind orb */}
            <div
              className="absolute inset-0 rounded-full pointer-events-none"
              style={{
                background: "radial-gradient(circle, rgba(37,99,235,0.08) 0%, transparent 70%)",
                transform: "scale(1.4)",
              }}
            />
            <MoleculeOrb color="#2563eb" size={420} interactive />
          </div>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-[#94a3b8]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.0 }}
      >
        <span className="text-[10px] tracking-[0.25em] font-medium" style={{ fontFamily: "var(--font-orbitron)" }}>SCROLL</span>
        <motion.div
          className="w-px h-7 bg-gradient-to-b from-[#2563eb] to-transparent"
          animate={{ scaleY: [1, 0.4, 1] }}
          transition={{ duration: 1.6, repeat: Infinity }}
        />
      </motion.div>
    </section>
  );
}
