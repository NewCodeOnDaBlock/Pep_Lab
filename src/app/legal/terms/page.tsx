import Footer from "@/components/layout/Footer";

export const metadata = { title: "Terms of Service", alternates: { canonical: "/legal/terms" }, robots: { index: false, follow: false } };

export default function TermsPage() {
  return (
    <>
      <section className="py-20 px-4 max-w-4xl mx-auto">
        <h1 className="text-4xl font-black mb-8" style={{ fontFamily: "var(--font-orbitron)", color: "#00d4ff" }}>
          Terms of Service
        </h1>
        <div className="space-y-6 text-[#9ca3af] text-sm leading-relaxed">
          <p>Last updated: {new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</p>

          {[
            ["1. Acceptance of Terms", "By accessing or using PepLab Research and placing orders, you agree to be bound by these Terms of Service and our Research Disclaimer. If you do not agree, do not use our services."],
            ["2. Research Use Only", "All products are sold strictly for in vitro and preclinical research use. Purchaser accepts full legal and ethical responsibility for their use of purchased products."],
            ["3. Eligibility", "You must be at least 18 years of age and a qualified researcher or act on behalf of a research institution to purchase from us."],
            ["4. Orders and Payment", "All prices are in USD. We reserve the right to refuse any order. Payment is processed securely via third-party processors. We do not store card information."],
            ["5. Shipping", "We ship within the United States only. Orders are dispatched within 48 business hours. Cold-chain packaging is standard for all peptide orders."],
            ["6. Returns", "Due to the nature of research chemicals, all sales are final once a product has been dispatched. If your order arrives damaged or incorrect, contact us within 48 hours of receipt."],
            ["7. Limitation of Liability", "PepLab Research is not liable for any damages arising from misuse of purchased products. Our maximum liability is limited to the purchase price of the relevant order."],
            ["8. Governing Law", "These Terms are governed by the laws of the United States and the state in which PepLab Research operates."],
          ].map(([title, content]) => (
            <div key={title}>
              <h2 className="text-white font-bold mb-2">{title}</h2>
              <p>{content}</p>
            </div>
          ))}
        </div>
      </section>
      <Footer />
    </>
  );
}
