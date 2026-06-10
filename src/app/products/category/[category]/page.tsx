import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { FlaskConical } from "lucide-react";
import { categories, getCategoryBySlug, getProductsByCategory } from "@/data/products";
import ProductCard from "@/components/ui/ProductCard";
import Footer from "@/components/layout/Footer";
import JsonLd from "@/components/seo/JsonLd";
import { SITE_NAME, breadcrumbSchema, collectionPageSchema } from "@/lib/seo";

export function generateStaticParams() {
  return categories.map((c) => ({ category: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}): Promise<Metadata> {
  const { category } = await params;
  const cat = getCategoryBySlug(category);
  if (!cat) return {};
  const products = getProductsByCategory(category);
  return {
    title: cat.name,
    description: `Browse ${cat.name.toLowerCase()} research peptides from ${SITE_NAME}. ${products.length} product${products.length !== 1 ? "s" : ""} available, all third-party tested with a Certificate of Analysis.`,
    alternates: { canonical: `/products/category/${category}` },
    openGraph: { url: `/products/category/${category}` },
  };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  const cat = getCategoryBySlug(category);
  if (!cat) notFound();

  const products = getProductsByCategory(category);

  const structuredData = [
    breadcrumbSchema([
      { name: "Home", path: "/" },
      { name: "Products", path: "/products" },
      { name: cat.name, path: `/products/category/${category}` },
    ]),
    collectionPageSchema({
      name: cat.name,
      description: `${cat.name} research peptides available from ${SITE_NAME}.`,
      path: `/products/category/${category}`,
      itemUrls: products.map((p) => `/products/${p.slug}`),
    }),
  ];

  return (
    <>
      <JsonLd data={structuredData} />

      {/* Hero */}
      <section className="bg-[#f8f9fc] border-b border-[#e2e8f0] py-20 px-6 relative overflow-hidden">
        <div className="absolute inset-0 dot-grid opacity-50 pointer-events-none" />
        <div className="relative max-w-7xl mx-auto text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold bg-white text-[#2563eb] border border-[#bfdbfe] shadow-sm">
            <FlaskConical className="w-3.5 h-3.5" />
            {cat.name.toUpperCase()}
          </div>
          <h1 className="text-5xl md:text-6xl font-black text-[#0f172a]" style={{ fontFamily: "var(--font-orbitron)" }}>
            {cat.name}
          </h1>
          <p className="text-[#64748b] max-w-md mx-auto text-base">
            {products.length} product{products.length !== 1 ? "s" : ""} — all third-party tested with a Certificate of Analysis.
          </p>
          <div className="pt-2 text-xs text-[#94a3b8]">
            <a href="/products" className="hover:text-[#2563eb] transition-colors">← All products</a>
          </div>
        </div>
      </section>

      {/* Grid */}
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
