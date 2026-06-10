import Link from "next/link";

const COLS = {
  Products: [
    { href: "/products/bpc-157",       label: "BPC-157" },
    { href: "/products/tb-500",        label: "TB-500" },
    { href: "/products/wolverine-stack", label: "Wolverine Stack" },
    { href: "/products",               label: "All Products" },
  ],
  Research: [
    { href: "/guides/bpc-157-vs-tb-500",                    label: "BPC-157 vs. TB-500" },
    { href: "/guides/storing-handling-research-peptides",   label: "Storage & Handling" },
    { href: "/guides/understanding-certificates-of-analysis", label: "Reading a CoA" },
    { href: "/guides",                                       label: "All Guides" },
  ],
  Company: [
    { href: "/about",               label: "About PepLab" },
    { href: "/about#coa",           label: "Certificate of Analysis" },
    { href: "/legal/disclaimer",    label: "Research Disclaimer" },
    { href: "/legal/shipping",      label: "Shipping Policy" },
  ],
  Legal: [
    { href: "/legal/terms",   label: "Terms of Service" },
    { href: "/legal/privacy", label: "Privacy Policy" },
  ],
};

export default function Footer() {
  return (
    <footer style={{ background: "var(--bg2)", borderTop: "1px solid var(--border)" }}>
      <div className="con-lg px-6" style={{ paddingTop: 48, paddingBottom: 20 }}>

        {/* Links grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
            gap: "32px 24px",
            paddingBottom: 40,
            borderBottom: "1px solid var(--border)",
          }}
        >
          {Object.entries(COLS).map(([category, links]) => (
            <div key={category}>
              <p
                style={{
                  fontSize: 11, fontWeight: 600, color: "var(--t1)",
                  textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 14,
                }}
              >
                {category}
              </p>
              {links.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className="footer-link"
                >
                  {l.label}
                </Link>
              ))}
            </div>
          ))}
        </div>

        {/* Bottom row */}
        <div
          style={{
            paddingTop: 20,
            display: "flex", flexWrap: "wrap", alignItems: "center",
            justifyContent: "space-between", gap: 12,
          }}
        >
          <p style={{ fontSize: 12, color: "var(--t3)" }}>
            Copyright © {new Date().getFullYear()} PepLab Research. All rights reserved.
          </p>
          <p
            style={{
              fontSize: 11, maxWidth: 480, textAlign: "right",
              background: "rgba(217,119,6,0.06)",
              border: "1px solid rgba(217,119,6,0.18)",
              color: "#92400e",
              padding: "6px 12px", borderRadius: 6,
            }}
          >
            FOR RESEARCH USE ONLY — Not for human consumption or therapeutic use. Must be 18+.
          </p>
        </div>
      </div>
    </footer>
  );
}
