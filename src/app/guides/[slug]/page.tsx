import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { guides, getGuideBySlug } from "@/data/guides";
import GuideDetail from "@/components/guides/GuideDetail";
import Footer from "@/components/layout/Footer";
import JsonLd from "@/components/seo/JsonLd";
import { articleSchema, breadcrumbSchema, faqSchema } from "@/lib/seo";

export function generateStaticParams() {
  return guides.map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const guide = getGuideBySlug(slug);
  if (!guide) return {};
  return {
    title: guide.title,
    description: guide.description,
    alternates: { canonical: `/guides/${guide.slug}` },
    openGraph: {
      type: "article",
      title: guide.title,
      description: guide.description,
      url: `/guides/${guide.slug}`,
      publishedTime: guide.publishedAt,
      modifiedTime: guide.updatedAt ?? guide.publishedAt,
      tags: guide.tags,
    },
    twitter: {
      card: "summary_large_image",
      title: guide.title,
      description: guide.description,
    },
  };
}

export default async function GuidePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const guide = getGuideBySlug(slug);
  if (!guide) notFound();

  const structuredData = [
    articleSchema(guide),
    breadcrumbSchema([
      { name: "Home", path: "/" },
      { name: "Research Guides", path: "/guides" },
      { name: guide.title, path: `/guides/${guide.slug}` },
    ]),
    ...(guide.faqs.length > 0 ? [faqSchema(guide.faqs)] : []),
  ];

  return (
    <>
      <JsonLd data={structuredData} />
      <GuideDetail guide={guide} />
      <Footer />
    </>
  );
}
