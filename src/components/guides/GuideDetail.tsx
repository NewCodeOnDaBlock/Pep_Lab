"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, Calendar, Clock, ChevronDown, ChevronUp, FlaskConical } from "lucide-react";
import type { Guide } from "@/data/guides";
import { getProductBySlug, type Product } from "@/data/products";
import ProductCard from "@/components/ui/ProductCard";
import { guideColor } from "@/components/ui/GuideCard";
import RichParagraphs from "./RichText";

const COMPARISON_ROWS: { label: string; get: (p: Product) => string }[] = [
  { label: "Concentration", get: (p) => p.concentration },
  { label: "Purity", get: (p) => p.purity },
  { label: "Vial size", get: (p) => p.vialSize },
  { label: "Molecular weight", get: (p) => p.molecularWeight },
  { label: "CAS number", get: (p) => p.casNumber },
  { label: "Price", get: (p) => `$${p.price.toFixed(2)}` },
];

export default function GuideDetail({ guide }: { guide: Guide }) {
  const [expandedFaq, setExpandedFaq] = useState<number | null>(0);
  const color = guideColor(guide.category);

  const relatedProducts = guide.relatedProducts
    .map(getProductBySlug)
    .filter((p): p is Product => Boolean(p));

  const comparisonProducts = (guide.comparisonProducts ?? [])
    .map(getProductBySlug)
    .filter((p): p is Product => Boolean(p));

  const formattedDate = new Date(guide.publishedAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <>
      {/* Breadcrumb */}
      <div className="bg-[#f8f9fc] border-b border-[#e2e8f0] px-6 py-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between flex-wrap gap-3">
          <Link
            href="/guides"
            className="inline-flex items-center gap-1.5 text-sm text-[#64748b] hover:text-[#2563eb] transition-colors font-medium"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Guides
          </Link>
          <nav aria-label="Breadcrumb" className="text-xs text-[#94a3b8] flex items-center gap-1.5">
            <Link href="/" className="hover:text-[#2563eb] transition-colors">Home</Link>
            <span>/</span>
            <Link href="/guides" className="hover:text-[#2563eb] transition-colors">Guides</Link>
            <span>/</span>
            <span className="text-[#475569] truncate max-w-[220px]">{guide.title}</span>
          </nav>
        </div>
      </div>

      {/* Hero */}
      <section className="bg-white px-6 py-16 border-b border-[#e2e8f0] relative overflow-hidden">
        <div className="absolute inset-0 dot-grid opacity-40 pointer-events-none" />
        <div className="relative max-w-4xl mx-auto space-y-5">
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-block px-4 py-2 rounded-full text-xs font-bold tracking-widest"
            style={{ background: color.light, color: color.primary, border: `1px solid ${color.border}`, fontFamily: "var(--font-orbitron)" }}
          >
            {guide.heroEyebrow}
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.06 }}
            className="text-3xl md:text-5xl font-black text-[#0f172a] leading-tight"
            style={{ fontFamily: "var(--font-orbitron)" }}
          >
            {guide.title}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.12 }}
            className="text-lg text-[#64748b] leading-relaxed max-w-2xl"
          >
            {guide.description}
          </motion.p>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-[#94a3b8] font-medium pt-1">
            <span className="inline-flex items-center gap-1.5">
              <Calendar className="w-4 h-4" />
              {formattedDate}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Clock className="w-4 h-4" />
              {guide.readingTime}
            </span>
            <span>{guide.category}</span>
          </div>
        </div>
      </section>

      {/* Body */}
      <article className="bg-white px-6 py-14">
        <div className="max-w-4xl mx-auto space-y-12">
          {guide.sections.map((section, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.4 }}
              className="space-y-4"
            >
              {section.heading && (
                <h2 className="text-2xl md:text-[28px] font-bold text-[#0f172a]" style={{ fontFamily: "var(--font-orbitron)" }}>
                  {section.heading}
                </h2>
              )}
              <RichParagraphs text={section.body} className="text-[#475569] leading-relaxed text-[15px] md:text-base" />
            </motion.div>
          ))}

          {/* Auto-generated spec comparison table */}
          {comparisonProducts.length > 1 && (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="space-y-4"
            >
              <h2 className="text-2xl md:text-[28px] font-bold text-[#0f172a]" style={{ fontFamily: "var(--font-orbitron)" }}>
                Quick spec comparison
              </h2>
              <div className="overflow-x-auto rounded-2xl border border-[#e2e8f0]">
                <table className="w-full text-sm border-collapse min-w-[480px]">
                  <thead>
                    <tr className="bg-[#f8f9fc]">
                      <th className="text-left p-4 font-semibold text-[#94a3b8] uppercase text-xs tracking-wider border-b border-[#e2e8f0]">
                        Spec
                      </th>
                      {comparisonProducts.map((p) => (
                        <th key={p.id} className="text-left p-4 border-b border-[#e2e8f0]">
                          <Link
                            href={`/products/${p.slug}`}
                            className="font-bold hover:underline underline-offset-2"
                            style={{ color: p.color.primary, fontFamily: "var(--font-orbitron)" }}
                          >
                            {p.name}
                          </Link>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {COMPARISON_ROWS.map((row) => (
                      <tr key={row.label} className="even:bg-[#f8f9fc]/60">
                        <td className="p-4 font-medium text-[#64748b] border-b border-[#f1f4f9]">{row.label}</td>
                        {comparisonProducts.map((p) => (
                          <td key={p.id} className="p-4 font-semibold text-[#0f172a] border-b border-[#f1f4f9]">
                            {row.get(p)}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="text-xs text-[#94a3b8]">
                Specs reflect our current batches and are confirmed on each Certificate of Analysis — always verify against the CoA for the lot you receive.
              </p>
            </motion.div>
          )}
        </div>
      </article>

      {/* FAQ */}
      {guide.faqs.length > 0 && (
        <section className="bg-[#f8f9fc] border-y border-[#e2e8f0] px-6 py-16">
          <div className="max-w-4xl mx-auto space-y-6">
            <h2 className="text-2xl md:text-[28px] font-bold text-[#0f172a]" style={{ fontFamily: "var(--font-orbitron)" }}>
              Frequently asked questions
            </h2>
            <div className="space-y-3">
              {guide.faqs.map((faq, i) => {
                const open = expandedFaq === i;
                return (
                  <div key={i} className="bg-white border border-[#e2e8f0] rounded-2xl overflow-hidden">
                    <button
                      onClick={() => setExpandedFaq(open ? null : i)}
                      className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left"
                      aria-expanded={open}
                    >
                      <span className="font-semibold text-[#0f172a]">{faq.question}</span>
                      {open ? (
                        <ChevronUp className="w-5 h-5 text-[#2563eb] shrink-0" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-[#94a3b8] shrink-0" />
                      )}
                    </button>
                    {open && (
                      <div className="px-6 pb-5 text-sm text-[#64748b] leading-relaxed">
                        <RichParagraphs text={faq.answer} className="text-[#64748b] leading-relaxed text-sm" />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Related products */}
      {relatedProducts.length > 0 && (
        <section className="bg-white px-6 py-16 md:px-10">
          <div className="max-w-[1400px] mx-auto space-y-8">
            <div className="max-w-4xl mx-auto md:mx-0 space-y-2">
              <span className="inline-flex items-center gap-2 text-xs font-bold tracking-widest text-[#2563eb] uppercase">
                <FlaskConical className="w-3.5 h-3.5" />
                Related research peptides
              </span>
              <h2 className="text-2xl md:text-3xl font-black text-[#0f172a]" style={{ fontFamily: "var(--font-orbitron)" }}>
                Mentioned in this guide
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
              {relatedProducts.map((p, i) => (
                <ProductCard key={p.id} product={p} index={i} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Disclaimer */}
      <div className="bg-amber-50 border-t border-amber-200 px-6 py-4">
        <p className="max-w-4xl mx-auto text-xs text-amber-800 text-center leading-relaxed">
          This guide is provided for general research and educational purposes only and does not constitute medical, dosing, or usage advice.
          All products referenced are sold <strong>for laboratory and preclinical research use only</strong> — not for human consumption, therapeutic use, or veterinary application.
        </p>
      </div>
    </>
  );
}
