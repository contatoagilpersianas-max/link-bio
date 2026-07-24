import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import avatarAsset from "@/assets/avatar.png.asset.json";
import blackoutCoresAsset from "@/assets/blackout-cores2.png.asset.json";


export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Ágil Persianas · Persianas sob medida em Juiz de Fora" },
      { name: "description", content: "Persianas sob medida com instalação profissional em Juiz de Fora e região. Orçamento rápido pelo WhatsApp e catálogo de cores do Blackout Texturizado." },
      { property: "og:title", content: "Ágil Persianas · Persianas sob medida" },
      { property: "og:description", content: "Persianas sob medida com instalação profissional em Juiz de Fora e região. Orçamento rápido pelo WhatsApp." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://agilpersianas-bio.lovable.app/" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://agilpersianas-bio.lovable.app/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          name: "Ágil Persianas",
          description: "Persianas sob medida com instalação profissional.",
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


function BioPage() {
  const [showCores, setShowCores] = useState(false);
  const [showWaFallback, setShowWaFallback] = useState(false);
  const [showLisoCores, setShowLisoCores] = useState(false);
  const [lisoImg, setLisoImg] = useState<'branco' | 'bege'>('branco');
  const mensagem = "Olá! Quero um orçamento de persianas";
  const telefone = "553235210281";
  const buildWaUrl = (msg: string) =>
    "https://api.whatsapp.com/send?phone=" + telefone + "&text=" + encodeURIComponent(msg);
  const whatsappUrl = buildWaUrl(mensagem);
  const whatsappWebUrl =
    "https://web.whatsapp.com/send?phone=" + telefone + "&text=" + encodeURIComponent(mensagem);

  const openWhatsapp = (msg: string) => {
    const url = buildWaUrl(msg);
    const win = window.open(url, "_blank", "noopener");
    window.setTimeout(() => {
      if (!win || win.closed || typeof win.closed === "undefined") {
        setShowWaFallback(true);
      }
    }, 800);
  };

  const handleWhatsappClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    openWhatsapp(mensagem);
  };

  const copiarMensagem = async () => {
    try {
      await navigator.clipboard.writeText(mensagem);
    } catch {
      // ignora
    }
  };




  return (
    <>
      <style>{`
        .bio-root{
          --ink: oklch(24% 0.01 40);
          --bg: oklch(97% 0.006 60);
          --surface: oklch(100% 0 0);
          --brand: oklch(64% 0.19 45);
          --brand-dark: oklch(52% 0.18 35);
          --brand-light: oklch(78% 0.15 60);
          --muted: oklch(46% 0.01 40);
          --whatsapp: oklch(60% 0.15 150);
          --whatsapp-dark: oklch(50% 0.14 150);
          --radius: 14px;
          background:
            radial-gradient(1200px 600px at 50% -10%, oklch(78% 0.15 60 / 0.18), transparent 60%),
            linear-gradient(180deg, oklch(95% 0.012 55) 0%, var(--bg) 360px);
          color: var(--ink);
          font-family: 'Segoe UI', system-ui, -apple-system, sans-serif;
          min-height: 100vh;
          display: flex;
          justify-content: center;
          padding: 40px 20px 60px;
        }
        .bio-main{ width:100%; max-width:420px; display:flex; flex-direction:column; align-items:center; }
        .avatar{
          width:108px; height:108px; border-radius:50%;
          background: var(--surface);
          display:flex; align-items:center; justify-content:center;
          box-shadow: 0 10px 28px oklch(64% 0.19 45 / 0.25), 0 0 0 1px oklch(90% 0.02 50);
          opacity:0; animation: rise 0.6s cubic-bezier(0.22,1,0.36,1) forwards;
          padding:12px;
        }
        .avatar img{ width:100%; height:100%; object-fit:contain; border-radius:50%; }
        .bio-main h1{
          margin-top:18px; font-size:1.4rem; font-weight:700; letter-spacing:0; text-align:center;
          opacity:0; animation: rise 0.6s cubic-bezier(0.22,1,0.36,1) 0.08s forwards;
        }
        .tagline{
          margin-top:6px; color:var(--muted); font-size:.95rem; text-align:center;
          opacity:0; animation: rise 0.6s cubic-bezier(0.22,1,0.36,1) 0.14s forwards;
        }
        .links{ width:100%; margin-top:32px; display:flex; flex-direction:column; gap:14px; }
        .link-btn{
          display:flex; align-items:center; gap:14px; width:100%; min-height:70px; padding:16px 18px;
          border-radius:var(--radius); border:1px solid oklch(90% 0.018 55); text-decoration:none;
          font-size:1rem; font-weight:600; color:var(--ink); background:var(--surface);
          box-shadow: 0 8px 24px oklch(20% 0 0 / 0.07), 0 1px 2px oklch(20% 0 0 / 0.05);
          transition: transform .25s cubic-bezier(0.22,1,0.36,1), box-shadow .25s cubic-bezier(0.22,1,0.36,1), border-color .25s ease;
          opacity:0; animation: rise .55s cubic-bezier(0.22,1,0.36,1) forwards;
          cursor:pointer; font-family:inherit; text-align:left; position:relative; overflow:hidden;
        }
        .link-btn:nth-of-type(1){ animation-delay:.20s; }
        .link-btn:nth-of-type(2){ animation-delay:.27s; }
        .link-btn:nth-of-type(3){ animation-delay:.34s; }
        .link-btn:nth-of-type(4){ animation-delay:.41s; }
        .link-btn:active{ transform:scale(0.97); }
        @media (hover:hover){
          .link-btn:hover{ transform:translateY(-2px); box-shadow: 0 12px 26px oklch(20% 0 0 / 0.12); border-color:oklch(83% 0.04 55); }
        }
        .link-btn:focus-visible{ outline:3px solid oklch(64% 0.19 45 / 0.35); outline-offset:3px; }
        .link-btn.primary{
          background: linear-gradient(135deg, var(--whatsapp), var(--whatsapp-dark));
          color:white; border-color:oklch(60% 0.15 150 / 0.4);
          box-shadow: 0 8px 22px oklch(60% 0.15 150 / 0.35);
        }
        .link-btn.primary:hover{ box-shadow: 0 10px 26px oklch(60% 0.15 150 / 0.45); }
        .link-btn.brand{
          background: linear-gradient(135deg, var(--brand), var(--brand-dark));
          color:white; border-color:oklch(64% 0.19 45 / 0.4);
          box-shadow: 0 8px 22px oklch(64% 0.19 45 / 0.32);
        }
        .link-btn.brand:hover{ box-shadow: 0 10px 26px oklch(64% 0.19 45 / 0.42); }
        .icon{ flex:0 0 auto; width:22px; height:22px; }
        .label{ flex:1; text-align:left; min-width:0; }
        .sub{ display:block; font-weight:400; font-size:.78rem; opacity:.85; margin-top:2px; }

        .colors-section{
          width:100%; margin-top:32px;
          opacity:0; animation: rise .6s cubic-bezier(0.22,1,0.36,1) .46s forwards;
        }
        .colors-title{
          font-size:.85rem; font-weight:700; color:var(--muted);
          text-transform:uppercase; letter-spacing:.04em; margin-bottom:12px; text-align:left;
        }
        .colors-grid{ display:grid; grid-template-columns: repeat(5,1fr); gap:10px; }
        .color-chip{ display:flex; flex-direction:column; align-items:center; gap:6px; }
        .swatch{
          width:100%; aspect-ratio:1; border-radius:12px;
          box-shadow: 0 1px 3px oklch(20% 0 0 / 0.1), inset 0 0 0 1px oklch(20% 0 0 / 0.06);
          background-image: repeating-linear-gradient(92deg, oklch(0% 0 0 / 0.05) 0px, transparent 1px, transparent 2px, oklch(0% 0 0 / 0.03) 3px);
        }
        .swatch.branco{ background-color:#F1EFEA; }
        .swatch.light-green{ background-color:#DCE1D8; }
        .swatch.bege{ background-color:#DBD3C4; }
        .swatch.marron{ background-color:#C8C2AF; }
        .swatch.cinza{ background-color:#A6AEC0; }
        .color-name{ font-size:.68rem; font-weight:600; color:var(--muted); text-align:center; }

        .bio-footer{
          margin-top:40px; color:var(--muted); font-size:.8rem; text-align:center;
          opacity:0; animation: rise .6s cubic-bezier(0.22,1,0.36,1) .5s forwards;
        }

        @keyframes rise{ from{ opacity:0; transform:translateY(10px); } to{ opacity:1; transform:translateY(0); } }

        @media (prefers-reduced-motion: reduce){
          .avatar, .bio-main h1, .tagline, .link-btn, .bio-footer, .colors-section{
            animation:none !important; opacity:1 !important; transform:none !important;
          }
        }

        .lightbox{
          position:fixed; inset:0; background: oklch(0% 0 0 / 0.75);
          display:flex; align-items:center; justify-content:center;
          padding:20px; z-index:50; cursor:zoom-out;
          animation: fadein .2s ease-out;
        }
        .cores-panel{
          background: var(--surface);
          border-radius: 14px;
          padding: 22px 18px 20px;
          width: 100%; max-width: 430px;
          box-shadow: 0 20px 60px oklch(0% 0 0 / 0.5);
          cursor: auto;
        }
        .cores-panel .colors-title{ text-align:center; margin-bottom:14px; }
        .cores-image{
          width:100%; max-height:62vh; object-fit:contain; border-radius:10px; display:block; margin-bottom:16px;
          box-shadow: 0 6px 18px oklch(0% 0 0 / 0.16);
        }

        .lightbox-close{
          position:absolute; top:20px; right:20px;
          width:40px; height:40px; border-radius:50%;
          background: oklch(100% 0 0 / 0.15); color:white;
          border:none; font-size:1.4rem; cursor:pointer;
          display:flex; align-items:center; justify-content:center;
        }
        .wa-panel .wa-text{ font-size:.9rem; color:var(--muted); margin:0 0 12px; text-align:center; }
        .wa-panel .wa-message{
          background: oklch(96% 0.01 60); border:1px solid oklch(90% 0.018 55);
          border-radius:10px; padding:12px; font-size:.9rem; color:var(--ink);
          margin-bottom:14px; text-align:center;
        }
        .wa-panel .wa-actions{ display:flex; flex-direction:column; gap:10px; }
        .wa-panel .link-btn{ min-height:52px; }
        @keyframes fadein{ from{ opacity:0; } to{ opacity:1; } }

        .trust-bar{
          margin-top:14px; display:flex; flex-wrap:wrap; gap:8px 10px; justify-content:center;
          opacity:0; animation: rise .6s cubic-bezier(0.22,1,0.36,1) .17s forwards;
        }
        .trust-chip{
          display:inline-flex; align-items:center; gap:6px;
          font-size:.75rem; font-weight:600; color:var(--muted);
          background:var(--surface); border:1px solid oklch(90% 0.018 55);
          padding:6px 10px; border-radius:999px;
          box-shadow: 0 1px 2px oklch(20% 0 0 / 0.04);
        }
        .trust-chip .dot{ width:6px; height:6px; border-radius:50%; background: var(--whatsapp); }
        .trust-chip.rating{ color: var(--brand-dark); }

        .quick-row{
          display:flex; gap:10px; width:100%; margin-top:4px;
          opacity:0; animation: rise .55s cubic-bezier(0.22,1,0.36,1) .23s forwards;
        }
        .quick-btn{
          flex:1; min-height:52px; padding:8px 10px;
          border-radius:12px; border:1px solid oklch(90% 0.018 55);
          background:var(--surface); color:var(--ink);
          font-family:inherit; font-size:.78rem; font-weight:600; line-height:1.2;
          cursor:pointer; text-align:center;
          box-shadow: 0 4px 12px oklch(20% 0 0 / 0.05);
          transition: transform .2s ease, border-color .2s ease;
        }
        .quick-btn:hover{ border-color: var(--brand); transform: translateY(-1px); }
        .quick-btn:active{ transform: scale(0.97); }

        .link-btn.primary{ position:relative; }
        .link-btn.primary::after{
          content:""; position:absolute; inset:0; border-radius:var(--radius);
          box-shadow: 0 0 0 0 oklch(60% 0.15 150 / 0.55);
          animation: wa-pulse 2.2s ease-out 1.2s 3;
          pointer-events:none;
        }
        @keyframes wa-pulse{
          0%{ box-shadow: 0 0 0 0 oklch(60% 0.15 150 / 0.55); }
          70%{ box-shadow: 0 0 0 14px oklch(60% 0.15 150 / 0); }
          100%{ box-shadow: 0 0 0 0 oklch(60% 0.15 150 / 0); }
        }
        @media (prefers-reduced-motion: reduce){
          .link-btn.primary::after{ animation:none; }
        }

        @media (max-width: 360px){
          .bio-main h1{ font-size:1.25rem; }
          .links{ margin-top:26px; }
        }

        .catalog-section{
          width:100%; margin-top:36px;
          opacity:0; animation: rise .6s cubic-bezier(0.22,1,0.36,1) .52s forwards;
        }
        .catalog-title{
          font-size:.85rem; font-weight:700; color:var(--muted);
          text-transform:uppercase; letter-spacing:.04em; margin-bottom:14px; text-align:left;
        }
        .product-card{
          background:var(--surface); border-radius:var(--radius);
          border:1px solid oklch(90% 0.018 55);
          box-shadow: 0 8px 24px oklch(20% 0 0 / 0.07), 0 1px 2px oklch(20% 0 0 / 0.04);
          overflow:hidden;
        }
        .product-img-wrap{
          position:relative; width:100%; aspect-ratio:3/4; overflow:hidden; cursor:zoom-in;
          background: oklch(14% 0 0);
        }
        .product-img-wrap img{
          width:100%; height:100%; object-fit:contain;
          transition: transform .35s cubic-bezier(0.22,1,0.36,1);
        }
        .product-img-wrap:hover img{ transform: scale(1.02); }
        .img-color-tabs{
          position:absolute; top:10px; left:10px; display:flex; gap:6px;
        }
        .img-tab{
          padding:4px 10px; border-radius:999px; font-size:.72rem; font-weight:700;
          border:none; cursor:pointer; font-family:inherit;
          background: oklch(100% 0 0 / 0.18); color:white;
          backdrop-filter: blur(4px);
          transition: background .2s ease;
        }
        .img-tab.active{ background: oklch(100% 0 0 / 0.9); color:var(--ink); }
        .product-colors-badge{
          position:absolute; bottom:10px; right:10px;
          background: oklch(100% 0 0 / 0.9); border-radius:999px;
          padding:5px 10px; font-size:.72rem; font-weight:700; color:var(--ink);
          box-shadow: 0 2px 8px oklch(0% 0 0 / 0.12);
          cursor:pointer; border:none; font-family:inherit;
          transition: background .2s ease;
        }
        .product-colors-badge:hover{ background: oklch(100% 0 0); }
        .product-body{ padding:16px 18px; }
        .product-name{ font-size:1rem; font-weight:700; margin:0 0 4px; }
        .product-desc{ font-size:.82rem; color:var(--muted); margin:0 0 14px; line-height:1.45; }
        .product-swatches{ display:flex; gap:7px; margin-bottom:16px; flex-wrap:wrap; }
        .mini-swatch{
          width:26px; height:26px; border-radius:6px;
          box-shadow: 0 1px 3px oklch(0% 0 0 / 0.15), inset 0 0 0 1px oklch(0% 0 0 / 0.08);
          position:relative;
        }
        .mini-swatch[title]{ cursor:default; }
        .swatch-branco{ background:#F1EFEA; }
        .swatch-bege{ background:#D4C9B5; }
        .swatch-marron{ background:#9C8B76; }
        .swatch-preto{ background:#1C1C1C; }
        .product-cta{
          display:flex; align-items:center; gap:10px; width:100%; min-height:52px; padding:12px 16px;
          border-radius:10px; border:none; font-family:inherit; font-size:.9rem; font-weight:700;
          background: linear-gradient(135deg, var(--whatsapp), var(--whatsapp-dark));
          color:white; cursor:pointer; text-decoration:none; justify-content:center;
          box-shadow: 0 6px 18px oklch(60% 0.15 150 / 0.32);
          transition: transform .2s ease, box-shadow .2s ease;
        }
        .product-cta:hover{ transform:translateY(-1px); box-shadow: 0 8px 22px oklch(60% 0.15 150 / 0.42); }
        .product-cta:active{ transform:scale(0.98); }

      `}</style>

      <div className="bio-root">
        <main className="bio-main">
          <div className="avatar">
            <img src={avatarAsset.url} alt="Ágil Persianas" />
          </div>
          <h1>Ágil Persianas</h1>
          <p className="tagline">Persianas sob medida · Instalação profissional</p>

          <div className="trust-bar" aria-label="Informações rápidas">
            <span className="trust-chip rating" aria-label="Avaliação 4.9 de 5">★ 4,9 · +500 clientes</span>
            <span className="trust-chip"><span className="dot" />Seg–Sáb · 8h às 18h</span>
          </div>

          <div className="links">
            <a
              href={whatsappUrl}
              className="link-btn primary"
              target="_blank"
              rel="noopener"
              aria-label="Abrir WhatsApp e pedir orçamento"
              onClick={handleWhatsappClick}
            >
              <svg className="icon" viewBox="0 0 24 24" fill="white" aria-hidden="true">
                <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21h.01c5.46 0 9.91-4.45 9.91-9.91C21.96 6.45 17.5 2 12.04 2zm5.8 14.02c-.24.68-1.4 1.3-1.93 1.38-.49.08-1.11.11-1.79-.11-.41-.13-.95-.31-1.63-.6-2.87-1.24-4.75-4.14-4.89-4.33-.14-.19-1.17-1.55-1.17-2.96 0-1.41.74-2.1 1-2.39.26-.29.57-.36.76-.36.19 0 .38 0 .55.01.18.01.41-.07.64.49.24.58.81 2 .88 2.14.07.14.12.31.02.5-.09.19-.14.31-.28.48-.14.17-.29.37-.42.5-.14.14-.28.29-.12.57.16.28.71 1.17 1.52 1.9 1.05.94 1.93 1.23 2.21 1.37.28.14.44.12.6-.07.16-.19.68-.79.87-1.06.19-.28.37-.23.62-.14.26.09 1.63.77 1.91.91.28.14.47.21.54.33.07.12.07.68-.17 1.36z" />
              </svg>
              <span className="label">
                Fazer orçamento pelo WhatsApp
                <span className="sub">Resposta rápida, sem compromisso</span>
              </span>
            </a>

            <div className="quick-row" role="group" aria-label="Mensagens rápidas pelo WhatsApp">
              <button
                type="button"
                className="quick-btn"
                onClick={() => openWhatsapp("Olá! Gostaria de um orçamento de persianas.")}
              >
                Pedir orçamento
              </button>
              <button
                type="button"
                className="quick-btn"
                onClick={() => openWhatsapp("Olá! Tenho dúvidas sobre cores e modelos de persianas.")}
              >
                Dúvidas sobre cores
              </button>
              <button
                type="button"
                className="quick-btn"
                onClick={() => openWhatsapp("Olá! Quero agendar uma visita técnica para medir.")}
              >
                Agendar visita
              </button>
            </div>

            <a
              className="link-btn"
              href="tel:+553235210281"
              aria-label="Ligar para Ágil Persianas: 32 3521-0281"
            >
              <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="var(--brand-dark)" strokeWidth={2} aria-hidden="true">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.37 1.9.72 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.35 1.85.59 2.81.72A2 2 0 0 1 22 16.92z" />
              </svg>
              <span className="label">
                Ligar agora
                <span className="sub">(32) 3521-0281</span>
              </span>
            </a>

            <a
              className="link-btn"
              href="https://instagram.com/agilpersianas"
              target="_blank"
              rel="noopener"
            >
              <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="var(--ink)" strokeWidth={2}>
                <rect x="3" y="3" width="18" height="18" rx="5" />
                <circle cx="12" cy="12" r="4" />
                <circle cx="17.5" cy="6.5" r="1" fill="var(--ink)" stroke="none" />
              </svg>
              <span className="label">
                Siga no Instagram
                <span className="sub">@agilpersianas</span>
              </span>
            </a>
          </div>


          <section className="catalog-section" aria-label="Nossos produtos">
            <div className="catalog-title">Nossos produtos</div>

            {/* Card 1 – Blackout Texturizado */}
            <div className="product-card" style={{marginBottom: '16px'}}>
              <div className="product-img-wrap" onClick={() => setShowCores(true)} style={{aspectRatio:'4/3', background:'#f5f3ef'}}>
                <img
                  src={blackoutCoresAsset.url}
                  alt="Cores do Blackout Texturizado"
                  loading="lazy"
                  style={{objectFit:'cover'}}
                />
                <button
                  type="button"
                  className="product-colors-badge"
                  onClick={(e) => { e.stopPropagation(); setShowCores(true); }}
                  aria-label="Ver todas as cores disponíveis"
                >
                  Ver cores ›
                </button>
              </div>
              <div className="product-body">
                <p className="product-name">Cortina Rolô Blackout · Texturizado</p>
                <p className="product-desc">Bloqueia 100% da luz · Textura exclusiva · Sob medida · Instalação inclusa</p>
                <div className="product-swatches" aria-label="Cores disponíveis">
                  <span className="mini-swatch" style={{background:'#F1EFEA'}} title="Branco" />
                  <span className="mini-swatch" style={{background:'#DCE1D8'}} title="Verde Claro" />
                  <span className="mini-swatch" style={{background:'#DBD3C4'}} title="Bege" />
                  <span className="mini-swatch" style={{background:'#C8C2AF'}} title="Marron" />
                  <span className="mini-swatch" style={{background:'#A6AEC0'}} title="Cinza" />
                </div>
                <a
                  className="product-cta"
                  href={buildWaUrl("Olá! Tenho interesse na Cortina Rolô Blackout Texturizado. Podem me passar um orçamento?")}
                  target="_blank"
                  rel="noopener"
                  aria-label="Pedir orçamento do Blackout Texturizado pelo WhatsApp"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="white" aria-hidden="true">
                    <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21h.01c5.46 0 9.91-4.45 9.91-9.91C21.96 6.45 17.5 2 12.04 2zm5.8 14.02c-.24.68-1.4 1.3-1.93 1.38-.49.08-1.11.11-1.79-.11-.41-.13-.95-.31-1.63-.6-2.87-1.24-4.75-4.14-4.89-4.33-.14-.19-1.17-1.55-1.17-2.96 0-1.41.74-2.1 1-2.39.26-.29.57-.36.76-.36.19 0 .38 0 .55.01.18.01.41-.07.64.49.24.58.81 2 .88 2.14.07.14.12.31.02.5-.09.19-.14.31-.28.48-.14.17-.29.37-.42.5-.14.14-.28.29-.12.57.16.28.71 1.17 1.52 1.9 1.05.94 1.93 1.23 2.21 1.37.28.14.44.12.6-.07.16-.19.68-.79.87-1.06.19-.28.37-.23.62-.14.26.09 1.63.77 1.91.91.28.14.47.21.54.33.07.12.07.68-.17 1.36z" />
                  </svg>
                  Pedir orçamento
                </a>
              </div>
            </div>

            {/* Card 2 – Tecido Liso */}
            <div className="product-card">
              <div className="product-img-wrap" onClick={() => setShowLisoCores(true)}>
                <img
                  src={lisoImg === 'branco' ? '/blackout-liso-produto.png' : '/blackout-liso-bege.png'}
                  alt={`Cortina Rolô Blackout Tecido Liso ${lisoImg === 'branco' ? 'Branco' : 'Bege'}`}
                  loading="lazy"
                />
                <div className="img-color-tabs" onClick={(e) => e.stopPropagation()}>
                  <button
                    type="button"
                    className={`img-tab${lisoImg === 'branco' ? ' active' : ''}`}
                    onClick={() => setLisoImg('branco')}
                  >Branco</button>
                  <button
                    type="button"
                    className={`img-tab${lisoImg === 'bege' ? ' active' : ''}`}
                    onClick={() => setLisoImg('bege')}
                  >Bege</button>
                </div>
                <button
                  type="button"
                  className="product-colors-badge"
                  onClick={(e) => { e.stopPropagation(); setShowLisoCores(true); }}
                  aria-label="Ver todas as cores disponíveis"
                >
                  Ver cores ›
                </button>
              </div>
              <div className="product-body">
                <p className="product-name">Cortina Rolô Blackout · Tecido Liso</p>
                <p className="product-desc">Bloqueia 100% da luz · Sob medida · Instalação inclusa</p>
                <div className="product-swatches" aria-label="Cores disponíveis">
                  <span className="mini-swatch swatch-branco" title="Branco" />
                  <span className="mini-swatch swatch-bege" title="Bege" />
                  <span className="mini-swatch swatch-marron" title="Marron" />
                  <span className="mini-swatch swatch-preto" title="Preto" />
                </div>
                <a
                  className="product-cta"
                  href={buildWaUrl("Olá! Tenho interesse na Cortina Rolô Blackout Tecido Liso. Podem me passar um orçamento?")}
                  target="_blank"
                  rel="noopener"
                  aria-label="Pedir orçamento da Cortina Rolô Blackout Tecido Liso pelo WhatsApp"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="white" aria-hidden="true">
                    <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21h.01c5.46 0 9.91-4.45 9.91-9.91C21.96 6.45 17.5 2 12.04 2zm5.8 14.02c-.24.68-1.4 1.3-1.93 1.38-.49.08-1.11.11-1.79-.11-.41-.13-.95-.31-1.63-.6-2.87-1.24-4.75-4.14-4.89-4.33-.14-.19-1.17-1.55-1.17-2.96 0-1.41.74-2.1 1-2.39.26-.29.57-.36.76-.36.19 0 .38 0 .55.01.18.01.41-.07.64.49.24.58.81 2 .88 2.14.07.14.12.31.02.5-.09.19-.14.31-.28.48-.14.17-.29.37-.42.5-.14.14-.28.29-.12.57.16.28.71 1.17 1.52 1.9 1.05.94 1.93 1.23 2.21 1.37.28.14.44.12.6-.07.16-.19.68-.79.87-1.06.19-.28.37-.23.62-.14.26.09 1.63.77 1.91.91.28.14.47.21.54.33.07.12.07.68-.17 1.36z" />
                  </svg>
                  Pedir orçamento
                </a>
              </div>
            </div>
          </section>

          <footer className="bio-footer">Ágil Persianas</footer>
        </main>

        {showCores && (
          <div
            className="lightbox"
            role="dialog"
            aria-modal="true"
            aria-label="Cores do Blackout Texturizado"
            onClick={() => setShowCores(false)}
          >
            <button
              type="button"
              className="lightbox-close"
              aria-label="Fechar"
              onClick={(e) => {
                e.stopPropagation();
                setShowCores(false);
              }}
            >
              ×
            </button>
            <div
              className="cores-panel"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="colors-title">Cores · Blackout Texturizado</div>
              <img
                className="cores-image"
                src={blackoutCoresAsset.url}
                alt="Amostras de tecido Blackout Texturizado"
              />
            </div>
          </div>
        )}

        {showLisoCores && (
          <div
            className="lightbox"
            role="dialog"
            aria-modal="true"
            aria-label="Cores do Blackout Tecido Liso"
            onClick={() => setShowLisoCores(false)}
          >
            <button
              type="button"
              className="lightbox-close"
              aria-label="Fechar"
              onClick={(e) => { e.stopPropagation(); setShowLisoCores(false); }}
            >
              ×
            </button>
            <div className="cores-panel" onClick={(e) => e.stopPropagation()}>
              <div className="colors-title">Cores · Blackout Tecido Liso</div>
              <img
                className="cores-image"
                src="/blackout-liso-cores.png"
                alt="Amostras de tecido Blackout Liso: Branco, Bege, Marron, Preto"
              />
            </div>
          </div>
        )}

        {showWaFallback && (
          <div
            className="lightbox"
            role="dialog"
            aria-modal="true"
            aria-label="WhatsApp bloqueado"
            onClick={() => setShowWaFallback(false)}
          >
            <div className="cores-panel wa-panel" onClick={(e) => e.stopPropagation()}>
              <div className="colors-title">WhatsApp bloqueado?</div>
              <p className="wa-text">
                Se o WhatsApp não abriu, use o WhatsApp Web ou copie a mensagem abaixo.
              </p>
              <div className="wa-message">"{mensagem}"</div>
              <div className="wa-actions">
                <a
                  className="link-btn primary"
                  href={whatsappWebUrl}
                  target="_blank"
                  rel="noopener"
                >
                  <span className="label">Abrir WhatsApp Web</span>
                </a>
                <button type="button" className="link-btn" onClick={copiarMensagem}>
                  <span className="label">Copiar mensagem</span>
                </button>
                <button
                  type="button"
                  className="link-btn"
                  onClick={() => setShowWaFallback(false)}
                >
                  <span className="label">Fechar</span>
                </button>
              </div>
            </div>
          </div>
        )}

      </div>

    </>
  );
}
