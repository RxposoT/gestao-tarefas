// ============================================================
// tarefasService.js — SERVIÇO DE API (Frontend)
// ============================================================
//
// O que é este ficheiro?
// ----------------------
// Este ficheiro centraliza TODAS as chamadas à API.
// Em vez de espalhar `fetch()` por todos os componentes,
// colocamos tudo aqui.
//
// Vantagens:
// 1. Se a API mudar de URL, só mudas aqui
// 2. Se quiseres adicionar autenticação, fazes aqui
// 3. Os componentes ficam mais limpos (não sabem fetch)
// 4. Podes testar as chamadas isoladamente
// 5. Tratamento de erros consistente
//
// Arquitetura Frontend:
//
//   Componente (UI) → Service (fetch) → API (backend)
//
// O componente NÃO sabe que existe fetch.
// O service NÃO sabe que existe React.
// ============================================================

// --------------------------------------
// URL base da API
// --------------------------------------
// Em desenvolvimento, o Vite proxy (/api → localhost:3000)
// trata do redirecionamento.
// Em produção, mudarias para o URL real.
const API_URL = "/api/tarefas";

// --------------------------------------
// Função auxiliar: processar resposta da API
// --------------------------------------
// Em vez de repetir a mesma lógica em todas as funções,
// centralizamos aqui o tratamento de respostas.
//
// O que faz:
// 1. Converte a resposta para JSON
// 2. Se a resposta não for OK (ex: 400, 404, 500), lança erro
// 3. Se for OK, devolve os dados
async function processarResposta(resposta) {
  // Converter a resposta para JSON (sempre, mesmo em erros)
  const dados = await resposta.json();

  // Se o status HTTP não for de sucesso (200-299)
  if (!resposta.ok) {
    // Lançar um erro com a mensagem que veio da API
    // Ex: { erro: "O título é obrigatório" }
    throw new Error(dados.erro || "Erro desconhecido na API");
  }

  return dados;
}

// ============================================================
// FUNÇÕES CRUD
// ============================================================
// Cada função:
// 1. Faz um fetch() para a API
// 2. Processa a resposta (JSON + verificação de erro)
// 3. Devolve os dados ou lança erro

// --------------------------------------
// GET /api/tarefas — Listar todas as tarefas
// --------------------------------------
// Exemplo de uso:
//   const tarefas = await listarTarefas();
//   // tarefas = [{ id: 1, titulo: "..." }, ...]
export async function listarTarefas() {
  const resposta = await fetch(API_URL);
  return processarResposta(resposta);
}

// --------------------------------------
// GET /api/tarefas/:id — Buscar uma tarefa
// --------------------------------------
// Exemplo:
//   const tarefa = await buscarTarefa(5);
//   // tarefa = { id: 5, titulo: "...", ... }
export async function buscarTarefa(id) {
  const resposta = await fetch(`${API_URL}/${id}`);
  return processarResposta(resposta);
}

// --------------------------------------
// POST /api/tarefas — Criar nova tarefa
// --------------------------------------
// Parâmetros: { titulo: string, descricao?: string }
// Exemplo:
//   const nova = await criarTarefa({ titulo: "Comprar pão" });
//   // nova = { id: 1, titulo: "Comprar pão", ... }
export async function criarTarefa(dados) {
  const resposta = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(dados),
  });
  return processarResposta(resposta);
}

// --------------------------------------
// PUT /api/tarefas/:id — Atualizar tarefa
// --------------------------------------
// Parâmetros: id (número), dados { titulo?, descricao?, concluida? }
// Exemplo:
//   const atualizada = await atualizarTarefa(1, { concluida: true });
export async function atualizarTarefa(id, dados) {
  const resposta = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(dados),
  });
  return processarResposta(resposta);
}

// --------------------------------------
// DELETE /api/tarefas/:id — Apagar tarefa
// --------------------------------------
// Exemplo:
//   const resultado = await apagarTarefa(1);
//   // resultado = { mensagem: "Tarefa apagada com sucesso" }
export async function apagarTarefa(id) {
  const resposta = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });
  return processarResposta(resposta);
}
