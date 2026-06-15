// ============================================================
// vite.config.js — Configuração do Vite
// ============================================================
//
// O que é o Vite?
// ----------------
// Vite (pronuncia-se "vite", francês para "rápido") é uma
// ferramenta de desenvolvimento para projetos web. Substitui
// o Create React App (CRA) que era usado antes.
//
// Porquê Vite em vez de CRA?
// - Muito mais rápido (usa ES modules nativos)
// - Hot Reload instantâneo (muda o código, vê na hora)
// - Configuração mais simples
// - Suporte nativo a CSS, imagens, etc.
//
// O que fazemos aqui?
// - Dizemos ao Vite para usar o plugin do React
// - Configuramos o proxy da API para evitar CORS em dev
// ============================================================

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  // ------------------------------------------------
  // Plugins: extensões que aumentam as capacidades do Vite
  // ------------------------------------------------
  plugins: [react()],

  // ------------------------------------------------
  // Server: configurações do servidor de desenvolvimento
  // ------------------------------------------------
  server: {
    // Porta onde o frontend vai rodar
    port: 5173,

    // ------------------------------------------------
    // Proxy: "ponte" entre frontend e backend
    // ------------------------------------------------
    // PROBLEMA: O frontend está em localhost:5173
    //           O backend  está em localhost:3000
    // Se o frontend fizer fetch("/api/tarefas"), ele tenta
    // buscar em localhost:5173/api/tarefas — e não encontra.
    //
    // SOLUÇÃO: O proxy redireciona pedidos que começam com
    // /api para o backend em localhost:3000.
    //
    // Assim, no código do frontend, podemos escrever:
    //   fetch("/api/tarefas")
    // Em vez de:
    //   fetch("http://localhost:3000/api/tarefas")
    //
    // Isto também evita problemas de CORS em desenvolvimento.
    proxy: {
      "/api": {
        target: "http://localhost:3000",
        changeOrigin: true,
      },
    },
  },
});
