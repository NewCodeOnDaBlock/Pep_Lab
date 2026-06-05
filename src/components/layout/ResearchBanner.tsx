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
          <div className="bg-amber-50 border-b border-amber-200 flex items-center justify-center gap-2.5 px-10 py-2.5 text-xs font-medium text-amber-800 text-center">
            <AlertTriangle className="w-3.5 h-3.5 shrink-0 text-amber-600" />
            <span>
              FOR RESEARCH USE ONLY — Not for human consumption, veterinary use, or therapeutic application. Must be 18+.
            </span>
            <button
              onClick={() => setVisible(false)}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-1 rounded text-amber-600 hover:text-amber-900 hover:bg-amber-100 transition-colors"
              aria-label="Dismiss"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
