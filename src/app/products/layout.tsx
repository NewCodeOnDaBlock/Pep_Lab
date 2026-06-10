import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "All Research Peptides",
  description:
    "Browse our full catalog of high-purity research peptides — BPC-157, TB-500, and bundles. Every batch third-party tested with a Certificate of Analysis. For laboratory and preclinical research use only.",
  alternates: { canonical: "/products" },
  openGraph: { url: "/products" },
};

export default function ProductsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
