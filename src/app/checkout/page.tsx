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
  const [form, setForm] = useState<FormState>({ name: "", email: "", address: "", city: "", state: "", zip: "" });

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
          items: items.map((i) => ({ name: i.product.name, slug: i.product.slug, quantity: i.quantity, price: i.product.price })),
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
      <div className="min-h-screen bg-[#f8f9fc] flex items-center justify-center px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white border border-[#e2e8f0] rounded-2xl p-12 max-w-md text-center space-y-5 shadow-[0_8px_32px_rgba(0,0,0,0.06)]"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", delay: 0.2 }}
            className="w-16 h-16 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-center mx-auto"
          >
            <ShieldCheck className="w-8 h-8 text-emerald-500" />
          </motion.div>
          <h2 className="text-2xl font-bold text-[#0f172a]" style={{ fontFamily: "var(--font-orbitron)" }}>
            Order Received
          </h2>
          <p className="text-sm text-[#64748b] leading-relaxed">
            Thank you for your research order. A confirmation has been sent to your email.
            Orders are dispatched within 48 hours via cold-chain shipping.
          </p>
          <div className="px-4 py-2.5 rounded-xl text-xs font-mono bg-[#f8f9fc] border border-[#e2e8f0] text-[#475569]">
            Order ID: <span className="text-[#2563eb] font-bold">{orderId}</span>
          </div>
          <div className="text-xs bg-amber-50 border border-amber-200 text-amber-700 px-4 py-2.5 rounded-lg">
            These products are for research use only.
          </div>
        </motion.div>
      </div>
    );
  }

  const inputCls = "w-full bg-white border border-[#e2e8f0] rounded-xl px-4 py-3 text-sm text-[#0f172a] placeholder:text-[#94a3b8] focus:outline-none focus:ring-2 focus:ring-[#2563eb]/20 focus:border-[#2563eb] transition-all";

  return (
    <>
      <section className="bg-[#f8f9fc] border-b border-[#e2e8f0] py-10 px-6">
        <div className="max-w-5xl mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl font-black text-[#0f172a]"
            style={{ fontFamily: "var(--font-orbitron)" }}
          >
            Checkout
          </motion.h1>
        </div>
      </section>

      <section className="bg-white py-12 px-6">
        <div className="max-w-5xl mx-auto">
          {items.length === 0 ? (
            <div className="text-center py-20 text-[#94a3b8]">
              <p>Your cart is empty.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Form */}
              <form onSubmit={handleSubmit} className="lg:col-span-2 space-y-6">
                {/* Contact */}
                <div className="bg-white border border-[#e2e8f0] rounded-2xl p-6 space-y-5">
                  <h2 className="font-bold text-xs tracking-widest text-[#94a3b8] uppercase" style={{ fontFamily: "var(--font-orbitron)" }}>
                    Contact Information
                  </h2>
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-[#475569]">Full Name</label>
                    <input type="text" required value={form.name} onChange={set("name")} placeholder="Dr. Jane Smith" className={inputCls} />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-[#475569]">Email Address</label>
                    <input type="email" required value={form.email} onChange={set("email")} placeholder="jane@research.edu" className={inputCls} />
                  </div>
                </div>

                {/* Shipping */}
                <div className="bg-white border border-[#e2e8f0] rounded-2xl p-6 space-y-5">
                  <h2 className="font-bold text-xs tracking-widest text-[#94a3b8] uppercase" style={{ fontFamily: "var(--font-orbitron)" }}>
                    Shipping Address
                  </h2>
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-[#475569]">Street Address</label>
                    <input type="text" required value={form.address} onChange={set("address")} placeholder="123 Research Blvd" className={inputCls} />
                  </div>
                  <div className="grid grid-cols-3 gap-3">
                    {(["city", "state", "zip"] as const).map((k) => (
                      <div key={k} className="space-y-1.5">
                        <label className="text-xs font-semibold text-[#475569] capitalize">
                          {k === "zip" ? "ZIP Code" : k === "state" ? "State" : "City"}
                        </label>
                        <input type="text" required value={form[k]} onChange={set(k)} className={inputCls} />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Research agreement */}
                <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6 space-y-4">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="w-4 h-4 text-amber-600 mt-0.5 shrink-0" />
                    <p className="text-xs text-amber-800 leading-relaxed">
                      By placing this order I confirm I am a qualified researcher (or acting on behalf of a research institution),
                      am 18 years of age or older, and that these products will be used <strong>exclusively for in vitro or
                      preclinical research</strong>. These products are NOT for human consumption, therapeutic use, or
                      veterinary application.
                    </p>
                  </div>
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={agreed}
                      onChange={(e) => setAgreed(e.target.checked)}
                      className="w-4 h-4 accent-[#2563eb] rounded"
                    />
                    <span className="text-xs font-semibold text-[#0f172a]">
                      I agree to the research-only terms above
                    </span>
                  </label>
                </div>

                {error && (
                  <div className="px-4 py-3 rounded-xl text-sm text-red-700 bg-red-50 border border-red-200">
                    {error}
                  </div>
                )}

                <motion.button
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={!agreed || loading}
                  className="w-full py-4 rounded-xl font-bold text-sm text-white transition-all disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-[0_4px_14px_rgba(37,99,235,0.3)]"
                  style={{
                    background: agreed && !loading ? "linear-gradient(135deg, #2563eb, #1d4ed8)" : "#94a3b8",
                    fontFamily: "var(--font-orbitron)",
                    letterSpacing: "0.05em",
                  }}
                >
                  {loading
                    ? <><Loader2 className="w-4 h-4 animate-spin" /> PROCESSING…</>
                    : `PLACE RESEARCH ORDER — $${total().toFixed(2)}`
                  }
                </motion.button>
              </form>

              {/* Order summary */}
              <div className="space-y-4">
                <div className="bg-white border border-[#e2e8f0] rounded-2xl p-6 space-y-4">
                  <h2 className="font-bold text-xs tracking-widest text-[#94a3b8] uppercase" style={{ fontFamily: "var(--font-orbitron)" }}>
                    Order Summary
                  </h2>
                  <div className="space-y-3">
                    {items.map((item) => (
                      <div key={item.product.id} className="flex justify-between items-start gap-2">
                        <div>
                          <p className="font-semibold text-sm text-[#0f172a]">{item.product.shortName}</p>
                          <p className="text-xs text-[#94a3b8]">× {item.quantity}</p>
                        </div>
                        <span className="font-bold text-sm text-[#0f172a]">
                          ${(item.product.price * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    ))}
                  </div>
                  <div className="border-t border-[#e2e8f0] pt-4 flex justify-between font-bold text-[#0f172a]">
                    <span>Total</span>
                    <span className="text-[#2563eb]">${total().toFixed(2)}</span>
                  </div>
                </div>

                <div className="bg-[#f8f9fc] border border-[#e2e8f0] rounded-2xl p-5 flex items-start gap-3">
                  <Truck className="w-4 h-4 text-[#2563eb] shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-semibold text-[#0f172a] mb-1">Cold-Chain Shipping</p>
                    <p className="text-xs text-[#64748b] leading-relaxed">
                      Dispatched within 48 hours. Temperature-controlled packaging at no extra cost.
                    </p>
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
