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
    <footer className="bg-[#f8f9fc] border-t border-[#e2e8f0] pt-16 pb-10 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="space-y-4">
            <Link href="/" className="inline-flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#2563eb] flex items-center justify-center">
                <Microscope className="text-white" style={{ width: 16, height: 16 }} />
              </div>
              <span className="font-bold text-[#0f172a]" style={{ fontFamily: "var(--font-orbitron)", fontSize: 15 }}>
                PEP<span className="text-[#2563eb]">LAB</span>
              </span>
            </Link>
            <p className="text-sm text-[#64748b] leading-relaxed max-w-xs">
              Premium research peptides for in vitro and preclinical use. All products are for research purposes only.
            </p>
          </div>

          {/* Link columns */}
          {Object.entries(links).map(([category, items]) => (
            <div key={category}>
              <h4 className="text-xs font-semibold text-[#0f172a] tracking-widest uppercase mb-4">
                {category}
              </h4>
              <ul className="space-y-2.5">
                {items.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="text-sm text-[#64748b] hover:text-[#2563eb] transition-colors"
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
        <div className="border-t border-[#e2e8f0] pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-[#94a3b8]">
            © {new Date().getFullYear()} PepLab Research. All rights reserved.
          </p>
          <div className="text-xs text-center text-amber-700 bg-amber-50 border border-amber-200 px-4 py-2 rounded-lg max-w-md">
            FOR RESEARCH USE ONLY — Not for human or veterinary use. Must be 18+.
          </div>
        </div>
      </div>
    </footer>
  );
}
