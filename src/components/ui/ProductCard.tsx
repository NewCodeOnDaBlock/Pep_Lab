"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
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
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -40px 0px" }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
    >
      <Link href={`/products/${product.slug}`} style={{ display: "block", textDecoration: "none" }}>
        <div
          style={{
            background: "var(--bg2)",
            borderRadius: 20,
            overflow: "hidden",
            display: "flex", flexDirection: "column",
            height: "100%",
            transition: "transform 0.22s ease, box-shadow 0.22s ease",
            cursor: "pointer",
          }}
          onMouseEnter={(e) => {
            const el = e.currentTarget as HTMLDivElement;
            el.style.transform = "translateY(-3px)";
            el.style.boxShadow = "0 12px 40px rgba(0,0,0,0.1)";
          }}
          onMouseLeave={(e) => {
            const el = e.currentTarget as HTMLDivElement;
            el.style.transform = "translateY(0)";
            el.style.boxShadow = "none";
          }}
        >
          {/* Visual area — colored orb placeholder */}
          <div
            style={{
              position: "relative",
              background: product.color.light,
              display: "flex", alignItems: "center", justifyContent: "center",
              padding: "40px 32px",
              minHeight: 220,
            }}
          >
            {product.badge && (
              <span
                style={{
                  position: "absolute", top: 14, right: 14,
                  background: "rgba(255,255,255,0.85)",
                  backdropFilter: "blur(4px)",
                  color: product.color.primary,
                  fontSize: 10, fontWeight: 600, letterSpacing: "0.08em",
                  padding: "4px 10px", borderRadius: 6,
                  textTransform: "uppercase",
                }}
              >
                {product.badge}
              </span>
            )}

            {/* Simple orb visual */}
            <div style={{ position: "relative", width: 110, height: 110 }}>
              <motion.div
                style={{
                  position: "absolute", inset: 0, borderRadius: "50%",
                  background: `radial-gradient(circle, ${product.color.border} 0%, transparent 70%)`,
                }}
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 3.5, repeat: Infinity }}
              />
              <motion.div
                style={{
                  position: "absolute", inset: 12, borderRadius: "50%",
                  border: `1px dashed ${product.color.border}`,
                }}
                animate={{ rotate: 360 }}
                transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
              />
              <div
                style={{
                  position: "absolute", inset: 24, borderRadius: "50%",
                  background: "#fff",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 13, fontWeight: 600, color: product.color.primary,
                  boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
                }}
              >
                {product.id === "wolverine-stack" ? "W" : product.shortName.split("-")[0]}
              </div>
            </div>
          </div>

          {/* Text area */}
          <div style={{ padding: "20px 22px 24px", display: "flex", flexDirection: "column", flex: 1, gap: 12 }}>
            <div>
              <p style={{ fontSize: 11, color: "var(--t3)", textTransform: "uppercase", letterSpacing: "0.07em", fontWeight: 500, marginBottom: 4 }}>
                {product.category}
              </p>
              <h3 style={{ fontSize: 19, fontWeight: 600, color: "var(--t1)", letterSpacing: "-0.01em", lineHeight: 1.2 }}>
                {product.name}
              </h3>
              <p style={{ fontSize: 14, color: "var(--t2)", marginTop: 3 }}>{product.subtitle}</p>
            </div>

            <p style={{ fontSize: 14, color: "var(--t3)", lineHeight: 1.5, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
              {product.description}
            </p>

            {/* Spec chips */}
            <div style={{ display: "flex", gap: 8 }}>
              {[{ k: "Purity", v: product.purity }, { k: "Conc.", v: product.concentration }].map((s) => (
                <div
                  key={s.k}
                  style={{
                    flex: 1, padding: "7px 10px", borderRadius: 10, textAlign: "center",
                    background: "#fff",
                  }}
                >
                  <p style={{ fontSize: 10, color: "var(--t3)", textTransform: "uppercase", letterSpacing: "0.06em" }}>{s.k}</p>
                  <p style={{ fontSize: 12, fontWeight: 600, color: product.color.primary, marginTop: 2 }}>{s.v}</p>
                </div>
              ))}
            </div>

            {/* Spacer */}
            <div style={{ flex: 1 }} />

            {/* Price + CTA */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingTop: 12, borderTop: "1px solid rgba(0,0,0,0.06)" }}>
              <div>
                <p style={{ fontSize: 21, fontWeight: 600, color: "var(--t1)", letterSpacing: "-0.015em", lineHeight: 1 }}>
                  ${product.price.toFixed(2)}
                </p>
                {product.originalPrice && (
                  <p style={{ fontSize: 12, color: "var(--t3)", textDecoration: "line-through", marginTop: 2 }}>
                    ${product.originalPrice.toFixed(2)}
                  </p>
                )}
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <button
                  onClick={handleAddToCart}
                  style={{
                    padding: "8px 16px", borderRadius: 980,
                    background: product.color.primary, color: "#fff",
                    fontSize: 13, fontWeight: 400, border: "none", cursor: "pointer",
                  }}
                >
                  Add
                </button>
                <div
                  style={{
                    width: 34, height: 34, borderRadius: "50%",
                    background: "rgba(0,0,0,0.04)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}
                >
                  <ChevronRight style={{ width: 15, height: 15, color: "var(--t2)" }} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
