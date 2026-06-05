"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { ShoppingCart, Shield, FlaskConical, Zap, ChevronDown, ChevronUp, ArrowLeft } from "lucide-react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { useCartStore } from "@/store/cartStore";
import type { Product } from "@/data/products";
import { products } from "@/data/products";
import ProductCard from "@/components/ui/ProductCard";

const MoleculeOrb = dynamic(() => import("@/components/3d/MoleculeOrb"), { ssr: false });

export default function ProductDetail({ product }: { product: Product }) {
  const [qty, setQty] = useState(1);
  const [activeTab, setActiveTab] = useState<"overview" | "specs" | "research">("overview");
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const { addItem, toggleCart } = useCartStore();

  const related = products.filter(
    (p) => p.id !== product.id && product.stacksWith?.includes(p.id)
  );

  const faqs = [
    {
      q: "What is this product for?",
      a: "This product is for in vitro and preclinical research use only. It is not intended for human consumption, therapeutic use, or veterinary application.",
    },
    {
      q: "How should this be stored?",
      a: `Lyophilized peptide: store at -20°C. After reconstitution: 2–8°C, use within 28 days. Avoid repeated freeze-thaw cycles. ${product.storage}`,
    },
    {
      q: "Is a Certificate of Analysis provided?",
      a: "Yes. Every batch is accompanied by a third-party CoA including HPLC purity and MS confirmation. Contact us to request the specific CoA for your batch.",
    },
    {
      q: "Do you ship internationally?",
      a: "We ship within the United States only. Customers are responsible for compliance with applicable local regulations.",
    },
  ];

  return (
    <>
      {/* Breadcrumb */}
      <section className="px-4 py-6 max-w-7xl mx-auto">
        <Link
          href="/products"
          className="inline-flex items-center gap-1.5 text-xs text-[#6b7280] hover:text-[#00d4ff] transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Products
        </Link>
      </section>

      {/* Hero */}
      <section className="relative px-4 pb-16 overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `radial-gradient(ellipse 60% 50% at 50% 0%, ${product.color.glow} 0%, transparent 70%)`,
          }}
        />

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* 3D Orb */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="flex justify-center animate-float"
          >
            <div className="relative">
              <motion.div
                className="absolute inset-0 rounded-full pointer-events-none"
                style={{
                  background: `radial-gradient(circle, ${product.color.glow} 0%, transparent 70%)`,
                  transform: "scale(1.5)",
                }}
                animate={{ scale: [1.5, 1.8, 1.5] }}
                transition={{ duration: 3, repeat: Infinity }}
              />
              <MoleculeOrb color={product.color.primary} size={480} interactive />
            </div>
          </motion.div>

          {/* Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            {/* Badge */}
            {product.badge && (
              <div
                className="inline-block px-2 py-1 rounded-md text-xs font-bold"
                style={{
                  background: `${product.color.primary}20`,
                  border: `1px solid ${product.color.primary}40`,
                  color: product.color.primary,
                  fontFamily: "var(--font-orbitron)",
                }}
              >
                {product.badge}
              </div>
            )}

            <div>
              <h1
                className="text-4xl md:text-5xl font-black mb-2"
                style={{ fontFamily: "var(--font-orbitron)", color: product.color.primary }}
              >
                {product.name}
              </h1>
              <p className="text-[#9ca3af]">{product.subtitle}</p>
            </div>

            {/* Research notice */}
            <div className="research-badge px-3 py-2 rounded-lg text-xs">
              For research use only. Not for human consumption or therapeutic application.
            </div>

            {/* Quick specs */}
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: "Concentration", value: product.concentration },
                { label: "Purity", value: product.purity },
                { label: "Format", value: "Lyophilized Powder" },
                { label: "CAS Number", value: product.casNumber.split(" /")[0] },
              ].map((s) => (
                <div
                  key={s.label}
                  className="p-3 rounded-xl"
                  style={{
                    background: `${product.color.primary}06`,
                    border: `1px solid ${product.color.primary}15`,
                  }}
                >
                  <div className="text-[#6b7280] text-xs">{s.label}</div>
                  <div className="text-white text-sm font-semibold mt-0.5">{s.value}</div>
                </div>
              ))}
            </div>

            {/* Price */}
            <div>
              <div
                className="text-4xl font-black"
                style={{ fontFamily: "var(--font-orbitron)", color: product.color.primary }}
              >
                ${product.price.toFixed(2)}
              </div>
              {product.originalPrice && (
                <div className="flex items-center gap-2 text-sm mt-1">
                  <span className="text-[#6b7280] line-through">${product.originalPrice.toFixed(2)}</span>
                  <span className="text-green-400 font-semibold">
                    Save ${(product.originalPrice - product.price).toFixed(2)}
                  </span>
                </div>
              )}
            </div>

            {/* Qty + Add to cart */}
            <div className="flex items-center gap-4">
              <div
                className="flex items-center gap-2 rounded-xl px-3 py-2"
                style={{ border: `1px solid ${product.color.primary}30` }}
              >
                <button
                  onClick={() => setQty(Math.max(1, qty - 1))}
                  className="w-7 h-7 rounded-lg flex items-center justify-center text-lg hover:text-white transition-colors"
                  style={{ color: product.color.primary }}
                >
                  −
                </button>
                <span className="w-8 text-center font-bold">{qty}</span>
                <button
                  onClick={() => setQty(qty + 1)}
                  className="w-7 h-7 rounded-lg flex items-center justify-center text-lg hover:text-white transition-colors"
                  style={{ color: product.color.primary }}
                >
                  +
                </button>
              </div>
              <motion.button
                whileTap={{ scale: 0.96 }}
                onClick={() => { addItem(product, qty); toggleCart(); }}
                className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-sm transition-all"
                style={{
                  background: `linear-gradient(135deg, ${product.color.primary}, ${product.color.secondary})`,
                  color: "#020408",
                }}
              >
                <ShoppingCart className="w-4 h-4" />
                Add to Cart — ${(product.price * qty).toFixed(2)}
              </motion.button>
            </div>

            {/* Trust badges */}
            <div className="flex flex-wrap gap-3 text-xs text-[#6b7280]">
              {[
                { icon: Shield, text: "CoA included" },
                { icon: FlaskConical, text: "HPLC verified" },
                { icon: Zap, text: "Fast dispatch" },
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-1.5">
                  <Icon className="w-3.5 h-3.5" style={{ color: product.color.primary }} />
                  {text}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Tabs */}
      <section className="px-4 pb-16">
        <div className="max-w-7xl mx-auto">
          {/* Tab nav */}
          <div
            className="flex gap-1 p-1 rounded-xl w-fit mb-8"
            style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)" }}
          >
            {(["overview", "specs", "research"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className="px-5 py-2 rounded-lg text-sm font-medium transition-all"
                style={
                  activeTab === tab
                    ? {
                        background: `${product.color.primary}20`,
                        color: product.color.primary,
                        border: `1px solid ${product.color.primary}30`,
                        fontFamily: "var(--font-orbitron)",
                        fontSize: "11px",
                      }
                    : { color: "#6b7280" }
                }
              >
                {tab.toUpperCase()}
              </button>
            ))}
          </div>

          {/* Tab content */}
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {activeTab === "overview" && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <h2 className="font-bold text-xl" style={{ fontFamily: "var(--font-orbitron)" }}>About This Compound</h2>
                  <div className="text-[#9ca3af] text-sm leading-relaxed whitespace-pre-line">
                    {product.longDescription}
                  </div>
                </div>
                <div className="space-y-4">
                  <h3 className="font-bold" style={{ fontFamily: "var(--font-orbitron)" }}>Research Areas</h3>
                  <div className="space-y-2">
                    {product.researchAreas.map((area) => (
                      <div
                        key={area}
                        className="flex items-center gap-2 p-3 rounded-lg text-sm"
                        style={{
                          background: `${product.color.primary}06`,
                          border: `1px solid ${product.color.primary}10`,
                        }}
                      >
                        <div className="w-1.5 h-1.5 rounded-full" style={{ background: product.color.primary }} />
                        {area}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === "specs" && (
              <div className="max-w-2xl space-y-3">
                {[
                  ["Name", product.name],
                  ["CAS Number", product.casNumber],
                  ["Molecular Weight", product.molecularWeight],
                  ["Sequence", product.sequence],
                  ["Concentration", product.concentration],
                  ["Vial Size", product.vialSize],
                  ["Purity", product.purity],
                  ["Format", "Lyophilized Powder"],
                  ["Storage", product.storage],
                  ["Category", product.category],
                ].map(([label, value]) => (
                  <div
                    key={label}
                    className="flex gap-4 p-3 rounded-lg"
                    style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.04)" }}
                  >
                    <span className="text-xs text-[#6b7280] w-36 shrink-0 font-medium mt-0.5">{label}</span>
                    <span className="text-xs text-[#e8f4f8] font-mono break-all">{value}</span>
                  </div>
                ))}
              </div>
            )}

            {activeTab === "research" && (
              <div className="max-w-2xl space-y-3">
                <h3 className="font-bold mb-4" style={{ fontFamily: "var(--font-orbitron)" }}>FAQ</h3>
                {faqs.map((faq, i) => (
                  <div
                    key={i}
                    className="rounded-xl overflow-hidden"
                    style={{ border: `1px solid ${product.color.primary}15` }}
                  >
                    <button
                      onClick={() => setExpandedFaq(expandedFaq === i ? null : i)}
                      className="w-full flex items-center justify-between p-4 text-sm font-medium text-left hover:bg-white/2 transition-colors"
                    >
                      {faq.q}
                      {expandedFaq === i ? <ChevronUp className="w-4 h-4 shrink-0" /> : <ChevronDown className="w-4 h-4 shrink-0" />}
                    </button>
                    {expandedFaq === i && (
                      <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: "auto" }}
                        className="px-4 pb-4 text-xs text-[#9ca3af] leading-relaxed border-t"
                        style={{ borderColor: `${product.color.primary}10` }}
                      >
                        <p className="pt-3">{faq.a}</p>
                      </motion.div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        </div>
      </section>

      {/* Related */}
      {related.length > 0 && (
        <section className="px-4 pb-16 border-t border-[rgba(0,212,255,0.06)] pt-12">
          <div className="max-w-7xl mx-auto">
            <h2
              className="text-xl font-bold mb-8"
              style={{ fontFamily: "var(--font-orbitron)" }}
            >
              <span style={{ color: product.color.primary }}>Stack</span> With
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-3xl">
              {related.map((p, i) => (
                <ProductCard key={p.id} product={p} index={i} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
