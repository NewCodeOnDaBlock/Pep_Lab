"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { ChevronRight, Check } from "lucide-react";
import dynamic from "next/dynamic";
import { useCartStore } from "@/store/cartStore";
import { products } from "@/data/products";

const MoleculeOrb = dynamic(() => import("@/components/3d/MoleculeOrb"), { ssr: false });

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

export default function WolverineStackSection() {
  const stack = products.find((p) => p.id === "wolverine-stack")!;
  const { addItem, toggleCart } = useCartStore();

  return (
    <section
      className="s-gray"
      style={{
        paddingTop:    "clamp(80px, 9vw, 140px)",
        paddingBottom: "clamp(80px, 9vw, 140px)",
        borderTop: "1px solid var(--border)",
      }}
    >
      <div className="con-lg px-6">

        {/* Eyebrow + headline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: EASE }}
          className="text-center mb-16"
        >
          <p className="t-label mb-4" style={{ color: "#bf7a00" }}>
            Research bundle
          </p>
          <h2 className="t-headline">The Wolverine Stack</h2>
          <p
            className="t-subhead mt-4 con-sm"
            style={{ margin: "16px auto 0" }}
          >
            BPC-157 + TB-500 — two of the most studied research peptides,
            bundled for complementary pathway research.
          </p>
        </motion.div>

        {/* Main card */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.75, ease: EASE, delay: 0.1 }}
          style={{
            background: "#fff",
            borderRadius: 24,
            overflow: "hidden",
            boxShadow: "0 2px 0 rgba(0,0,0,0.04), 0 12px 40px rgba(0,0,0,0.07)",
          }}
        >
          {/* Amber top stripe */}
          <div style={{ height: 4, background: "linear-gradient(90deg, #d97706, #f59e0b, #7c3aed)" }} />

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "clamp(24px, 4vw, 60px)",
              padding: "clamp(32px, 5vw, 64px)",
              alignItems: "center",
            }}
          >
            {/* Left: dual orbs */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.9 }}
              className="flex items-center justify-center"
            >
              <div style={{ position: "relative" }}>
                <motion.div
                  className="flex items-center"
                  animate={{ x: [0, -6, 0] }}
                  transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
                >
                  <div style={{ marginRight: -52, zIndex: 2 }}>
                    <MoleculeOrb color="#0071e3" size={210} />
                  </div>
                  <div style={{ zIndex: 1 }}>
                    <MoleculeOrb color="#7c3aed" size={210} />
                  </div>
                </motion.div>
                <div
                  style={{
                    position: "absolute", top: "50%", left: "50%",
                    transform: "translate(-50%,-50%)", zIndex: 10,
                    width: 32, height: 32, borderRadius: "50%",
                    background: "#fff", border: "1.5px solid var(--border)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 16, color: "var(--t2)", fontWeight: 500,
                    pointerEvents: "none",
                  }}
                >
                  +
                </div>
              </div>
            </motion.div>

            {/* Right: info */}
            <div className="flex flex-col gap-6">
              {/* Compound pills */}
              <div className="flex gap-3">
                {[
                  { n: "BPC-157", c: "#0071e3", bg: "#f0f7ff" },
                  { n: "TB-500",  c: "#7c3aed", bg: "#f5f3ff" },
                ].map((x) => (
                  <div
                    key={x.n}
                    style={{
                      padding: "8px 16px", borderRadius: 12,
                      background: x.bg, color: x.c,
                      fontSize: 13, fontWeight: 600,
                    }}
                  >
                    {x.n} · 5mg
                  </div>
                ))}
              </div>

              <p className="t-body-2">
                Researchers studying multi-pathway models often combine these compounds for their
                complementary mechanisms: nitric oxide &amp; growth hormone pathways (BPC-157)
                and actin sequestration &amp; cellular migration (TB-500).
              </p>

              {/* Benefits */}
              <ul className="flex flex-col gap-2">
                {["Save 24% vs. purchasing separately", "Dual Certificate of Analysis included", "Free priority cold-chain shipping"].map((b) => (
                  <li key={b} className="flex items-center gap-2.5" style={{ fontSize: 15, color: "var(--t2)" }}>
                    <Check style={{ width: 15, height: 15, color: "#34c759", flexShrink: 0 }} />
                    {b}
                  </li>
                ))}
              </ul>

              {/* Price + CTA */}
              <div className="flex flex-wrap items-center gap-6">
                <div>
                  <p style={{ fontSize: "clamp(28px, 3.5vw, 40px)", fontWeight: 600, letterSpacing: "-0.02em", lineHeight: 1, color: "var(--t1)" }}>
                    $109.99
                  </p>
                  <p style={{ fontSize: 13, color: "var(--t3)", marginTop: 3 }}>
                    <span style={{ textDecoration: "line-through" }}>$144.98</span>
                    {" · "}
                    <span style={{ color: "#34c759", fontWeight: 500 }}>Save 24%</span>
                  </p>
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={() => { addItem(stack); toggleCart(); }}
                    className="a-btn"
                    style={{ background: "#bf7a00" }}
                  >
                    Add to Cart
                  </button>
                  <Link
                    href="/products/wolverine-stack"
                    className="a-link"
                    style={{ display: "flex", alignItems: "center", gap: 2, paddingBlock: 12 }}
                  >
                    Details <ChevronRight style={{ width: 16, height: 16 }} />
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
