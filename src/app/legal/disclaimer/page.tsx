import Footer from "@/components/layout/Footer";

export const metadata = { title: "Research Disclaimer", alternates: { canonical: "/legal/disclaimer" }, robots: { index: false, follow: false } };

export default function DisclaimerPage() {
  return (
    <>
      <section className="py-20 px-4 max-w-4xl mx-auto">
        <h1 className="text-4xl font-black mb-8" style={{ fontFamily: "var(--font-orbitron)", color: "#00d4ff" }}>
          Research Disclaimer
        </h1>
        <div className="prose prose-invert max-w-none space-y-6 text-[#9ca3af] text-sm leading-relaxed">
          <div className="research-badge px-4 py-3 rounded-xl text-base font-bold">
            ALL PRODUCTS SOLD BY PEPLAB RESEARCH ARE FOR IN VITRO RESEARCH AND PRECLINICAL STUDY PURPOSES ONLY.
          </div>

          <h2 className="text-white text-xl font-bold mt-8">Not for Human Use</h2>
          <p>
            None of the products offered by PepLab Research are approved by the U.S. Food and Drug Administration (FDA)
            for human use. These products have not been evaluated for safety, efficacy, or quality for use in humans.
            They are not drugs, dietary supplements, food additives, or medical devices.
          </p>

          <h2 className="text-white text-xl font-bold">Not for Veterinary Use</h2>
          <p>
            Products sold by PepLab Research are not approved for veterinary use and should not be administered to any animal.
          </p>

          <h2 className="text-white text-xl font-bold">Qualified Researchers Only</h2>
          <p>
            Products are intended for purchase only by qualified researchers, scientists, or research institutions
            conducting legitimate in vitro or preclinical studies. By purchasing from PepLab Research, the buyer
            represents and warrants that they are a qualified researcher and will use the products only for lawful,
            legitimate research purposes.
          </p>

          <h2 className="text-white text-xl font-bold">Buyer Responsibility</h2>
          <p>
            It is the sole responsibility of the purchaser to determine the legality of importing and/or purchasing
            these products in their jurisdiction. PepLab Research makes no representation regarding the legality of
            any product outside the United States.
          </p>

          <h2 className="text-white text-xl font-bold">Age Restriction</h2>
          <p>
            You must be at least 18 years of age to purchase from PepLab Research. By purchasing, you confirm you
            are 18 years of age or older.
          </p>

          <h2 className="text-white text-xl font-bold">No Medical Advice</h2>
          <p>
            Nothing on this website constitutes medical advice. The information provided is for educational and
            research-related purposes only. Always consult a licensed healthcare provider for medical concerns.
          </p>
        </div>
      </section>
      <Footer />
    </>
  );
}
