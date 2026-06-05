"use client";
import { motion } from "framer-motion";
import { products } from "@/data/products";
import ProductCard from "./ProductCard";

export default function FeaturedProducts() {
  const featured = products.filter((p) => p.featured && p.id !== "wolverine-stack");

  return (
    <section className="bg-white py-24 px-6 md:px-10">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14 space-y-3"
        >
          <p className="text-xs font-semibold tracking-[0.3em] text-[#2563eb] uppercase">
            Featured Compounds
          </p>
          <h2 className="text-4xl md:text-5xl font-black text-[#0f172a]" style={{ fontFamily: "var(--font-orbitron)" }}>
            Research <span className="text-[#2563eb]">Peptides</span>
          </h2>
          <p className="text-[#64748b] text-base max-w-md mx-auto">
            Third-party verified. Lyophilized for stability. Certificate of Analysis with every order.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {featured.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
