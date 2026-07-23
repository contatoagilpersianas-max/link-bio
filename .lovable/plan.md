## Melhorias sugeridas para a página bio

Foco: aumentar confiança, conversão pelo WhatsApp e polimento visual — sem quebrar o layout atual estilo "linktree".

### 1. Conversão e contato
- **CTA de ligação direta** ao lado do WhatsApp (`tel:3235210281`) — útil para clientes que preferem falar.
- **Horário de atendimento** logo abaixo do nome ("Seg–Sáb · 8h às 18h") para reduzir dúvida antes de clicar.
- **Cidade/região atendida** ("Atendemos Juiz de Fora e região") — reforça relevância local e SEO.
- **Mensagens rápidas do WhatsApp**: em vez de uma única mensagem, oferecer 2–3 intenções ("Orçamento", "Dúvida sobre cores", "Agendar visita técnica") que preenchem o texto certo.

### 2. Provas sociais
- **Bloco de avaliações**: nota + nº de clientes ("★ 4,9 · +500 instalações") acima dos botões.
- **Selo de garantia/tempo de mercado** ("+10 anos no mercado", "Garantia de instalação").
- **Link para avaliações do Google** como um dos botões.

### 3. Catálogo e produtos
- Substituir o link placeholder `https://SEUSITE.com` por:
  - um catálogo real (PDF hospedado como asset), **ou**
  - uma grade curta de modelos (Rolô, Romana, Double Vision, Blackout) — cada card abrindo um modal parecido com o de cores.
- No modal do **Blackout Texturizado**: adicionar nome de cada cor sob a imagem e um CTA "Quero esta cor" que já pré-preenche a mensagem do WhatsApp com a cor escolhida.

### 4. Visual e UX
- **Favicon e og:image** próprios (hoje faltam) para aparecer bonito quando compartilhado.
- **Modo escuro automático** via `prefers-color-scheme` — a paleta atual em oklch facilita.
- **Micro-interação** no botão do WhatsApp: leve pulso na primeira visita para chamar atenção.
- **Reduzir peso do gradiente** de fundo em telas grandes; hoje ele ocupa muito no desktop.
- **Espaçamento**: aumentar respiro entre o avatar e o primeiro botão em mobile pequeno (< 360px).

### 5. Acessibilidade e SEO
- Adicionar `aria-label` descritivo em cada botão (o texto visual já ajuda, mas o WhatsApp e Instagram merecem rótulo explícito).
- Título da página mais específico: "Ágil Persianas · Persianas sob medida em [cidade]".
- Meta description mencionando cidade e serviços.
- JSON-LD `LocalBusiness` com telefone, endereço e horário — melhora aparição no Google.

### 6. Conteúdo institucional (opcional)
- Botão "Trabalhos recentes" abrindo uma galeria simples (modal com 4–8 fotos de instalações).
- Link para redes adicionais se existirem (Facebook, TikTok).

---

### Como quer seguir?
Posso implementar tudo, ou priorizar em ondas:
- **Onda 1 (rápida, alto impacto)**: ligação direta, horário, cidade, avaliações estáticas, favicon/og:image, JSON-LD, mensagens rápidas do WhatsApp.
- **Onda 2**: galeria de trabalhos, catálogo real, modal de modelos.
- **Onda 3**: modo escuro, micro-interações, refino visual.

Me diga qual onda (ou itens específicos) você quer que eu implemente e, se tiver, envie: cidade atendida, horário, telefone alternativo, link do Google Meu Negócio e fotos de trabalhos.