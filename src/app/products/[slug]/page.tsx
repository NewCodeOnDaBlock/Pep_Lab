import { notFound } from "next/navigation";
import { products, getProductBySlug } from "@/data/products";
import ProductDetail from "@/components/shop/ProductDetail";
import Footer from "@/components/layout/Footer";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return {};
  return {
    title: `${product.name} | PepLab Research`,
    description: product.description,
  };
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();
  return (
    <>
      <ProductDetail product={product} />
      <Footer />
    </>
  );
}
