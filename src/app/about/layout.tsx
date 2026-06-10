import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About PepLab Research",
  description:
    "Learn about PepLab Research — our sourcing standards, third-party testing process, and the cold-chain logistics behind every order. Founded by researchers, for researchers.",
  alternates: { canonical: "/about" },
  openGraph: { url: "/about" },
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
