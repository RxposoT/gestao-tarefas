// ============================================================
// postcss.config.js — Configuração do PostCSS
// ============================================================
//
// O que é o PostCSS?
// ------------------
// PostCSS é uma ferramenta que transforma CSS com plugins.
// Pense nela como um "tradutor" que permite usar CSS moderno
// e Tailwind, e depois converte tudo para CSS que qualquer
// navegador entende.
//
// Neste projeto, o PostCSS tem duas funções:
// 1. tailwindcss: Processa as classes do Tailwind
// 2. autoprefixer: Adiciona prefixos automaticamente
//    (ex: -webkit-, -moz-) para funcionar em todos os
//    navegadores.
//
// Fluxo do CSS:
// index.css (com @tailwind) → PostCSS → CSS final no navegador
// ============================================================

export default {
  plugins: {
    // Processa as diretivas @tailwind no nosso CSS
    tailwindcss: {},
    // Adiciona prefixos automaticamente para compatibilidade
    autoprefixer: {},
  },
};
