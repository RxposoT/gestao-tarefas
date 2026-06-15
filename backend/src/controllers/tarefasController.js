// ============================================================
// tarefasController.js — CONTROLADOR (recebe req/res)
// ============================================================
//
// O que é um Controller?
// ----------------------
// O Controller é a camada que lida com o pedido HTTP (req)
// e a resposta HTTP (res). Ele NÃO tem SQL nem lógica de
// negócio — chama o Service para isso.
//
// Responsabilidades do Controller:
// 1. Extrair dados do pedido (req.params, req.body, req.query)
// 2. Chamar o Service com esses dados
// 3. Enviar a resposta HTTP adequada (res.json, res.status)
// 4. Tratar erros (try/catch) e responder com código correto
//
// Regra: Controller NÃO sabe o que é SQL ou base de dados.
//         Service NÃO sabe o que é HTTP ou req/res.
// ============================================================

// --------------------------------------
// Importar o Service (NUNCA a Database!)
// --------------------------------------
const tarefasService = require("../services/tarefasService");

// ============================================================
// FUNÇÕES DO CONTROLADOR
// ============================================================
// Cada função recebe (req, res) e segue o mesmo padrão:
//
// async function nome(req, res) {
//   try {
//     // 1. Extrair dados do pedido
//     // 2. Chamar o service
//     // 3. Enviar resposta
//   } catch (erro) {
//     // 4. Tratar erro
//   }
// }

// --------------------------------------
// listar — GET /api/tarefas
// --------------------------------------
function listar(req, res) {
  try {
    // 1. Chamar o service (não precisa de dados do pedido)
    const tarefas = tarefasService.listarTodas();

    // 2. Enviar resposta 200 OK
    res.json(tarefas);
  } catch (erro) {
    tratarErro(res, erro);
  }
}

// --------------------------------------
// buscarPorId — GET /api/tarefas/:id
// --------------------------------------
function buscarPorId(req, res) {
  try {
    // 1. Extrair ID dos parâmetros da rota
    const { id } = req.params;

    // 2. Chamar o service
    const tarefa = tarefasService.buscarPorId(Number(id));

    // 3. Se não encontrou, 404
    if (!tarefa) {
      return res.status(404).json({ erro: "Tarefa não encontrada" });
    }

    // 4. Enviar resposta
    res.json(tarefa);
  } catch (erro) {
    tratarErro(res, erro);
  }
}

// --------------------------------------
// criar — POST /api/tarefas
// --------------------------------------
function criar(req, res) {
  try {
    // 1. Extrair dados do corpo do pedido
    const { titulo, descricao } = req.body;

    // 2. Chamar o service (que valida e insere)
    const tarefa = tarefasService.criar({ titulo, descricao });

    // 3. 201 = Created (recurso criado com sucesso)
    res.status(201).json(tarefa);
  } catch (erro) {
    tratarErro(res, erro);
  }
}

// --------------------------------------
// atualizar — PUT /api/tarefas/:id
// --------------------------------------
function atualizar(req, res) {
  try {
    // 1. Extrair ID e dados
    const { id } = req.params;
    const { titulo, descricao, concluida } = req.body;

    // 2. Chamar o service
    const tarefa = tarefasService.atualizar(Number(id), {
      titulo,
      descricao,
      concluida,
    });

    // 3. Responder com a tarefa atualizada
    res.json(tarefa);
  } catch (erro) {
    tratarErro(res, erro);
  }
}

// --------------------------------------
// apagar — DELETE /api/tarefas/:id
// --------------------------------------
function apagar(req, res) {
  try {
    // 1. Extrair ID
    const { id } = req.params;

    // 2. Chamar o service
    const resultado = tarefasService.apagar(Number(id));

    // 3. Responder com mensagem de sucesso
    res.json(resultado);
  } catch (erro) {
    tratarErro(res, erro);
  }
}

// ============================================================
// FUNÇÃO AUXILIAR: Tratamento centralizado de erros
// ============================================================
// Em vez de try/catch em cada função, podemos centralizar.
// Mas para manter cada controller independente, cada um tem
// o seu próprio try/catch que chama esta função.
//
// O Service lança erros no formato:
//   { status: 400, mensagem: "O título é obrigatório" }
//
// Se for um erro inesperado, usamos 500 (Internal Server Error).
function tratarErro(res, erro) {
  // Se o erro veio do Service (já tem status HTTP definido)
  if (erro.status && erro.mensagem) {
    return res.status(erro.status).json({ erro: erro.mensagem });
  }

  // Se for um erro inesperado (ex: base de dados corrompida)
  console.error("Erro inesperado:", erro);
  return res.status(500).json({
    erro: "Erro interno do servidor. Tenta novamente mais tarde.",
  });
}

// ============================================================
// EXPORTAR funções do controlador
// ============================================================
// Só as Routes importam o Controller.
module.exports = {
  listar,
  buscarPorId,
  criar,
  atualizar,
  apagar,
};
