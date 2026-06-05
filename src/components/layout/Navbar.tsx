"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingCart, Menu, X, Microscope } from "lucide-react";
import { useCartStore } from "@/store/cartStore";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/products", label: "Products" },
  { href: "/products/wolverine-stack", label: "Wolverine Stack" },
  { href: "/about", label: "Research" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { itemCount, toggleCart } = useCartStore();
  const count = itemCount();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
        scrolled
          ? "bg-[#020408]/90 backdrop-blur-xl border-b border-[rgba(0,212,255,0.1)]"
          : "bg-transparent"
      }`}
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <nav className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="relative w-8 h-8">
            <motion.div
              className="absolute inset-0 rounded-full bg-[#00d4ff]/20"
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <div className="relative flex items-center justify-center w-full h-full">
              <Microscope className="w-5 h-5 text-[#00d4ff]" />
            </div>
          </div>
          <span
            className="font-['var(--font-orbitron)'] text-lg font-bold tracking-wider text-glow-cyan"
            style={{ fontFamily: "var(--font-orbitron)" }}
          >
            PEP<span className="text-[#00d4ff]">LAB</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="relative text-sm text-[#9ca3af] hover:text-[#00d4ff] transition-colors duration-200 group"
            >
              {link.label}
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-[#00d4ff] group-hover:w-full transition-all duration-300" />
            </Link>
          ))}
        </div>

        {/* Cart + mobile */}
        <div className="flex items-center gap-4">
          <button
            onClick={toggleCart}
            className="relative p-2 rounded-lg border border-[rgba(0,212,255,0.2)] hover:border-[rgba(0,212,255,0.5)] hover:glow-cyan transition-all duration-200"
          >
            <ShoppingCart className="w-5 h-5 text-[#00d4ff]" />
            <AnimatePresence>
              {count > 0 && (
                <motion.span
                  key="badge"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-[#00d4ff] text-[#020408] text-[10px] font-bold flex items-center justify-center"
                >
                  {count}
                </motion.span>
              )}
            </AnimatePresence>
          </button>

          <button
            className="md:hidden p-2 text-[#9ca3af] hover:text-white"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-[#020408]/95 backdrop-blur-xl border-b border-[rgba(0,212,255,0.1)]"
          >
            <div className="px-4 py-4 flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-[#9ca3af] hover:text-[#00d4ff] transition-colors py-1"
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
