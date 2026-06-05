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
      className="group h-full"
    >
      <Link href={`/products/${product.slug}`} className="block h-full">
        <div className="bg-white border border-[#e2e8f0] rounded-2xl overflow-hidden h-full flex flex-col transition-all duration-300 hover:shadow-[0_16px_48px_rgba(0,0,0,0.12)] hover:-translate-y-1.5 hover:border-transparent cursor-pointer">

          {/* Accent top bar */}
          <div className="h-1.5 w-full shrink-0" style={{ background: `linear-gradient(90deg, ${product.color.primary}, ${product.color.secondary})` }} />

          {/* Badge */}
          <div className="px-6 pt-5 pb-0 flex justify-end min-h-[36px]">
            {product.badge && (
              <span
                className="inline-block px-3 py-1.5 rounded-lg text-[11px] font-bold tracking-widest"
                style={{ background: product.color.light, color: product.color.primary, border: `1px solid ${product.color.border}`, fontFamily: "var(--font-orbitron)" }}
              >
                {product.badge}
              </span>
            )}
          </div>

          {/* Visual orb */}
          <div className="flex items-center justify-center py-8">
            <div className="relative w-32 h-32">
              <motion.div
                className="absolute inset-0 rounded-full"
                style={{ background: `radial-gradient(circle, ${product.color.light} 0%, transparent 70%)` }}
                animate={{ scale: [1, 1.12, 1] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
              />
              <motion.div
                className="absolute inset-4 rounded-full border-2"
                style={{ borderColor: product.color.border, borderStyle: "dashed" }}
                animate={{ rotate: 360 }}
                transition={{ duration: 14, repeat: Infinity, ease: "linear" }}
              />
              <div
                className="absolute inset-6 rounded-full flex items-center justify-center"
                style={{ background: `linear-gradient(135deg, ${product.color.light}, ${product.color.border})` }}
              >
                <span
                  className="font-bold text-xs tracking-wider"
                  style={{ color: product.color.primary, fontFamily: "var(--font-orbitron)" }}
                >
                  {product.id === "wolverine-stack" ? "W" : product.shortName.split("-")[0]}
                </span>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="px-8 pb-8 flex flex-col flex-1 gap-5">

            {/* Name + subtitle */}
            <div>
              <h3 className="font-bold text-xl text-[#0f172a] leading-tight" style={{ fontFamily: "var(--font-orbitron)" }}>
                {product.name}
              </h3>
              <p className="text-sm text-[#94a3b8] mt-1 font-medium">{product.subtitle}</p>
            </div>

            {/* Specs chips */}
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: "Concentration", value: product.concentration },
                { label: "Purity", value: product.purity },
              ].map((spec) => (
                <div
                  key={spec.label}
                  className="p-3 rounded-xl text-center"
                  style={{ background: product.color.light, border: `1px solid ${product.color.border}` }}
                >
                  <div className="text-[11px] text-[#94a3b8] font-semibold uppercase tracking-wider">{spec.label}</div>
                  <div className="text-[#0f172a] text-sm font-bold mt-1">{spec.value}</div>
                </div>
              ))}
            </div>

            {/* Description */}
            <p className="text-sm text-[#64748b] line-clamp-2 leading-relaxed">{product.description}</p>

            {/* Stack hint */}
            {product.stacksWith && (
              <div className="flex items-center gap-2 text-sm text-[#64748b]">
                <Zap className="w-4 h-4 text-[#d97706] shrink-0" />
                <span>Stacks with {product.stacksWith.join(", ")}</span>
              </div>
            )}

            {/* Spacer pushes price+CTA to bottom */}
            <div className="flex-1" />

            {/* Divider */}
            <div className="border-t border-[#f1f4f9]" />

            {/* Price */}
            <div className="flex items-baseline gap-2.5">
              <span className="text-3xl font-black text-[#0f172a]">${product.price.toFixed(2)}</span>
              {product.originalPrice && (
                <span className="text-base text-[#94a3b8] line-through">${product.originalPrice.toFixed(2)}</span>
              )}
            </div>

            {/* CTA buttons */}
            <div className="flex items-center gap-3">
              <motion.button
                whileTap={{ scale: 0.93 }}
                onClick={handleAddToCart}
                className="flex items-center justify-center p-3.5 rounded-xl border border-[#e2e8f0] hover:border-[#2563eb] hover:bg-[#eff6ff] transition-all duration-200 shrink-0"
                aria-label="Add to cart"
              >
                <ShoppingCart className="w-5 h-5 text-[#475569]" />
              </motion.button>
              <button
                className="flex-1 flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl text-sm font-bold text-white transition-all duration-200 hover:opacity-90"
                style={{ background: `linear-gradient(135deg, ${product.color.primary}, ${product.color.secondary})` }}
              >
                View Product <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* In-stock */}
            {product.inStock && (
              <div className="flex items-center gap-2 text-sm text-emerald-600 font-medium">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                In stock — ships within 48 hrs
              </div>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
