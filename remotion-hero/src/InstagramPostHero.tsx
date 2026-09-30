import React from "react";
import {
  AbsoluteFill,
  Img,
  interpolate,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

// Floating Animated Heart
const FloatingHeart: React.FC<{
  seed: number;
  startX: number;
  scale: number;
  color: string;
  speed: number;
}> = ({ seed, startX, scale, color, speed }) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  const t = (frame + seed) % durationInFrames;
  const progress = t / durationInFrames;

  const y = -progress * 520 * speed;
  const opacity = Math.sin(progress * Math.PI) * 0.95;
  const sway = Math.sin(progress * 6 + seed) * 18;
  const rotate = Math.sin(progress * 5 + seed) * 15;

  return (
    <div
      style={{
        position: "absolute",
        left: `calc(${startX}% + ${sway}px)`,
        bottom: "160px",
        transform: `translateY(${y}px) scale(${scale}) rotate(${rotate}deg)`,
        opacity,
        pointerEvents: "none",
        zIndex: 40,
        filter: "drop-shadow(0 4px 10px rgba(0,0,0,0.6))",
      }}
    >
      <svg width="42" height="42" viewBox="0 0 24 24" fill={color}>
        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
      </svg>
    </div>
  );
};

export const InstagramPostHero: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  // Subtle breathing camera scale (1.00 -> 1.03)
  const cameraScale = 1.0 + Math.sin((frame / durationInFrames) * Math.PI * 2) * 0.02;

  // Like counter (24.850 -> 29.420)
  const likesCount = Math.floor(
    interpolate(
      frame,
      [0, durationInFrames / 2, durationInFrames],
      [24850, 29420, 24850]
    )
  );

  // Sales counter ticker (+128 -> +164)
  const salesCount = Math.floor(
    interpolate(
      frame,
      [0, durationInFrames / 2, durationInFrames],
      [128, 164, 128]
    )
  );

  // Floating Hearts array
  const hearts = [
    { seed: 0, startX: 78, scale: 1.1, color: "#ff2a6d", speed: 1.0 },
    { seed: 30, startX: 70, scale: 0.9, color: "#ff477e", speed: 1.15 },
    { seed: 65, startX: 84, scale: 1.25, color: "#ffd166", speed: 0.95 },
    { seed: 100, startX: 66, scale: 1.0, color: "#d08fff", speed: 1.1 },
    { seed: 135, startX: 82, scale: 1.15, color: "#ff0055", speed: 1.05 },
    { seed: 160, startX: 74, scale: 0.95, color: "#ff598f", speed: 1.0 },
  ];

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#0d0414",
        fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
        color: "#ffffff",
        overflow: "hidden",
      }}
    >
      {/* 1. Realistic Influencer Portrait Background */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          transform: `scale(${cameraScale})`,
          transformOrigin: "center center",
        }}
      >
        <Img
          src={staticFile("influencer-bg.jpg")}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center 20%",
          }}
        />
      </div>

      {/* 2. Cinematic Contrast Gradients */}
      {/* Top Gradient for Status & Header */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "220px",
          background: "linear-gradient(180deg, rgba(14, 4, 22, 0.85) 0%, rgba(14, 4, 22, 0.4) 60%, transparent 100%)",
          zIndex: 10,
          pointerEvents: "none",
        }}
      />

      {/* Bottom Gradient for Comments, CTA & Stats */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: "440px",
          background: "linear-gradient(0deg, rgba(14, 4, 22, 0.95) 0%, rgba(14, 4, 22, 0.7) 50%, transparent 100%)",
          zIndex: 10,
          pointerEvents: "none",
        }}
      />

      {/* 3. Top Phone Status Bar */}
      <div
        style={{
          height: "44px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 28px",
          zIndex: 30,
        }}
      >
        <span style={{ fontSize: "17px", fontWeight: "800", letterSpacing: "-0.02em", textShadow: "0 2px 6px rgba(0,0,0,0.8)" }}>9:41</span>
        <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
          <svg width="18" height="14" viewBox="0 0 18 14" fill="#ffffff" style={{ filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.8))" }}>
            <path d="M1 13h3V9H1v4zm6 0h3V5H7v8zm6 0h3V1h-3v12z" />
          </svg>
          <svg width="24" height="12" viewBox="0 0 24 12" fill="#ffffff" style={{ filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.8))" }}>
            <rect x="1" y="1" width="19" height="10" rx="3" stroke="#ffffff" strokeWidth="2" fill="none" />
            <rect x="3" y="3" width="14" height="6" rx="1.5" fill="#34c759" />
          </svg>
        </div>
      </div>

      {/* 4. Creator Profile Header */}
      <div
        style={{
          height: "70px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 24px",
          zIndex: 30,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          {/* Avatar Ring */}
          <div
            style={{
              width: "56px",
              height: "56px",
              borderRadius: "50%",
              padding: "2.5px",
              background: "linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)",
              boxShadow: "0 4px 12px rgba(0,0,0,0.5)",
            }}
          >
            <div
              style={{
                width: "100%",
                height: "100%",
                borderRadius: "50%",
                overflow: "hidden",
                border: "2px solid #000000",
                background: "#d08fff",
              }}
            >
              <Img
                src={staticFile("influencer-bg.jpg")}
                style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 15%" }}
              />
            </div>
          </div>

          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <span style={{ fontWeight: "800", fontSize: "20px", textShadow: "0 2px 8px rgba(0,0,0,0.9)" }}>
                gabriela.creator
              </span>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="#38bdf8" style={{ filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.8))" }}>
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
              </svg>
            </div>
            <span style={{ fontSize: "14px", color: "#ffffff", fontWeight: "600", textShadow: "0 2px 6px rgba(0,0,0,0.9)" }}>
              Parceria com <strong style={{ color: "#ffd166" }}>Filomena</strong>
            </span>
          </div>
        </div>

        {/* AO VIVO Badge */}
        <div
          style={{
            padding: "6px 14px",
            borderRadius: "999px",
            background: "#ef4444",
            boxShadow: "0 4px 14px rgba(239, 68, 68, 0.6)",
            fontSize: "13px",
            fontWeight: "900",
            color: "#ffffff",
            letterSpacing: "0.05em",
            display: "flex",
            alignItems: "center",
            gap: "5px",
          }}
        >
          <span style={{ width: "7px", height: "7px", borderRadius: "50%", background: "#ffffff" }} />
          AO VIVO
        </div>
      </div>

      {/* 5. Center High-Contrast Sticker (Produto & Cupom) */}
      <div
        style={{
          position: "absolute",
          top: "160px",
          left: "24px",
          right: "24px",
          padding: "20px 24px",
          borderRadius: "26px",
          background: "rgba(255, 255, 255, 0.95)",
          boxShadow: "0 20px 50px rgba(0, 0, 0, 0.45), 0 0 0 1.5px rgba(255, 255, 255, 0.8)",
          zIndex: 35,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          color: "#1e0927",
        }}
      >
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "4px" }}>
            <span style={{ fontSize: "18px", fontWeight: "900", color: "#1e0927" }}>
              Coleção Exclusiva ✨
            </span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <span
              style={{
                fontSize: "13px",
                fontWeight: "900",
                background: "#59266d",
                color: "#ffffff",
                padding: "4px 12px",
                borderRadius: "8px",
                letterSpacing: "0.04em",
              }}
            >
              CUPOM: FILOMENA20
            </span>
          </div>
        </div>

        <div
          style={{
            textAlign: "right",
            borderLeft: "1.5px solid rgba(89, 38, 109, 0.15)",
            paddingLeft: "16px",
          }}
        >
          <span style={{ fontSize: "12px", color: "#6b7280", fontWeight: "700", textTransform: "uppercase", display: "block" }}>
            Vendas hoje
          </span>
          <span style={{ fontSize: "16px", fontWeight: "900", color: "#16a34a" }}>
            +{salesCount} pedidos 🔥
          </span>
        </div>
      </div>

      {/* 6. Floating Animated Hearts */}
      {hearts.map((h, i) => (
        <FloatingHeart key={i} {...h} />
      ))}

      {/* 7. Live Comment Pill */}
      <div
        style={{
          position: "absolute",
          bottom: "160px",
          left: "24px",
          right: "24px",
          padding: "12px 18px",
          borderRadius: "18px",
          background: "rgba(14, 4, 22, 0.82)",
          backdropFilter: "blur(14px)",
          border: "1px solid rgba(255, 255, 255, 0.18)",
          boxShadow: "0 10px 28px rgba(0,0,0,0.5)",
          display: "flex",
          alignItems: "center",
          gap: "10px",
          zIndex: 35,
        }}
      >
        <span style={{ fontWeight: "800", fontSize: "16px", color: "#ffd166" }}>@marina.s:</span>
        <span style={{ fontSize: "16px", color: "#ffffff", fontWeight: "600" }}>
          Já usei o cupom da @gabriela! Amei! 🛍️😍
        </span>
      </div>

      {/* 8. Bottom CTA Button */}
      <div
        style={{
          position: "absolute",
          bottom: "76px",
          left: "24px",
          right: "24px",
          height: "64px",
          borderRadius: "18px",
          background: "#ffffff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "10px",
          boxShadow: "0 14px 35px rgba(0,0,0,0.45)",
          zIndex: 35,
        }}
      >
        <span style={{ fontSize: "19px", fontWeight: "900", color: "#59266d", letterSpacing: "-0.01em" }}>
          Ver Produto & Comprar Agora
        </span>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="#59266d">
          <path d="M5 13h11.86l-5.43 5.43 1.42 1.42L21.14 12l-8.29-8.29-1.42 1.42L16.86 11H5v2z" />
        </svg>
      </div>

      {/* 9. Bottom Engagement Bar */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: "64px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 28px",
          zIndex: 35,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "22px" }}>
          {/* Like Count */}
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="#ff2a6d" style={{ filter: "drop-shadow(0 2px 6px rgba(0,0,0,0.6))" }}>
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
            <span style={{ fontSize: "18px", fontWeight: "800", color: "#ffffff", textShadow: "0 2px 6px rgba(0,0,0,0.9)" }}>
              {likesCount.toLocaleString("pt-BR")}
            </span>
          </div>

          {/* Comment Count */}
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <svg width="26" height="26" viewBox="0 0 24 24" fill="#ffffff" style={{ opacity: 0.9, filter: "drop-shadow(0 2px 6px rgba(0,0,0,0.6))" }}>
              <path d="M21.99 4c0-1.1-.89-2-1.99-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h14l4 4-.01-18z" />
            </svg>
            <span style={{ fontSize: "17px", fontWeight: "700", opacity: 0.95, textShadow: "0 2px 6px rgba(0,0,0,0.9)" }}>
              1.482
            </span>
          </div>
        </div>

        {/* Share & Bookmark */}
        <div style={{ display: "flex", alignItems: "center", gap: "18px" }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="#ffffff" style={{ opacity: 0.9, filter: "drop-shadow(0 2px 6px rgba(0,0,0,0.6))" }}>
            <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
          </svg>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="#ffffff" style={{ opacity: 0.9, filter: "drop-shadow(0 2px 6px rgba(0,0,0,0.6))" }}>
            <path d="M17 3H7c-1.1 0-1.99.9-1.99 2L5 21l7-3 7 3V5c0-1.1-.9-2-2-2z" />
          </svg>
        </div>
      </div>
    </AbsoluteFill>
  );
};
