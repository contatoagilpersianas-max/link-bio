import { createFileRoute } from "@tanstack/react-router";
import { useState, useRef } from "react";
import avatarAsset from "@/assets/avatar.png.asset.json";
import blackoutCoresAsset from "@/assets/blackout-cores2.png.asset.json";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Ágil Persianas · Persianas sob medida em Juiz de Fora" },
      { name: "description", content: "Persianas sob medida em Juiz de Fora e região. Orçamento rápido pelo WhatsApp." },
      { property: "og:title", content: "Ágil Persianas · Persianas sob medida" },
      { property: "og:description", content: "Persianas sob medida em Juiz de Fora e região. Orçamento rápido pelo WhatsApp." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://agilpersianas-bio.lovable.app/" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "canonical", href: "https://agilpersianas-bio.lovable.app/" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Barlow:wght@400;500;600;700&family=Barlow+Condensed:wght@600;700&display=swap" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          name: "Ágil Persianas",
          description: "Persianas sob medida.",
          telephone: "+55 32 3521-0281",
          areaServed: "Juiz de Fora e região",
          url: "https://agilpersianas-bio.lovable.app/",
          openingHours: "Mo-Sa 08:00-18:00",
        }),
      },
    ],
  }),
  component: BioPage,
});

const WA_ICON = (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21h.01c5.46 0 9.91-4.45 9.91-9.91C21.96 6.45 17.5 2 12.04 2zm5.8 14.02c-.24.68-1.4 1.3-1.93 1.38-.49.08-1.11.11-1.79-.11-.41-.13-.95-.31-1.63-.6-2.87-1.24-4.75-4.14-4.89-4.33-.14-.19-1.17-1.55-1.17-2.96 0-1.41.74-2.1 1-2.39.26-.29.57-.36.76-.36.19 0 .38 0 .55.01.18.01.41-.07.64.49.24.58.81 2 .88 2.14.07.14.12.31.02.5-.09.19-.14.31-.28.48-.14.17-.29.37-.42.5-.14.14-.28.29-.12.57.16.28.71 1.17 1.52 1.9 1.05.94 1.93 1.23 2.21 1.37.28.14.44.12.6-.07.16-.19.68-.79.87-1.06.19-.28.37-.23.62-.14.26.09 1.63.77 1.91.91.28.14.47.21.54.33.07.12.07.68-.17 1.36z" />
  </svg>
);

function ProductCarousel({ images, alt, style, imgStyle, badge }: {
  images: string[];
  alt: string;
  style?: React.CSSProperties;
  imgStyle?: React.CSSProperties;
  badge?: React.ReactNode;
}) {
  const [idx, setIdx] = useState(0);
  const touchX = useRef(0);
  const prev = () => setIdx(i => (i - 1 + images.length) % images.length);
  const next = () => setIdx(i => (i + 1) % images.length);

  return (
    <div
      className="p-img-wrap"
      style={style}
      onTouchStart={(e) => { touchX.current = e.touches[0].clientX; }}
      onTouchEnd={(e) => {
        const diff = touchX.current - e.changedTouches[0].clientX;
        if (Math.abs(diff) > 40) diff > 0 ? next() : prev();
      }}
    >
      <img src={images[idx]} alt={alt} loading="lazy" style={imgStyle} />
      {images.length > 1 && (
        <>
          <button className="c-btn c-prev" onClick={(e) => { e.stopPropagation(); prev(); }} aria-label="Foto anterior">‹</button>
          <button className="c-btn c-next" onClick={(e) => { e.stopPropagation(); next(); }} aria-label="Próxima foto">›</button>
          <div className="c-dots">
            {images.map((_, i) => (
              <button key={i} className={`c-dot${i === idx ? " on" : ""}`} onClick={(e) => { e.stopPropagation(); setIdx(i); }} aria-label={`Foto ${i + 1}`} />
            ))}
          </div>
        </>
      )}
      {badge}
    </div>
  );
}

function BioPage() {
  const [showCores, setShowCores] = useState(false);
  const [showWaFallback, setShowWaFallback] = useState(false);
  const [showLisoCores, setShowLisoCores] = useState(false);

  const telefone = "553235210281";
  const mensagem = "Olá! Quero um orçamento de persianas";
  const buildWaUrl = (msg: string) =>
    "https://api.whatsapp.com/send?phone=" + telefone + "&text=" + encodeURIComponent(msg);
  const whatsappUrl = buildWaUrl(mensagem);
  const whatsappWebUrl =
    "https://web.whatsapp.com/send?phone=" + telefone + "&text=" + encodeURIComponent(mensagem);

  const openWhatsapp = (msg: string) => {
    const url = buildWaUrl(msg);
    const win = window.open(url, "_blank", "noopener");
    window.setTimeout(() => {
      if (!win || win.closed || typeof win.closed === "undefined") setShowWaFallback(true);
    }, 800);
  };

  const handleWhatsappClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    openWhatsapp(mensagem);
  };

  const copiarMensagem = async () => {
    try { await navigator.clipboard.writeText(mensagem); } catch { /* noop */ }
  };

  return (
    <>
      <style>{`
        /* ─── Tokens ─────────────────────────────── */
        :root {
          --ink:        oklch(16% 0.010 40);
          --ink-sub:    oklch(44% 0.010 44);
          --bg:         oklch(97% 0.006 60);
          --bg-grad:    oklch(95% 0.012 55);
          --surf:       oklch(100% 0 0);
          --surf-2:     oklch(95% 0.006 55);
          --border:     oklch(88% 0.010 55);
          --gold:       oklch(58% 0.18 50);
          --gold-dim:   oklch(50% 0.18 46);
          --gold-glow:  oklch(58% 0.18 50 / 0.10);
          --wa:         oklch(56% 0.17 150);
          --wa-dark:    oklch(46% 0.15 150);
          --radius:     12px;
        }

        /* ─── Base ───────────────────────────────── */
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        .bio-root {
          background:
            radial-gradient(ellipse 140% 60% at 50% -5%, oklch(76% 0.14 56 / 0.07) 0%, transparent 60%),
            linear-gradient(180deg, var(--bg-grad) 0%, var(--bg) 480px);
          color: var(--ink);
          font-family: 'Barlow', system-ui, -apple-system, sans-serif;
          min-height: 100dvh;
          display: flex;
          justify-content: center;
          padding: 52px 20px 80px;
        }

        .bio-main {
          width: 100%;
          max-width: 430px;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        /* ─── Avatar ─────────────────────────────── */
        .avatar-ring {
          width: 100px; height: 100px;
          border-radius: 50%;
          padding: 2.5px;
          background: conic-gradient(from 180deg, var(--gold-dim), var(--gold), var(--gold-dim));
          box-shadow: 0 0 0 5px oklch(76% 0.14 56 / 0.12), 0 16px 48px oklch(76% 0.14 56 / 0.16);
        }
        .avatar-inner {
          width: 100%; height: 100%;
          border-radius: 50%;
          background: var(--bg);
          display: flex; align-items: center; justify-content: center;
          padding: 10px;
        }
        .avatar-inner img { width: 100%; height: 100%; object-fit: contain; border-radius: 50%; }

        /* ─── Header ─────────────────────────────── */
        .bio-name {
          margin-top: 22px;
          font-family: 'Barlow Condensed', 'Barlow', system-ui, sans-serif;
          font-size: 2.1rem;
          font-weight: 700;
          letter-spacing: -0.02em;
          text-align: center;
          color: var(--ink);
          text-wrap: balance;
        }
        .bio-tagline {
          margin-top: 7px;
          font-size: 0.75rem;
          font-weight: 600;
          color: var(--gold);
          text-align: center;
          letter-spacing: 0.12em;
          text-transform: uppercase;
        }

        /* ─── Trust bar ──────────────────────────── */
        .trust-bar {
          margin-top: 20px;
          display: flex;
          flex-wrap: wrap;
          gap: 8px 8px;
          justify-content: center;
        }
        .trust-chip {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 0.73rem;
          font-weight: 500;
          color: var(--ink-sub);
          background: var(--surf);
          border: 1px solid var(--border);
          padding: 5px 11px;
          border-radius: 999px;
        }
        .trust-chip .dot { width: 6px; height: 6px; border-radius: 50%; background: var(--wa); flex-shrink: 0; }
        .trust-chip.rating { color: var(--gold); border-color: oklch(76% 0.14 56 / 0.25); background: oklch(76% 0.14 56 / 0.07); }

        /* ─── Links section ──────────────────────── */
        .links {
          width: 100%;
          margin-top: 38px;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        /* Main WhatsApp CTA */
        .wa-cta {
          display: flex;
          align-items: center;
          gap: 14px;
          width: 100%;
          min-height: 66px;
          padding: 16px 22px;
          border-radius: var(--radius);
          border: none;
          text-decoration: none;
          font-family: 'Barlow', system-ui, sans-serif;
          font-size: 1rem;
          font-weight: 700;
          color: white;
          background: linear-gradient(135deg, var(--wa), var(--wa-dark));
          box-shadow: 0 10px 36px oklch(56% 0.17 150 / 0.30);
          cursor: pointer;
          transition: transform 0.22s cubic-bezier(0.22,1,0.36,1), box-shadow 0.22s ease;
          position: relative;
          overflow: hidden;
        }
        .wa-cta::after {
          content: "";
          position: absolute; inset: 0;
          border-radius: var(--radius);
          box-shadow: 0 0 0 0 oklch(56% 0.17 150 / 0.55);
          animation: wa-pulse 2.4s ease-out 1.5s 3;
          pointer-events: none;
        }
        .wa-cta:hover { transform: translateY(-2px); box-shadow: 0 14px 40px oklch(56% 0.17 150 / 0.42); }
        .wa-cta:active { transform: scale(0.98); }
        .wa-cta .label { flex: 1; text-align: left; }
        .wa-cta .sub { display: block; font-weight: 400; font-size: 0.8rem; opacity: 0.82; margin-top: 2px; }

        /* Quick shortcuts */
        .quick-row {
          display: flex;
          gap: 8px;
          width: 100%;
        }
        .quick-btn {
          flex: 1;
          min-height: 50px;
          padding: 8px 6px;
          border-radius: 10px;
          border: 1px solid var(--border);
          background: var(--surf);
          color: var(--ink-sub);
          font-family: 'Barlow', system-ui, sans-serif;
          font-size: 0.74rem;
          font-weight: 600;
          line-height: 1.3;
          cursor: pointer;
          text-align: center;
          transition: border-color 0.2s ease, color 0.2s ease, background 0.2s ease;
        }
        .quick-btn:hover { border-color: var(--gold); color: var(--gold); background: var(--gold-glow); }
        .quick-btn:active { transform: scale(0.97); }

        /* ─── Catalog ────────────────────────────── */
        .catalog-section {
          width: 100%;
          margin-top: 48px;
        }
        .catalog-eyebrow {
          font-size: 0.68rem;
          font-weight: 700;
          color: var(--gold);
          text-transform: uppercase;
          letter-spacing: 0.14em;
          margin-bottom: 18px;
          padding-left: 1px;
        }
        .catalog-stack {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        /* Product card */
        .product-card {
          background: var(--surf);
          border-radius: var(--radius);
          border: 1px solid var(--border);
          overflow: hidden;
          transition: border-color 0.25s ease;
        }
        .product-card:hover { border-color: oklch(72% 0.040 50); }

        /* Product image wrap */
        .p-img-wrap {
          position: relative;
          width: 100%;
          aspect-ratio: 3/4;
          overflow: hidden;
          background: oklch(93% 0.008 55);
        }
        .p-img-wrap img {
          width: 100%; height: 100%;
          object-fit: contain;
          transition: transform 0.45s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .p-img-wrap:hover img { transform: scale(1.03); }

        /* Carousel controls */
        .c-btn {
          position: absolute;
          top: 50%; transform: translateY(-50%);
          width: 36px; height: 36px;
          border-radius: 50%;
          background: oklch(8% 0 0 / 0.68);
          border: 1px solid oklch(100% 0 0 / 0.10);
          color: oklch(88% 0 0);
          font-size: 1.25rem;
          cursor: pointer;
          display: flex; align-items: center; justify-content: center;
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          transition: background 0.18s ease, color 0.18s ease;
          z-index: 2;
        }
        .c-btn:hover { background: var(--gold); color: oklch(10% 0 0); border-color: transparent; }
        .c-btn:active { transform: translateY(-50%) scale(0.92); }
        .c-prev { left: 10px; }
        .c-next { right: 10px; }
        .c-dots {
          position: absolute;
          bottom: 10px; left: 50%; transform: translateX(-50%);
          display: flex; gap: 5px; z-index: 2;
        }
        .c-dot {
          width: 6px; height: 6px;
          border-radius: 50%; border: none; cursor: pointer; padding: 0;
          background: oklch(100% 0 0 / 0.32);
          transition: background 0.2s ease, transform 0.2s ease;
        }
        .c-dot.on { background: var(--gold); transform: scale(1.5); }

        /* Colors badge */
        .colors-badge {
          position: absolute; bottom: 10px; right: 10px;
          background: oklch(8% 0 0 / 0.70);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          border: 1px solid oklch(100% 0 0 / 0.10);
          border-radius: 999px;
          padding: 5px 13px;
          font-size: 0.71rem;
          font-weight: 700;
          color: oklch(88% 0 0);
          cursor: pointer;
          font-family: 'Barlow', system-ui, sans-serif;
          transition: background 0.18s ease, color 0.18s ease, border-color 0.18s ease;
          z-index: 3;
        }
        .colors-badge:hover { background: var(--gold); color: oklch(10% 0 0); border-color: transparent; }

        /* Product body */
        .product-body { padding: 18px 20px 20px; }
        .product-name {
          font-family: 'Barlow Condensed', 'Barlow', system-ui, sans-serif;
          font-size: 1.12rem;
          font-weight: 700;
          color: var(--ink);
          margin: 0 0 5px;
          letter-spacing: -0.01em;
        }
        .product-desc {
          font-size: 0.81rem;
          color: var(--ink-sub);
          margin: 0 0 10px;
          line-height: 1.55;
        }
        .product-price {
          font-size: 0.78rem;
          font-weight: 600;
          color: var(--ink-sub);
          margin: 0 0 14px;
        }
        .product-price strong {
          font-size: 1.05rem;
          font-weight: 700;
          color: var(--gold);
        }
        .product-swatches { display: flex; gap: 8px; margin-bottom: 16px; flex-wrap: wrap; }
        .sw {
          width: 20px; height: 20px;
          border-radius: 50%;
          box-shadow: 0 0 0 2px var(--surf), 0 0 0 3px oklch(0% 0 0 / 0.14);
        }

        /* Product CTA */
        .product-cta {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 9px;
          width: 100%;
          min-height: 48px;
          padding: 11px 16px;
          border-radius: 9px;
          border: none;
          font-family: 'Barlow', system-ui, sans-serif;
          font-size: 0.88rem;
          font-weight: 700;
          color: white;
          background: linear-gradient(135deg, var(--wa), var(--wa-dark));
          cursor: pointer;
          text-decoration: none;
          box-shadow: 0 4px 18px oklch(56% 0.17 150 / 0.24);
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }
        .product-cta:hover { transform: translateY(-1px); box-shadow: 0 6px 24px oklch(56% 0.17 150 / 0.36); }
        .product-cta:active { transform: scale(0.98); }

        /* ─── Lightbox ───────────────────────────── */
        .lightbox {
          position: fixed; inset: 0;
          background: oklch(0% 0 0 / 0.84);
          display: flex; align-items: center; justify-content: center;
          padding: 20px; z-index: 50; cursor: zoom-out;
          animation: fadein 0.2s ease-out;
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
        }
        .cores-panel {
          background: var(--surf);
          border: 1px solid var(--border);
          border-radius: 16px;
          padding: 24px 20px 22px;
          width: 100%; max-width: 430px;
          cursor: auto;
        }
        .cores-panel-title {
          font-family: 'Barlow Condensed', 'Barlow', system-ui, sans-serif;
          font-size: 0.8rem;
          font-weight: 700;
          color: var(--gold);
          text-transform: uppercase;
          letter-spacing: 0.1em;
          text-align: center;
          margin-bottom: 14px;
        }
        .cores-image {
          width: 100%; max-height: 62vh;
          object-fit: contain;
          border-radius: 10px;
          display: block;
        }
        .lightbox-close {
          position: absolute; top: 20px; right: 20px;
          width: 40px; height: 40px; border-radius: 50%;
          background: oklch(100% 0 0 / 0.10);
          border: 1px solid oklch(100% 0 0 / 0.12);
          color: oklch(85% 0 0);
          font-size: 1.35rem;
          cursor: pointer;
          display: flex; align-items: center; justify-content: center;
          backdrop-filter: blur(8px);
          transition: background 0.15s ease;
        }
        .lightbox-close:hover { background: oklch(100% 0 0 / 0.18); }

        /* WA Fallback */
        .wa-panel-text { font-size: 0.88rem; color: var(--ink-sub); margin: 0 0 12px; text-align: center; }
        .wa-panel-msg {
          background: var(--surf-2);
          border: 1px solid var(--border);
          border-radius: 10px; padding: 12px;
          font-size: 0.88rem; color: var(--ink);
          margin-bottom: 14px; text-align: center;
        }
        .wa-panel-actions { display: flex; flex-direction: column; gap: 9px; }
        .wa-panel-btn {
          display: flex; align-items: center; justify-content: center;
          min-height: 48px; padding: 12px 16px;
          border-radius: 9px;
          font-family: 'Barlow', system-ui, sans-serif;
          font-size: 0.9rem; font-weight: 600;
          cursor: pointer; text-decoration: none; border: none;
          transition: opacity 0.18s ease;
        }
        .wa-panel-btn:hover { opacity: 0.85; }
        .wa-panel-btn.green { background: linear-gradient(135deg, var(--wa), var(--wa-dark)); color: white; }
        .wa-panel-btn.ghost { background: var(--surf-2); color: var(--ink); border: 1px solid var(--border); }

        /* ─── Footer ─────────────────────────────── */
        .bio-footer {
          margin-top: 48px;
          color: oklch(64% 0.008 44);
          font-size: 0.72rem;
          font-weight: 500;
          text-align: center;
          letter-spacing: 0.07em;
          text-transform: uppercase;
        }

        /* ─── Animations ─────────────────────────── */
        @keyframes rise {
          from { opacity: 0; transform: translateY(14px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadein {
          from { opacity: 0; } to { opacity: 1; }
        }
        @keyframes wa-pulse {
          0%   { box-shadow: 0 0 0 0   oklch(56% 0.17 150 / 0.55); }
          70%  { box-shadow: 0 0 0 14px oklch(56% 0.17 150 / 0); }
          100% { box-shadow: 0 0 0 0   oklch(56% 0.17 150 / 0); }
        }

        .avatar-ring  { opacity:0; animation: rise 0.6s cubic-bezier(0.22,1,0.36,1) 0.05s forwards; }
        .bio-name     { opacity:0; animation: rise 0.6s cubic-bezier(0.22,1,0.36,1) 0.12s forwards; }
        .bio-tagline  { opacity:0; animation: rise 0.6s cubic-bezier(0.22,1,0.36,1) 0.18s forwards; }
        .trust-bar    { opacity:0; animation: rise 0.6s cubic-bezier(0.22,1,0.36,1) 0.23s forwards; }
        .links        { opacity:0; animation: rise 0.6s cubic-bezier(0.22,1,0.36,1) 0.30s forwards; }
        .catalog-section { opacity:0; animation: rise 0.6s cubic-bezier(0.22,1,0.36,1) 0.38s forwards; }
        .bio-footer   { opacity:0; animation: rise 0.6s cubic-bezier(0.22,1,0.36,1) 0.44s forwards; }

        @media (prefers-reduced-motion: reduce) {
          .avatar-ring, .bio-name, .bio-tagline, .trust-bar,
          .links, .catalog-section, .bio-footer {
            animation: none !important; opacity: 1 !important; transform: none !important;
          }
          .wa-cta::after { animation: none; }
        }

        @media (max-width: 360px) {
          .bio-name { font-size: 1.75rem; }
          .catalog-section { margin-top: 36px; }
        }
      `}</style>

      <div className="bio-root">
        <main className="bio-main">

          {/* Avatar */}
          <div className="avatar-ring">
            <div className="avatar-inner">
              <img src={avatarAsset.url} alt="Ágil Persianas" />
            </div>
          </div>

          {/* Identity */}
          <h1 className="bio-name">Ágil Persianas</h1>
          <p className="bio-tagline">Persianas sob medida</p>

          {/* Trust */}
          <div className="trust-bar" aria-label="Informações rápidas">
            <span className="trust-chip rating" aria-label="Avaliação 4.9">★ 4,9 · +500 clientes</span>
            <span className="trust-chip"><span className="dot" />Aberto 24h</span>
          </div>

          {/* Actions */}
          <div className="links">
            <a
              href={whatsappUrl}
              className="wa-cta"
              target="_blank"
              rel="noopener"
              aria-label="Fazer orçamento pelo WhatsApp"
              onClick={handleWhatsappClick}
            >
              {WA_ICON}
              <span className="label">
                Fazer orçamento pelo WhatsApp
                <span className="sub">Resposta rápida, sem compromisso</span>
              </span>
            </a>

            <div className="quick-row" role="group" aria-label="Mensagens rápidas">
              <button type="button" className="quick-btn" onClick={() => openWhatsapp("Olá! Gostaria de um orçamento de persianas.")}>Pedir orçamento</button>
              <button type="button" className="quick-btn" onClick={() => openWhatsapp("Olá! Tenho dúvidas sobre cores e modelos de persianas.")}>Dúvidas sobre cores</button>
            </div>
          </div>

          {/* Catalog */}
          <section className="catalog-section" aria-label="Nossos produtos">
            <p className="catalog-eyebrow">Nossos produtos</p>
            <div className="catalog-stack">

              {/* Tecido Liso */}
              <div className="product-card">
                <ProductCarousel
                  images={["/blackout-liso-produto.png", "/blackout-liso-bege.png"]}
                  alt="Cortina Rolô Blackout Tecido Liso"
                  badge={
                    <button type="button" className="colors-badge" onClick={(e) => { e.stopPropagation(); setShowLisoCores(true); }} aria-label="Ver cores">Ver cores ›</button>
                  }
                />
                <div className="product-body">
                  <p className="product-name">Cortina Rolô Blackout · Tecido Liso</p>
                  <p className="product-desc">Bloqueia 100% da luz · Sob medida</p>
                  <p className="product-price">A partir de <strong>R$ 139</strong></p>
                  <div className="product-swatches" aria-label="Cores disponíveis">
                    <span className="sw" style={{ background: "#F1EFEA" }} title="Branco" />
                    <span className="sw" style={{ background: "#D4C9B5" }} title="Bege" />
                    <span className="sw" style={{ background: "#9C8B76" }} title="Marron" />
                    <span className="sw" style={{ background: "#1C1C1C" }} title="Preto" />
                  </div>
                  <a className="product-cta" href={buildWaUrl("Olá! Vi a Cortina Rolô Blackout Tecido Liso no catálogo de vocês e quero um orçamento sob medida. Podem me ajudar?")} target="_blank" rel="noopener">
                    {WA_ICON} Pedir orçamento
                  </a>
                </div>
              </div>

              {/* Romana */}
              <div className="product-card">
                <ProductCarousel
                  images={["/romana-blackout-foto1.jpg", "/romana-blackout-foto2.jpg"]}
                  alt="Cortina Romana Blackout Texturizado Bege"
                  style={{ aspectRatio: "3/4", background: "oklch(93% 0.008 55)" }}
                />
                <div className="product-body">
                  <p className="product-name">Cortina Romana Blackout · Texturizado</p>
                  <p className="product-desc">Bloqueia 100% da luz · Dobras estruturadas · Sob medida</p>
                  <p className="product-price">A partir de <strong>R$ 227</strong></p>
                  <div className="product-swatches" aria-label="Cores disponíveis">
                    <span className="sw" style={{ background: "#DBD3C4" }} title="Bege" />
                  </div>
                  <a className="product-cta" href={buildWaUrl("Olá! Vi a Cortina Romana Blackout Texturizado no catálogo de vocês e quero um orçamento sob medida. Podem me ajudar?")} target="_blank" rel="noopener">
                    {WA_ICON} Pedir orçamento
                  </a>
                </div>
              </div>

              {/* Double Vision */}
              <div className="product-card">
                <ProductCarousel
                  images={["/double-vision-foto1.jpg", "/double-vision-foto2.jpg", "/double-vision-foto3.jpg"]}
                  alt="Cortina Double Vision Semi Blackout"
                />
                <div className="product-body">
                  <p className="product-name">Cortina Double Vision · Semi Blackout</p>
                  <p className="product-desc">Controle de luz e privacidade · Faixas opacas e translúcidas · Sob medida</p>
                  <p className="product-price">A partir de <strong>R$ 302</strong></p>
                  <div className="product-swatches" aria-label="Cores disponíveis">
                    <span className="sw" style={{ background: "#F1EFEA" }} title="Branco" />
                    <span className="sw" style={{ background: "#D4C9B5" }} title="Bege" />
                    <span className="sw" style={{ background: "#A6AEC0" }} title="Cinza" />
                  </div>
                  <a className="product-cta" href={buildWaUrl("Olá! Vi a Cortina Double Vision Semi Blackout no catálogo de vocês e quero um orçamento sob medida. Podem me ajudar?")} target="_blank" rel="noopener">
                    {WA_ICON} Pedir orçamento
                  </a>
                </div>
              </div>

              {/* Blackout Texturizado */}
              <div className="product-card">
                <ProductCarousel
                  images={[blackoutCoresAsset.url]}
                  alt="Cortina Rolô Blackout Texturizado — paleta de cores"
                  style={{ background: "#f0ede8" }}
                  imgStyle={{ objectFit: "cover" }}
                  badge={
                    <button type="button" className="colors-badge" onClick={(e) => { e.stopPropagation(); setShowCores(true); }} aria-label="Ver cores">Ver cores ›</button>
                  }
                />
                <div className="product-body">
                  <p className="product-name">Cortina Rolô Blackout · Texturizado</p>
                  <p className="product-desc">Bloqueia 100% da luz · Textura exclusiva · Sob medida</p>
                  <p className="product-price">A partir de <strong>R$ 155</strong></p>
                  <div className="product-swatches" aria-label="Cores disponíveis">
                    <span className="sw" style={{ background: "#F1EFEA" }} title="Branco" />
                    <span className="sw" style={{ background: "#DCE1D8" }} title="Verde Claro" />
                    <span className="sw" style={{ background: "#DBD3C4" }} title="Bege" />
                    <span className="sw" style={{ background: "#C8C2AF" }} title="Marron" />
                    <span className="sw" style={{ background: "#A6AEC0" }} title="Cinza" />
                  </div>
                  <a className="product-cta" href={buildWaUrl("Olá! Vi a Cortina Rolô Blackout Texturizado no catálogo de vocês e quero um orçamento sob medida. Podem me ajudar?")} target="_blank" rel="noopener">
                    {WA_ICON} Pedir orçamento
                  </a>
                </div>
              </div>

            </div>
          </section>

          <footer className="bio-footer">Ágil Persianas</footer>
        </main>

        {/* Lightbox – Blackout Texturizado cores */}
        {showCores && (
          <div className="lightbox" role="dialog" aria-modal="true" aria-label="Cores do Blackout Texturizado" onClick={() => setShowCores(false)}>
            <button type="button" className="lightbox-close" aria-label="Fechar" onClick={(e) => { e.stopPropagation(); setShowCores(false); }}>×</button>
            <div className="cores-panel" onClick={(e) => e.stopPropagation()}>
              <p className="cores-panel-title">Cores · Blackout Texturizado</p>
              <img className="cores-image" src={blackoutCoresAsset.url} alt="Paleta Blackout Texturizado" />
            </div>
          </div>
        )}

        {/* Lightbox – Tecido Liso cores */}
        {showLisoCores && (
          <div className="lightbox" role="dialog" aria-modal="true" aria-label="Cores do Blackout Tecido Liso" onClick={() => setShowLisoCores(false)}>
            <button type="button" className="lightbox-close" aria-label="Fechar" onClick={(e) => { e.stopPropagation(); setShowLisoCores(false); }}>×</button>
            <div className="cores-panel" onClick={(e) => e.stopPropagation()}>
              <p className="cores-panel-title">Cores · Blackout Tecido Liso</p>
              <img className="cores-image" src="/blackout-liso-cores.png" alt="Paleta Blackout Tecido Liso" />
            </div>
          </div>
        )}

        {/* WhatsApp fallback */}
        {showWaFallback && (
          <div className="lightbox" role="dialog" aria-modal="true" aria-label="WhatsApp bloqueado" onClick={() => setShowWaFallback(false)}>
            <div className="cores-panel" onClick={(e) => e.stopPropagation()}>
              <p className="cores-panel-title">WhatsApp bloqueado?</p>
              <p className="wa-panel-text">Se o WhatsApp não abriu, use o WhatsApp Web ou copie a mensagem.</p>
              <div className="wa-panel-msg">"{mensagem}"</div>
              <div className="wa-panel-actions">
                <a className="wa-panel-btn green" href={whatsappWebUrl} target="_blank" rel="noopener">Abrir WhatsApp Web</a>
                <button type="button" className="wa-panel-btn ghost" onClick={copiarMensagem}>Copiar mensagem</button>
                <button type="button" className="wa-panel-btn ghost" onClick={() => setShowWaFallback(false)}>Fechar</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
