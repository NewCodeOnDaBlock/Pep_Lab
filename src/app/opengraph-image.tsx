import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "PepLab Research — Premium Research Peptides";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #eff6ff 0%, #ffffff 55%, #f5f3ff 100%)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
          <div
            style={{
              width: 92,
              height: 92,
              borderRadius: 24,
              background: "linear-gradient(135deg, #2563eb, #1d4ed8)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 46,
              color: "white",
              fontWeight: 900,
            }}
          >
            P
          </div>
          <div style={{ display: "flex", fontSize: 76, fontWeight: 900, letterSpacing: -2 }}>
            <div style={{ display: "flex", color: "#0f172a" }}>PEP</div>
            <div style={{ display: "flex", color: "#2563eb" }}>LAB</div>
          </div>
        </div>
        <div style={{ display: "flex", marginTop: 30, fontSize: 34, color: "#475569" }}>
          Premium Research Peptides — BPC-157, TB-500 &amp; More
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 40,
            fontSize: 22,
            fontWeight: 700,
            letterSpacing: 3,
            color: "#2563eb",
            background: "#eff6ff",
            border: "2px solid #bfdbfe",
            borderRadius: 999,
            padding: "14px 36px",
          }}
        >
          THIRD-PARTY TESTED · CoA WITH EVERY ORDER
        </div>
      </div>
    ),
    { ...size }
  );
}
