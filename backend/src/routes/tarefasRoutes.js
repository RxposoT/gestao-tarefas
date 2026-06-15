// ============================================================
// tarefasRoutes.js — ROTAS (definição dos endpoints)
// ============================================================
//
// O que faz este ficheiro?
// ------------------------
// Apenas DEFINE as rotas (endpoints) e liga cada uma ao
// Controller correspondente. NÃO tem lógica nenhuma além
// disso.
//
// Separação clara:
//
//   routes/tarefasRoutes.js    → "GET / chama controller.listar"
//   controllers/tarefasController.js → "req/res, chama service"
//   services/tarefasService.js → "lógica de negócio + SQL"
//   database.js                → "conexão à base de dados"
//
// Benefícios:
// - Se quiseres saber que rotas existem, vens aqui
// - Se quiseres mudar a lógica, vais ao service
// - Se quiseres mudar respostas HTTP, vais ao controller
// - Cada ficheiro é pequeno e focado
// ============================================================

// --------------------------------------
// Importar o Router do Express
// --------------------------------------
const { Router } = require("express");

// --------------------------------------
// Importar o Controller (NUNCA o Service ou Database!)
// --------------------------------------
const tarefasController = require("../controllers/tarefasController");

// --------------------------------------
// Criar o Router
// --------------------------------------
const router = Router();

// ============================================================
// DEFINIÇÃO DAS ROTAS
// ============================================================
//
// CRUD:
// C → POST   → /api/tarefas        → controller.criar
// R → GET    → /api/tarefas        → controller.listar
// R → GET    → /api/tarefas/:id    → controller.buscarPorId
// U → PUT    → /api/tarefas/:id    → controller.atualizar
// D → DELETE → /api/tarefas/:id    → controller.apagar

// GET /api/tarefas — Listar todas
router.get("/", tarefasController.listar);

// GET /api/tarefas/:id — Buscar uma específica
router.get("/:id", tarefasController.buscarPorId);

// POST /api/tarefas — Criar nova
router.post("/", tarefasController.criar);

// PUT /api/tarefas/:id — Atualizar existente
router.put("/:id", tarefasController.atualizar);

// DELETE /api/tarefas/:id — Apagar
router.delete("/:id", tarefasController.apagar);

// ============================================================
// Exportar o router
// ============================================================
module.exports = router;
