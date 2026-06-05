"use client";
import { motion, AnimatePresence } from "framer-motion";
import { X, ShoppingCart, Trash2, Plus, Minus, ExternalLink } from "lucide-react";
import Link from "next/link";
import { useCartStore } from "@/store/cartStore";

export default function CartDrawer() {
  const { isOpen, toggleCart, items, removeItem, updateQuantity, total } = useCartStore();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={toggleCart}
          />

          {/* Drawer */}
          <motion.aside
            className="fixed right-0 top-0 h-full w-full max-w-md z-50 flex flex-col"
            style={{ background: "rgba(4, 12, 24, 0.97)", borderLeft: "1px solid rgba(0,212,255,0.15)" }}
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-[rgba(0,212,255,0.1)]">
              <div className="flex items-center gap-2">
                <ShoppingCart className="w-5 h-5 text-[#00d4ff]" />
                <span className="font-bold text-lg" style={{ fontFamily: "var(--font-orbitron)" }}>
                  CART
                </span>
                <span className="text-xs text-[#9ca3af]">({items.length} items)</span>
              </div>
              <button
                onClick={toggleCart}
                className="p-1.5 rounded-lg border border-[rgba(255,255,255,0.1)] hover:border-[rgba(0,212,255,0.3)] transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Research notice */}
            <div className="mx-4 mt-4 p-3 research-badge rounded-lg text-xs">
              Research use only. By proceeding you confirm items are for in vitro / preclinical research.
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-40 gap-3 text-[#6b7280]">
                  <ShoppingCart className="w-10 h-10 opacity-30" />
                  <p>Your cart is empty</p>
                  <Link
                    href="/products"
                    onClick={toggleCart}
                    className="text-[#00d4ff] text-sm hover:underline"
                  >
                    Browse products
                  </Link>
                </div>
              ) : (
                items.map((item) => (
                  <motion.div
                    key={item.product.id}
                    layout
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="glass-card rounded-xl p-4 flex gap-3"
                  >
                    {/* Color dot */}
                    <div
                      className="w-12 h-12 rounded-lg shrink-0 flex items-center justify-center text-xs font-bold"
                      style={{ background: `${item.product.color.primary}20`, border: `1px solid ${item.product.color.primary}40` }}
                    >
                      <span style={{ color: item.product.color.primary, fontFamily: "var(--font-orbitron)", fontSize: "10px" }}>
                        {item.product.shortName.split("-")[0]}
                      </span>
                    </div>

                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm truncate">{item.product.name}</p>
                      <p className="text-xs text-[#6b7280]">{item.product.concentration}</p>
                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                            className="w-6 h-6 rounded-md border border-[rgba(255,255,255,0.1)] flex items-center justify-center hover:border-[#00d4ff] hover:text-[#00d4ff] transition-colors"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="text-sm w-4 text-center">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                            className="w-6 h-6 rounded-md border border-[rgba(255,255,255,0.1)] flex items-center justify-center hover:border-[#00d4ff] hover:text-[#00d4ff] transition-colors"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                        <span className="text-sm font-bold" style={{ color: item.product.color.primary }}>
                          ${(item.product.price * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    </div>

                    <button
                      onClick={() => removeItem(item.product.id)}
                      className="self-start p-1 text-[#6b7280] hover:text-red-400 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </motion.div>
                ))
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="p-6 border-t border-[rgba(0,212,255,0.1)] space-y-4">
                <div className="flex justify-between text-sm text-[#9ca3af]">
                  <span>Subtotal</span>
                  <span className="text-white font-bold">${total().toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-xs text-[#6b7280]">
                  <span>Shipping</span>
                  <span className="text-green-400">Calculated at checkout</span>
                </div>
                <Link
                  href="/checkout"
                  onClick={toggleCart}
                  className="flex items-center justify-center gap-2 w-full py-3 px-6 rounded-xl font-bold text-sm btn-primary text-[#020408] relative z-10"
                  style={{ background: "linear-gradient(135deg, #00d4ff 0%, #0066cc 100%)" }}
                >
                  <span>Proceed to Checkout</span>
                  <ExternalLink className="w-4 h-4" />
                </Link>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
