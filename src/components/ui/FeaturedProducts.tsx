"use client";
import { motion } from "framer-motion";
import { products } from "@/data/products";
import ProductCard from "./ProductCard";

export default function FeaturedProducts() {
  const featured = products.filter((p) => p.featured && p.id !== "wolverine-stack");

  return (
    <section className="py-24 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16 space-y-3"
        >
          <div
            className="inline-block text-xs tracking-[0.3em] text-[#00d4ff] mb-2"
            style={{ fontFamily: "var(--font-orbitron)" }}
          >
            FEATURED COMPOUNDS
          </div>
          <h2
            className="text-3xl md:text-5xl font-black"
            style={{ fontFamily: "var(--font-orbitron)" }}
          >
            Research <span className="text-[#00d4ff] text-glow-cyan">Peptides</span>
          </h2>
          <p className="text-[#6b7280] max-w-lg mx-auto">
            Third-party verified. Lyophilized for stability. Dispatched with certificate of analysis.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
          {featured.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
