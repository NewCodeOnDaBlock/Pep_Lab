"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { ShoppingCart, ArrowRight, Zap, CheckCircle2 } from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import type { Product } from "@/data/products";

export default function ProductCard({ product, index = 0 }: { product: Product; index?: number }) {
  const { addItem, toggleCart } = useCartStore();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addItem(product);
    toggleCart();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="group"
    >
      <Link href={`/products/${product.slug}`}>
        <div className="bg-white border border-[#e2e8f0] rounded-2xl overflow-hidden h-full transition-all duration-300 hover:shadow-[0_12px_40px_rgba(0,0,0,0.10)] hover:-translate-y-1 hover:border-transparent cursor-pointer">

          {/* Accent top bar */}
          <div className="h-1 w-full" style={{ background: `linear-gradient(90deg, ${product.color.primary}, ${product.color.secondary})` }} />

          {/* Badge */}
          {product.badge && (
            <div className="px-5 pt-4 pb-0 flex justify-end">
              <span
                className="inline-block px-2.5 py-1 rounded-md text-[10px] font-bold tracking-widest"
                style={{ background: product.color.light, color: product.color.primary, border: `1px solid ${product.color.border}`, fontFamily: "var(--font-orbitron)" }}
              >
                {product.badge}
              </span>
            </div>
          )}

          {/* Visual orb */}
          <div className="flex items-center justify-center py-8">
            <div className="relative w-28 h-28">
              {/* Outer soft halo */}
              <motion.div
                className="absolute inset-0 rounded-full"
                style={{ background: `radial-gradient(circle, ${product.color.light} 0%, transparent 70%)` }}
                animate={{ scale: [1, 1.12, 1] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
              />
              {/* Spinning ring */}
              <motion.div
                className="absolute inset-4 rounded-full border-2"
                style={{ borderColor: product.color.border, borderStyle: "dashed" }}
                animate={{ rotate: 360 }}
                transition={{ duration: 14, repeat: Infinity, ease: "linear" }}
              />
              {/* Core */}
              <div
                className="absolute inset-5 rounded-full flex items-center justify-center"
                style={{ background: `linear-gradient(135deg, ${product.color.light}, ${product.color.border})` }}
              >
                <span
                  className="font-bold text-[11px] tracking-wider"
                  style={{ color: product.color.primary, fontFamily: "var(--font-orbitron)" }}
                >
                  {product.id === "wolverine-stack" ? "W" : product.shortName.split("-")[0]}
                </span>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="px-6 pb-6 space-y-4">
            <div>
              <h3 className="font-bold text-lg text-[#0f172a]" style={{ fontFamily: "var(--font-orbitron)" }}>
                {product.name}
              </h3>
              <p className="text-xs text-[#94a3b8] mt-0.5 font-medium">{product.subtitle}</p>
            </div>

            {/* Specs */}
            <div className="grid grid-cols-2 gap-2">
              {[
                { label: "Concentration", value: product.concentration },
                { label: "Purity", value: product.purity },
              ].map((spec) => (
                <div
                  key={spec.label}
                  className="p-2.5 rounded-xl text-center"
                  style={{ background: product.color.light, border: `1px solid ${product.color.border}` }}
                >
                  <div className="text-[10px] text-[#94a3b8] font-medium uppercase tracking-wide">{spec.label}</div>
                  <div className="text-[#0f172a] text-sm font-bold mt-0.5">{spec.value}</div>
                </div>
              ))}
            </div>

            <p className="text-sm text-[#64748b] line-clamp-2 leading-relaxed">{product.description}</p>

            {/* Stack hint */}
            {product.stacksWith && (
              <div className="flex items-center gap-1.5 text-xs text-[#64748b]">
                <Zap className="w-3.5 h-3.5 text-[#d97706]" />
                <span>Stacks with {product.stacksWith.join(", ")}</span>
              </div>
            )}

            {/* Divider */}
            <div className="border-t border-[#f1f4f9]" />

            {/* Price + CTA */}
            <div className="flex items-center justify-between">
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold text-[#0f172a]">${product.price.toFixed(2)}</span>
                {product.originalPrice && (
                  <span className="text-sm text-[#94a3b8] line-through">${product.originalPrice.toFixed(2)}</span>
                )}
              </div>

              <div className="flex items-center gap-2">
                <motion.button
                  whileTap={{ scale: 0.92 }}
                  onClick={handleAddToCart}
                  className="p-2.5 rounded-xl border border-[#e2e8f0] hover:border-[#2563eb] hover:bg-[#eff6ff] transition-all duration-200"
                  aria-label="Add to cart"
                >
                  <ShoppingCart className="w-4 h-4 text-[#475569]" />
                </motion.button>
                <button
                  className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-bold text-white transition-all duration-200 hover:opacity-90"
                  style={{ background: `linear-gradient(135deg, ${product.color.primary}, ${product.color.secondary})` }}
                >
                  View <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* In-stock indicator */}
            {product.inStock && (
              <div className="flex items-center gap-1.5 text-xs text-emerald-600 font-medium">
                <CheckCircle2 className="w-3.5 h-3.5" />
                In stock — ships within 48 hrs
              </div>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
