"use client";
import { motion } from "framer-motion";
import { products } from "@/data/products";
import ProductCard from "@/components/ui/ProductCard";
import Footer from "@/components/layout/Footer";
import { FlaskConical } from "lucide-react";
import dynamic from "next/dynamic";

const ParticleField = dynamic(() => import("@/components/3d/ParticleField"), { ssr: false });

export default function ProductsPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative py-24 px-4 overflow-hidden grid-bg">
        <ParticleField color="#a855f7" />
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse at 50% 50%, rgba(168,85,247,0.06) 0%, transparent 70%)" }}
        />
        <div className="relative max-w-7xl mx-auto text-center space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs"
            style={{ background: "rgba(168,85,247,0.1)", border: "1px solid rgba(168,85,247,0.3)", color: "#a855f7", fontFamily: "var(--font-orbitron)" }}
          >
            <FlaskConical className="w-3 h-3" /> RESEARCH CATALOG
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-black"
            style={{ fontFamily: "var(--font-orbitron)" }}
          >
            All <span className="text-[#a855f7]" style={{ textShadow: "0 0 20px rgba(168,85,247,0.6)" }}>Peptides</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-[#6b7280] max-w-md mx-auto"
          >
            Third-party verified. Lyophilized. Certificate of Analysis with every shipment.
          </motion.p>
        </div>
      </section>

      {/* Research disclaimer */}
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="research-badge px-4 py-3 rounded-xl text-xs text-center">
          All products listed are for <strong>in vitro research and preclinical studies only</strong>. Not for human consumption,
          therapeutic, or veterinary use. By purchasing, you confirm you are a qualified researcher and are 18+.
        </div>
      </div>

      {/* Grid */}
      <section className="py-12 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((p, i) => (
            <ProductCard key={p.id} product={p} index={i} />
          ))}
        </div>
      </section>

      <Footer />
    </>
  );
}
