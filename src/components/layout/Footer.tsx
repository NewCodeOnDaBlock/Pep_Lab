import Link from "next/link";
import { Microscope } from "lucide-react";

const links = {
  Products: [
    { href: "/products/bpc-157", label: "BPC-157" },
    { href: "/products/tb-500", label: "TB-500" },
    { href: "/products/wolverine-stack", label: "Wolverine Stack" },
    { href: "/products", label: "All Products" },
  ],
  Research: [
    { href: "/about", label: "About PepLab" },
    { href: "/about#methodology", label: "Our Methodology" },
    { href: "/about#coa", label: "Certificate of Analysis" },
  ],
  Legal: [
    { href: "/legal/terms", label: "Terms of Service" },
    { href: "/legal/privacy", label: "Privacy Policy" },
    { href: "/legal/disclaimer", label: "Research Disclaimer" },
    { href: "/legal/shipping", label: "Shipping Policy" },
  ],
};

export default function Footer() {
  return (
    <footer className="border-t border-[rgba(0,212,255,0.08)] py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <Microscope className="w-5 h-5 text-[#00d4ff]" />
              <span
                className="font-bold text-lg"
                style={{ fontFamily: "var(--font-orbitron)" }}
              >
                PEP<span className="text-[#00d4ff]">LAB</span>
              </span>
            </Link>
            <p className="text-xs text-[#6b7280] leading-relaxed max-w-xs">
              Premium research peptides for in vitro and preclinical use. All products
              are for research purposes only and are not intended for human consumption.
            </p>
          </div>

          {/* Link columns */}
          {Object.entries(links).map(([category, items]) => (
            <div key={category}>
              <h4
                className="text-xs font-bold tracking-wider text-[#6b7280] mb-4"
                style={{ fontFamily: "var(--font-orbitron)" }}
              >
                {category.toUpperCase()}
              </h4>
              <ul className="space-y-2">
                {items.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="text-xs text-[#9ca3af] hover:text-[#00d4ff] transition-colors"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="border-t border-[rgba(255,255,255,0.05)] pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-[#4b5563]">
            © {new Date().getFullYear()} PepLab Research. All rights reserved.
          </p>
          <div
            className="research-badge px-3 py-1.5 rounded-lg text-xs text-center max-w-md"
          >
            FOR RESEARCH USE ONLY — Not for human or veterinary use. Must be 18+.
            All sales are final pending research-use agreement.
          </div>
        </div>
      </div>
    </footer>
  );
}
