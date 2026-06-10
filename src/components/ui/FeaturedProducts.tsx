"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { ChevronRight, Check } from "lucide-react";
import dynamic from "next/dynamic";
import { useCartStore } from "@/store/cartStore";
import { products as staticProducts } from "@/data/products";
import type { Product } from "@/data/products";

const MoleculeOrb = dynamic(() => import("@/components/3d/MoleculeOrb"), { ssr: false });

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

/* ─────────────────────────────────────────────
   Single alternating product feature
───────────────────────────────────────────── */
function Feature({ product, even }: { product: Product; even: boolean }) {
  const { addItem, toggleCart } = useCartStore();

  const textBlock = (
    <motion.div
      initial={{ opacity: 0, x: even ? -32 : 32 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "0px 0px -80px 0px" }}
      transition={{ duration: 0.8, ease: EASE, delay: 0.06 }}
      className="flex flex-col justify-center gap-7"
      style={{ maxWidth: 480 }}
    >
      {/* Eyebrow */}
      <p className="t-label" style={{ color: product.color.primary }}>
        {product.category}
        {product.badge && ` — ${product.badge}`}
      </p>

      {/* Headline */}
      <div>
        <h2 className="t-headline">{product.name}</h2>
        <p className="t-subhead mt-3" style={{ fontSize: "clamp(19px, 2vw, 24px)" }}>
          {product.subtitle}
        </p>
      </div>

      {/* Description */}
      <p className="t-body-2">{product.description}</p>

      {/* Specs row */}
      <div
        className="flex gap-6 py-5"
        style={{ borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)" }}
      >
        {[
          { k: "Concentration", v: product.concentration },
          { k: "Purity",        v: product.purity },
          { k: "Format",        v: "Lyophilized" },
        ].map((s) => (
          <div key={s.k}>
            <p style={{ fontSize: 11, fontWeight: 500, color: "var(--t3)", textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: 3 }}>
              {s.k}
            </p>
            <p style={{ fontSize: 15, fontWeight: 500, color: "var(--t1)" }}>{s.v}</p>
          </div>
        ))}
      </div>

      {/* Benefits */}
      <ul className="flex flex-col gap-2">
        {product.benefits.slice(0, 3).map((b) => (
          <li key={b} className="flex items-start gap-2.5 t-body-2" style={{ fontSize: 15 }}>
            <Check style={{ width: 15, height: 15, color: "#34c759", flexShrink: 0, marginTop: 2 }} />
            {b}
          </li>
        ))}
      </ul>

      {/* Price + CTAs */}
      <div className="flex flex-wrap items-center gap-5">
        <div>
          <p style={{ fontSize: "clamp(26px, 3vw, 38px)", fontWeight: 600, color: "var(--t1)", letterSpacing: "-0.02em", lineHeight: 1 }}>
            ${product.price.toFixed(2)}
          </p>
          {product.originalPrice && (
            <p style={{ fontSize: 14, color: "var(--t3)", textDecoration: "line-through", marginTop: 2 }}>
              ${product.originalPrice.toFixed(2)}
            </p>
          )}
        </div>
        <div className="flex flex-wrap gap-3">
          <button
            onClick={() => { addItem(product); toggleCart(); }}
            className="a-btn"
            style={{ background: product.color.primary }}
          >
            Add to Cart
          </button>
          <Link href={`/products/${product.slug}`} className="a-link" style={{ display: "flex", alignItems: "center", gap: 2, paddingBlock: 12 }}>
            Details <ChevronRight style={{ width: 16, height: 16 }} />
          </Link>
        </div>
      </div>
    </motion.div>
  );

  const visualBlock = (
    <motion.div
      initial={{ opacity: 0, x: even ? 32 : -32 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "0px 0px -80px 0px" }}
      transition={{ duration: 0.9, ease: EASE }}
      className="flex justify-center items-center flex-1"
      style={{ minHeight: 380 }}
    >
      <div
        className="anim-float"
        style={{ position: "relative" }}
      >
        <div
          aria-hidden
          style={{
            position: "absolute", inset: 0, pointerEvents: "none", borderRadius: "50%",
            background: `radial-gradient(circle, ${product.color.light} 0%, transparent 60%)`,
            transform: "scale(1.6)",
          }}
        />
        <MoleculeOrb color={product.color.primary} size={380} interactive />
      </div>
    </motion.div>
  );

  return (
    <div
      className="s-white"
      style={{ borderBottom: "1px solid var(--border)" }}
    >
      <div
        className="con-lg px-6"
        style={{
          paddingTop: "clamp(64px, 8vw, 120px)",
          paddingBottom: "clamp(64px, 8vw, 120px)",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "clamp(32px, 5vw, 80px)",
          alignItems: "center",
        }}
      >
        {even ? (
          <>
            {textBlock}
            {visualBlock}
          </>
        ) : (
          <>
            {visualBlock}
            {textBlock}
          </>
        )}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   Section wrapper
───────────────────────────────────────────── */
export default function FeaturedProducts({ products: productsProp }: { products?: Product[] }) {
  const productList = productsProp ?? staticProducts;
  const featured = productList.filter((p) => p.featured && p.id !== "wolverine-stack");

  return (
    <section>
      {/* Section intro */}
      <div
        className="s-white con-md px-6 text-center"
        style={{ paddingTop: "clamp(72px, 8vw, 120px)", paddingBottom: 48 }}
      >
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="t-label mb-4"
        >
          Featured compounds
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: EASE }}
          className="t-headline"
        >
          Built for serious research.
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1, duration: 0.6, ease: EASE }}
          className="t-subhead mt-4 con-sm"
          style={{ margin: "16px auto 0" }}
        >
          Every peptide independently verified by third-party HPLC/MS analysis.
          Certificate of Analysis with every order.
        </motion.p>
      </div>

      {/* Alternating product showcases */}
      {featured.map((product, i) => (
        <Feature key={product.id} product={product} even={i % 2 === 0} />
      ))}
    </section>
  );
}
