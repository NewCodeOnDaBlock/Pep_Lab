"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ShoppingBag, Menu, X } from "lucide-react";
import { useCartStore } from "@/store/cartStore";

const NAV_LINKS = [
  { href: "/products",                label: "Products"        },
  { href: "/guides",                  label: "Research"        },
  { href: "/products/wolverine-stack", label: "The Stack"      },
  { href: "/about",                   label: "About"           },
];

export default function Navbar() {
  const [scrolled,    setScrolled]    = useState(false);
  const [mobileOpen,  setMobileOpen]  = useState(false);
  const { itemCount, toggleCart }     = useCartStore();
  const count = itemCount();

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 1);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-50"
        style={{
          height: 44,
          background: scrolled ? "rgba(255,255,255,0.72)" : "rgba(255,255,255,0.72)",
          backdropFilter: "saturate(180%) blur(20px)",
          WebkitBackdropFilter: "saturate(180%) blur(20px)",
          borderBottom: scrolled ? "1px solid rgba(0,0,0,0.1)" : "1px solid transparent",
          transition: "border-color 0.3s ease",
        }}
      >
        <nav className="con-lg px-6 h-full flex items-center justify-between">

          {/* Logo */}
          <Link
            href="/"
            style={{ color: "var(--t1)", textDecoration: "none", fontSize: 17, fontWeight: 500, letterSpacing: "-0.01em" }}
          >
            PepLab
          </Link>

          {/* Desktop links — centered */}
          <div className="hidden md:flex items-center gap-8 absolute left-1/2 -translate-x-1/2">
            {NAV_LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                style={{
                  color: "rgba(29,29,31,0.78)",
                  textDecoration: "none",
                  fontSize: 12,
                  fontWeight: 400,
                  transition: "color 0.15s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "var(--t1)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(29,29,31,0.78)")}
              >
                {l.label}
              </Link>
            ))}
          </div>

          {/* Right: cart + hamburger */}
          <div className="flex items-center gap-3">
            <button
              onClick={toggleCart}
              className="relative flex items-center justify-center"
              style={{ background: "none", border: "none", cursor: "pointer", padding: "4px", color: "var(--t1)" }}
              aria-label="Open cart"
            >
              <ShoppingBag style={{ width: 17, height: 17 }} />
              <AnimatePresence>
                {count > 0 && (
                  <motion.span
                    key="b"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    style={{
                      position: "absolute", top: -3, right: -3,
                      width: 16, height: 16, borderRadius: "50%",
                      background: "var(--blue)", color: "#fff",
                      fontSize: 10, fontWeight: 600,
                      display: "flex", alignItems: "center", justifyContent: "center",
                    }}
                  >
                    {count}
                  </motion.span>
                )}
              </AnimatePresence>
            </button>

            <button
              className="md:hidden"
              style={{ background: "none", border: "none", cursor: "pointer", color: "var(--t1)", padding: 4 }}
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Menu"
            >
              {mobileOpen ? <X style={{ width: 18, height: 18 }} /> : <Menu style={{ width: 18, height: 18 }} />}
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18 }}
            style={{
              position: "fixed", top: 44, left: 0, right: 0, zIndex: 49,
              background: "rgba(255,255,255,0.96)",
              backdropFilter: "saturate(180%) blur(20px)",
              WebkitBackdropFilter: "saturate(180%) blur(20px)",
              borderBottom: "1px solid rgba(0,0,0,0.1)",
            }}
          >
            <div className="con-lg px-6 py-5 flex flex-col gap-0">
              {NAV_LINKS.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  onClick={() => setMobileOpen(false)}
                  style={{
                    color: "var(--t1)", textDecoration: "none",
                    fontSize: 17, fontWeight: 400, padding: "12px 0",
                    borderBottom: "1px solid rgba(0,0,0,0.06)",
                    display: "block",
                  }}
                >
                  {l.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
