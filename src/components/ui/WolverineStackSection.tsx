"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { Zap, ArrowRight, ShoppingCart } from "lucide-react";
import dynamic from "next/dynamic";
import { useCartStore } from "@/store/cartStore";
import { products } from "@/data/products";

const MoleculeOrb = dynamic(() => import("@/components/3d/MoleculeOrb"), { ssr: false });

export default function WolverineStackSection() {
  const stack = products.find((p) => p.id === "wolverine-stack")!;
  const { addItem, toggleCart } = useCartStore();

  return (
    <section className="relative py-24 px-4 overflow-hidden">
      {/* BG gradient */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(245,158,11,0.05) 0%, rgba(239,68,68,0.03) 50%, transparent 100%)",
        }}
      />
      {/* Grid */}
      <div className="absolute inset-0 grid-bg opacity-50 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto">
        {/* Label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-4"
        >
          <span
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs"
            style={{
              background: "rgba(245,158,11,0.1)",
              border: "1px solid rgba(245,158,11,0.3)",
              color: "#f59e0b",
              fontFamily: "var(--font-orbitron)",
            }}
          >
            <Zap className="w-3 h-3" /> RESEARCH BUNDLE
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-center text-4xl md:text-6xl font-black mb-4"
          style={{ fontFamily: "var(--font-orbitron)" }}
        >
          THE{" "}
          <span
            className="relative"
            style={{
              background: "linear-gradient(135deg, #f59e0b, #ef4444)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            WOLVERINE
          </span>{" "}
          STACK
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-center text-[#9ca3af] mb-16 max-w-2xl mx-auto"
        >
          BPC-157 + TB-500 — two of the most researched peptides studied for complementary
          biological pathways, now bundled at 24% off individual pricing.
        </motion.p>

        {/* Main card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="glass-card rounded-3xl overflow-hidden max-w-5xl mx-auto"
          style={{
            border: "1px solid rgba(245,158,11,0.2)",
            boxShadow: "0 0 80px rgba(245,158,11,0.08)",
          }}
        >
          {/* Top bar */}
          <div className="h-1" style={{ background: "linear-gradient(90deg, #f59e0b, #ef4444, #a855f7)" }} />

          <div className="p-8 md:p-12 flex flex-col md:flex-row items-center gap-12">
            {/* 3D orbs */}
            <div className="relative flex-shrink-0">
              <motion.div
                className="relative flex items-center"
                animate={{ x: [0, -5, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
              >
                <div style={{ marginRight: "-40px", zIndex: 1 }}>
                  <MoleculeOrb color="#00d4ff" size={180} />
                </div>
                <div style={{ zIndex: 0 }}>
                  <MoleculeOrb color="#a855f7" size={180} />
                </div>
              </motion.div>
              {/* + sign */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 text-white font-black text-2xl text-shadow"
                style={{ textShadow: "0 0 20px #f59e0b" }}>+</div>
            </div>

            {/* Info */}
            <div className="flex-1 space-y-6">
              <div>
                <h3
                  className="text-2xl font-bold mb-1"
                  style={{ fontFamily: "var(--font-orbitron)", color: "#f59e0b" }}
                >
                  BPC-157 + TB-500
                </h3>
                <p className="text-[#9ca3af] text-sm leading-relaxed max-w-md">
                  Researchers studying multi-pathway models often combine these two compounds
                  for their complementary mechanisms: nitric oxide / growth hormone pathways
                  (BPC-157) and actin sequestration / cellular migration (TB-500).
                </p>
              </div>

              {/* What's included */}
              <div className="grid grid-cols-2 gap-4">
                {[
                  { name: "BPC-157", conc: "5mg", purity: "≥99.1%", color: "#00d4ff" },
                  { name: "TB-500", conc: "5mg", purity: "≥99.3%", color: "#a855f7" },
                ].map((item) => (
                  <div
                    key={item.name}
                    className="p-4 rounded-xl"
                    style={{ background: `${item.color}08`, border: `1px solid ${item.color}20` }}
                  >
                    <div className="font-bold text-sm" style={{ fontFamily: "var(--font-orbitron)", color: item.color }}>
                      {item.name}
                    </div>
                    <div className="text-xs text-[#9ca3af] mt-1">{item.conc} · {item.purity} Purity</div>
                  </div>
                ))}
              </div>

              {/* Price + CTA */}
              <div className="flex flex-wrap items-center gap-6">
                <div>
                  <div
                    className="text-4xl font-black"
                    style={{ fontFamily: "var(--font-orbitron)", color: "#f59e0b" }}
                  >
                    $109.99
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <span className="text-[#6b7280] line-through">$144.98</span>
                    <span className="text-green-400 font-bold">Save 24%</span>
                  </div>
                </div>
                <div className="flex gap-3">
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    onClick={() => { addItem(stack); toggleCart(); }}
                    className="flex items-center gap-2 px-5 py-3 rounded-xl font-bold text-sm transition-all"
                    style={{
                      background: "linear-gradient(135deg, #f59e0b, #ef4444)",
                      color: "#020408",
                    }}
                  >
                    <ShoppingCart className="w-4 h-4" />
                    Add to Cart
                  </motion.button>
                  <Link
                    href="/products/wolverine-stack"
                    className="flex items-center gap-2 px-5 py-3 rounded-xl font-bold text-sm transition-all border"
                    style={{
                      borderColor: "rgba(245,158,11,0.3)",
                      color: "#f59e0b",
                    }}
                  >
                    Details <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
