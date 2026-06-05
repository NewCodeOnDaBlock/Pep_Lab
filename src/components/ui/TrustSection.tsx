"use client";
import { motion } from "framer-motion";
import { Shield, FlaskConical, Truck, Lock, Award, RefreshCw } from "lucide-react";

const features = [
  {
    icon: Award,
    title: "Third-Party Tested",
    desc: "Every batch is verified by independent HPLC/MS analysis. Certificate of Analysis shipped with every order.",
    color: "#00d4ff",
  },
  {
    icon: FlaskConical,
    title: "Research Grade Purity",
    desc: "≥99% purity guaranteed. Lyophilized format for maximum shelf stability.",
    color: "#a855f7",
  },
  {
    icon: Truck,
    title: "Cold-Chain Shipping",
    desc: "Dispatched with ice packs. Temperature-controlled packaging from our local partner warehouse.",
    color: "#f59e0b",
  },
  {
    icon: Shield,
    title: "Compliance First",
    desc: "Sold for research use only. All orders require acknowledgment of research-only terms.",
    color: "#10b981",
  },
  {
    icon: Lock,
    title: "Secure Checkout",
    desc: "256-bit SSL encryption. We never store payment details.",
    color: "#6366f1",
  },
  {
    icon: RefreshCw,
    title: "Satisfaction Policy",
    desc: "If your order arrives damaged or compromised, we'll make it right. Research integrity matters.",
    color: "#ec4899",
  },
];

export default function TrustSection() {
  return (
    <section className="py-24 px-4 border-t border-[rgba(0,212,255,0.06)]">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div
            className="text-xs tracking-[0.3em] text-[#00d4ff] mb-3"
            style={{ fontFamily: "var(--font-orbitron)" }}
          >
            WHY PEPLAB
          </div>
          <h2
            className="text-3xl md:text-4xl font-black"
            style={{ fontFamily: "var(--font-orbitron)" }}
          >
            Built for <span className="text-[#00d4ff]">Researchers</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              whileHover={{ y: -4 }}
              className="glass-card rounded-2xl p-6 space-y-3"
              style={{ border: `1px solid ${f.color}15` }}
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{ background: `${f.color}15`, border: `1px solid ${f.color}30` }}
              >
                <f.icon className="w-5 h-5" style={{ color: f.color }} />
              </div>
              <h3 className="font-bold text-sm" style={{ fontFamily: "var(--font-orbitron)" }}>
                {f.title}
              </h3>
              <p className="text-xs text-[#6b7280] leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
