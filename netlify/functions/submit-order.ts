import type { Handler, HandlerEvent } from "@netlify/functions";
import { Resend } from "resend";
import { getStore } from "@netlify/blobs";

interface OrderItem  { name: string; slug: string; quantity: number; price: number; }
interface OrderPayload {
  customer: { name: string; email: string; address: string; city: string; state: string; zip: string; };
  items:  OrderItem[];
  total:  number;
  agreedToResearchTerms: boolean;
}

const resend = new Resend(process.env.RESEND_API_KEY);

/* ─── Email row helper ───────────────────────────────────── */
const itemRow = (i: OrderItem) => `
  <tr>
    <td style="padding:10px 0;border-bottom:1px solid #f0f0f0;font-size:14px;color:#1d1d1f">${i.name}</td>
    <td style="padding:10px 0;border-bottom:1px solid #f0f0f0;font-size:14px;color:#6e6e73;text-align:center">${i.quantity}</td>
    <td style="padding:10px 0;border-bottom:1px solid #f0f0f0;font-size:14px;color:#1d1d1f;text-align:right;font-weight:500">$${(i.price * i.quantity).toFixed(2)}</td>
  </tr>`;

/* ─── Merchant email ─────────────────────────────────────── */
const merchantHtml = (orderId: string, date: string, c: OrderPayload["customer"], items: OrderItem[], total: number) => `
<!DOCTYPE html>
<html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width"></head>
<body style="margin:0;padding:0;background:#f5f5f7;font-family:-apple-system,BlinkMacSystemFont,'Helvetica Neue',Arial,sans-serif">
  <div style="max-width:600px;margin:32px auto;background:#fff;border-radius:16px;overflow:hidden;box-shadow:0 2px 20px rgba(0,0,0,0.06)">

    <div style="background:#1d1d1f;padding:28px 32px">
      <p style="margin:0;font-size:13px;font-weight:500;color:#6e6e73;letter-spacing:0.05em;text-transform:uppercase">PepLab Research</p>
      <h1 style="margin:6px 0 0;font-size:22px;font-weight:600;color:#fff">New Order</h1>
    </div>

    <div style="padding:28px 32px">
      <table style="width:100%;border-collapse:collapse;margin-bottom:24px">
        <tr>
          <td style="font-size:12px;color:#86868b;text-transform:uppercase;letter-spacing:0.07em;padding-bottom:4px">Order ID</td>
          <td style="font-size:12px;color:#86868b;text-transform:uppercase;letter-spacing:0.07em;padding-bottom:4px;text-align:right">Date</td>
        </tr>
        <tr>
          <td style="font-size:15px;font-weight:600;color:#1d1d1f;font-family:monospace">${orderId}</td>
          <td style="font-size:14px;color:#6e6e73;text-align:right">${date}</td>
        </tr>
      </table>

      <div style="background:#f5f5f7;border-radius:10px;padding:16px 20px;margin-bottom:24px">
        <p style="margin:0 0 10px;font-size:12px;font-weight:600;color:#86868b;text-transform:uppercase;letter-spacing:0.07em">Customer</p>
        <p style="margin:0;font-size:15px;font-weight:500;color:#1d1d1f">${c.name}</p>
        <p style="margin:2px 0;font-size:13px;color:#6e6e73">${c.email}</p>
        <p style="margin:2px 0;font-size:13px;color:#6e6e73">${c.address}, ${c.city}, ${c.state} ${c.zip}</p>
      </div>

      <p style="font-size:12px;font-weight:600;color:#86868b;text-transform:uppercase;letter-spacing:0.07em;margin-bottom:8px">Items</p>
      <table style="width:100%;border-collapse:collapse;margin-bottom:20px">
        <thead>
          <tr>
            <th style="font-size:11px;color:#86868b;font-weight:500;text-align:left;padding-bottom:6px">Product</th>
            <th style="font-size:11px;color:#86868b;font-weight:500;text-align:center;padding-bottom:6px">Qty</th>
            <th style="font-size:11px;color:#86868b;font-weight:500;text-align:right;padding-bottom:6px">Subtotal</th>
          </tr>
        </thead>
        <tbody>${items.map(itemRow).join("")}</tbody>
        <tfoot>
          <tr>
            <td colspan="2" style="padding:12px 0 0;font-size:15px;font-weight:600;color:#1d1d1f">Total</td>
            <td style="padding:12px 0 0;font-size:15px;font-weight:600;color:#0071e3;text-align:right">$${total.toFixed(2)}</td>
          </tr>
        </tfoot>
      </table>

      <div style="background:rgba(0,113,227,0.06);border-radius:8px;padding:12px 16px;font-size:12px;color:#0071e3">
        ✓ Customer agreed to research-only terms
      </div>
    </div>

    <div style="padding:16px 32px;border-top:1px solid #f0f0f0;font-size:11px;color:#86868b">
      View all orders at your admin dashboard → /admin/orders
    </div>
  </div>
</body></html>`;

/* ─── Customer confirmation email ────────────────────────── */
const customerHtml = (orderId: string, c: OrderPayload["customer"], items: OrderItem[], total: number) => `
<!DOCTYPE html>
<html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width"></head>
<body style="margin:0;padding:0;background:#f5f5f7;font-family:-apple-system,BlinkMacSystemFont,'Helvetica Neue',Arial,sans-serif">
  <div style="max-width:600px;margin:32px auto;background:#fff;border-radius:16px;overflow:hidden;box-shadow:0 2px 20px rgba(0,0,0,0.06)">

    <div style="background:#0071e3;padding:28px 32px">
      <p style="margin:0;font-size:13px;font-weight:500;color:rgba(255,255,255,0.6);letter-spacing:0.05em;text-transform:uppercase">PepLab Research</p>
      <h1 style="margin:6px 0 0;font-size:22px;font-weight:600;color:#fff">Order Confirmed</h1>
    </div>

    <div style="padding:28px 32px">
      <p style="font-size:16px;color:#1d1d1f;margin-bottom:6px">Hi ${c.name},</p>
      <p style="font-size:14px;color:#6e6e73;margin-bottom:24px;line-height:1.6">
        Thank you for your research order. We will prepare and dispatch your peptides within 48 business hours via cold-chain shipping.
      </p>

      <div style="background:#f5f5f7;border-radius:10px;padding:14px 20px;margin-bottom:24px">
        <p style="margin:0;font-size:11px;color:#86868b;text-transform:uppercase;letter-spacing:0.07em">Order ID</p>
        <p style="margin:4px 0 0;font-size:14px;font-weight:600;color:#1d1d1f;font-family:monospace">${orderId}</p>
      </div>

      <table style="width:100%;border-collapse:collapse;margin-bottom:20px">
        <thead>
          <tr>
            <th style="font-size:11px;color:#86868b;font-weight:500;text-align:left;padding-bottom:6px">Product</th>
            <th style="font-size:11px;color:#86868b;font-weight:500;text-align:center;padding-bottom:6px">Qty</th>
            <th style="font-size:11px;color:#86868b;font-weight:500;text-align:right;padding-bottom:6px">Subtotal</th>
          </tr>
        </thead>
        <tbody>${items.map(itemRow).join("")}</tbody>
        <tfoot>
          <tr>
            <td colspan="2" style="padding:12px 0 0;font-size:15px;font-weight:600;color:#1d1d1f">Total</td>
            <td style="padding:12px 0 0;font-size:15px;font-weight:600;color:#0071e3;text-align:right">$${total.toFixed(2)}</td>
          </tr>
        </tfoot>
      </table>

      <div style="background:#f5f5f7;border-radius:8px;padding:14px 16px;font-size:11px;color:#86868b;line-height:1.6">
        <strong style="color:#1d1d1f">Research Use Only</strong> — This product is intended for in vitro and preclinical research purposes only. Not for human consumption, therapeutic use, or veterinary application.
      </div>
    </div>

    <div style="padding:16px 32px;border-top:1px solid #f0f0f0;font-size:11px;color:#86868b">
      PepLab Research · Questions? Reply to this email.
    </div>
  </div>
</body></html>`;

/* ─── Main handler ───────────────────────────────────────── */
const handler: Handler = async (event: HandlerEvent) => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: JSON.stringify({ error: "Method not allowed" }) };
  }

  let order: OrderPayload;
  try { order = JSON.parse(event.body ?? "{}"); }
  catch { return { statusCode: 400, body: JSON.stringify({ error: "Invalid JSON" }) }; }

  if (!order.agreedToResearchTerms) {
    return { statusCode: 400, body: JSON.stringify({ error: "Research terms agreement required" }) };
  }

  const { customer, items, total } = order;
  if (!customer?.name || !customer?.email || !customer?.address || !items?.length) {
    return { statusCode: 400, body: JSON.stringify({ error: "Missing required fields" }) };
  }

  const orderId   = `PL-${Date.now()}-${Math.random().toString(36).slice(2, 7).toUpperCase()}`;
  const orderDate = new Date().toLocaleDateString("en-US", { dateStyle: "long" });

  /* ── Persist to Netlify Blobs ──────────────────────────── */
  try {
    const store = getStore("peplab-orders");
    await store.set(orderId, JSON.stringify({
      id: orderId,
      date: new Date().toISOString(),
      status: "pending",
      customer,
      items,
      total,
      agreedToResearchTerms: true,
    }));
  } catch (blobErr) {
    console.error("Blob storage error:", blobErr);
    // Non-fatal — continue so the order isn't lost
  }

  /* ── Send emails via Resend ────────────────────────────── */
  if (process.env.RESEND_API_KEY && process.env.ORDER_NOTIFICATION_EMAIL) {
    try {
      const from = process.env.EMAIL_FROM ?? "orders@peplab.research";
      await Promise.all([
        resend.emails.send({
          from, to: process.env.ORDER_NOTIFICATION_EMAIL,
          subject: `[PepLab] New order ${orderId} — $${total.toFixed(2)}`,
          html: merchantHtml(orderId, orderDate, customer, items, total),
        }),
        resend.emails.send({
          from, to: customer.email,
          subject: `Your PepLab research order ${orderId}`,
          html: customerHtml(orderId, customer, items, total),
        }),
      ]);
    } catch (emailErr) { console.error("Email error:", emailErr); }
  }

  /* ── Dropshipper webhook (optional) ───────────────────── */
  if (process.env.DROPSHIP_WEBHOOK_URL) {
    try {
      await fetch(process.env.DROPSHIP_WEBHOOK_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(process.env.DROPSHIP_API_KEY ? { Authorization: `Bearer ${process.env.DROPSHIP_API_KEY}` } : {}),
        },
        body: JSON.stringify({ orderId, customer, items, total }),
      });
    } catch (dsErr) { console.error("Dropshipper webhook error:", dsErr); }
  }

  return {
    statusCode: 200,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ success: true, orderId }),
  };
};

export { handler };
