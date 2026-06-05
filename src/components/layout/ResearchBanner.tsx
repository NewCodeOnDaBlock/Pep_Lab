"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AlertTriangle, X } from "lucide-react";

export default function ResearchBanner() {
  const [visible, setVisible] = useState(true);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          className="relative z-50 overflow-hidden"
        >
          <div className="research-badge flex items-center justify-center gap-2 px-4 py-2 text-xs font-medium text-center">
            <AlertTriangle className="w-3 h-3 shrink-0" />
            <span>
              FOR RESEARCH USE ONLY — Not for human consumption, veterinary use, or therapeutic application. Must be 18+ to purchase.
            </span>
            <button
              onClick={() => setVisible(false)}
              className="absolute right-3 opacity-60 hover:opacity-100 transition-opacity"
            >
              <X className="w-3 h-3" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
