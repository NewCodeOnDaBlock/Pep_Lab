"use client";
import { motion } from "framer-motion";
import { products } from "@/data/products";
import ProductCard from "@/components/ui/ProductCard";
import Footer from "@/components/layout/Footer";
import { FlaskConical } from "lucide-react";

export default function ProductsPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-[#f8f9fc] border-b border-[#e2e8f0] py-20 px-6 relative overflow-hidden">
        <div className="absolute inset-0 dot-grid opacity-50 pointer-events-none" />
        <div className="relative max-w-7xl mx-auto text-center space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold bg-white text-[#2563eb] border border-[#bfdbfe] shadow-sm"
          >
            <FlaskConical className="w-3.5 h-3.5" />
            RESEARCH CATALOG
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.08 }}
            className="text-5xl md:text-6xl font-black text-[#0f172a]"
            style={{ fontFamily: "var(--font-orbitron)" }}
          >
            All <span className="text-[#2563eb]">Peptides</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.15 }}
            className="text-[#64748b] max-w-md mx-auto text-base"
          >
            Third-party verified. Lyophilized. Certificate of Analysis with every shipment.
          </motion.p>
        </div>
      </section>

      {/* Research disclaimer */}
      <div className="bg-amber-50 border-b border-amber-200 px-6 py-3.5">
        <p className="max-w-7xl mx-auto text-xs text-amber-800 text-center leading-relaxed">
          All products are for <strong>in vitro research and preclinical studies only</strong>. Not for human consumption, therapeutic, or veterinary use.
          By purchasing, you confirm you are a qualified researcher and are 18+.
        </p>
      </div>

      {/* Product grid */}
      <section className="bg-white py-16 px-6 md:px-10">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {products.map((p, i) => (
            <ProductCard key={p.id} product={p} index={i} />
          ))}
        </div>
      </section>

      <Footer />
    </>
  );
}
