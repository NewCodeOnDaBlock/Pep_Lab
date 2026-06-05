"use client";
import { motion, AnimatePresence } from "framer-motion";
import { X, ShoppingCart, Trash2, Plus, Minus, ArrowRight } from "lucide-react";
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
            className="fixed inset-0 z-50 bg-black/30 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={toggleCart}
          />

          {/* Drawer */}
          <motion.aside
            className="fixed right-0 top-0 h-full w-full max-w-md z-50 flex flex-col bg-white border-l border-[#e2e8f0] shadow-[−20px_0_60px_rgba(0,0,0,0.08)]"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 220 }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-[#e2e8f0]">
              <div className="flex items-center gap-2.5">
                <ShoppingCart className="w-5 h-5 text-[#2563eb]" />
                <span className="font-bold text-[#0f172a]" style={{ fontFamily: "var(--font-orbitron)", fontSize: 14 }}>
                  CART
                </span>
                <span className="text-xs text-[#94a3b8] font-medium">({items.length} {items.length === 1 ? "item" : "items"})</span>
              </div>
              <button
                onClick={toggleCart}
                className="p-2 rounded-lg border border-[#e2e8f0] hover:bg-[#f8f9fc] transition-colors"
                aria-label="Close cart"
              >
                <X className="w-4 h-4 text-[#475569]" />
              </button>
            </div>

            {/* Research notice */}
            <div className="mx-5 mt-4 px-4 py-2.5 rounded-lg bg-amber-50 border border-amber-200 text-xs text-amber-700">
              Research use only. Purchasing confirms research-only intent.
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto px-5 py-4 space-y-3">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-40 gap-3 text-[#94a3b8]">
                  <ShoppingCart className="w-10 h-10 opacity-30" />
                  <p className="text-sm">Your cart is empty</p>
                  <Link href="/products" onClick={toggleCart} className="text-[#2563eb] text-sm font-medium hover:underline">
                    Browse products
                  </Link>
                </div>
              ) : (
                items.map((item) => (
                  <motion.div
                    key={item.product.id}
                    layout
                    initial={{ opacity: 0, x: 16 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 16 }}
                    className="bg-[#f8f9fc] border border-[#e2e8f0] rounded-xl p-4 flex gap-3"
                  >
                    {/* Color chip */}
                    <div
                      className="w-12 h-12 rounded-lg shrink-0 flex items-center justify-center text-[10px] font-bold"
                      style={{ background: item.product.color.light, border: `1px solid ${item.product.color.border}`, color: item.product.color.primary, fontFamily: "var(--font-orbitron)" }}
                    >
                      {item.product.shortName.split("-")[0]}
                    </div>

                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-sm text-[#0f172a] truncate">{item.product.name}</p>
                      <p className="text-xs text-[#94a3b8]">{item.product.concentration}</p>
                      <div className="flex items-center justify-between mt-2.5">
                        <div className="flex items-center gap-1.5">
                          <button
                            onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                            className="w-6 h-6 rounded-lg border border-[#e2e8f0] bg-white flex items-center justify-center hover:border-[#2563eb] hover:text-[#2563eb] transition-colors"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="text-sm font-semibold w-5 text-center text-[#0f172a]">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                            className="w-6 h-6 rounded-lg border border-[#e2e8f0] bg-white flex items-center justify-center hover:border-[#2563eb] hover:text-[#2563eb] transition-colors"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                        <span className="text-sm font-bold text-[#0f172a]">
                          ${(item.product.price * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    </div>

                    <button
                      onClick={() => removeItem(item.product.id)}
                      className="self-start p-1.5 text-[#94a3b8] hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                      aria-label="Remove item"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </motion.div>
                ))
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="px-5 py-5 border-t border-[#e2e8f0] space-y-4 bg-[#f8f9fc]">
                <div className="flex justify-between text-sm text-[#475569]">
                  <span>Subtotal</span>
                  <span className="font-bold text-[#0f172a]">${total().toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-xs text-[#94a3b8]">
                  <span>Shipping</span>
                  <span className="text-emerald-600 font-medium">Calculated at checkout</span>
                </div>
                <Link
                  href="/checkout"
                  onClick={toggleCart}
                  className="flex items-center justify-center gap-2 w-full py-3.5 px-6 rounded-xl font-bold text-sm text-white bg-[#2563eb] hover:bg-[#1d4ed8] transition-colors shadow-[0_4px_14px_rgba(37,99,235,0.3)]"
                >
                  Proceed to Checkout
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
