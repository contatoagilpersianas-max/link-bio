## Plano

1. **Corrigir o WhatsApp bloqueado**
   - Trocar o botão com `window.open()` por um link `<a>` direto para o WhatsApp.
   - Usar `https://api.whatsapp.com/send?phone=553235210281&text=...`, que costuma funcionar melhor em previews/iframes e já abre com a mensagem pronta.
   - Remover `noreferrer` do link do WhatsApp, mantendo abertura em nova aba.

2. **Melhorar a página sem mudar a estrutura principal**
   - Deixar os botões mais profissionais e legíveis no mobile.
   - Melhorar o modal do “Blackout Texturizado” para valorizar a imagem das cores, com imagem maior e amostras organizadas.
   - Corrigir pequenos textos/acentos, se necessário, mantendo o estilo da página atual.

3. **Revisar links visíveis**
   - O link “Ver catálogo completo” ainda aponta para `https://SEUSITE.com`; substituir por um link real se você me passar, ou deixar como está se ainda não tiver catálogo.

4. **Validar no preview**
   - Conferir se o botão do WhatsApp aparece como link real e abre a URL correta com a mensagem preenchida.
   - Conferir se o modal do Blackout Texturizado continua abrindo corretamente.