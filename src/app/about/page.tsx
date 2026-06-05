"use client";
import { motion } from "framer-motion";
import { FlaskConical, Award, Shield, Microscope } from "lucide-react";
import dynamic from "next/dynamic";
import Footer from "@/components/layout/Footer";

const ParticleField = dynamic(() => import("@/components/3d/ParticleField"), { ssr: false });

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative py-24 px-4 overflow-hidden grid-bg">
        <ParticleField color="#00d4ff" />
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse at 50% 50%, rgba(0,212,255,0.06) 0%, transparent 70%)" }}
        />
        <div className="relative max-w-4xl mx-auto text-center space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs"
            style={{ background: "rgba(0,212,255,0.1)", border: "1px solid rgba(0,212,255,0.3)", color: "#00d4ff", fontFamily: "var(--font-orbitron)" }}
          >
            <Microscope className="w-3 h-3" /> ABOUT PEPLAB
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-black"
            style={{ fontFamily: "var(--font-orbitron)" }}
          >
            Research <span className="text-[#00d4ff]">Integrity</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-[#9ca3af] max-w-2xl mx-auto leading-relaxed"
          >
            PepLab Research was founded by researchers, for researchers. Our mission is to provide
            the highest purity research peptides with full transparency, rigorous third-party testing,
            and compliance-first operations.
          </motion.p>
        </div>
      </section>

      {/* Mission */}
      <section className="py-16 px-4" id="methodology">
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
          {[
            {
              icon: FlaskConical,
              color: "#00d4ff",
              title: "Our Sourcing",
              body: "We partner with a trusted local manufacturer who maintains current Good Manufacturing Practice (cGMP) aligned processes. Every batch undergoes strict quality control before it reaches our inventory.",
            },
            {
              icon: Award,
              color: "#a855f7",
              title: "Third-Party Testing",
              id: "coa",
              body: "We send every batch to an independent analytical laboratory for HPLC purity testing and mass spectrometry confirmation. Certificates of Analysis are provided with every order and available on request.",
            },
            {
              icon: Shield,
              color: "#f59e0b",
              title: "Compliance",
              body: "All products are sold with clear research-only labeling. We verify customer acknowledgment of research-only terms at checkout and maintain records accordingly.",
            },
            {
              icon: Microscope,
              color: "#10b981",
              title: "Cold-Chain Logistics",
              body: "Peptides are temperature-sensitive. We dispatch all orders with ice packs and insulated packaging, coordinated directly with our local dropship partner for same-day cold-chain preparation.",
            },
          ].map((item, i) => (
            <motion.div
              key={item.title}
              id={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass-card rounded-2xl p-6 space-y-4"
              style={{ border: `1px solid ${item.color}15` }}
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{ background: `${item.color}15`, border: `1px solid ${item.color}30` }}
              >
                <item.icon className="w-5 h-5" style={{ color: item.color }} />
              </div>
              <h2 className="font-bold" style={{ fontFamily: "var(--font-orbitron)" }}>{item.title}</h2>
              <p className="text-xs text-[#9ca3af] leading-relaxed">{item.body}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Disclaimer block */}
      <section className="py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <div
            className="p-8 rounded-2xl text-center"
            style={{ background: "rgba(239,68,68,0.05)", border: "1px solid rgba(239,68,68,0.2)" }}
          >
            <h2 className="font-bold text-xl mb-4 text-red-300" style={{ fontFamily: "var(--font-orbitron)" }}>
              Important Notice
            </h2>
            <p className="text-sm text-[#9ca3af] leading-relaxed max-w-2xl mx-auto">
              All products sold by PepLab Research are <strong className="text-white">for research use only</strong>.
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
