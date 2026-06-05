"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { useCartStore } from "@/store/cartStore";
import { ShieldCheck, Truck, AlertTriangle, Loader2 } from "lucide-react";
import Footer from "@/components/layout/Footer";

type FormState = {
  name: string; email: string; address: string; city: string; state: string; zip: string;
};

export default function CheckoutPage() {
  const { items, total, clearCart } = useCartStore();
  const [agreed, setAgreed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [orderId, setOrderId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState<FormState>({
    name: "", email: "", address: "", city: "", state: "", zip: "",
  });

  const set = (k: keyof FormState) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreed || loading) return;
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/.netlify/functions/submit-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customer: form,
          items: items.map((i) => ({
            name: i.product.name,
            slug: i.product.slug,
            quantity: i.quantity,
            price: i.product.price,
          })),
          total: total(),
          agreedToResearchTerms: true,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Order failed");

      clearCart();
      setOrderId(data.orderId);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (orderId) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass-card rounded-2xl p-12 max-w-md text-center space-y-5"
          style={{ border: "1px solid rgba(0,212,255,0.2)" }}
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", delay: 0.2 }}
            className="w-16 h-16 rounded-full bg-green-400/10 border border-green-400/30 flex items-center justify-center mx-auto"
          >
            <ShieldCheck className="w-8 h-8 text-green-400" />
          </motion.div>
          <h2 className="text-2xl font-bold" style={{ fontFamily: "var(--font-orbitron)" }}>
            Order Received
          </h2>
          <p className="text-[#9ca3af] text-sm leading-relaxed">
            Thank you for your research order. A confirmation has been sent to your email.
            Orders are dispatched within 48 hours via cold-chain shipping.
          </p>
          <div
            className="px-3 py-2 rounded-lg text-xs font-mono"
            style={{ background: "rgba(0,212,255,0.06)", border: "1px solid rgba(0,212,255,0.2)", color: "#00d4ff" }}
          >
            Order ID: {orderId}
          </div>
          <div className="research-badge px-3 py-2 rounded-lg text-xs">
            These products are for research use only.
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <>
      <section className="py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl font-black mb-8"
            style={{ fontFamily: "var(--font-orbitron)" }}
          >
            Checkout
          </motion.h1>

          {items.length === 0 ? (
            <div className="text-center py-20 text-[#6b7280]">
              <p>Your cart is empty.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Form */}
              <form onSubmit={handleSubmit} className="lg:col-span-2 space-y-6">
                <div className="glass-card rounded-2xl p-6 space-y-4">
                  <h2 className="font-bold text-xs tracking-widest text-[#6b7280]" style={{ fontFamily: "var(--font-orbitron)" }}>
                    CONTACT INFORMATION
                  </h2>
                  {(["name", "email"] as const).map((k) => (
                    <div key={k} className="space-y-1">
                      <label className="text-xs text-[#9ca3af] capitalize">{k === "name" ? "Full Name" : "Email Address"}</label>
                      <input
                        type={k === "email" ? "email" : "text"}
                        required
                        value={form[k]}
                        onChange={set(k)}
                        className="w-full bg-[rgba(255,255,255,0.04)] border border-[rgba(0,212,255,0.15)] rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[rgba(0,212,255,0.5)] transition-colors"
                      />
                    </div>
                  ))}
                </div>

                <div className="glass-card rounded-2xl p-6 space-y-4">
                  <h2 className="font-bold text-xs tracking-widest text-[#6b7280]" style={{ fontFamily: "var(--font-orbitron)" }}>
                    SHIPPING ADDRESS
                  </h2>
                  <div className="space-y-1">
                    <label className="text-xs text-[#9ca3af]">Street Address</label>
                    <input
                      type="text" required value={form.address} onChange={set("address")}
                      className="w-full bg-[rgba(255,255,255,0.04)] border border-[rgba(0,212,255,0.15)] rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[rgba(0,212,255,0.5)] transition-colors"
                    />
                  </div>
                  <div className="grid grid-cols-3 gap-3">
                    {(["city", "state", "zip"] as const).map((k) => (
                      <div key={k} className="space-y-1">
                        <label className="text-xs text-[#9ca3af] capitalize">{k === "zip" ? "ZIP Code" : k.charAt(0).toUpperCase() + k.slice(1)}</label>
                        <input
                          type="text" required value={form[k]} onChange={set(k)}
                          className="w-full bg-[rgba(255,255,255,0.04)] border border-[rgba(0,212,255,0.15)] rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[rgba(0,212,255,0.5)] transition-colors"
                        />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Research agreement */}
                <div className="p-4 rounded-xl space-y-3" style={{ background: "rgba(239,68,68,0.05)", border: "1px solid rgba(239,68,68,0.2)" }}>
                  <div className="flex items-start gap-2">
                    <AlertTriangle className="w-4 h-4 text-red-400 mt-0.5 shrink-0" />
                    <p className="text-xs text-[#9ca3af] leading-relaxed">
                      By placing this order I confirm I am a qualified researcher (or acting on behalf of a research institution),
                      am 18 years of age or older, and that these products will be used <strong className="text-white">exclusively
                      for in vitro or preclinical research</strong>. These products are NOT for human consumption,
                      therapeutic use, or veterinary application.
                    </p>
                  </div>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" checked={agreed} onChange={(e) => setAgreed(e.target.checked)} className="w-4 h-4 accent-[#00d4ff]" />
                    <span className="text-xs text-white font-medium">I agree to the research-only terms above</span>
                  </label>
                </div>

                {error && (
                  <div className="px-4 py-3 rounded-xl text-sm text-red-400" style={{ background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.3)" }}>
                    {error}
                  </div>
                )}

                <motion.button
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={!agreed || loading}
                  className="w-full py-4 rounded-xl font-bold text-sm transition-all disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  style={{
                    background: agreed && !loading ? "linear-gradient(135deg, #00d4ff 0%, #0066cc 100%)" : "rgba(255,255,255,0.1)",
                    color: agreed && !loading ? "#020408" : "#6b7280",
                    fontFamily: "var(--font-orbitron)",
                  }}
                >
                  {loading ? (
                    <><Loader2 className="w-4 h-4 animate-spin" /> PROCESSING…</>
                  ) : (
                    `PLACE RESEARCH ORDER — $${total().toFixed(2)}`
                  )}
                </motion.button>
              </form>

              {/* Order summary */}
              <div className="space-y-4">
                <div className="glass-card rounded-2xl p-6 space-y-4">
                  <h2 className="font-bold text-xs tracking-widest text-[#6b7280]" style={{ fontFamily: "var(--font-orbitron)" }}>ORDER SUMMARY</h2>
                  {items.map((item) => (
                    <div key={item.product.id} className="flex justify-between text-sm">
                      <div>
                        <div className="text-white font-medium">{item.product.shortName}</div>
                        <div className="text-xs text-[#6b7280]">× {item.quantity}</div>
                      </div>
                      <span style={{ color: item.product.color.primary }}>${(item.product.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                  <div className="border-t border-[rgba(255,255,255,0.06)] pt-3 flex justify-between text-sm font-bold">
                    <span>Total</span>
                    <span className="text-[#00d4ff]">${total().toFixed(2)}</span>
                  </div>
                </div>
                <div className="p-4 rounded-xl flex items-start gap-2 text-xs text-[#9ca3af]" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)" }}>
                  <Truck className="w-4 h-4 text-[#00d4ff] shrink-0 mt-0.5" />
                  <div>
                    <div className="text-white font-medium mb-1">Cold-Chain Shipping</div>
                    Dispatched within 48 hours. Temperature-controlled packaging included.
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
      <Footer />
    </>
  );
}
