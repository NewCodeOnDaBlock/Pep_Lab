"use client";
import { motion } from "framer-motion";
import { Shield, FlaskConical, Truck, Lock, Award, RefreshCw } from "lucide-react";

const features = [
  { icon: Award, title: "Third-Party Tested", desc: "Every batch is verified by independent HPLC/MS analysis. Certificate of Analysis shipped with every order.", color: "#2563eb", light: "#eff6ff" },
  { icon: FlaskConical, title: "Research Grade Purity", desc: "≥99% purity guaranteed. Lyophilized powder format for maximum shelf stability.", color: "#7c3aed", light: "#f5f3ff" },
  { icon: Truck, title: "Cold-Chain Shipping", desc: "Dispatched with ice packs and insulated packaging from our local partner warehouse.", color: "#d97706", light: "#fffbeb" },
  { icon: Shield, title: "Compliance First", desc: "Sold for research use only. All orders require acknowledgment of research-only terms at checkout.", color: "#059669", light: "#ecfdf5" },
  { icon: Lock, title: "Secure Checkout", desc: "256-bit SSL encryption. We never store payment details on our servers.", color: "#6366f1", light: "#eef2ff" },
  { icon: RefreshCw, title: "Satisfaction Policy", desc: "If your order arrives damaged or incorrect, contact us within 48 hours — we will make it right.", color: "#ec4899", light: "#fdf2f8" },
];

export default function TrustSection() {
  return (
    <section className="bg-white py-24 px-6 border-t border-[#e2e8f0]">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <p className="text-xs font-semibold tracking-[0.3em] text-[#2563eb] uppercase mb-3">Why PepLab</p>
          <h2 className="text-4xl md:text-5xl font-black text-[#0f172a]" style={{ fontFamily: "var(--font-orbitron)" }}>
            Built for <span className="text-[#2563eb]">Researchers</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07 }}
              className="bg-white border border-[#e2e8f0] rounded-2xl p-7 space-y-4 hover:shadow-[0_8px_24px_rgba(0,0,0,0.07)] hover:-translate-y-1 transition-all duration-200"
            >
              <div
                className="w-11 h-11 rounded-xl flex items-center justify-center"
                style={{ background: f.light }}
              >
                <f.icon className="w-5 h-5" style={{ color: f.color }} />
              </div>
              <h3 className="font-bold text-[#0f172a] text-sm" style={{ fontFamily: "var(--font-orbitron)" }}>
                {f.title}
              </h3>
              <p className="text-sm text-[#64748b] leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
