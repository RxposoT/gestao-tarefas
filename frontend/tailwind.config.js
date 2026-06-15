// ============================================================
// tailwind.config.js — Configuração do Tailwind CSS
// ============================================================
//
// O que é o Tailwind CSS?
// -----------------------
// Tailwind é uma biblioteca CSS "utility-first". Em vez de
// escrever CSS personalizado, usamos classes pequenas e
// atómicas diretamente no HTML/JSX.
//
// Exemplo:
// ❌ CSS tradicional:
//    .botao { background-color: blue; color: white; padding: 8px 16px; border-radius: 4px; }
//
// ✅ Com Tailwind:
//    <button class="bg-blue-500 text-white px-4 py-2 rounded">
//
// Vantagens:
// - Não precisas de inventar nomes de classes
// - O CSS é consistente (cores, espaçamentos, etc)
// - Menos ficheiros CSS para gerir
// - O build final só inclui as classes que usaste (muito leve)
// ============================================================

/** @type {import('tailwindcss').Config} */
export default {
  // ------------------------------------------------
  // content: Onde o Tailwind deve procurar por classes
  // ------------------------------------------------
  // O Tailwind "varre" estes ficheiros à procura de classes
  // usadas. Só as classes encontradas aqui serão incluídas
  // no CSS final (isto mantém o ficheiro pequeno).
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],

  // ------------------------------------------------
  // theme: Personalizar o tema padrão
  // ------------------------------------------------
  // Aqui podes estender as cores, fontes, espaçamentos, etc.
  // Vamos só usar o tema padrão por enquanto.
  theme: {
    extend: {},
  },

  // ------------------------------------------------
  // plugins: Plugins adicionais do Tailwind
  // ------------------------------------------------
  plugins: [],
};
