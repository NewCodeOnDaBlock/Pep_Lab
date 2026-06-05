"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { ShoppingCart, ArrowRight, Zap } from "lucide-react";
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
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ y: -6 }}
      className="relative group"
    >
      <Link href={`/products/${product.slug}`}>
        <div
          className="relative glass-card rounded-2xl overflow-hidden cursor-pointer h-full"
          style={{
            border: `1px solid ${product.color.primary}20`,
            transition: "border-color 0.3s ease, box-shadow 0.3s ease",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.borderColor = `${product.color.primary}60`;
            (e.currentTarget as HTMLElement).style.boxShadow = `0 0 40px ${product.color.glow}`;
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.borderColor = `${product.color.primary}20`;
            (e.currentTarget as HTMLElement).style.boxShadow = "none";
          }}
        >
          {/* Top gradient bar */}
          <div
            className="h-1 w-full"
            style={{ background: `linear-gradient(90deg, ${product.color.primary}, ${product.color.secondary})` }}
          />

          {/* Badge */}
          {product.badge && (
            <div
              className="absolute top-4 right-4 px-2 py-1 rounded-md text-xs font-bold tracking-wider"
              style={{
                background: `${product.color.primary}20`,
                border: `1px solid ${product.color.primary}50`,
                color: product.color.primary,
                fontFamily: "var(--font-orbitron)",
              }}
            >
              {product.badge}
            </div>
          )}

          {/* Orb visual */}
          <div className="flex items-center justify-center pt-8 pb-4">
            <div className="relative w-28 h-28">
              <motion.div
                className="absolute inset-0 rounded-full"
                style={{ background: `radial-gradient(circle, ${product.color.primary}30 0%, transparent 70%)` }}
                animate={{ scale: [1, 1.15, 1] }}
                transition={{ duration: 3, repeat: Infinity }}
              />
              <motion.div
                className="absolute inset-3 rounded-full"
                style={{ background: `radial-gradient(circle, ${product.color.primary}50 0%, ${product.color.secondary}20 60%, transparent 100%)` }}
                animate={{ rotate: 360 }}
                transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
              />
              {/* Orbiting dot */}
              <motion.div
                className="absolute w-2 h-2 rounded-full top-1/2 left-1/2"
                style={{ background: product.color.primary, boxShadow: `0 0 8px ${product.color.primary}`, originX: 0, originY: 0 }}
                animate={{ rotate: 360 }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                initial={{ x: 40, y: -4 }}
              />
              <div
                className="absolute inset-0 flex items-center justify-center font-bold text-xs tracking-widest"
                style={{ fontFamily: "var(--font-orbitron)", color: product.color.primary }}
              >
                {product.id === "wolverine-stack" ? "W" : product.shortName}
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="px-5 pb-5 space-y-3">
            <div>
              <h3
                className="font-bold text-lg"
                style={{ fontFamily: "var(--font-orbitron)", color: product.color.primary }}
              >
                {product.name}
              </h3>
              <p className="text-xs text-[#9ca3af] mt-0.5">{product.subtitle}</p>
            </div>

            {/* Specs row */}
            <div className="flex gap-3 text-xs">
              {[
                { label: "Conc.", value: product.concentration },
                { label: "Purity", value: product.purity },
              ].map((spec) => (
                <div
                  key={spec.label}
                  className="flex-1 p-2 rounded-lg text-center"
                  style={{ background: `${product.color.primary}08`, border: `1px solid ${product.color.primary}15` }}
                >
                  <div className="text-[#6b7280]">{spec.label}</div>
                  <div className="text-white font-semibold mt-0.5">{spec.value}</div>
                </div>
              ))}
            </div>

            <p className="text-xs text-[#6b7280] line-clamp-2 leading-relaxed">
              {product.description}
            </p>

            {/* Stack badge */}
            {product.stacksWith && (
              <div className="flex items-center gap-1 text-xs text-[#9ca3af]">
                <Zap className="w-3 h-3 text-yellow-400" />
                <span>Stacks with {product.stacksWith.join(", ")}</span>
              </div>
            )}

            {/* Price + CTA */}
            <div className="flex items-center justify-between pt-1">
              <div>
                <span
                  className="text-xl font-bold"
                  style={{ fontFamily: "var(--font-orbitron)", color: product.color.primary }}
                >
                  ${product.price.toFixed(2)}
                </span>
                {product.originalPrice && (
                  <span className="text-xs text-[#6b7280] line-through ml-2">
                    ${product.originalPrice.toFixed(2)}
                  </span>
                )}
              </div>

              <div className="flex gap-2">
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  onClick={handleAddToCart}
                  className="p-2 rounded-lg transition-all duration-200"
                  style={{
                    background: `${product.color.primary}20`,
                    border: `1px solid ${product.color.primary}40`,
                    color: product.color.primary,
                  }}
                >
                  <ShoppingCart className="w-4 h-4" />
                </motion.button>
                <button
                  className="flex items-center gap-1 px-3 py-2 rounded-lg text-xs font-bold transition-all duration-200"
                  style={{
                    background: `linear-gradient(135deg, ${product.color.primary}, ${product.color.secondary})`,
                    color: "#020408",
                  }}
                >
                  View <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
