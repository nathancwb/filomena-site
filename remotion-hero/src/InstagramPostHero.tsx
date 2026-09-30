import React from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

// Avatar SVG Generator
const AvatarSvg: React.FC<{ size?: number }> = ({ size = 48 }) => (
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

// Floating Heart with physics trajectory
const FloatingHeart: React.FC<{
  delay: number;
  startX: number;
  scale: number;
  color: string;
  speed: number;
}> = ({ delay, startX, scale, color, speed }) => {
  const frame = useCurrentFrame();
  const f = Math.max(0, frame - delay);
  if (frame < delay || f > 75) return null;

  const y = interpolate(f, [0, 65], [0, -680 * speed], {
    extrapolateRight: "clamp",
  });
  const opacity = interpolate(f, [0, 8, 45, 65], [0, 1, 1, 0], {
    extrapolateRight: "clamp",
  });
  const sway = Math.sin(f * 0.15) * 28;
  const rotate = Math.sin(f * 0.1) * 24;

  return (
    <div
      style={{
        position: "absolute",
        left: `calc(${startX}% + ${sway}px)`,
        bottom: "120px",
        transform: `translateY(${y}px) scale(${scale}) rotate(${rotate}deg)`,
        opacity,
        pointerEvents: "none",
        zIndex: 40,
        filter: "drop-shadow(0 4px 10px rgba(0,0,0,0.3))",
      }}
    >
      <svg width="34" height="34" viewBox="0 0 24 24" fill={color}>
        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
      </svg>
    </div>
  );
};

export const InstagramPostHero: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // 1. Publishing Phase (0 - 32 frames)
  const isPublishing = frame < 28;
  const publishProgress = interpolate(frame, [0, 24], [0, 100], {
    extrapolateRight: "clamp",
  });
  const publishCheckSpring = spring({
    frame: frame - 22,
    fps,
    config: { damping: 12 },
  });

  // 2. Post Entrance Spring
  const postScale = spring({
    frame: frame - 26,
    fps,
    config: { damping: 14, stiffness: 120 },
  });
  const postOpacity = interpolate(frame, [25, 30], [0, 1], {
    extrapolateRight: "clamp",
  });

  // 3. Likes count interpolation
  const likesCount = Math.floor(
    interpolate(
      frame,
      [30, 60, 95, 140, 175],
      [12, 1840, 9420, 28750, 42680],
      { extrapolateRight: "clamp" }
    )
  );

  // 4. Comments Entrance Springs
  const comment1Spring = spring({
    frame: frame - 48,
    fps,
    config: { damping: 13 },
  });
  const comment2Spring = spring({
    frame: frame - 82,
    fps,
    config: { damping: 13 },
  });
  const comment3Spring = spring({
    frame: frame - 116,
    fps,
    config: { damping: 13 },
  });

  // 5. Sales Banner Entrance Spring
  const salesBannerSpring = spring({
    frame: frame - 100,
    fps,
    config: { damping: 12, stiffness: 100 },
  });

  // List of animated floating hearts
  const heartSeeds = [
    { delay: 32, startX: 74, scale: 1.1, color: "#ff2a6d", speed: 1.0 },
    { delay: 36, startX: 68, scale: 0.85, color: "#ff477e", speed: 1.2 },
    { delay: 42, startX: 82, scale: 1.3, color: "#d08fff", speed: 0.9 },
    { delay: 50, startX: 62, scale: 0.95, color: "#ff0055", speed: 1.1 },
    { delay: 58, startX: 78, scale: 1.2, color: "#ff598f", speed: 1.3 },
    { delay: 66, startX: 65, scale: 1.4, color: "#ff2a6d", speed: 0.85 },
    { delay: 75, startX: 85, scale: 1.0, color: "#d08fff", speed: 1.15 },
    { delay: 84, startX: 70, scale: 1.15, color: "#ff007f", speed: 1.0 },
    { delay: 92, startX: 60, scale: 0.9, color: "#ff3366", speed: 1.25 },
    { delay: 102, startX: 76, scale: 1.25, color: "#ff2a6d", speed: 0.95 },
    { delay: 114, startX: 84, scale: 1.05, color: "#d08fff", speed: 1.2 },
    { delay: 125, startX: 68, scale: 1.35, color: "#ff0055", speed: 0.9 },
    { delay: 138, startX: 79, scale: 0.95, color: "#ff598f", speed: 1.1 },
    { delay: 148, startX: 63, scale: 1.2, color: "#ff2a6d", speed: 1.05 },
    { delay: 158, startX: 82, scale: 1.1, color: "#d08fff", speed: 1.15 },
  ];

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#0d0414",
        fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
        color: "#ffffff",
        overflow: "hidden",
        width: "100%",
        height: "100%",
      }}
    >
      {/* Background Gradient Mesh */}
      <div
        style={{
          position: "absolute",
          top: "-20%",
          left: "-20%",
          width: "140%",
          height: "140%",
          background: "radial-gradient(circle at 70% 30%, #59266d 0%, #1c0a28 60%, #0d0414 100%)",
          opacity: 0.9,
        }}
      />

      {/* Top Phone Status Bar */}
      <div
        style={{
          height: "56px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 28px",
          zIndex: 30,
        }}
      >
        <span style={{ fontSize: "17px", fontWeight: "700", letterSpacing: "-0.02em" }}>9:41</span>
        <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
          <svg width="18" height="14" viewBox="0 0 18 14" fill="#ffffff">
            <path d="M1 13h3V9H1v4zm6 0h3V5H7v8zm6 0h3V1h-3v12z" />
          </svg>
          <svg width="22" height="12" viewBox="0 0 24 12" fill="#ffffff">
            <rect x="1" y="1" width="19" height="10" rx="3" stroke="#ffffff" strokeWidth="2" fill="none" />
            <rect x="3" y="3" width="14" height="6" rx="1.5" fill="#34c759" />
            <path d="M22 4.5v3c.8 0 1-.5 1-1.5s-.2-1.5-1-1.5z" />
          </svg>
        </div>
      </div>

      {/* App Header */}
      <div
        style={{
          height: "64px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 24px",
          borderBottom: "1px solid rgba(255,255,255,0.08)",
          zIndex: 30,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <AvatarSvg size={44} />
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <span style={{ fontWeight: "700", fontSize: "17px" }}>gabriela.creator</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="#38bdf8">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
              </svg>
            </div>
            <span style={{ fontSize: "12px", color: "rgba(255,255,255,0.65)", display: "block" }}>
              Parceria paga com <strong>Filomena</strong>
            </span>
          </div>
        </div>

        <div style={{ display: "flex", gap: "16px" }}>
          <div
            style={{
              padding: "6px 14px",
              borderRadius: "20px",
              background: "rgba(208, 143, 255, 0.2)",
              border: "1px solid rgba(208, 143, 255, 0.4)",
              fontSize: "12px",
              fontWeight: "700",
              color: "#d08fff",
            }}
          >
            AO VIVO 🔴
          </div>
        </div>
      </div>

      {/* Main Post Media Card */}
      <div
        style={{
          position: "relative",
          margin: "16px 20px 0",
          height: "760px",
          borderRadius: "28px",
          overflow: "hidden",
          background: "linear-gradient(180deg, #2b103c 0%, #160724 100%)",
          border: "1px solid rgba(255,255,255,0.12)",
          boxShadow: "0 24px 60px rgba(0,0,0,0.6)",
          transform: `scale(${isPublishing ? 0.94 : Math.min(1, postScale)})`,
          opacity: isPublishing ? 0.6 : postOpacity,
          transition: "transform 0.2s ease",
          zIndex: 20,
        }}
      >
        {/* Post Image Visual Representation with Stylish Creator Shot */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(135deg, #7928ca 0%, #ff0080 50%, #59266d 100%)",
            opacity: 0.88,
          }}
        />

        {/* Creator Graphic in Center */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "24px",
            textAlign: "center",
          }}
        >
          {/* Glowing Product Card */}
          <div
            style={{
              width: "280px",
              height: "280px",
              borderRadius: "24px",
              background: "rgba(255,255,255,0.1)",
              backdropFilter: "blur(20px)",
              border: "1px solid rgba(255,255,255,0.25)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: "14px",
              boxShadow: "0 20px 50px rgba(0,0,0,0.4)",
            }}
          >
            <div
              style={{
                width: "80px",
                height: "80px",
                borderRadius: "20px",
                background: "linear-gradient(135deg, #d08fff, #ffffff)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 10px 30px rgba(208, 143, 255, 0.5)",
              }}
            >
              <svg width="42" height="42" viewBox="0 0 24 24" fill="#4a154b">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
            </div>
            <span style={{ fontSize: "20px", fontWeight: "800", letterSpacing: "-0.01em" }}>
              Coleção Exclusiva ✨
            </span>
            <span
              style={{
                fontSize: "13px",
                padding: "4px 12px",
                borderRadius: "12px",
                background: "#ffffff",
                color: "#59266d",
                fontWeight: "700",
              }}
            >
              CUPOM: FILOMENA20
            </span>
          </div>
        </div>

        {/* Live Engagement Overlay Elements */}
        {/* Floating Heart Particles */}
        {heartSeeds.map((seed, idx) => (
          <FloatingHeart key={idx} {...seed} />
        ))}

        {/* Floating Live Comments Stream */}
        <div
          style={{
            position: "absolute",
            bottom: "85px",
            left: "18px",
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            zIndex: 35,
            maxWidth: "340px",
          }}
        >
          {/* Comment 1 */}
          {frame >= 48 && (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                padding: "8px 14px",
                borderRadius: "20px",
                background: "rgba(15, 7, 24, 0.75)",
                backdropFilter: "blur(12px)",
                border: "1px solid rgba(255,255,255,0.15)",
                transform: `translateX(${interpolate(comment1Spring, [0, 1], [-80, 0])}px)`,
                opacity: comment1Spring,
              }}
            >
              <span style={{ fontWeight: "700", fontSize: "13px", color: "#d08fff" }}>@marina.s:</span>
              <span style={{ fontSize: "13px" }}>Amei! Já usei o cupom 🛍️😍</span>
            </div>
          )}

          {/* Comment 2 */}
          {frame >= 82 && (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                padding: "8px 14px",
                borderRadius: "20px",
                background: "rgba(15, 7, 24, 0.75)",
                backdropFilter: "blur(12px)",
                border: "1px solid rgba(255,255,255,0.15)",
                transform: `translateX(${interpolate(comment2Spring, [0, 1], [-80, 0])}px)`,
                opacity: comment2Spring,
              }}
            >
              <span style={{ fontWeight: "700", fontSize: "13px", color: "#38bdf8" }}>@lucas_brand:</span>
              <span style={{ fontSize: "13px" }}>Entrega ultra rápida! 🚀</span>
            </div>
          )}

          {/* Comment 3 */}
          {frame >= 116 && (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                padding: "8px 14px",
                borderRadius: "20px",
                background: "rgba(15, 7, 24, 0.75)",
                backdropFilter: "blur(12px)",
                border: "1px solid rgba(255,255,255,0.15)",
                transform: `translateX(${interpolate(comment3Spring, [0, 1], [-80, 0])}px)`,
                opacity: comment3Spring,
              }}
            >
              <span style={{ fontWeight: "700", fontSize: "13px", color: "#4ade80" }}>@carol.style:</span>
              <span style={{ fontSize: "13px" }}>Melhor recomendação do ano! 💖</span>
            </div>
          )}
        </div>

        {/* Live Sales & ROI Conversion Toast */}
        {frame >= 100 && (
          <div
            style={{
              position: "absolute",
              top: "20px",
              left: "18px",
              right: "18px",
              padding: "12px 18px",
              borderRadius: "18px",
              background: "rgba(16, 24, 40, 0.92)",
              backdropFilter: "blur(16px)",
              border: "1px solid rgba(56, 189, 248, 0.4)",
              boxShadow: "0 14px 34px rgba(0,0,0,0.5), 0 0 20px rgba(56, 189, 248, 0.2)",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              transform: `translateY(${interpolate(salesBannerSpring, [0, 1], [-40, 0])}px) scale(${salesBannerSpring})`,
              opacity: salesBannerSpring,
              zIndex: 50,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <div
                style={{
                  width: "36px",
                  height: "36px",
                  borderRadius: "10px",
                  background: "#22c55e",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="#ffffff">
                  <path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.31.12-.48 0-.55-.45-1-1-1H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z" />
                </svg>
              </div>
              <div>
                <div style={{ fontSize: "13px", fontWeight: "700", color: "#ffffff" }}>
                  + 248 Vendas em Tempo Real 🛍️
                </div>
                <div style={{ fontSize: "11px", color: "#4ade80", fontWeight: "600" }}>
                  ROI da Campanha: 5.2x alcançado!
                </div>
              </div>
            </div>
            <span
              style={{
                fontSize: "11px",
                fontWeight: "700",
                color: "#38bdf8",
                background: "rgba(56, 189, 248, 0.15)",
                padding: "4px 8px",
                borderRadius: "8px",
              }}
            >
              AGORA
            </span>
          </div>
        )}

        {/* Action Button: Comprar na Loja */}
        <div
          style={{
            position: "absolute",
            bottom: "18px",
            left: "18px",
            right: "18px",
            height: "52px",
            borderRadius: "16px",
            background: "#ffffff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "10px",
            boxShadow: "0 8px 24px rgba(0,0,0,0.3)",
            zIndex: 40,
          }}
        >
          <span style={{ fontSize: "15px", fontWeight: "800", color: "#59266d" }}>
            Ver Produto & Comprar Agora
          </span>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="#59266d">
            <path d="M5 13h11.86l-5.43 5.43 1.42 1.42L21.14 12l-8.29-8.29-1.42 1.42L16.86 11H5v2z" />
          </svg>
        </div>
      </div>

      {/* Post Social Interaction Bar (Hearts, Comments, Shares) */}
      <div
        style={{
          margin: "14px 24px 0",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          zIndex: 30,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
          {/* Animated Heart Icon */}
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <svg
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill={frame > 30 ? "#ff2a6d" : "#ffffff"}
              style={{
                transform: `scale(${frame > 30 && frame < 50 ? 1.25 : 1})`,
                transition: "transform 0.2s ease, fill 0.2s ease",
              }}
            >
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
            <span style={{ fontSize: "16px", fontWeight: "800", color: "#ffffff" }}>
              {likesCount.toLocaleString("pt-BR")}
            </span>
          </div>

          {/* Comment Icon */}
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <svg width="26" height="26" viewBox="0 0 24 24" fill="#ffffff" opacity={0.85}>
              <path d="M21.99 4c0-1.1-.89-2-1.99-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h14l4 4-.01-18z" />
            </svg>
            <span style={{ fontSize: "15px", fontWeight: "700", opacity: 0.85 }}>1.482</span>
          </div>

          {/* Share Icon */}
          <svg width="24" height="24" viewBox="0 0 24 24" fill="#ffffff" opacity={0.85}>
            <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
          </svg>
        </div>

        {/* Bookmark */}
        <svg width="24" height="24" viewBox="0 0 24 24" fill="#ffffff" opacity={0.85}>
          <path d="M17 3H7c-1.1 0-1.99.9-1.99 2L5 21l7-3 7 3V5c0-1.1-.9-2-2-2z" />
        </svg>
      </div>

      {/* Publishing Modal Overlay (Phase 1: 0 - 28 frames) */}
      {isPublishing && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "rgba(13, 4, 20, 0.85)",
            backdropFilter: "blur(18px)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 100,
          }}
        >
          <div
            style={{
              width: "320px",
              padding: "28px 24px",
              borderRadius: "24px",
              background: "#1c0a28",
              border: "1px solid rgba(208, 143, 255, 0.3)",
              boxShadow: "0 20px 50px rgba(0,0,0,0.7)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
              gap: "16px",
            }}
          >
            {frame < 22 ? (
              <div
                style={{
                  width: "56px",
                  height: "56px",
                  borderRadius: "50%",
                  border: "4px solid rgba(208, 143, 255, 0.2)",
                  borderTopColor: "#d08fff",
                  transform: `rotate(${frame * 24}deg)`,
                }}
              />
            ) : (
              <div
                style={{
                  width: "56px",
                  height: "56px",
                  borderRadius: "50%",
                  background: "#22c55e",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  transform: `scale(${publishCheckSpring})`,
                }}
              >
                <svg width="32" height="32" viewBox="0 0 24 24" fill="#ffffff">
                  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                </svg>
              </div>
            )}

            <div>
              <div style={{ fontSize: "17px", fontWeight: "700" }}>
                {frame < 22 ? "Publicando Campanha..." : "Publicado com Sucesso! 🚀"}
              </div>
              <div style={{ fontSize: "13px", color: "rgba(255,255,255,0.7)", marginTop: "4px" }}>
                {frame < 22 ? "Conectando influenciador à audiência" : "Gerando alcance e conversão imediata"}
              </div>
            </div>

            {/* Progress Bar */}
            <div
              style={{
                width: "100%",
                height: "6px",
                borderRadius: "3px",
                background: "rgba(255,255,255,0.1)",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  width: `${publishProgress}%`,
                  height: "100%",
                  background: "linear-gradient(90deg, #d08fff, #38bdf8)",
                  borderRadius: "3px",
                }}
              />
            </div>
          </div>
        </div>
      )}
    </AbsoluteFill>
  );
};
