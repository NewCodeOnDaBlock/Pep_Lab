"use client";
import { motion } from "framer-motion";
import { FlaskConical, Award, Shield, Microscope } from "lucide-react";
import Footer from "@/components/layout/Footer";

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-[#f8f9fc] border-b border-[#e2e8f0] py-20 px-6 relative overflow-hidden">
        <div className="absolute inset-0 dot-grid opacity-50 pointer-events-none" />
        <div className="relative max-w-4xl mx-auto text-center space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold bg-white text-[#2563eb] border border-[#bfdbfe] shadow-sm"
          >
            <Microscope className="w-3.5 h-3.5" />
            ABOUT PEPLAB
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.08 }}
            className="text-5xl md:text-6xl font-black text-[#0f172a]"
            style={{ fontFamily: "var(--font-orbitron)" }}
          >
            Research <span className="text-[#2563eb]">Integrity</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.15 }}
            className="text-[#64748b] max-w-2xl mx-auto leading-relaxed"
          >
            PepLab Research was founded by researchers, for researchers. Our mission is to provide
            the highest purity research peptides with full transparency, rigorous third-party testing,
            and compliance-first operations.
          </motion.p>
        </div>
      </section>

      {/* Cards */}
      <section className="bg-white py-16 px-6" id="methodology">
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            { icon: FlaskConical, color: "#2563eb", light: "#eff6ff", title: "Our Sourcing", id: undefined, body: "We partner with a trusted local manufacturer who maintains current Good Manufacturing Practice (cGMP) aligned processes. Every batch undergoes strict quality control before reaching our inventory." },
            { icon: Award, color: "#7c3aed", light: "#f5f3ff", title: "Third-Party Testing", id: "coa", body: "Every batch is sent to an independent laboratory for HPLC purity testing and mass spectrometry confirmation. Certificates of Analysis are included with every order and available on request." },
            { icon: Shield, color: "#d97706", light: "#fffbeb", title: "Compliance", id: undefined, body: "All products are sold with clear research-only labeling. We verify customer acknowledgment of research-only terms at checkout and maintain records accordingly." },
            { icon: Microscope, color: "#059669", light: "#ecfdf5", title: "Cold-Chain Logistics", id: undefined, body: "Peptides are temperature-sensitive. We dispatch all orders with ice packs and insulated packaging, coordinated directly with our local dropship partner for same-day cold-chain preparation." },
          ].map((item, i) => (
            <motion.div
              key={item.title}
              id={item.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="bg-white border border-[#e2e8f0] rounded-2xl p-7 space-y-4 hover:shadow-[0_8px_24px_rgba(0,0,0,0.07)] hover:-translate-y-1 transition-all duration-200"
            >
              <div className="w-11 h-11 rounded-xl flex items-center justify-center" style={{ background: item.light }}>
                <item.icon className="w-5 h-5" style={{ color: item.color }} />
              </div>
              <h2 className="font-bold text-[#0f172a]" style={{ fontFamily: "var(--font-orbitron)" }}>{item.title}</h2>
              <p className="text-sm text-[#64748b] leading-relaxed">{item.body}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Disclaimer */}
      <section className="bg-[#f8f9fc] border-t border-[#e2e8f0] py-14 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-8 text-center">
            <h2 className="font-bold text-xl mb-4 text-amber-900" style={{ fontFamily: "var(--font-orbitron)" }}>
              Important Notice
            </h2>
            <p className="text-sm text-amber-800 leading-relaxed max-w-2xl mx-auto">
              All products sold by PepLab Research are <strong>for research use only</strong>.
              They are not drugs, dietary supplements, or approved medical products. They are not intended for
              human consumption, therapeutic use, or veterinary application. Purchasers are responsible for compliance
              with all applicable local, state, and federal regulations.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
