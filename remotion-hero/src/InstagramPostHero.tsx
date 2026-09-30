import React from "react";
import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

// Avatar SVG Generator
const AvatarSvg: React.FC<{ size?: number }> = ({ size = 44 }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
    <circle cx="50" cy="50" r="48" fill="url(#avatarGrad)" stroke="#d08fff" strokeWidth="3" />
    <defs>
      <linearGradient id="avatarGrad" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#8a3ab9" />
        <stop offset="50%" stopColor="#e95950" />
        <stop offset="100%" stopColor="#fccc63" />
      </linearGradient>
    </defs>
    <circle cx="50" cy="38" r="18" fill="#ffffff" />
    <path d="M22 84c0-15.5 12.5-28 28-28s28 12.5 28 28" fill="#ffffff" />
  </svg>
);

// Gentle Floating Heart (Seamless Looping, Calm & Smooth)
const CalmHeart: React.FC<{
  seed: number;
  startX: number;
  scale: number;
  color: string;
  speed: number;
}> = ({ seed, startX, scale, color, speed }) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  // Offset frame by seed for varied timing
  const t = (frame + seed) % durationInFrames;
  const progress = t / durationInFrames;

  // Gentle upward float
  const y = -progress * 420 * speed;
  // Fade in at bottom, fade out at top
  const opacity = Math.sin(progress * Math.PI) * 0.9;
  const sway = Math.sin(progress * 8 + seed) * 16;
  const rotate = Math.sin(progress * 6 + seed) * 12;

  return (
    <div
      style={{
        position: "absolute",
        left: `calc(${startX}% + ${sway}px)`,
        bottom: "80px",
        transform: `translateY(${y}px) scale(${scale}) rotate(${rotate}deg)`,
        opacity,
        pointerEvents: "none",
        zIndex: 25,
        filter: "drop-shadow(0 2px 6px rgba(0,0,0,0.3))",
      }}
    >
      <svg width="28" height="28" viewBox="0 0 24 24" fill={color}>
        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
      </svg>
    </div>
  );
};

export const InstagramPostHero: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  // Smooth cyclic likes counter (e.g. 24.300 -> 28.950)
  const likesCount = Math.floor(
    interpolate(
      frame,
      [0, durationInFrames / 2, durationInFrames],
      [24300, 28950, 24300]
    )
  );

  // Soft ambient pulse (NO flashing)
  const glowPulse = 0.85 + Math.sin((frame / durationInFrames) * Math.PI * 2) * 0.12;

  // 6 Calm Hearts with staggered seeds
  const hearts = [
    { seed: 0, startX: 74, scale: 1.0, color: "#ff2a6d", speed: 1.0 },
    { seed: 35, startX: 66, scale: 0.85, color: "#ff477e", speed: 1.1 },
    { seed: 70, startX: 82, scale: 1.15, color: "#d08fff", speed: 0.95 },
    { seed: 105, startX: 62, scale: 0.9, color: "#ff0055", speed: 1.15 },
    { seed: 140, startX: 78, scale: 1.1, color: "#ff598f", speed: 1.05 },
    { seed: 175, startX: 85, scale: 0.95, color: "#d08fff", speed: 1.0 },
  ];

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#13061f",
        fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
        color: "#ffffff",
        overflow: "hidden",
        width: "100%",
        height: "100%",
      }}
    >
      {/* Calm Ambient Background Gradient */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "radial-gradient(circle at 60% 35%, #4a195e 0%, #1c082b 65%, #0e0316 100%)",
          opacity: glowPulse,
        }}
      />

      {/* Top Phone Status Bar */}
      <div
        style={{
          height: "48px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 24px",
          zIndex: 30,
          opacity: 0.9,
        }}
      >
        <span style={{ fontSize: "15px", fontWeight: "700", letterSpacing: "-0.02em" }}>9:41</span>
        <div style={{ display: "flex", gap: "6px", alignItems: "center" }}>
          <svg width="16" height="12" viewBox="0 0 18 14" fill="#ffffff">
            <path d="M1 13h3V9H1v4zm6 0h3V5H7v8zm6 0h3V1h-3v12z" />
          </svg>
          <svg width="20" height="10" viewBox="0 0 24 12" fill="#ffffff">
            <rect x="1" y="1" width="19" height="10" rx="3" stroke="#ffffff" strokeWidth="2" fill="none" />
            <rect x="3" y="3" width="14" height="6" rx="1.5" fill="#34c759" />
          </svg>
        </div>
      </div>

      {/* Profile Header */}
      <div
        style={{
          height: "58px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 20px",
          borderBottom: "1px solid rgba(255,255,255,0.08)",
          zIndex: 30,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <AvatarSvg size={38} />
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
              <span style={{ fontWeight: "700", fontSize: "15px" }}>gabriela.creator</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="#38bdf8">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
              </svg>
            </div>
            <span style={{ fontSize: "11px", color: "rgba(255,255,255,0.7)", display: "block" }}>
              Parceria paga com <strong>Filomena</strong>
            </span>
          </div>
        </div>

        <div
          style={{
            padding: "4px 10px",
            borderRadius: "14px",
            background: "rgba(208, 143, 255, 0.15)",
            border: "1px solid rgba(208, 143, 255, 0.35)",
            fontSize: "11px",
            fontWeight: "700",
            color: "#d08fff",
          }}
        >
          AO VIVO 🔴
        </div>
      </div>

      {/* Post Content Center Card */}
      <div
        style={{
          position: "relative",
          margin: "14px 16px 0",
          flex: 1,
          borderRadius: "22px",
          overflow: "hidden",
          background: "linear-gradient(145deg, #3d1254 0%, #1f0730 100%)",
          border: "1px solid rgba(255,255,255,0.12)",
          boxShadow: "0 18px 45px rgba(0,0,0,0.5)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "20px",
          textAlign: "center",
          zIndex: 20,
        }}
      >
        {/* Subtle decorative glow in center */}
        <div
          style={{
            position: "absolute",
            width: "220px",
            height: "220px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(208, 143, 255, 0.25) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />

        {/* Product / Creator Card */}
        <div
          style={{
            width: "220px",
            padding: "22px 16px",
            borderRadius: "18px",
            background: "rgba(255,255,255,0.08)",
            backdropFilter: "blur(14px)",
            border: "1px solid rgba(255,255,255,0.2)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "10px",
            boxShadow: "0 12px 30px rgba(0,0,0,0.35)",
            zIndex: 10,
          }}
        >
          <div
            style={{
              width: "60px",
              height: "60px",
              borderRadius: "16px",
              background: "linear-gradient(135deg, #d08fff, #ffffff)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 8px 20px rgba(208, 143, 255, 0.4)",
            }}
          >
            <svg width="32" height="32" viewBox="0 0 24 24" fill="#4a154b">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
          </div>
          <span style={{ fontSize: "17px", fontWeight: "800", letterSpacing: "-0.01em" }}>
            Coleção Exclusiva ✨
          </span>
          <span
            style={{
              fontSize: "12px",
              padding: "4px 10px",
              borderRadius: "10px",
              background: "#ffffff",
              color: "#59266d",
              fontWeight: "800",
            }}
          >
            CUPOM: FILOMENA20
          </span>
        </div>

        {/* Smooth Floating Hearts */}
        {hearts.map((h, i) => (
          <CalmHeart key={i} {...h} />
        ))}

        {/* Steady Live Comment */}
        <div
          style={{
            position: "absolute",
            bottom: "75px",
            left: "14px",
            right: "14px",
            padding: "8px 12px",
            borderRadius: "14px",
            background: "rgba(18, 7, 28, 0.8)",
            backdropFilter: "blur(10px)",
            border: "1px solid rgba(255,255,255,0.12)",
            display: "flex",
            alignItems: "center",
            gap: "8px",
            textAlign: "left",
            zIndex: 30,
          }}
        >
          <span style={{ fontWeight: "700", fontSize: "12px", color: "#d08fff" }}>@marina.s:</span>
          <span style={{ fontSize: "12px", color: "#ffffff" }}>Já garanti o meu com o cupom! 🛍️😍</span>
        </div>

        {/* Action Button: Comprar na Loja */}
        <div
          style={{
            position: "absolute",
            bottom: "14px",
            left: "14px",
            right: "14px",
            height: "44px",
            borderRadius: "12px",
            background: "#ffffff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "8px",
            boxShadow: "0 6px 18px rgba(0,0,0,0.25)",
            zIndex: 30,
          }}
        >
          <span style={{ fontSize: "13px", fontWeight: "800", color: "#59266d" }}>
            Ver Produto & Comprar Agora
          </span>
          <svg width="15" height="15" viewBox="0 0 24 24" fill="#59266d">
            <path d="M5 13h11.86l-5.43 5.43 1.42 1.42L21.14 12l-8.29-8.29-1.42 1.42L16.86 11H5v2z" />
          </svg>
        </div>
      </div>

      {/* Post Footer Interaction Bar */}
      <div
        style={{
          height: "56px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 20px",
          zIndex: 30,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          {/* Heart Icon & Likes */}
          <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="#ff2a6d">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
            <span style={{ fontSize: "14px", fontWeight: "800", color: "#ffffff" }}>
              {likesCount.toLocaleString("pt-BR")}
            </span>
          </div>

          {/* Comment Icon */}
          <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="#ffffff" opacity={0.8}>
              <path d="M21.99 4c0-1.1-.89-2-1.99-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h14l4 4-.01-18z" />
            </svg>
            <span style={{ fontSize: "13px", fontWeight: "700", opacity: 0.8 }}>1.482</span>
          </div>

          {/* Share */}
          <svg width="20" height="20" viewBox="0 0 24 24" fill="#ffffff" opacity={0.8}>
            <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
          </svg>
        </div>

        {/* Bookmark */}
        <svg width="20" height="20" viewBox="0 0 24 24" fill="#ffffff" opacity={0.8}>
          <path d="M17 3H7c-1.1 0-1.99.9-1.99 2L5 21l7-3 7 3V5c0-1.1-.9-2-2-2z" />
        </svg>
      </div>
    </AbsoluteFill>
  );
};
