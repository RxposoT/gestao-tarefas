// ============================================================
// main.jsx — Ponto de entrada do React
// ============================================================
//
// O que faz este ficheiro?
// ------------------------
// 1. Importa o React e o ReactDOM
// 2. Importa o CSS global (que ativa o Tailwind)
// 3. Importa o componente principal (App)
// 4. "Monta" a aplicação React no DOM (na div#root do index.html)
//
// O que é JSX?
// ------------
// JSX é uma extensão de sintaxe para JavaScript que parece HTML.
// Exemplo: <App /> parece HTML, mas é JSX.
//
// O React "transforma" JSX em JavaScript puro:
// <App /> → React.createElement(App)
//
// O Vite trata desta transformação automaticamente!
// ============================================================

// --------------------------------------
// 1. Importar o React
// --------------------------------------
// Mesmo sem usar "React" explicitamente, precisamos importá-lo
// porque o JSX é transformado em React.createElement().
import React from "react";

// --------------------------------------
// 2. Importar o ReactDOM
// --------------------------------------
// ReactDOM é a "ponte" entre o React e o DOM do navegador.
// O DOM (Document Object Model) é a representação da página
// HTML que o navegador usa.
import ReactDOM from "react-dom/client";

// --------------------------------------
// 3. Importar o CSS global (Tailwind)
// --------------------------------------
// Ao importar o CSS aqui, o Vite inclui-o no build final.
// Assim, todas as classes Tailwind ficam disponíveis em
// toda a aplicação.
import "./index.css";

// --------------------------------------
// 4. Importar o componente principal
// --------------------------------------
// O componente App é a "raiz" da nossa aplicação.
// Tudo o que aparece no ecrã está dentro de <App>.
import App from "./App";

// --------------------------------------
// 5. Montar a aplicação React
// --------------------------------------
// createRoot: Cria um "root React" no elemento do DOM com id "root"
//   (que está no index.html)
//
// render: Diz ao React para renderizar o componente <App />
//   dentro desse root.
//
// StrictMode: Um componente especial do React que ativa
// verificações extra em desenvolvimento (não afeta o build).
// Ajuda a detetar problemas como efeitos colaterais.
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
