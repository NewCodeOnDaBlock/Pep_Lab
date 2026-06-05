import Footer from "@/components/layout/Footer";

export const metadata = { title: "Privacy Policy | PepLab Research" };

export default function PrivacyPage() {
  return (
    <>
      <section className="py-20 px-4 max-w-4xl mx-auto">
        <h1 className="text-4xl font-black mb-8" style={{ fontFamily: "var(--font-orbitron)", color: "#00d4ff" }}>
          Privacy Policy
        </h1>
        <div className="space-y-6 text-[#9ca3af] text-sm leading-relaxed">
          <p>We take your privacy seriously. This policy explains how PepLab Research collects, uses, and protects your personal information.</p>
          {[
            ["Information We Collect", "We collect information you provide directly: name, email, shipping address, and order details. We do not collect or store payment card information — this is handled by our secure payment processor."],
            ["How We Use Information", "We use your information to process and fulfill orders, send order confirmations and shipping updates, and respond to customer service inquiries. We do not sell or share your personal data with third parties for marketing purposes."],
            ["Data Security", "We implement industry-standard security measures including SSL encryption. However, no method of transmission over the internet is 100% secure."],
            ["Cookies", "We use essential cookies to maintain session state (e.g., your cart). We do not use tracking or advertising cookies."],
            ["Your Rights", "You may request access to, correction of, or deletion of your personal data by contacting us. We will respond within 30 days."],
            ["Contact", "For privacy-related inquiries, contact us at privacy@peplab.research"],
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
