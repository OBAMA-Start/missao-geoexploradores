# Missão GeoExploradores — Resumo do OA e Correção do `original.html`

**Arquivo corrigido:** `original.html`
**Data:** 2026-09-25
**Público-alvo do OA:** crianças do 1º ao 4º ano do Ensino Fundamental (Geometria / Matemática)

## 1. O que é o OA

Objeto de Aprendizagem (OA) simples, em um único arquivo HTML + CSS + JS, com 3 missões:

| Missão | Título | Habilidade trabalhada | Ação da criança |
|---|---|---|---|
| 1 | Figuras no Mundo Real | Associar sólidos geométricos a objetos do cotidiano (cilindro × cubo) | Clicar na imagem correta (lata = cilindro) |
| 2 | Características das Formas | Contar arestas do cubo (resposta: 12) | Quiz de 3 alternativas (6 / 12 / 8) |
| 3 | Caminhos e Direções | Localização e deslocamento em malha quadriculada (cima/baixo/esquerda/direita) | Mover o robô 🤖 até a bandeira 🏁 numa grade 5×5 |

Fluxo: botões das missões mostram/ocultam cada `<div>`; acerto exibe feedback verde + botão “Ir para próxima missão”; erro exibe feedback vermelho; vitória na Missão 3 exibe mensagem de parabéns.

## 2. Problema de sintaxe encontrado

**Causa única, espalhada pelo arquivo:** todas as aspas duplas de atributos HTML e strings JS estavam duplicadas (`""` em vez de `"`). Contagem antes da correção: **98 ocorrências em 27 linhas**.

Exemplos (antes → depois):

```html
<html lang=""pt-BR"">            →  <html lang="pt-BR">
<meta charset=""UTF-8"" />       →  <meta charset="UTF-8" />
<button class=""mission-btn"" data-mission=""mission1""> → <button class="mission-btn" data-mission="mission1">
<img ... onclick=""mission1Result(true)""> → <img ... onclick="mission1Result(true)">
<button onclick=""move('up')""> → <button onclick="move('up')">
```

**Efeitos:**

1. **HTML:** navegadores são tolerantes e ainda renderizam algo, mas o DOM fica errado (ex.: `lang=""` vazio + atributo fantasma `pt-BR""`, `class`/`id`/`src`/`onclick` não reconhecidos corretamente).
2. **JavaScript (grave):** erro fatal de sintaxe que paralisava **todo** o `<script>`:
   ```js
   const grid = document.getElementById(""grid""); // SyntaxError: missing ) after argument list
   ```
   Comprovado com `node --check` antes da correção. Resultado: nenhum botão, quiz ou grade do robô funcionava.
3. Os `innerHTML` injetados via template literals também geravam HTML quebrado (`<p class=""success"">`, `onclick=""showNext('mission2')""`).

## 3. Correção aplicada

Substituição global em `original.html`: `""` → `"` (**98 substituições**, nenhuma ocorrência legítima de `""` existia no arquivo — strings vazias JS usam `''`).

Verificação após a correção:

- `grep '""' original.html` → 0 ocorrências.
- `node --check` no JS extraído → **OK**.
- Parser HTML (`html.parser`) → nenhuma tag sem fechar, nenhum `</...>` incompatível; `lang="pt-BR"` e `charset="UTF-8"` presentes.
- Servido com `python3 -m http.server` → `HTTP 200, 6870 bytes` em `/original.html`.
- Teste funcional com stub de DOM em Node → **OK**: `mission1Result`, `mission2Result`, `showNext`, `move`, `renderGrid`, `checkVictory` existem; feedback correto/incorreto exibido; robô vai de (0,0) a (4,4) respeitando bordas; mensagem de vitória aparece.
- Tentativa de teste em navegador automatizado não foi possível (navegador desktop desconectado nesta sessão); validação foi feita por parsing + `node --check` + teste de comportamento + `curl`.

## 4. Como abrir e testar (roteiro de 1 minuto)

1. Duplo clique em `original.html`, **ou** sirva localmente:
   ```bash
   python3 -m http.server 8099
   # abrir http://127.0.0.1:8099/original.html
   ```
2. Clicar em **Missão 1** → clicar na lata (acerto) → botão “Ir para Missão 2”.
3. **Missão 2** → clicar em **12** → botão “Ir para Missão 3”.
4. **Missão 3** → usar ⬆️⬇️⬅️➡️ até levar 🤖 a 🏁 (4× direita + 4× baixo a partir do início) → mensagem “Parabéns!”.

## 5. Observações e melhorias sugeridas (não aplicadas)

- Imagens carregadas da Wikimedia (dependem de internet; considerar baixar localmente).
- Acessibilidade para 1º–4º ano: aumentar fonte/botões, adicionar leitura em voz alta e `aria-labels`, suporte a teclado na Missão 3.
- Feedback atual usa só cor + emoji; reforço sonoro ajudaria crianças pequenas.
- Grade 5×5 fixa; nível progressivo (obstáculos, menos cliques) seria um bom próximo passo pedagógico.
