import type { Metadata } from "next";
import { Geist, Geist_Mono, Orbitron, Space_Grotesk } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import CartDrawer from "@/components/shop/CartDrawer";
import ResearchBanner from "@/components/layout/ResearchBanner";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });
const orbitron = Orbitron({ variable: "--font-orbitron", subsets: ["latin"], weight: ["400", "600", "700", "900"] });
const spaceGrotesk = Space_Grotesk({ variable: "--font-space", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "PepLab Research | Premium Research Peptides",
  description: "High-purity research peptides for in vitro and preclinical studies. BPC-157, TB-500, and more. For research use only.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} ${orbitron.variable} ${spaceGrotesk.variable}`}>
      <body className="bg-white text-[#0f172a] min-h-screen antialiased">
        <ResearchBanner />
        <Navbar />
        <main className="pt-16">{children}</main>
        <CartDrawer />
      </body>
    </html>
  );
}
