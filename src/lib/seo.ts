import { Product } from "@/data/products";
import { Guide } from "@/data/guides";

export const SITE_URL = (process.env.NEXT_PUBLIC_STORE_URL || "https://peplab.netlify.app").replace(/\/$/, "");
export const SITE_NAME = "PepLab Research";
export const SITE_DESCRIPTION =
  "High-purity research peptides — BPC-157, TB-500, and more — third-party tested with a Certificate of Analysis on every batch. For laboratory and preclinical research use only.";

export function absoluteUrl(path: string) {
  if (/^https?:\/\//.test(path)) return path;
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

interface BreadcrumbItem {
  name: string;
  path: string;
}

export function breadcrumbSchema(items: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITE_URL}/#organization`,
    name: SITE_NAME,
    url: SITE_URL,
    logo: absoluteUrl("/favicon.ico"),
    description: SITE_DESCRIPTION,
    sameAs: [],
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    name: SITE_NAME,
    url: SITE_URL,
    description: SITE_DESCRIPTION,
    publisher: { "@id": `${SITE_URL}/#organization` },
    potentialAction: {
      "@type": "SearchAction",
      target: { "@type": "EntryPoint", urlTemplate: `${SITE_URL}/products?q={search_term_string}` },
      "query-input": "required name=search_term_string",
    },
  };
}

export function productSchema(product: Product) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    "@id": `${SITE_URL}/products/${product.slug}#product`,
    name: product.name,
    description: product.description,
    sku: product.id.toUpperCase(),
    category: product.category,
    brand: { "@type": "Brand", name: SITE_NAME },
    url: absoluteUrl(`/products/${product.slug}`),
    additionalProperty: [
      { "@type": "PropertyValue", name: "Concentration", value: product.concentration },
      { "@type": "PropertyValue", name: "Purity", value: product.purity },
      { "@type": "PropertyValue", name: "Vial Size", value: product.vialSize },
      { "@type": "PropertyValue", name: "CAS Number", value: product.casNumber },
    ],
    offers: {
      "@type": "Offer",
      url: absoluteUrl(`/products/${product.slug}`),
      priceCurrency: "USD",
      price: product.price.toFixed(2),
      availability: product.inStock
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
      itemCondition: "https://schema.org/NewCondition",
    },
  };
}

export function articleSchema(guide: Guide) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `${SITE_URL}/guides/${guide.slug}#article`,
    headline: guide.title,
    description: guide.description,
    datePublished: guide.publishedAt,
    dateModified: guide.updatedAt ?? guide.publishedAt,
    author: { "@id": `${SITE_URL}/#organization` },
    publisher: { "@id": `${SITE_URL}/#organization` },
    mainEntityOfPage: absoluteUrl(`/guides/${guide.slug}`),
    keywords: guide.tags.join(", "),
  };
}

export function faqSchema(faqs: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };
}

export function collectionPageSchema(opts: { name: string; description: string; path: string; itemUrls: string[] }) {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: opts.name,
    description: opts.description,
    url: absoluteUrl(opts.path),
    mainEntity: {
      "@type": "ItemList",
      itemListElement: opts.itemUrls.map((url, i) => ({
        "@type": "ListItem",
        position: i + 1,
        url: absoluteUrl(url),
      })),
    },
  };
}
