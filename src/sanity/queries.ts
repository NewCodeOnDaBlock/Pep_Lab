import { groq } from "next-sanity";
import type { Product } from "@/data/products";

/* ─── Color theme → CSS colors ───────────────────────────────── */
const COLOR_MAP: Record<string, Product["color"]> = {
  blue:   { primary: "#2563eb", secondary: "#1d4ed8", light: "#eff6ff", border: "#bfdbfe" },
  purple: { primary: "#7c3aed", secondary: "#6d28d9", light: "#f5f3ff", border: "#ddd6fe" },
  amber:  { primary: "#d97706", secondary: "#b45309", light: "#fffbeb", border: "#fde68a" },
  green:  { primary: "#059669", secondary: "#047857", light: "#ecfdf5", border: "#a7f3d0" },
  red:    { primary: "#dc2626", secondary: "#b91c1c", light: "#fef2f2", border: "#fecaca" },
};

/* ─── GROQ: all products ─────────────────────────────────────── */
export const ALL_PRODUCTS_QUERY = groq`
  *[_type == "product"] | order(_createdAt asc) {
    "id":   _id,
    "slug": slug.current,
    name,
    shortName,
    subtitle,
    description,
    longDescription,
    price,
    originalPrice,
    concentration,
    vialSize,
    purity,
    sequence,
    molecularWeight,
    casNumber,
    storage,
    category,
    tags,
    inStock,
    featured,
    stacksWith,
    benefits,
    researchAreas,
    badge,
    colorTheme,
  }
`;

/* ─── GROQ: one product by slug ─────────────────────────────── */
export const PRODUCT_BY_SLUG_QUERY = groq`
  *[_type == "product" && slug.current == $slug][0] {
    "id":   _id,
    "slug": slug.current,
    name,
    shortName,
    subtitle,
    description,
    longDescription,
    price,
    originalPrice,
    concentration,
    vialSize,
    purity,
    sequence,
    molecularWeight,
    casNumber,
    storage,
    category,
    tags,
    inStock,
    featured,
    stacksWith,
    benefits,
    researchAreas,
    badge,
    colorTheme,
  }
`;

/* ─── Transform: Sanity doc → Product interface ──────────────── */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function toProduct(doc: any): Product {
  return {
    ...doc,
    id:   doc.id   ?? doc._id ?? doc.slug,
    slug: doc.slug ?? "",
    shortName:       doc.shortName        ?? doc.name ?? "",
    subtitle:        doc.subtitle         ?? "",
    description:     doc.description      ?? "",
    longDescription: doc.longDescription  ?? doc.description ?? "",
    price:           doc.price            ?? 0,
    concentration:   doc.concentration    ?? "5mg",
    vialSize:        doc.vialSize         ?? "2mL",
    purity:          doc.purity           ?? "≥99%",
    sequence:        doc.sequence         ?? "",
    molecularWeight: doc.molecularWeight  ?? "",
    casNumber:       doc.casNumber        ?? "",
    storage:         doc.storage          ?? "",
    category:        doc.category         ?? "Research Peptides",
    tags:            doc.tags             ?? [],
    inStock:         doc.inStock          ?? true,
    featured:        doc.featured         ?? false,
    stacksWith:      doc.stacksWith       ?? [],
    benefits:        doc.benefits         ?? [],
    researchAreas:   doc.researchAreas    ?? [],
    color:           COLOR_MAP[doc.colorTheme] ?? COLOR_MAP.blue,
    badge:           doc.badge            || undefined,
  };
}
