"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { ShoppingCart, Shield, FlaskConical, Zap, ChevronDown, ChevronUp, ArrowLeft, CheckCircle2, Truck } from "lucide-react";
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

  const related = products.filter((p) => p.id !== product.id && product.stacksWith?.includes(p.id));

  const faqs = [
    { q: "What is this product for?", a: "This product is for in vitro and preclinical research use only. It is not intended for human consumption, therapeutic use, or veterinary application." },
    { q: "How should this be stored?", a: `Lyophilized peptide: store at -20°C. After reconstitution: 2–8°C, use within 28 days. Avoid repeated freeze-thaw cycles. ${product.storage}` },
    { q: "Is a Certificate of Analysis provided?", a: "Yes. Every batch is accompanied by a third-party CoA including HPLC purity and MS confirmation. Contact us to request the specific CoA for your batch." },
    { q: "Do you ship internationally?", a: "We ship within the United States only. Customers are responsible for compliance with applicable local regulations." },
  ];

  const tabs = ["overview", "specs", "research"] as const;

  return (
    <>
      {/* Breadcrumb */}
      <div className="bg-[#f8f9fc] border-b border-[#e2e8f0] px-6 py-4">
        <div className="max-w-7xl mx-auto">
          <Link href="/products" className="inline-flex items-center gap-1.5 text-sm text-[#64748b] hover:text-[#2563eb] transition-colors font-medium">
            <ArrowLeft className="w-4 h-4" />
            Back to Products
          </Link>
        </div>
      </div>

      {/* Hero */}
      <section className="bg-white px-6 py-16">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">

          {/* Orb */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7 }}
            className="flex justify-center animate-float"
          >
            <div className="relative">
              <div
                className="absolute inset-0 rounded-full pointer-events-none"
                style={{ background: `radial-gradient(circle, ${product.color.light} 0%, transparent 65%)`, transform: "scale(1.5)" }}
              />
              <MoleculeOrb color={product.color.primary} size={460} interactive />
            </div>
          </motion.div>

          {/* Info */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="space-y-7"
          >
            {product.badge && (
              <span
                className="inline-block px-3 py-1.5 rounded-lg text-[10px] font-bold tracking-widest"
                style={{ background: product.color.light, color: product.color.primary, border: `1px solid ${product.color.border}`, fontFamily: "var(--font-orbitron)" }}
              >
                {product.badge}
              </span>
            )}

            <div>
              <h1 className="text-4xl md:text-5xl font-black text-[#0f172a] mb-2" style={{ fontFamily: "var(--font-orbitron)" }}>
                {product.name}
              </h1>
              <p className="text-[#64748b] font-medium">{product.subtitle}</p>
            </div>

            {/* Research notice */}
            <div className="px-4 py-3 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-800">
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
                  className="p-3.5 rounded-xl border"
                  style={{ background: product.color.light, borderColor: product.color.border }}
                >
                  <div className="text-xs text-[#94a3b8] font-medium">{s.label}</div>
                  <div className="text-[#0f172a] text-sm font-bold mt-0.5">{s.value}</div>
                </div>
              ))}
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3">
              <span className="text-4xl font-black text-[#0f172a]">${product.price.toFixed(2)}</span>
              {product.originalPrice && (
                <>
                  <span className="text-lg text-[#94a3b8] line-through">${product.originalPrice.toFixed(2)}</span>
                  <span className="text-sm font-semibold text-emerald-600 bg-emerald-50 border border-emerald-200 px-2 py-1 rounded-lg">
                    Save ${(product.originalPrice - product.price).toFixed(2)}
                  </span>
                </>
              )}
            </div>

            {/* Qty + Add to cart */}
            <div className="flex items-center gap-4">
              {/* Qty control */}
              <div className="flex items-center gap-2 px-4 py-3 rounded-xl border border-[#e2e8f0] bg-[#f8f9fc]">
                <button
                  onClick={() => setQty(Math.max(1, qty - 1))}
                  className="w-7 h-7 rounded-lg border border-[#e2e8f0] bg-white flex items-center justify-center text-lg text-[#475569] hover:border-[#2563eb] hover:text-[#2563eb] transition-colors"
                >−</button>
                <span className="w-8 text-center font-bold text-[#0f172a]">{qty}</span>
                <button
                  onClick={() => setQty(qty + 1)}
                  className="w-7 h-7 rounded-lg border border-[#e2e8f0] bg-white flex items-center justify-center text-lg text-[#475569] hover:border-[#2563eb] hover:text-[#2563eb] transition-colors"
                >+</button>
              </div>

              <motion.button
                whileTap={{ scale: 0.97 }}
                onClick={() => { addItem(product, qty); toggleCart(); }}
                className="flex-1 flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl font-bold text-sm text-white transition-all hover:opacity-90 shadow-[0_4px_14px_rgba(0,0,0,0.12)]"
                style={{ background: `linear-gradient(135deg, ${product.color.primary}, ${product.color.secondary})` }}
              >
                <ShoppingCart className="w-4.5 h-4.5" style={{ width: 18, height: 18 }} />
                Add to Cart — ${(product.price * qty).toFixed(2)}
              </motion.button>
            </div>

            {/* Trust row */}
            <div className="flex flex-wrap gap-5 pt-1">
              {[
                { icon: Shield, text: "CoA included" },
                { icon: FlaskConical, text: "HPLC verified" },
                { icon: Truck, text: "Cold-chain dispatch" },
                { icon: Zap, text: "Ships in 48hrs" },
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-1.5 text-xs text-[#64748b] font-medium">
                  <Icon className="w-3.5 h-3.5" style={{ color: product.color.primary }} />
                  {text}
                </div>
              ))}
            </div>

            {/* In stock */}
            <div className="flex items-center gap-1.5 text-sm text-emerald-600 font-medium">
              <CheckCircle2 className="w-4 h-4" />
              In stock — ready to ship
            </div>
          </motion.div>
        </div>
      </section>

      {/* Tabs */}
      <section className="bg-[#f8f9fc] border-t border-[#e2e8f0] px-6 py-14">
        <div className="max-w-7xl mx-auto">
          {/* Tab nav */}
          <div className="flex gap-1 p-1 rounded-xl w-fit mb-10 bg-white border border-[#e2e8f0] shadow-sm">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className="px-6 py-2.5 rounded-lg text-xs font-semibold transition-all uppercase tracking-wider"
                style={
                  activeTab === tab
                    ? { background: product.color.light, color: product.color.primary, border: `1px solid ${product.color.border}`, fontFamily: "var(--font-orbitron)" }
                    : { color: "#94a3b8" }
                }
              >
                {tab}
              </button>
            ))}
          </div>

          <motion.div key={activeTab} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25 }}>
            {activeTab === "overview" && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                <div className="space-y-5">
                  <h2 className="font-bold text-xl text-[#0f172a]" style={{ fontFamily: "var(--font-orbitron)" }}>About This Compound</h2>
                  <div className="text-[#475569] text-sm leading-relaxed whitespace-pre-line">{product.longDescription}</div>
                </div>
                <div className="space-y-4">
                  <h3 className="font-bold text-[#0f172a]" style={{ fontFamily: "var(--font-orbitron)" }}>Research Areas</h3>
                  <div className="space-y-2.5">
                    {product.researchAreas.map((area) => (
                      <div
                        key={area}
                        className="flex items-center gap-3 p-3.5 rounded-xl bg-white border border-[#e2e8f0] text-sm text-[#475569] font-medium"
                      >
                        <div className="w-2 h-2 rounded-full shrink-0" style={{ background: product.color.primary }} />
                        {area}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === "specs" && (
              <div className="max-w-2xl space-y-2.5">
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
                    className="flex gap-4 p-4 rounded-xl bg-white border border-[#e2e8f0] text-sm"
                  >
                    <span className="text-[#94a3b8] w-36 shrink-0 font-medium text-xs uppercase tracking-wide mt-0.5">{label}</span>
                    <span className="text-[#0f172a] font-mono text-xs break-all">{value}</span>
                  </div>
                ))}
              </div>
            )}

            {activeTab === "research" && (
              <div className="max-w-2xl space-y-3">
                <h3 className="font-bold text-[#0f172a] mb-6" style={{ fontFamily: "var(--font-orbitron)" }}>FAQ</h3>
                {faqs.map((faq, i) => (
                  <div key={i} className="bg-white rounded-xl border border-[#e2e8f0] overflow-hidden">
                    <button
                      onClick={() => setExpandedFaq(expandedFaq === i ? null : i)}
                      className="w-full flex items-center justify-between p-5 text-sm font-semibold text-[#0f172a] text-left hover:bg-[#f8f9fc] transition-colors"
                    >
                      {faq.q}
                      {expandedFaq === i
                        ? <ChevronUp className="w-4 h-4 text-[#94a3b8] shrink-0" />
                        : <ChevronDown className="w-4 h-4 text-[#94a3b8] shrink-0" />}
                    </button>
                    {expandedFaq === i && (
                      <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: "auto" }}
                        className="px-5 pb-5 text-sm text-[#64748b] leading-relaxed border-t border-[#e2e8f0]"
                      >
                        <p className="pt-4">{faq.a}</p>
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
        <section className="bg-white border-t border-[#e2e8f0] px-6 py-16">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-xl font-bold text-[#0f172a] mb-8" style={{ fontFamily: "var(--font-orbitron)" }}>
              Stack With
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-3xl">
              {related.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
