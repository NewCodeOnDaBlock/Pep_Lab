"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Clock } from "lucide-react";
import type { Guide } from "@/data/guides";

interface CategoryPalette {
  primary: string;
  secondary: string;
  light: string;
  border: string;
}

const CATEGORY_COLORS: Record<string, CategoryPalette> = {
  Comparisons: { primary: "#2563eb", secondary: "#1d4ed8", light: "#eff6ff", border: "#bfdbfe" },
  "Lab Handling": { primary: "#059669", secondary: "#047857", light: "#ecfdf5", border: "#a7f3d0" },
  "Quality & Testing": { primary: "#7c3aed", secondary: "#6d28d9", light: "#f5f3ff", border: "#ddd6fe" },
  "Peptide Profiles": { primary: "#d97706", secondary: "#b45309", light: "#fffbeb", border: "#fde68a" },
};
const DEFAULT_PALETTE: CategoryPalette = CATEGORY_COLORS.Comparisons;

export function guideColor(category: string): CategoryPalette {
  return CATEGORY_COLORS[category] ?? DEFAULT_PALETTE;
}

export default function GuideCard({ guide, index = 0 }: { guide: Guide; index?: number }) {
  const color = guideColor(guide.category);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="h-full"
    >
      <Link href={`/guides/${guide.slug}`} className="block h-full group">
        <div className="bg-white border border-[#e2e8f0] rounded-2xl overflow-hidden h-full flex flex-col transition-all duration-300 hover:shadow-[0_16px_48px_rgba(0,0,0,0.12)] hover:-translate-y-1.5 hover:border-transparent cursor-pointer">
          <div className="h-1.5 w-full shrink-0" style={{ background: `linear-gradient(90deg, ${color.primary}, ${color.secondary})` }} />

          <div className="p-7 md:p-8 flex flex-col flex-1 gap-4">
            <div className="flex items-center justify-between gap-3">
              <span
                className="inline-block px-3 py-1.5 rounded-lg text-[10px] font-bold tracking-widest"
                style={{ background: color.light, color: color.primary, border: `1px solid ${color.border}`, fontFamily: "var(--font-orbitron)" }}
              >
                {guide.heroEyebrow}
              </span>
              <span className="inline-flex items-center gap-1.5 text-xs text-[#94a3b8] font-medium shrink-0">
                <Clock className="w-3.5 h-3.5" />
                {guide.readingTime}
              </span>
            </div>

            <h3 className="font-bold text-xl text-[#0f172a] leading-snug" style={{ fontFamily: "var(--font-orbitron)" }}>
              {guide.title}
            </h3>

            <p className="text-sm text-[#64748b] leading-relaxed line-clamp-3">{guide.description}</p>

            <div className="flex-1" />

            <div className="border-t border-[#f1f4f9] pt-4 flex items-center justify-between">
              <span className="text-xs text-[#94a3b8] font-medium">{guide.category}</span>
              <span
                className="inline-flex items-center gap-1.5 text-sm font-bold transition-transform duration-200 group-hover:translate-x-1"
                style={{ color: color.primary }}
              >
                Read the guide <ArrowRight className="w-4 h-4" />
              </span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
