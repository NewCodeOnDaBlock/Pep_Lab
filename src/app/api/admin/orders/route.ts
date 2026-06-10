import { NextRequest, NextResponse } from "next/server";
import { getStore } from "@netlify/blobs";

/* ─── Auth helper ─────────────────────────────────────────── */
function isAuthorized(req: NextRequest): boolean {
  const cookie = req.cookies.get("_pla")?.value ?? "";
  if (!cookie || !process.env.ADMIN_PASSWORD) return false;
  try {
    const decoded = Buffer.from(cookie, "base64").toString("utf-8");
    const storedPw = decoded.split(":")[0];
    return storedPw === process.env.ADMIN_PASSWORD;
  } catch {
    return false;
  }
}

const unauth = () => NextResponse.json({ error: "Unauthorized" }, { status: 401 });

/* ─── GET — list all orders ───────────────────────────────── */
export async function GET(req: NextRequest) {
  if (!isAuthorized(req)) return unauth();

  try {
    const store = getStore("peplab-orders");
    const { blobs } = await store.list();

    const orders = await Promise.all(
      blobs.map(async (blob) => {
        const raw = await store.get(blob.key, { type: "text" });
        try { return JSON.parse(raw ?? "{}"); } catch { return null; }
      })
    );

    const sorted = orders
      .filter(Boolean)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    return NextResponse.json({ orders: sorted });
  } catch (err) {
    console.error("orders/GET error:", err);
    // Blobs not available locally — return empty
    return NextResponse.json({ orders: [], warning: "Blob storage unavailable in local dev" });
  }
}

/* ─── PATCH — update order status ────────────────────────── */
export async function PATCH(req: NextRequest) {
  if (!isAuthorized(req)) return unauth();

  try {
    const { orderId, status } = await req.json();
    const VALID = ["pending", "processing", "shipped", "delivered", "cancelled"];
    if (!orderId || !VALID.includes(status)) {
      return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
    }

    const store = getStore("peplab-orders");
    const raw   = await store.get(orderId, { type: "text" });
    if (!raw) return NextResponse.json({ error: "Order not found" }, { status: 404 });

    const order = JSON.parse(raw);
    order.status = status;
    await store.set(orderId, JSON.stringify(order));

    return NextResponse.json({ ok: true, order });
  } catch (err) {
    console.error("orders/PATCH error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

/* ─── DELETE — remove an order ───────────────────────────── */
export async function DELETE(req: NextRequest) {
  if (!isAuthorized(req)) return unauth();

  try {
    const { orderId } = await req.json();
    if (!orderId) return NextResponse.json({ error: "Missing orderId" }, { status: 400 });

    const store = getStore("peplab-orders");
    await store.delete(orderId);

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("orders/DELETE error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
