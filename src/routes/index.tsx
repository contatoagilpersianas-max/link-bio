import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import avatarAsset from "@/assets/avatar.png.asset.json";
import blackoutCoresAsset from "@/assets/blackout-cores2.png.asset.json";


export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Ágil Persianas" },
      { name: "description", content: "Orçamento de persianas pelo WhatsApp, catálogo e cores do Blackout Texturizado." },
      { property: "og:title", content: "Ágil Persianas" },
      { property: "og:description", content: "Orçamento de persianas pelo WhatsApp, catálogo e cores do Blackout Texturizado." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: BioPage,
});

function BioPage() {
  const [showCores, setShowCores] = useState(false);
  const [showWaFallback, setShowWaFallback] = useState(false);
  const mensagem = "Olá! Quero um orçamento de persianas";
  const telefone = "553235210281";
  const whatsappUrl =
    "https://api.whatsapp.com/send?phone=" + telefone + "&text=" + encodeURIComponent(mensagem);
  const whatsappWebUrl =
    "https://web.whatsapp.com/send?phone=" + telefone + "&text=" + encodeURIComponent(mensagem);

  const handleWhatsappClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const win = window.open(whatsappUrl, "_blank", "noopener");
    window.setTimeout(() => {
      if (!win || win.closed || typeof win.closed === "undefined") {
        setShowWaFallback(true);
      }
    }, 800);
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

      `}</style>

      <div className="bio-root">
        <main className="bio-main">
          <div className="avatar">
            <img src={avatarAsset.url} alt="Ágil Persianas" />
          </div>
          <h1>Ágil Persianas</h1>
          <p className="tagline">Persianas sob medida · Instalação profissional</p>

          <div className="links">
            <a
              href={whatsappUrl}
              className="link-btn primary"
              target="_blank"
              rel="noopener"
              onClick={handleWhatsappClick}
            >

              <svg className="icon" viewBox="0 0 24 24" fill="white">
                <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21h.01c5.46 0 9.91-4.45 9.91-9.91C21.96 6.45 17.5 2 12.04 2zm5.8 14.02c-.24.68-1.4 1.3-1.93 1.38-.49.08-1.11.11-1.79-.11-.41-.13-.95-.31-1.63-.6-2.87-1.24-4.75-4.14-4.89-4.33-.14-.19-1.17-1.55-1.17-2.96 0-1.41.74-2.1 1-2.39.26-.29.57-.36.76-.36.19 0 .38 0 .55.01.18.01.41-.07.64.49.24.58.81 2 .88 2.14.07.14.12.31.02.5-.09.19-.14.31-.28.48-.14.17-.29.37-.42.5-.14.14-.28.29-.12.57.16.28.71 1.17 1.52 1.9 1.05.94 1.93 1.23 2.21 1.37.28.14.44.12.6-.07.16-.19.68-.79.87-1.06.19-.28.37-.23.62-.14.26.09 1.63.77 1.91.91.28.14.47.21.54.33.07.12.07.68-.17 1.36z" />
              </svg>
              <span className="label">
                Fazer orçamento pelo WhatsApp
                <span className="sub">Resposta rápida, sem compromisso</span>
              </span>
            </a>

            <a className="link-btn brand" href="https://SEUSITE.com" target="_blank" rel="noopener">
              <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth={2}>
                <rect x="3" y="4" width="18" height="16" rx="2" />
                <path d="M3 9h18M8 4v5" />
              </svg>
              <span className="label">
                Ver catálogo completo
                <span className="sub">Todas as linhas e modelos</span>
              </span>
            </a>

            <button
              type="button"
              className="link-btn"
              onClick={() => setShowCores(true)}
            >
              <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="var(--brand-dark)" strokeWidth={2}>
                <path d="M4 4h16v16H4z" />
                <path d="M4 10h16M10 4v16" />
              </svg>
              <span className="label">
                Blackout Texturizado
                <span className="sub">Ver cores disponíveis</span>
              </span>
            </button>

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
