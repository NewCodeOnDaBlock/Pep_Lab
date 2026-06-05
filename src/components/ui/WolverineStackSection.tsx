"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { Zap, ArrowRight, ShoppingCart, CheckCircle2 } from "lucide-react";
import dynamic from "next/dynamic";
import { useCartStore } from "@/store/cartStore";
import { products } from "@/data/products";

const MoleculeOrb = dynamic(() => import("@/components/3d/MoleculeOrb"), { ssr: false });

export default function WolverineStackSection() {
  const stack = products.find((p) => p.id === "wolverine-stack")!;
  const { addItem, toggleCart } = useCartStore();

  return (
    <section className="bg-[#f8f9fc] border-y border-[#e2e8f0] py-24 px-6">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12 space-y-3"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-200">
            <Zap className="w-3.5 h-3.5" />
            RESEARCH BUNDLE
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-[#0f172a]" style={{ fontFamily: "var(--font-orbitron)" }}>
            THE{" "}
            <span className="text-transparent bg-clip-text" style={{ backgroundImage: "linear-gradient(135deg, #d97706, #ef4444)" }}>
              WOLVERINE
            </span>{" "}
            STACK
          </h2>
          <p className="text-[#64748b] max-w-xl mx-auto">
            BPC-157 + TB-500 — two of the most researched peptides studied for complementary biological pathways, bundled at 24% off.
          </p>
        </motion.div>

        {/* Card */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-3xl border border-[#e2e8f0] shadow-[0_8px_32px_rgba(0,0,0,0.06)] overflow-hidden max-w-5xl mx-auto"
        >
          {/* Top bar */}
          <div className="h-1.5" style={{ background: "linear-gradient(90deg, #d97706, #ef4444, #7c3aed)" }} />

          <div className="p-8 md:p-12 flex flex-col md:flex-row items-center gap-10">

            {/* Dual orbs */}
            <div className="relative flex-shrink-0">
              <motion.div
                className="flex items-center"
                animate={{ x: [0, -4, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              >
                <div style={{ marginRight: "-36px", zIndex: 2 }}>
                  <MoleculeOrb color="#2563eb" size={170} />
                </div>
                <div style={{ zIndex: 1 }}>
                  <MoleculeOrb color="#7c3aed" size={170} />
                </div>
              </motion.div>
              <div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full bg-white border-2 border-[#e2e8f0] flex items-center justify-center font-bold text-[#0f172a] text-sm shadow-md pointer-events-none"
              >+</div>
            </div>

            {/* Info */}
            <div className="flex-1 space-y-6">
              <div>
                <h3 className="text-2xl font-bold text-[#0f172a] mb-1" style={{ fontFamily: "var(--font-orbitron)" }}>
                  BPC-157 + TB-500
                </h3>
                <p className="text-sm text-[#64748b] leading-relaxed max-w-md">
                  Researchers studying multi-pathway models often combine these two compounds for their
                  complementary mechanisms: nitric oxide / growth hormone pathways (BPC-157) and
                  actin sequestration / cellular migration (TB-500).
                </p>
              </div>

              {/* Contents */}
              <div className="grid grid-cols-2 gap-3">
                {[
                  { name: "BPC-157", conc: "5mg", purity: "≥99.1%", color: "#2563eb", light: "#eff6ff", border: "#bfdbfe" },
                  { name: "TB-500", conc: "5mg", purity: "≥99.3%", color: "#7c3aed", light: "#f5f3ff", border: "#ddd6fe" },
                ].map((item) => (
                  <div
                    key={item.name}
                    className="p-4 rounded-xl"
                    style={{ background: item.light, border: `1px solid ${item.border}` }}
                  >
                    <div className="font-bold text-sm" style={{ fontFamily: "var(--font-orbitron)", color: item.color }}>
                      {item.name}
                    </div>
                    <div className="text-xs text-[#64748b] mt-1">{item.conc} · {item.purity} Purity</div>
                  </div>
                ))}
              </div>

              {/* Benefits */}
              <div className="flex flex-col gap-2">
                {["Save 24% vs purchasing separately", "Dual Certificate of Analysis included", "Free priority cold-chain shipping"].map((b) => (
                  <div key={b} className="flex items-center gap-2 text-sm text-[#475569]">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    {b}
                  </div>
                ))}
              </div>

              {/* Price + CTAs */}
              <div className="flex flex-wrap items-center gap-6 pt-2">
                <div>
                  <div className="text-4xl font-black text-[#0f172a]" style={{ fontFamily: "var(--font-orbitron)" }}>
                    $109.99
                  </div>
                  <div className="flex items-center gap-2 text-sm mt-1">
                    <span className="text-[#94a3b8] line-through">$144.98</span>
                    <span className="font-semibold text-emerald-600 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full text-xs">Save 24%</span>
                  </div>
                </div>
                <div className="flex gap-3">
                  <motion.button
                    whileTap={{ scale: 0.96 }}
                    onClick={() => { addItem(stack); toggleCart(); }}
                    className="flex items-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-sm text-white transition-colors hover:opacity-90"
                    style={{ background: "linear-gradient(135deg, #d97706, #b45309)" }}
                  >
                    <ShoppingCart className="w-4 h-4" />
                    Add to Cart
                  </motion.button>
                  <Link
                    href="/products/wolverine-stack"
                    className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-sm border border-[#e2e8f0] text-[#475569] hover:border-[#d97706] hover:text-[#d97706] hover:bg-amber-50 transition-all"
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
