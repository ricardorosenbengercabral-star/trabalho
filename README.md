# Sol & Água — Piscina Térmica do CEP

Site do Projeto Integrador: aquecimento solar automatizado e acessível para a piscina térmica do CEP.

## Estrutura

- `index.html` — todas as seções do site (início, o desafio, óptica, automação, simulador, acessibilidade, impacto, equipe/contato).
- `style.css` — tema visual (água + sol), responsividade e o modo de alto contraste.
- `script.js` — menu mobile, disco de Newton animado, simulador de eficiência do coletor, alto contraste, ajuste de fonte e formulário de contato.

## Sobre as imagens

Todos os diagramas (coletor solar, disco de Newton, câmara escura/simulador, fluxograma de sensores e
atuadores) foram desenhados diretamente em **SVG dentro do `index.html`**. Isso significa que não é
necessário anexar nenhuma foto ou imagem externa: os desenhos já ficam nítidos em qualquer tela, carregam
rápido e cada um tem `<title>`/`<desc>` para leitores de tela, o que também ajuda no critério de
acessibilidade digital.

Se a equipe quiser trocar algum SVG por uma foto real (por exemplo, uma foto da própria piscina do CEP),
basta criar uma pasta `assets/` e trocar o bloco `<svg>...</svg>` correspondente por uma tag `<img>`
apontando para o arquivo, com um `alt` descritivo.

## Como usar

Abra `index.html` em qualquer navegador — não depende de servidor ou de instalação de nada.

## Como publicar (GitHub Pages)

1. Suba os três arquivos (`index.html`, `style.css`, `script.js`) para a raiz do repositório.
2. Em *Settings → Pages*, selecione a branch `main` e a pasta raiz (`/`).
3. O site ficará disponível em `https://<usuario>.github.io/<repositorio>/`.
