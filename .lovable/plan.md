## Objetivo
Corrigir o botão "Fazer orçamento pelo WhatsApp" para que abra o WhatsApp já com a mensagem pronta, sem cair na tela de bloqueio do `api.whatsapp.com`.

## Diagnóstico
O link atual já usa `https://wa.me/553235210281?text=...`, que é o formato correto. O erro `api.whatsapp.com está bloqueado / ERR_BLOCKED_BY_RESPONSE` aparece porque:
1. O clique está sendo aberto dentro do iframe de preview do Lovable, e o WhatsApp bloqueia carregamento em iframes (política de frame-ancestors).
2. Em alguns casos, `wa.me` faz um redirect intermediário para `api.whatsapp.com` que também é bloqueado dentro de iframes.

No site publicado (fora do preview) o link funciona normalmente. Mesmo assim, dá para deixar o clique mais robusto.

## Mudanças em `src/routes/index.tsx`
1. Trocar a tag `<a>` do botão WhatsApp por um `<button>` com handler `onClick` que chama `window.open(url, "_blank", "noopener,noreferrer")`. Isso força a abertura em nova aba/janela do navegador (fora do iframe), evitando o bloqueio.
2. Manter o texto pré-preenchido: `Olá! Quero um orçamento de persianas`.
3. Manter classes/estilos `.link-btn.primary` para não mudar o visual.
4. Nada mais é alterado (catálogo, cores, Instagram, layout).

## Observação para o usuário
- No preview do Lovable o WhatsApp Web pode continuar mostrando bloqueio por causa do iframe — o teste real deve ser feito na URL publicada (`agilpersianas-bio.lovable.app`) ou abrindo o link em nova aba.

## Sobre "excluir isso"
Não ficou claro o que deve ser excluído (as imagens enviadas são: (1) a faixa de cores e (2) o print do erro do WhatsApp). Vou assumir que "isso" = a mensagem de erro do WhatsApp, ou seja, corrigir o comportamento do botão. Se você quis dizer excluir algum elemento da página (ex.: o bloco de cores, o botão de catálogo, etc.), me diga qual e eu ajusto o plano.
