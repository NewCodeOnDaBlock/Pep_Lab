"use client";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";

const PeptideGraph = dynamic(() => import("@/components/3d/PeptideGraph"), { ssr: false });

const CHIPS = [
  "Angiogenesis", "Tissue Repair", "Actin Regulation",
  "Cell Migration", "Neuropeptide", "Wound Healing",
  "GI Research", "Cardiac Models",
];

export default function BenefitsSection() {
  return (
    <section
      className="s-dark"
      style={{
        paddingTop:  "clamp(80px, 9vw, 140px)",
        paddingBottom: "clamp(80px, 9vw, 140px)",
        overflow: "hidden",
      }}
    >
      <div className="con-md px-6">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65 }}
          className="text-center mb-14"
        >
          <p className="t-label mb-5" style={{ color: "rgba(235,235,245,0.4)" }}>
            Research overview
          </p>
          <h2
            className="t-headline"
            style={{ color: "#f5f5f7" }}
          >
            The science.
          </h2>
          <p
            className="t-subhead mt-5 con-sm"
            style={{ color: "rgba(235,235,245,0.5)", margin: "20px auto 0" }}
          >
            Hover each node to explore the research areas studied in conjunction
            with BPC-157 and TB-500 in preclinical models.
          </p>
        </motion.div>

        {/* WebGL canvas */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.9 }}
          style={{
            borderRadius: 20,
            overflow: "hidden",
            border: "1px solid rgba(255,255,255,0.06)",
            background: "rgba(255,255,255,0.02)",
          }}
        >
          <PeptideGraph height={560} />
        </motion.div>

        {/* Chips */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.35 }}
          className="flex flex-wrap gap-2 justify-center mt-8"
        >
          {CHIPS.map((c) => (
            <span
              key={c}
              style={{
                padding: "6px 14px",
                borderRadius: 980,
                fontSize: 12,
                fontWeight: 400,
                color: "rgba(235,235,245,0.4)",
                border: "1px solid rgba(235,235,245,0.1)",
              }}
            >
              {c}
            </span>
          ))}
        </motion.div>

        <p
          className="text-center mt-8"
          style={{ fontSize: 11, color: "rgba(235,235,245,0.22)" }}
        >
          Based on published in vitro and preclinical research. Products are for research use only.
        </p>
      </div>
    </section>
  );
}
