import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { password } = await req.json();
    const adminPassword = process.env.ADMIN_PASSWORD;

    if (!adminPassword) {
      return NextResponse.json({ ok: false, error: "Admin not configured" }, { status: 500 });
    }

    if (password !== adminPassword) {
      return NextResponse.json({ ok: false, error: "Invalid password" }, { status: 401 });
    }

    // Set an HttpOnly session cookie so the orders API can verify server-side
    const token = Buffer.from(`${adminPassword}:${Date.now()}`).toString("base64");
    const res   = NextResponse.json({ ok: true });
    res.cookies.set("_pla", token, {
      httpOnly: true,
      sameSite: "lax",
      path:     "/",
      maxAge:   60 * 60 * 24, // 24 h
      secure:   process.env.NODE_ENV === "production",
    });
    return res;
  } catch {
    return NextResponse.json({ ok: false, error: "Bad request" }, { status: 400 });
  }
}
