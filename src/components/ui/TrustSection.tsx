"use client";
import { motion } from "framer-motion";
import { Award, FlaskConical, Truck, Shield, Lock, RefreshCw } from "lucide-react";

const FEATURES = [
  { icon: Award,       title: "Third-party tested",     desc: "Every batch independently verified by HPLC and mass spectrometry. CoA shipped with every order." },
  { icon: FlaskConical, title: "Research grade purity",  desc: "≥99% minimum purity, lyophilized for maximum stability and shelf life." },
  { icon: Truck,       title: "Cold-chain shipping",    desc: "Dispatched with ice packs and insulated packaging from our partner warehouse." },
  { icon: Shield,      title: "Compliance first",       desc: "Sold for research use only. Orders require acknowledgment of research-only terms." },
  { icon: Lock,        title: "Secure checkout",        desc: "256-bit SSL encryption. Payment details are never stored on our servers." },
  { icon: RefreshCw,   title: "Satisfaction policy",    desc: "Order arrives damaged or incorrect? Contact us within 48 hours and we'll make it right." },
];

export default function TrustSection() {
  return (
    <section
      className="s-white"
      style={{
        paddingTop:    "clamp(72px, 8vw, 120px)",
        paddingBottom: "clamp(72px, 8vw, 120px)",
        borderTop: "1px solid var(--border)",
      }}
    >
      <div className="con-lg px-6">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="text-center mb-14"
        >
          <p className="t-label mb-4">Why PepLab</p>
          <h2 className="t-headline">Built for researchers.</h2>
        </motion.div>

        {/* Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
            gap: 16,
          }}
        >
          {FEATURES.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06, duration: 0.55 }}
              style={{
                background: "var(--bg2)",
                borderRadius: 18,
                padding: "28px 24px",
              }}
            >
              <div
                style={{
                  width: 40, height: 40, borderRadius: 10,
                  background: "#fff", marginBottom: 16,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  boxShadow: "0 1px 4px rgba(0,0,0,0.08)",
                }}
              >
                <f.icon style={{ width: 18, height: 18, color: "var(--t2)" }} />
              </div>
              <h3 style={{ fontSize: 17, fontWeight: 600, color: "var(--t1)", marginBottom: 6 }}>
                {f.title}
              </h3>
              <p style={{ fontSize: 14, color: "var(--t2)", lineHeight: 1.5 }}>{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
