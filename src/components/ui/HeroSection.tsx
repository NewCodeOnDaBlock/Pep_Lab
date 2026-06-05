"use client";
import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { ArrowRight, FlaskConical, Shield, Zap } from "lucide-react";
import dynamic from "next/dynamic";

const MoleculeOrb = dynamic(() => import("@/components/3d/MoleculeOrb"), { ssr: false });
const ParticleField = dynamic(() => import("@/components/3d/ParticleField"), { ssr: false });

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
      timeout = setTimeout(() => setDeleting(true), 2000);
    } else if (deleting && displayed.length > 0) {
      timeout = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 35);
    } else if (deleting && displayed.length === 0) {
      setDeleting(false);
      setIndex((i) => (i + 1) % TYPED_TEXTS.length);
    }

    return () => clearTimeout(timeout);
  }, [displayed, deleting, index]);

  return (
    <span className="text-[#00d4ff] text-glow-cyan">
      {displayed}
      <span className="animate-pulse">|</span>
    </span>
  );
}

export default function HeroSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex items-center justify-center overflow-hidden grid-bg"
    >
      {/* Particle background */}
      <ParticleField color="#00d4ff" />

      {/* Radial gradient center */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(0,212,255,0.06) 0%, transparent 70%)" }}
        />
      </div>

      {/* Scan line */}
      <motion.div
        className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#00d4ff] to-transparent opacity-20 pointer-events-none"
        animate={{ y: ["-50vh", "150vh"] }}
        transition={{ duration: 6, repeat: Infinity, ease: "linear", repeatDelay: 4 }}
      />

      <motion.div
        style={{ y, opacity }}
        className="relative z-10 max-w-7xl mx-auto px-4 py-20 flex flex-col lg:flex-row items-center gap-12 lg:gap-20"
      >
        {/* Left: text */}
        <div className="flex-1 text-center lg:text-left space-y-6">
          {/* Label */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium"
            style={{
              background: "rgba(0,212,255,0.08)",
              border: "1px solid rgba(0,212,255,0.25)",
              color: "#00d4ff",
              fontFamily: "var(--font-orbitron)",
            }}
          >
            <FlaskConical className="w-3 h-3" />
            RESEARCH GRADE PEPTIDES
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-4xl md:text-6xl lg:text-7xl font-black leading-tight"
            style={{ fontFamily: "var(--font-orbitron)" }}
          >
            Advancing{" "}
            <br />
            <TypedText />
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-[#9ca3af] text-base md:text-lg max-w-xl leading-relaxed"
            style={{ fontFamily: "var(--font-space)" }}
          >
            Ultra-high purity research peptides for in vitro and preclinical investigations.
            Verified by third-party analysis. Shipped cold-chain direct.
          </motion.p>

          {/* Badges */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex flex-wrap gap-3 justify-center lg:justify-start"
          >
            {[
              { icon: Shield, label: "≥99% Purity" },
              { icon: Zap, label: "Fast Dispatch" },
              { icon: FlaskConical, label: "CoA Included" },
            ].map(({ icon: Icon, label }) => (
              <div
                key={label}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs text-[#9ca3af]"
                style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
              >
                <Icon className="w-3.5 h-3.5 text-[#00d4ff]" />
                {label}
              </div>
            ))}
          </motion.div>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="flex flex-wrap gap-4 justify-center lg:justify-start"
          >
            <Link
              href="/products"
              className="group flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm transition-all duration-200"
              style={{ background: "linear-gradient(135deg, #00d4ff 0%, #0066cc 100%)", color: "#020408" }}
            >
              Shop Research Peptides
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/products/wolverine-stack"
              className="flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm transition-all duration-200 hover:border-[#f59e0b]"
              style={{
                background: "rgba(245,158,11,0.08)",
                border: "1px solid rgba(245,158,11,0.3)",
                color: "#f59e0b",
              }}
            >
              <Zap className="w-4 h-4" />
              The Wolverine Stack
            </Link>
          </motion.div>
        </div>

        {/* Right: 3D orb */}
        <motion.div
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="flex-shrink-0 flex items-center justify-center animate-float"
        >
          <div className="relative">
            {/* Glow rings */}
            <motion.div
              className="absolute inset-0 rounded-full pointer-events-none"
              style={{ background: "radial-gradient(circle, rgba(0,212,255,0.15) 0%, transparent 70%)", transform: "scale(1.4)" }}
              animate={{ scale: [1.4, 1.6, 1.4] }}
              transition={{ duration: 3, repeat: Infinity }}
            />
            <MoleculeOrb color="#00d4ff" size={400} interactive />
          </div>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-[#6b7280] text-xs"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
      >
        <span style={{ fontFamily: "var(--font-orbitron)", fontSize: "10px", letterSpacing: "0.2em" }}>SCROLL</span>
        <motion.div
          className="w-px h-8 bg-gradient-to-b from-[#00d4ff] to-transparent"
          animate={{ scaleY: [1, 0.5, 1] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
      </motion.div>
    </section>
  );
}
