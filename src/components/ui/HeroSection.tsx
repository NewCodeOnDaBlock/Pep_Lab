"use client";
import { useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { ChevronRight } from "lucide-react";
import dynamic from "next/dynamic";

const MoleculeOrb = dynamic(() => import("@/components/3d/MoleculeOrb"), { ssr: false });

export default function HeroSection() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref });
  const orbY   = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const textY  = useTransform(scrollYProgress, [0, 1], ["0%",  "8%"]);
  const fade   = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section
      ref={ref}
      className="s-white relative overflow-hidden"
      style={{ minHeight: "100svh", display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      {/* Very subtle radial tint at top */}
      <div
        aria-hidden
        style={{
          position: "absolute", inset: 0, pointerEvents: "none",
          background: "radial-gradient(ellipse 100% 60% at 50% -5%, #f0f7ff 0%, transparent 65%)",
        }}
      />

      {/* Text block */}
      <motion.div
        style={{ y: textY, opacity: fade }}
        className="relative z-10 w-full con-md px-6 pt-24 pb-10 flex flex-col items-center text-center"
      >
        {/* Eyebrow */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.05 }}
          className="t-label mb-6"
          style={{ color: "var(--blue)" }}
        >
          For research use only
        </motion.p>

        {/* Display headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.12 }}
          className="t-display"
          style={{ maxWidth: 720 }}
        >
          The peptide<br />
          research<br />
          <span style={{ color: "var(--blue)" }}>standard.</span>
        </motion.h1>

        {/* Subhead */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.22 }}
          className="t-subhead mt-6"
          style={{ maxWidth: 560 }}
        >
          BPC-157 · TB-500 · The Wolverine Stack.
          Ultra-high purity peptides for in vitro and preclinical investigation.
          Third-party verified.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.32 }}
          className="flex flex-wrap gap-4 justify-center mt-10"
        >
          <Link href="/products" className="a-btn">
            Shop Peptides <ChevronRight style={{ width: 17, height: 17, marginLeft: 2 }} />
          </Link>
          <Link href="/products/wolverine-stack" className="a-btn-ghost">
            The Wolverine Stack <ChevronRight style={{ width: 17, height: 17, marginLeft: 2 }} />
          </Link>
        </motion.div>
      </motion.div>

      {/* 3D Orb — large, centered below text */}
      <motion.div
        style={{ y: orbY, opacity: fade }}
        className="relative z-10 flex justify-center items-center flex-1 pb-12 w-full"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.78 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="anim-float"
          style={{ position: "relative" }}
        >
          {/* Subtle radial glow behind orb */}
          <div
            aria-hidden
            style={{
              position: "absolute", inset: 0, pointerEvents: "none", borderRadius: "50%",
              background: "radial-gradient(circle, rgba(0,113,227,0.08) 0%, transparent 65%)",
              transform: "scale(1.6)",
            }}
          />
          <MoleculeOrb color="#0071e3" size={480} interactive />
        </motion.div>
      </motion.div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
        style={{ position: "absolute", bottom: 28, left: "50%", transform: "translateX(-50%)" }}
      >
        <motion.div
          style={{ width: 1, height: 36, background: "linear-gradient(to bottom, var(--t3), transparent)", marginInline: "auto" }}
          animate={{ scaleY: [1, 0.3, 1] }}
          transition={{ duration: 1.8, repeat: Infinity }}
        />
      </motion.div>
    </section>
  );
}
