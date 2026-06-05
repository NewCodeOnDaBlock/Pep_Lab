export interface Product {
  id: string;
  slug: string;
  name: string;
  shortName: string;
  subtitle: string;
  description: string;
  longDescription: string;
  price: number;
  originalPrice?: number;
  concentration: string;
  vialSize: string;
  purity: string;
  sequence: string;
  molecularWeight: string;
  casNumber: string;
  storage: string;
  category: string;
  tags: string[];
  inStock: boolean;
  featured: boolean;
  stacksWith?: string[];
  benefits: string[];
  researchAreas: string[];
  color: {
    primary: string;
    secondary: string;
    glow: string;
  };
  badge?: string;
}

export const products: Product[] = [
  {
    id: "bpc-157",
    slug: "bpc-157",
    name: "BPC-157",
    shortName: "BPC-157",
    subtitle: "Body Protection Compound",
    description: "A pentadecapeptide composed of 15 amino acids. Extensively studied for its regenerative properties in preclinical research models.",
    longDescription: `BPC-157 (Body Protection Compound 157) is a synthetic peptide consisting of 15 amino acids derived from a protein found in human gastric juice. It is one of the most extensively studied peptides in preclinical research settings.

Research with BPC-157 has explored its interactions with various biological systems, including the nitric oxide pathway, growth hormone receptors, and multiple neurotransmitter systems. Studies conducted in vitro and in animal models have investigated its potential effects on tissue repair processes, angiogenesis, and various organ systems.

This product is supplied for research purposes only and is not intended for human consumption, therapeutic use, or veterinary application.`,
    price: 54.99,
    originalPrice: 69.99,
    concentration: "5mg",
    vialSize: "2mL",
    purity: "≥99.1%",
    sequence: "Gly-Glu-Pro-Pro-Pro-Gly-Lys-Pro-Ala-Asp-Asp-Ala-Gly-Leu-Val",
    molecularWeight: "1419.53 g/mol",
    casNumber: "137525-51-0",
    storage: "Lyophilized: -20°C. Reconstituted: 2–8°C, use within 28 days.",
    category: "Regenerative Peptides",
    tags: ["regenerative", "angiogenesis", "gut-derived", "pentadecapeptide"],
    inStock: true,
    featured: true,
    stacksWith: ["tb-500"],
    benefits: [
      "Extensively studied in preclinical models",
      "Researched for angiogenesis mechanisms",
      "Nitric oxide pathway interactions studied",
      "High purity lyophilized powder",
      "Third-party CoA available",
    ],
    researchAreas: [
      "Angiogenesis",
      "Tissue Repair Models",
      "Gastrointestinal Research",
      "Neuropeptide Studies",
      "Musculoskeletal Research",
    ],
    color: {
      primary: "#00d4ff",
      secondary: "#0066cc",
      glow: "rgba(0, 212, 255, 0.3)",
    },
    badge: "BESTSELLER",
  },
  {
    id: "tb-500",
    slug: "tb-500",
    name: "TB-500",
    shortName: "TB-500",
    subtitle: "Thymosin Beta-4 Fragment",
    description: "A synthetic version of the naturally occurring peptide thymosin beta-4. Studied for its role in actin regulation and cellular migration in research models.",
    longDescription: `TB-500 is a synthetic peptide corresponding to a key region of Thymosin Beta-4 (Tβ4), a naturally occurring 43-amino acid protein found throughout the body. It is most abundant in platelets and wound fluid.

Research has focused on TB-500's role in actin sequestration, cellular migration, and angiogenesis. The peptide contains the actin-binding domain Ac-LKKTETQ, which is central to its studied mechanisms. Preclinical studies have explored its effects in various tissue repair models and its interactions with the PINCH-ILK-parvin complex.

This product is supplied for in vitro and preclinical research purposes only and is not intended for human consumption or therapeutic application.`,
    price: 64.99,
    originalPrice: 79.99,
    concentration: "5mg",
    vialSize: "2mL",
    purity: "≥99.3%",
    sequence: "Ac-Ser-Asp-Lys-Pro-Asp-Met-Ala-Glu-Ile-Glu-Lys-Phe-Asp-Lys-Ser-Lys-Leu-Lys-Lys-Thr-Glu-Thr-Gln",
    molecularWeight: "2888.46 g/mol",
    casNumber: "77591-33-4",
    storage: "Lyophilized: -20°C. Reconstituted: 2–8°C, use within 28 days.",
    category: "Cytoskeletal Peptides",
    tags: ["thymosin", "actin", "cytoskeletal", "migration"],
    inStock: true,
    featured: true,
    stacksWith: ["bpc-157"],
    benefits: [
      "Synthetic Thymosin Beta-4 fragment",
      "Studied for actin regulation mechanisms",
      "Cellular migration research applications",
      "Ultra-high purity lyophilized format",
      "Certificate of Analysis included",
    ],
    researchAreas: [
      "Actin Biology",
      "Cellular Migration Studies",
      "Angiogenesis Research",
      "Wound Healing Models",
      "Cardiac Research",
    ],
    color: {
      primary: "#a855f7",
      secondary: "#7c3aed",
      glow: "rgba(168, 85, 247, 0.3)",
    },
    badge: "NEW BATCH",
  },
  {
    id: "wolverine-stack",
    slug: "wolverine-stack",
    name: "The Wolverine Stack",
    shortName: "Wolverine Stack",
    subtitle: "BPC-157 + TB-500 Research Bundle",
    description: "The ultimate research combination: BPC-157 and TB-500 paired together for comprehensive preclinical studies exploring complementary biological pathways.",
    longDescription: `The Wolverine Stack combines our highest-purity BPC-157 (5mg) and TB-500 (5mg) into one research bundle, allowing investigators to study the synergistic interactions between these two extensively researched peptides.

Researchers studying angiogenesis, cellular repair mechanisms, and tissue remodeling often investigate BPC-157 and TB-500 in combination due to their complementary mechanisms of action. BPC-157 operates primarily through nitric oxide and growth hormone receptor pathways, while TB-500 functions through actin sequestration and cellular migration pathways — offering a multi-mechanistic approach to preclinical research.

Bundle pricing represents a significant saving versus purchasing each peptide individually.`,
    price: 109.99,
    originalPrice: 144.98,
    concentration: "5mg each",
    vialSize: "2mL each",
    purity: "≥99% both",
    sequence: "BPC-157 + TB-500",
    molecularWeight: "Combined bundle",
    casNumber: "137525-51-0 / 77591-33-4",
    storage: "Lyophilized: -20°C. Reconstituted: 2–8°C, use within 28 days.",
    category: "Research Bundles",
    tags: ["bundle", "stack", "combo", "wolverine", "bestseller"],
    inStock: true,
    featured: true,
    benefits: [
      "Save 24% vs purchasing separately",
      "Complementary research pathways",
      "Both peptides at ≥99% purity",
      "Dual Certificate of Analysis",
      "Free priority shipping included",
    ],
    researchAreas: [
      "Multi-pathway Research",
      "Angiogenesis Studies",
      "Tissue Repair Models",
      "Synergistic Mechanism Research",
      "Preclinical Combination Studies",
    ],
    color: {
      primary: "#f59e0b",
      secondary: "#ef4444",
      glow: "rgba(245, 158, 11, 0.3)",
    },
    badge: "BEST VALUE",
  },
];

export const getProductBySlug = (slug: string) =>
  products.find((p) => p.slug === slug);
