import Footer from "@/components/layout/Footer";

export const metadata = { title: "Shipping Policy", alternates: { canonical: "/legal/shipping" }, openGraph: { url: "/legal/shipping" } };

export default function ShippingPage() {
  return (
    <>
      <section className="py-20 px-4 max-w-4xl mx-auto">
        <h1 className="text-4xl font-black mb-8" style={{ fontFamily: "var(--font-orbitron)", color: "#00d4ff" }}>
          Shipping Policy
        </h1>
        <div className="space-y-6 text-[#9ca3af] text-sm leading-relaxed">
          {[
            ["Processing Time", "Orders are typically processed and dispatched within 1–2 business days (Monday–Friday, excluding federal holidays)."],
            ["Cold-Chain Packaging", "All peptide orders are shipped with ice packs and insulated packaging to maintain product integrity during transit. This is included in your order at no extra cost."],
            ["Shipping Destinations", "We ship within the United States only. We do not ship internationally at this time."],
            ["Shipping Methods", "We use major carriers (USPS, UPS, FedEx) with tracking on all orders. Expedited shipping options are available at checkout."],
            ["Delivery Estimates", "Standard: 3–5 business days. Expedited: 1–2 business days. Delivery times are estimates and may vary."],
            ["Damaged or Lost Shipments", "If your order arrives damaged or is lost in transit, contact us within 48 hours of the expected delivery date with your order number and photos of any damage. We will work to resolve the issue promptly."],
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
