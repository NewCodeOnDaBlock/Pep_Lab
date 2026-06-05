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
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-40 bg-white transition-all duration-300 ${
        scrolled ? "border-b border-[#e2e8f0] shadow-[0_1px_8px_rgba(0,0,0,0.06)]" : "border-b border-transparent"
      }`}
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <nav className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 rounded-lg bg-[#2563eb] flex items-center justify-center">
            <Microscope className="w-4.5 h-4.5 text-white" style={{ width: 18, height: 18 }} />
          </div>
          <span
            className="text-[17px] font-bold tracking-tight text-[#0f172a]"
            style={{ fontFamily: "var(--font-orbitron)" }}
          >
            PEP<span className="text-[#2563eb]">LAB</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="relative text-sm font-medium text-[#475569] hover:text-[#0f172a] transition-colors duration-150 group"
            >
              {link.label}
              <span className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-[#2563eb] group-hover:w-full transition-all duration-200 rounded-full" />
            </Link>
          ))}
        </div>

        {/* Cart + mobile toggle */}
        <div className="flex items-center gap-3">
          <button
            onClick={toggleCart}
            className="relative p-2.5 rounded-xl border border-[#e2e8f0] hover:border-[#2563eb] hover:bg-[#eff6ff] transition-all duration-200"
            aria-label="Open cart"
          >
            <ShoppingCart className="w-4.5 h-4.5 text-[#475569]" style={{ width: 18, height: 18 }} />
            <AnimatePresence>
              {count > 0 && (
                <motion.span
                  key="badge"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  className="absolute -top-1.5 -right-1.5 w-4.5 h-4.5 rounded-full bg-[#2563eb] text-white text-[10px] font-bold flex items-center justify-center"
                  style={{ width: 18, height: 18 }}
                >
                  {count}
                </motion.span>
              )}
            </AnimatePresence>
          </button>

          <button
            className="md:hidden p-2 text-[#475569] hover:text-[#0f172a]"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Menu"
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
            className="md:hidden bg-white border-b border-[#e2e8f0]"
          >
            <div className="px-6 py-4 flex flex-col gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="px-3 py-2.5 rounded-lg text-sm font-medium text-[#475569] hover:text-[#0f172a] hover:bg-[#f8f9fc] transition-colors"
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
