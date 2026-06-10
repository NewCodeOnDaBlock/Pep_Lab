import type { Metadata } from "next";
import { BookOpen } from "lucide-react";
import { guides } from "@/data/guides";
import GuideCard from "@/components/ui/GuideCard";
import Footer from "@/components/layout/Footer";
import JsonLd from "@/components/seo/JsonLd";
import { SITE_NAME, breadcrumbSchema, collectionPageSchema } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Research Guides & Peptide Education",
  description:
    "Practical, research-focused guides on peptide comparisons, lab handling, purity verification, and more — written for researchers sourcing BPC-157, TB-500, and related compounds.",
  alternates: { canonical: "/guides" },
  openGraph: {
    title: `Research Guides & Peptide Education | ${SITE_NAME}`,
    description:
      "Practical guides covering peptide comparisons, storage best practices, Certificate of Analysis verification, and research overviews.",
    url: "/guides",
  },
};

export default function GuidesPage() {
  const structuredData = [
    breadcrumbSchema([
      { name: "Home", path: "/" },
      { name: "Research Guides", path: "/guides" },
    ]),
    collectionPageSchema({
      name: "Research Guides",
      description: "Educational guides on peptide research, lab handling, and quality verification.",
      path: "/guides",
      itemUrls: guides.map((g) => `/guides/${g.slug}`),
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
            <BookOpen className="w-3.5 h-3.5" />
            RESEARCH LIBRARY
          </div>
          <h1 className="text-5xl md:text-6xl font-black text-[#0f172a]" style={{ fontFamily: "var(--font-orbitron)" }}>
            Research <span className="text-[#2563eb]">Guides</span>
          </h1>
          <p className="text-[#64748b] max-w-xl mx-auto text-base leading-relaxed">
            Practical, research-focused reading on peptide comparisons, lab handling, purity verification, and more.
            For investigators who want to understand what's in the vial — and why it matters.
          </p>
        </div>
      </section>

      {/* Grid */}
      <section className="bg-white py-16 px-6 md:px-10">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {guides.map((guide, i) => (
            <GuideCard key={guide.slug} guide={guide} index={i} />
          ))}
        </div>
      </section>

      {/* Sub-footer notice */}
      <div className="bg-amber-50 border-t border-amber-200 px-6 py-3.5">
        <p className="max-w-7xl mx-auto text-xs text-amber-800 text-center leading-relaxed">
          All guides are provided for educational and research purposes only. Content does not constitute medical or therapeutic advice.
          All products referenced are for <strong>laboratory and preclinical research use only</strong>.
        </p>
      </div>

      <Footer />
    </>
  );
}
