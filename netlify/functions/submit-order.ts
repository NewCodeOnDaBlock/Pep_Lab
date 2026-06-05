import type { Handler, HandlerEvent } from "@netlify/functions";
import { Resend } from "resend";

interface OrderItem {
  name: string;
  slug: string;
  quantity: number;
  price: number;
}

interface OrderPayload {
  customer: {
    name: string;
    email: string;
    address: string;
    city: string;
    state: string;
    zip: string;
  };
  items: OrderItem[];
  total: number;
  agreedToResearchTerms: boolean;
}

const resend = new Resend(process.env.RESEND_API_KEY);

const handler: Handler = async (event: HandlerEvent) => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: JSON.stringify({ error: "Method not allowed" }) };
  }

  let order: OrderPayload;
  try {
    order = JSON.parse(event.body ?? "{}");
  } catch {
    return { statusCode: 400, body: JSON.stringify({ error: "Invalid JSON" }) };
  }

  // Validate research agreement — hard stop
  if (!order.agreedToResearchTerms) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "Research terms agreement required" }),
    };
  }

  // Basic field validation
  const { customer, items, total } = order;
  if (!customer?.name || !customer?.email || !customer?.address || !items?.length) {
    return { statusCode: 400, body: JSON.stringify({ error: "Missing required fields" }) };
  }

  const orderId = `PL-${Date.now()}-${Math.random().toString(36).slice(2, 7).toUpperCase()}`;
  const orderDate = new Date().toLocaleDateString("en-US", { dateStyle: "long" });

  const itemsHtml = items
    .map(
      (i) =>
        `<tr>
          <td style="padding:8px 12px;border-bottom:1px solid #1e2d3d">${i.name}</td>
          <td style="padding:8px 12px;border-bottom:1px solid #1e2d3d;text-align:center">${i.quantity}</td>
          <td style="padding:8px 12px;border-bottom:1px solid #1e2d3d;text-align:right;color:#00d4ff">$${(i.price * i.quantity).toFixed(2)}</td>
        </tr>`
    )
    .join("");

  // ── Send merchant notification ────────────────────────────────────────────
  if (process.env.RESEND_API_KEY && process.env.ORDER_NOTIFICATION_EMAIL) {
    try {
      await resend.emails.send({
        from: process.env.EMAIL_FROM ?? "noreply@peplab.research",
        to: process.env.ORDER_NOTIFICATION_EMAIL,
        subject: `[PepLab] New Research Order ${orderId} — $${total.toFixed(2)}`,
        html: `
          <div style="font-family:monospace;background:#020408;color:#e8f4f8;padding:32px;max-width:600px;margin:0 auto">
            <h1 style="color:#00d4ff;font-size:24px;margin-bottom:4px">New Research Order</h1>
            <p style="color:#6b7280;margin-top:0">${orderDate} · ${orderId}</p>

            <h2 style="color:#9ca3af;font-size:14px;margin-bottom:12px">CUSTOMER</h2>
            <table style="width:100%;border-collapse:collapse;margin-bottom:24px">
              <tr><td style="color:#6b7280;padding:4px 0;width:100px">Name</td><td>${customer.name}</td></tr>
              <tr><td style="color:#6b7280;padding:4px 0">Email</td><td>${customer.email}</td></tr>
              <tr><td style="color:#6b7280;padding:4px 0">Address</td><td>${customer.address}, ${customer.city}, ${customer.state} ${customer.zip}</td></tr>
            </table>

            <h2 style="color:#9ca3af;font-size:14px;margin-bottom:12px">ORDER ITEMS</h2>
            <table style="width:100%;border-collapse:collapse;margin-bottom:24px">
              <thead>
                <tr style="background:#0a1628">
                  <th style="padding:8px 12px;text-align:left;color:#6b7280;font-weight:normal">Product</th>
                  <th style="padding:8px 12px;text-align:center;color:#6b7280;font-weight:normal">Qty</th>
                  <th style="padding:8px 12px;text-align:right;color:#6b7280;font-weight:normal">Subtotal</th>
                </tr>
              </thead>
              <tbody>${itemsHtml}</tbody>
              <tfoot>
                <tr>
                  <td colspan="2" style="padding:12px;text-align:right;font-weight:bold">Total</td>
                  <td style="padding:12px;text-align:right;color:#00d4ff;font-weight:bold">$${total.toFixed(2)}</td>
                </tr>
              </tfoot>
            </table>

            <div style="background:#0d1f14;border:1px solid #16a34a40;border-radius:8px;padding:12px;font-size:12px;color:#86efac">
              ✓ Customer agreed to research-only terms at checkout
            </div>
          </div>
        `,
      });

      // ── Customer confirmation ──────────────────────────────────────────────
      await resend.emails.send({
        from: process.env.EMAIL_FROM ?? "noreply@peplab.research",
        to: customer.email,
        subject: `Your PepLab Research Order ${orderId}`,
        html: `
          <div style="font-family:monospace;background:#020408;color:#e8f4f8;padding:32px;max-width:600px;margin:0 auto">
            <h1 style="color:#00d4ff;font-size:24px">Order Confirmed</h1>
            <p style="color:#9ca3af">Hi ${customer.name},</p>
            <p style="color:#9ca3af">Thank you for your research order. We'll dispatch within 48 hours via cold-chain shipping.</p>
            <p style="color:#6b7280;font-size:12px">Order ID: <span style="color:#00d4ff">${orderId}</span></p>

            <table style="width:100%;border-collapse:collapse;margin:24px 0">
              <thead>
                <tr style="background:#0a1628">
                  <th style="padding:8px 12px;text-align:left;color:#6b7280;font-weight:normal">Product</th>
                  <th style="padding:8px 12px;text-align:right;color:#6b7280;font-weight:normal">Subtotal</th>
                </tr>
              </thead>
              <tbody>${itemsHtml}</tbody>
            </table>

            <div style="background:#0a1628;border-radius:8px;padding:16px;margin:16px 0;font-size:11px;color:#6b7280;border:1px solid #1e2d3d">
              RESEARCH USE ONLY — These products are for in vitro and preclinical research only.
              Not for human consumption or therapeutic use.
            </div>
          </div>
        `,
      });
    } catch (emailErr) {
      console.error("Email send failed:", emailErr);
      // Don't fail the order if email fails — log and continue
    }
  }

  // ── Optional: forward to dropshipper webhook ──────────────────────────────
  if (process.env.DROPSHIP_WEBHOOK_URL) {
    try {
      await fetch(process.env.DROPSHIP_WEBHOOK_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(process.env.DROPSHIP_API_KEY
            ? { Authorization: `Bearer ${process.env.DROPSHIP_API_KEY}` }
            : {}),
        },
        body: JSON.stringify({ orderId, customer, items, total }),
      });
    } catch (dsErr) {
      console.error("Dropshipper webhook failed:", dsErr);
    }
  }

  return {
    statusCode: 200,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ success: true, orderId }),
  };
};

export { handler };
