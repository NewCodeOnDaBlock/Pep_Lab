"use client";
import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import {
  ArrowLeft, RefreshCw, Trash2, ChevronDown, ChevronUp,
  Eye, EyeOff, Lock, Package, TrendingUp, ShoppingBag,
  XCircle, Clock, Truck, Check,
} from "lucide-react";

/* ─── Types ──────────────────────────────────────────────── */
type OrderStatus = "pending" | "processing" | "shipped" | "delivered" | "cancelled";

interface OrderItem { name: string; slug: string; quantity: number; price: number; }
interface Order {
  id:       string;
  date:     string;
  status:   OrderStatus;
  total:    number;
  customer: { name: string; email: string; address: string; city: string; state: string; zip: string; };
  items:    OrderItem[];
}

/* ─── Status config ──────────────────────────────────────── */
const STATUS: Record<OrderStatus, { label: string; bg: string; text: string; Icon: LucideIcon }> = {
  pending:    { label: "Pending",    bg: "rgba(255,149,0,0.1)",   text: "#c75000", Icon: Clock },
  processing: { label: "Processing", bg: "rgba(0,113,227,0.08)",  text: "#0071e3", Icon: RefreshCw },
  shipped:    { label: "Shipped",    bg: "rgba(175,82,222,0.08)", text: "#8944ab", Icon: Truck },
  delivered:  { label: "Delivered",  bg: "rgba(52,199,89,0.1)",   text: "#1a7d3a", Icon: Check },
  cancelled:  { label: "Cancelled",  bg: "rgba(255,59,48,0.08)",  text: "#d70015", Icon: XCircle },
};
const STATUS_CYCLE: OrderStatus[] = ["pending", "processing", "shipped", "delivered"];

function StatusBadge({ status, onClick }: { status: OrderStatus; onClick?: () => void }) {
  const cfg = STATUS[status];
  return (
    <button
      onClick={onClick}
      title={onClick ? "Click to advance status" : undefined}
      style={{
        display: "inline-flex", alignItems: "center", gap: 5,
        padding: "4px 10px", borderRadius: 980,
        background: cfg.bg, color: cfg.text,
        fontSize: 12, fontWeight: 500, border: "none",
        cursor: onClick ? "pointer" : "default",
        whiteSpace: "nowrap",
      }}
    >
      <cfg.Icon size={11} />
      {cfg.label}
    </button>
  );
}

/* ─── Password gate ──────────────────────────────────────── */
function PasswordGate({ onAuth }: { onAuth: () => void }) {
  const [pw, setPw]         = useState("");
  const [show, setShow]     = useState(false);
  const [error, setError]   = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true); setError("");
    try {
      const res = await fetch("/api/admin/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password: pw }),
      });
      if (res.ok) { sessionStorage.setItem("peplab-admin-auth", "1"); onAuth(); }
      else setError("Incorrect password.");
    } catch { setError("Network error — try again."); }
    finally { setLoading(false); }
  };

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg2)", display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
      <motion.div
        initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
        style={{
          background: "var(--bg)", borderRadius: 20, padding: 40, width: "100%", maxWidth: 360,
          boxShadow: "0 8px 40px rgba(0,0,0,0.08)", border: "1px solid var(--border)",
        }}
      >
        <div style={{ textAlign: "center", marginBottom: 28 }}>
          <div style={{ width: 48, height: 48, background: "var(--t1)", borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px" }}>
            <Lock style={{ width: 20, height: 20, color: "#fff" }} />
          </div>
          <h1 style={{ fontSize: 21, fontWeight: 600, color: "var(--t1)", marginBottom: 4 }}>Orders</h1>
          <p style={{ fontSize: 14, color: "var(--t2)" }}>Enter admin password to continue</p>
        </div>
        <form onSubmit={submit}>
          <div style={{ position: "relative", marginBottom: 12 }}>
            <input
              type={show ? "text" : "password"}
              value={pw}
              onChange={(e) => setPw(e.target.value)}
              placeholder="Admin password"
              autoFocus
              style={{
                width: "100%", padding: "12px 44px 12px 14px", borderRadius: 12,
                border: "1.5px solid var(--border)", fontSize: 15, color: "var(--t1)",
                background: "var(--bg)", outline: "none", boxSizing: "border-box",
              }}
            />
            <button type="button" onClick={() => setShow(!show)} style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: "var(--t3)" }}>
              {show ? <EyeOff style={{ width: 16, height: 16 }} /> : <Eye style={{ width: 16, height: 16 }} />}
            </button>
          </div>
          {error && <p style={{ fontSize: 13, color: "#d70015", marginBottom: 10 }}>{error}</p>}
          <button
            type="submit"
            disabled={loading || !pw}
            style={{
              width: "100%", padding: "13px", borderRadius: 12,
              background: "var(--t1)", color: "#fff", fontSize: 15, fontWeight: 500,
              border: "none", cursor: loading || !pw ? "not-allowed" : "pointer",
              opacity: loading || !pw ? 0.5 : 1,
            }}
          >
            {loading ? "Checking…" : "View Orders"}
          </button>
        </form>
      </motion.div>
    </div>
  );
}

/* ─── Order row ──────────────────────────────────────────── */
function OrderRow({ order, onStatusChange, onDelete }: {
  order: Order;
  onStatusChange: (id: string, status: OrderStatus) => void;
  onDelete: (id: string) => void;
}) {
  const [expanded, setExpanded] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const advanceStatus = () => {
    const cur = STATUS_CYCLE.indexOf(order.status);
    if (cur === -1 || cur === STATUS_CYCLE.length - 1) return;
    onStatusChange(order.id, STATUS_CYCLE[cur + 1]);
  };

  const handleDelete = async () => {
    if (!confirm(`Delete order ${order.id}? This cannot be undone.`)) return;
    setDeleting(true);
    onDelete(order.id);
  };

  const date = new Date(order.date);
  const dateStr = date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
  const timeStr = date.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" });

  return (
    <>
      <tr
        onClick={() => setExpanded(!expanded)}
        style={{
          cursor: "pointer",
          borderBottom: "1px solid var(--border)",
          transition: "background 0.12s",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.background = "var(--bg2)")}
        onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
      >
        <td style={{ padding: "14px 16px" }}>
          <p style={{ fontSize: 13, fontWeight: 500, color: "var(--t1)", fontFamily: "monospace" }}>{order.id}</p>
          <p style={{ fontSize: 12, color: "var(--t3)", marginTop: 2 }}>{dateStr} · {timeStr}</p>
        </td>
        <td style={{ padding: "14px 16px" }}>
          <p style={{ fontSize: 14, fontWeight: 500, color: "var(--t1)" }}>{order.customer.name}</p>
          <p style={{ fontSize: 12, color: "var(--t3)" }}>{order.customer.email}</p>
        </td>
        <td style={{ padding: "14px 16px", fontSize: 13, color: "var(--t2)" }}>
          {order.items.map((i) => `${i.name} ×${i.quantity}`).join(", ")}
        </td>
        <td style={{ padding: "14px 16px", fontSize: 15, fontWeight: 600, color: "var(--t1)", textAlign: "right" }}>
          ${order.total.toFixed(2)}
        </td>
        <td style={{ padding: "14px 16px", textAlign: "center" }}>
          <StatusBadge status={order.status} onClick={(e?: React.MouseEvent) => { e?.stopPropagation(); advanceStatus(); }} />
        </td>
        <td style={{ padding: "14px 16px", textAlign: "right" }}>
          <div style={{ display: "flex", gap: 8, justifyContent: "flex-end", alignItems: "center" }}>
            <button
              onClick={(e) => { e.stopPropagation(); handleDelete(); }}
              disabled={deleting}
              title="Delete order"
              style={{ background: "none", border: "none", cursor: "pointer", padding: 4, color: "var(--t3)", opacity: deleting ? 0.4 : 1 }}
            >
              <Trash2 style={{ width: 15, height: 15 }} />
            </button>
            {expanded
              ? <ChevronUp  style={{ width: 15, height: 15, color: "var(--t3)" }} />
              : <ChevronDown style={{ width: 15, height: 15, color: "var(--t3)" }} />
            }
          </div>
        </td>
      </tr>

      {expanded && (
        <tr>
          <td colSpan={6} style={{ padding: 0, borderBottom: "1px solid var(--border)" }}>
            <motion.div
              initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.2 }}
              style={{ padding: "20px 24px", background: "var(--bg2)" }}
            >
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
                {/* Shipping address */}
                <div>
                  <p style={{ fontSize: 11, fontWeight: 600, color: "var(--t3)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 8 }}>Shipping Address</p>
                  <p style={{ fontSize: 14, color: "var(--t1)", lineHeight: 1.7 }}>
                    {order.customer.name}<br />
                    {order.customer.address}<br />
                    {order.customer.city}, {order.customer.state} {order.customer.zip}
                  </p>
                </div>
                {/* Items */}
                <div>
                  <p style={{ fontSize: 11, fontWeight: 600, color: "var(--t3)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 8 }}>Items</p>
                  {order.items.map((item, i) => (
                    <div key={i} style={{ display: "flex", justifyContent: "space-between", fontSize: 14, color: "var(--t1)", paddingBottom: 4 }}>
                      <span>{item.name} ×{item.quantity}</span>
                      <span style={{ fontWeight: 500 }}>${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: 14, fontWeight: 600, color: "var(--t1)", paddingTop: 8, borderTop: "1px solid var(--border)", marginTop: 4 }}>
                    <span>Total</span>
                    <span>${order.total.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              {/* Status update buttons */}
              <div style={{ marginTop: 16, display: "flex", gap: 8, flexWrap: "wrap" }}>
                <p style={{ fontSize: 12, color: "var(--t3)", width: "100%", marginBottom: 4 }}>Update status:</p>
                {(["pending","processing","shipped","delivered","cancelled"] as OrderStatus[]).map((s) => (
                  <button
                    key={s}
                    onClick={() => onStatusChange(order.id, s)}
                    style={{
                      padding: "6px 14px", borderRadius: 980, fontSize: 12, fontWeight: 500,
                      border: "1.5px solid",
                      borderColor: order.status === s ? STATUS[s].text : "var(--border)",
                      background: order.status === s ? STATUS[s].bg : "transparent",
                      color: order.status === s ? STATUS[s].text : "var(--t2)",
                      cursor: "pointer",
                    }}
                  >
                    {STATUS[s].label}
                  </button>
                ))}
              </div>
            </motion.div>
          </td>
        </tr>
      )}
    </>
  );
}

/* ─── Main dashboard ─────────────────────────────────────── */
export default function OrdersPage() {
  const [authed,   setAuthed]   = useState(false);
  const [orders,   setOrders]   = useState<Order[]>([]);
  const [loading,  setLoading]  = useState(false);
  const [warning,  setWarning]  = useState("");

  // Check existing session on mount
  useEffect(() => {
    if (sessionStorage.getItem("peplab-admin-auth") === "1") setAuthed(true);
  }, []);

  const fetchOrders = useCallback(async () => {
    setLoading(true);
    try {
      const res  = await fetch("/api/admin/orders");
      if (res.status === 401) { setAuthed(false); return; }
      const data = await res.json();
      setOrders(data.orders ?? []);
      if (data.warning) setWarning(data.warning);
    } catch { setWarning("Could not load orders."); }
    finally { setLoading(false); }
  }, []);

  useEffect(() => { if (authed) fetchOrders(); }, [authed, fetchOrders]);

  const handleStatusChange = async (orderId: string, status: OrderStatus) => {
    // Optimistic update
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status } : o))
    );
    await fetch("/api/admin/orders", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ orderId, status }),
    });
  };

  const handleDelete = async (orderId: string) => {
    setOrders((prev) => prev.filter((o) => o.id !== orderId));
    await fetch("/api/admin/orders", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ orderId }),
    });
  };

  if (!authed) return <PasswordGate onAuth={() => setAuthed(true)} />;

  /* ─── Stats ─────────────────────────────────────────── */
  const today     = new Date().toDateString();
  const todayCount = orders.filter((o) => new Date(o.date).toDateString() === today).length;
  const revenue   = orders.filter((o) => o.status !== "cancelled").reduce((s, o) => s + o.total, 0);
  const pendingN  = orders.filter((o) => o.status === "pending").length;

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg2)" }}>
      {/* Top bar */}
      <div style={{ background: "var(--bg)", borderBottom: "1px solid var(--border)", padding: "0 24px", height: 56, display: "flex", alignItems: "center", gap: 16 }}>
        <Link href="/admin" style={{ color: "var(--t2)", display: "flex", alignItems: "center", gap: 6, fontSize: 14, textDecoration: "none" }}>
          <ArrowLeft style={{ width: 16, height: 16 }} /> Admin
        </Link>
        <span style={{ color: "var(--border)", fontSize: 18 }}>·</span>
        <h1 style={{ fontSize: 16, fontWeight: 600, color: "var(--t1)" }}>Orders</h1>
        <div style={{ marginLeft: "auto", display: "flex", gap: 8 }}>
          <button
            onClick={fetchOrders}
            disabled={loading}
            style={{
              display: "flex", alignItems: "center", gap: 6,
              padding: "7px 14px", borderRadius: 980, fontSize: 13, fontWeight: 400,
              background: "var(--bg2)", color: "var(--t1)", border: "1.5px solid var(--border)",
              cursor: "pointer",
            }}
          >
            <RefreshCw style={{ width: 13, height: 13, animation: loading ? "spin-slow 1s linear infinite" : "none" }} />
            Refresh
          </button>
        </div>
      </div>

      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "28px 24px" }}>

        {/* Stats cards */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 16, marginBottom: 28 }}>
          {[
            { icon: ShoppingBag,   label: "Total orders",  value: orders.length.toString(),       sub: "all time" },
            { icon: Clock,         label: "Pending",        value: pendingN.toString(),             sub: "need action" },
            { icon: Package,       label: "Today",          value: todayCount.toString(),           sub: "new orders" },
            { icon: TrendingUp,    label: "Revenue",        value: `$${revenue.toFixed(2)}`,        sub: "excl. cancelled" },
          ].map(({ icon: Icon, label, value, sub }) => (
            <div key={label} style={{ background: "var(--bg)", borderRadius: 16, padding: "20px 20px", border: "1px solid var(--border)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
                <div style={{ width: 32, height: 32, borderRadius: 8, background: "var(--bg2)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Icon style={{ width: 15, height: 15, color: "var(--t2)" }} />
                </div>
                <p style={{ fontSize: 12, color: "var(--t3)", textTransform: "uppercase", letterSpacing: "0.06em", fontWeight: 500 }}>{label}</p>
              </div>
              <p style={{ fontSize: 26, fontWeight: 600, color: "var(--t1)", letterSpacing: "-0.02em", lineHeight: 1 }}>{value}</p>
              <p style={{ fontSize: 12, color: "var(--t3)", marginTop: 4 }}>{sub}</p>
            </div>
          ))}
        </div>

        {/* Warning */}
        {warning && (
          <div style={{ background: "rgba(255,149,0,0.08)", border: "1px solid rgba(255,149,0,0.2)", borderRadius: 10, padding: "10px 16px", fontSize: 13, color: "#c75000", marginBottom: 20 }}>
            ⚠ {warning}
          </div>
        )}

        {/* Orders table */}
        <div style={{ background: "var(--bg)", borderRadius: 20, border: "1px solid var(--border)", overflow: "hidden" }}>
          {loading && orders.length === 0 ? (
            <div style={{ padding: 64, textAlign: "center", color: "var(--t3)", fontSize: 14 }}>Loading orders…</div>
          ) : orders.length === 0 ? (
            <div style={{ padding: 64, textAlign: "center" }}>
              <ShoppingBag style={{ width: 40, height: 40, color: "var(--bg3)", margin: "0 auto 12px" }} />
              <p style={{ fontSize: 17, fontWeight: 600, color: "var(--t1)" }}>No orders yet</p>
              <p style={{ fontSize: 14, color: "var(--t3)", marginTop: 4 }}>Orders placed on your store will appear here.</p>
            </div>
          ) : (
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr style={{ borderBottom: "1px solid var(--border)" }}>
                    {["Order ID", "Customer", "Items", "Total", "Status", ""].map((h) => (
                      <th
                        key={h}
                        style={{
                          padding: "12px 16px",
                          fontSize: 11, fontWeight: 600, color: "var(--t3)",
                          textTransform: "uppercase", letterSpacing: "0.07em",
                          textAlign: h === "Total" ? "right" : h === "Status" ? "center" : "left",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <AnimatePresence initial={false}>
                    {orders.map((order) => (
                      <OrderRow
                        key={order.id}
                        order={order}
                        onStatusChange={handleStatusChange}
                        onDelete={handleDelete}
                      />
                    ))}
                  </AnimatePresence>
                </tbody>
              </table>
            </div>
          )}
        </div>

        <p style={{ fontSize: 12, color: "var(--t3)", textAlign: "center", marginTop: 24 }}>
          Click any row to expand details · Click a status badge to advance it
        </p>
      </div>
    </div>
  );
}
