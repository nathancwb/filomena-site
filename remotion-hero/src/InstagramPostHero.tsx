import React from "react";
import {
  AbsoluteFill,
  Img,
  interpolate,
  spring,
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

  const y = -progress * 480 * speed;
  const opacity = Math.sin(progress * Math.PI) * 0.95;
  const sway = Math.sin(progress * 7 + seed) * 16;
  const rotate = Math.sin(progress * 5 + seed) * 18;

  return (
    <div
      style={{
        position: "absolute",
        left: `calc(${startX}% + ${sway}px)`,
        bottom: "90px",
        transform: `translateY(${y}px) scale(${scale}) rotate(${rotate}deg)`,
        opacity,
        pointerEvents: "none",
        zIndex: 30,
        filter: "drop-shadow(0 4px 10px rgba(0,0,0,0.6))",
      }}
    >
      <svg width="38" height="38" viewBox="0 0 24 24" fill={color}>
        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
      </svg>
    </div>
  );
};

export const InstagramPostHero: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames, fps } = useVideoConfig();

  // Subtle camera drift for hero photo
  const photoScale = 1.02 + Math.sin((frame / durationInFrames) * Math.PI * 2) * 0.02;

  // Like counter (interpolates smoothly: 24.850 -> 38.940)
  const likesCount = Math.floor(
    interpolate(
      frame,
      [0, durationInFrames / 2, durationInFrames],
      [24850, 38940, 24850]
    )
  );

  // Sales counter ticker (+128 -> +284)
  const salesCount = Math.floor(
    interpolate(
      frame,
      [0, durationInFrames / 2, durationInFrames],
      [128, 284, 128]
    )
  );

  // Comments cycle based on frames
  const commentIndex = Math.floor((frame / 60) % 3);
  const comments = [
    { user: "@marina.s", text: "Já garanti o meu com o cupom! Amei 😍🛍️" },
    { user: "@lucas.brand", text: "Campanha absurda! Conversão máxima 🚀🔥" },
    { user: "@bia.lifestyle", text: "O cupom FILOMENA20 funcionou certinho! 💖" },
  ];
  const activeComment = comments[commentIndex];

  // Floating Hearts array
  const hearts = [
    { seed: 0, startX: 84, scale: 1.1, color: "#ff2a6d", speed: 1.0 },
    { seed: 25, startX: 76, scale: 0.9, color: "#ff477e", speed: 1.15 },
    { seed: 55, startX: 88, scale: 1.25, color: "#ffd166", speed: 0.95 },
    { seed: 85, startX: 72, scale: 1.0, color: "#d08fff", speed: 1.1 },
    { seed: 115, startX: 86, scale: 1.15, color: "#ff0055", speed: 1.05 },
    { seed: 145, startX: 78, scale: 0.95, color: "#ff598f", speed: 1.0 },
  ];

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#0d0414",
        fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
        color: "#ffffff",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "0",
      }}
    >
      {/* 1. Phone Top Status Bar */}
      <div
        style={{
          height: "44px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 28px",
          flexShrink: 0,
        }}
      >
        <span style={{ fontSize: "17px", fontWeight: "800", letterSpacing: "-0.02em" }}>9:41</span>
        <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
          <svg width="18" height="14" viewBox="0 0 18 14" fill="#ffffff">
            <path d="M1 13h3V9H1v4zm6 0h3V5H7v8zm6 0h3V1h-3v12z" />
          </svg>
          <svg width="24" height="12" viewBox="0 0 24 12" fill="#ffffff">
            <rect x="1" y="1" width="19" height="10" rx="3" stroke="#ffffff" strokeWidth="2" fill="none" />
            <rect x="3" y="3" width="14" height="6" rx="1.5" fill="#34c759" />
          </svg>
        </div>
      </div>

      {/* 2. Creator Profile Post Header */}
      <div
        style={{
          height: "68px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 24px",
          borderBottom: "1px solid rgba(255,255,255,0.08)",
          flexShrink: 0,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
          {/* Creator Avatar with Instagram Ring */}
          <div
            style={{
              width: "52px",
              height: "52px",
              borderRadius: "50%",
              padding: "2.5px",
              background: "linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)",
            }}
          >
            <div
              style={{
                width: "100%",
                height: "100%",
                borderRadius: "50%",
                overflow: "hidden",
                border: "2px solid #0d0414",
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
              <span style={{ fontWeight: "800", fontSize: "20px", color: "#ffffff" }}>
                gabriela.creator
              </span>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="#38bdf8">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
              </svg>
            </div>
            <span style={{ fontSize: "14px", color: "rgba(255,255,255,0.7)", fontWeight: "600" }}>
              Parceria paga com <strong style={{ color: "#d08fff" }}>Filomena</strong>
            </span>
          </div>
        </div>

        {/* Action button */}
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <div
            style={{
              padding: "6px 14px",
              borderRadius: "20px",
              background: "rgba(208, 143, 255, 0.15)",
              border: "1px solid rgba(208, 143, 255, 0.4)",
              fontSize: "13px",
              fontWeight: "800",
              color: "#d08fff",
            }}
          >
            Parceria Oficial ✨
          </div>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="#ffffff" opacity={0.7}>
            <circle cx="12" cy="5" r="2" />
            <circle cx="12" cy="12" r="2" />
            <circle cx="12" cy="19" r="2" />
          </svg>
        </div>
      </div>

      {/* 3. Main Social Post Media Frame */}
      <div
        style={{
          position: "relative",
          margin: "8px 20px 0",
          height: "760px",
          borderRadius: "26px",
          overflow: "hidden",
          border: "1px solid rgba(255,255,255,0.15)",
          boxShadow: "0 20px 50px rgba(0,0,0,0.5)",
          background: "#160724",
          flexShrink: 0,
        }}
      >
        {/* Background Visual (Influencer Shoot) */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            transform: `scale(${photoScale})`,
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

        {/* Atmospheric Gradient Overlays for high contrast */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "200px",
            background: "linear-gradient(180deg, rgba(14, 4, 22, 0.85) 0%, rgba(14, 4, 22, 0.2) 60%, transparent 100%)",
            zIndex: 10,
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: "440px",
            background: "linear-gradient(0deg, rgba(14, 4, 22, 0.95) 0%, rgba(14, 4, 22, 0.6) 50%, transparent 100%)",
            zIndex: 10,
          }}
        />

        {/* Top Floating Badge inside post */}
        <div
          style={{
            position: "absolute",
            top: "16px",
            left: "16px",
            right: "16px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            zIndex: 25,
          }}
        >
          <div
            style={{
              background: "rgba(14, 4, 22, 0.75)",
              backdropFilter: "blur(12px)",
              border: "1px solid rgba(255, 255, 255, 0.2)",
              padding: "6px 14px",
              borderRadius: "999px",
              display: "flex",
              alignItems: "center",
              gap: "6px",
              fontSize: "14px",
              fontWeight: "800",
              color: "#ffffff",
            }}
          >
            <span>🛍️</span>
            <span>Ver Produtos Marcados</span>
          </div>

          <div
            style={{
              background: "#ef4444",
              padding: "6px 14px",
              borderRadius: "999px",
              display: "flex",
              alignItems: "center",
              gap: "6px",
              fontSize: "13px",
              fontWeight: "900",
              color: "#ffffff",
              boxShadow: "0 4px 12px rgba(239, 68, 68, 0.5)",
            }}
          >
            <span style={{ width: "7px", height: "7px", borderRadius: "50%", background: "#ffffff" }} />
            AO VIVO
          </div>
        </div>

        {/* Central Prominent Product & Coupon Sticker */}
        <div
          style={{
            position: "absolute",
            top: "140px",
            left: "20px",
            right: "20px",
            padding: "18px 22px",
            borderRadius: "22px",
            background: "rgba(255, 255, 255, 0.95)",
            boxShadow: "0 20px 45px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(255,255,255,0.8)",
            zIndex: 25,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            color: "#1e0927",
          }}
        >
          <div>
            <div style={{ fontSize: "20px", fontWeight: "900", color: "#1e0927", marginBottom: "4px" }}>
              Coleção Exclusiva ✨
            </div>
            <div
              style={{
                display: "inline-block",
                fontSize: "14px",
                fontWeight: "900",
                background: "#59266d",
                color: "#ffffff",
                padding: "5px 14px",
                borderRadius: "10px",
                letterSpacing: "0.04em",
              }}
            >
              CUPOM: FILOMENA20
            </div>
          </div>

          <div
            style={{
              textAlign: "right",
              borderLeft: "2px solid rgba(89, 38, 109, 0.15)",
              paddingLeft: "16px",
            }}
          >
            <span style={{ fontSize: "12px", color: "#6b7280", fontWeight: "800", textTransform: "uppercase", display: "block" }}>
              Vendas da Live
            </span>
            <span style={{ fontSize: "17px", fontWeight: "900", color: "#16a34a" }}>
              +{salesCount} pedidos 🔥
            </span>
          </div>
        </div>

        {/* Floating Animated Hearts */}
        {hearts.map((h, i) => (
          <FloatingHeart key={i} {...h} />
        ))}

        {/* Dynamic Live Comment Bubble */}
        <div
          style={{
            position: "absolute",
            bottom: "94px",
            left: "18px",
            right: "18px",
            padding: "12px 18px",
            borderRadius: "18px",
            background: "rgba(14, 4, 22, 0.88)",
            backdropFilter: "blur(14px)",
            border: "1px solid rgba(255, 255, 255, 0.22)",
            boxShadow: "0 10px 28px rgba(0,0,0,0.5)",
            display: "flex",
            alignItems: "center",
            gap: "8px",
            zIndex: 25,
          }}
        >
          <span style={{ fontWeight: "900", fontSize: "16px", color: "#ffd166" }}>
            {activeComment.user}:
          </span>
          <span style={{ fontSize: "16px", color: "#ffffff", fontWeight: "600", flex: 1, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
            {activeComment.text}
          </span>
        </div>

        {/* High-Converting CTA Button */}
        <div
          style={{
            position: "absolute",
            bottom: "16px",
            left: "18px",
            right: "18px",
            height: "64px",
            borderRadius: "18px",
            background: "#ffffff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "10px",
            boxShadow: "0 12px 30px rgba(0,0,0,0.4)",
            zIndex: 25,
          }}
        >
          <span style={{ fontSize: "20px", fontWeight: "900", color: "#59266d", letterSpacing: "-0.01em" }}>
            Ver Produto & Comprar Agora
          </span>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="#59266d">
            <path d="M5 13h11.86l-5.43 5.43 1.42 1.42L21.14 12l-8.29-8.29-1.42 1.42L16.86 11H5v2z" />
          </svg>
        </div>
      </div>

      {/* 4. Social Engagement Action Bar (Hearts, Comments, Shares, Save) */}
      <div
        style={{
          height: "54px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 24px",
          flexShrink: 0,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "22px" }}>
          {/* Like Button & Count */}
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="#ff2a6d" style={{ filter: "drop-shadow(0 2px 6px rgba(255,42,109,0.5))" }}>
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
            <span style={{ fontSize: "18px", fontWeight: "800", color: "#ffffff" }}>
              {likesCount.toLocaleString("pt-BR")}
            </span>
          </div>

          {/* Comments Count */}
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <svg width="26" height="26" viewBox="0 0 24 24" fill="#ffffff" opacity={0.9}>
              <path d="M21.99 4c0-1.1-.89-2-1.99-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h14l4 4-.01-18z" />
            </svg>
            <span style={{ fontSize: "17px", fontWeight: "700", opacity: 0.95 }}>1.482</span>
          </div>

          {/* Share Icon */}
          <svg width="24" height="24" viewBox="0 0 24 24" fill="#ffffff" opacity={0.9}>
            <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
          </svg>
        </div>

        {/* Bookmark Icon */}
        <svg width="24" height="24" viewBox="0 0 24 24" fill="#ffffff" opacity={0.9}>
          <path d="M17 3H7c-1.1 0-1.99.9-1.99 2L5 21l7-3 7 3V5c0-1.1-.9-2-2-2z" />
        </svg>
      </div>

      {/* 5. Post Caption & Feed Snippet */}
      <div
        style={{
          padding: "0 24px 18px",
          flexShrink: 0,
        }}
      >
        <div style={{ fontSize: "15px", fontWeight: "800", color: "#ffffff", marginBottom: "4px" }}>
          Curtido por <strong>filomenapropaganda</strong> e outras milhares de pessoas
        </div>
        <div style={{ fontSize: "15px", color: "rgba(255,255,255,0.9)", lineHeight: 1.35 }}>
          <strong style={{ color: "#ffffff" }}>gabriela.creator</strong> Campanha oficial com a @filomena! Use o cupom para 20% OFF ✨🛍️ <span style={{ color: "#38bdf8" }}>#publi #influencer</span>
        </div>
      </div>
    </AbsoluteFill>
  );
};
