import { ImageResponse } from "next/og";
import { site } from "@/data/site";

export const alt = `${site.name} — ${site.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const chips = [
  "React",
  "Next.js",
  "TypeScript",
  "React Native",
  "Flutter",
  "Tailwind CSS",
];

export default async function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          height: "100%",
          width: "100%",
          backgroundColor: "#05070e",
          backgroundImage:
            "radial-gradient(900px 500px at 15% 0%, rgba(52,211,153,0.20), transparent 60%), radial-gradient(700px 500px at 100% 100%, rgba(34,211,238,0.18), transparent 60%)",
          padding: "72px 80px",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: 16,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 56,
              height: 56,
              borderRadius: 14,
              border: "1px solid #1b2740",
              backgroundColor: "#101828",
              color: "#34d399",
              fontSize: 28,
              fontWeight: 700,
            }}
          >
            {site.initials}
          </div>
          <div
            style={{
              display: "flex",
              color: "#8ea3c4",
              fontSize: 26,
            }}
          >
            {site.name} / portfolio
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            marginTop: 40,
            color: "#e8eefb",
            fontSize: 72,
            fontWeight: 700,
            lineHeight: 1.1,
            letterSpacing: "-0.03em",
          }}
        >
          <div style={{ display: "flex" }}>{site.firstName} here.</div>
          <div style={{ display: "flex", color: "#6ee7b7" }}>
            I build interfaces
          </div>
          <div style={{ display: "flex" }}>that handle money.</div>
        </div>

        <div
          style={{
            display: "flex",
            marginTop: 34,
            color: "#8ea3c4",
            fontSize: 27,
          }}
        >
          {site.role} · React, Next.js, React Native &amp; Flutter ·{" "}
          {site.location}
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "row",
            marginTop: 40,
            gap: 12,
          }}
        >
          {chips.map((chip) => (
            <div
              key={chip}
              style={{
                display: "flex",
                padding: "10px 18px",
                borderRadius: 10,
                border: "1px solid #1b2740",
                backgroundColor: "#0a0f1c",
                color: "#6ee7b7",
                fontSize: 22,
              }}
            >
              {chip}
            </div>
          ))}
        </div>
      </div>
    ),
    size,
  );
}