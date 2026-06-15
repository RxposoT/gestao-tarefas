// ============================================================
// tarefasService.js — SERVIÇO (Lógica de Negócio + SQL)
// ============================================================
//
// O que é um Service?
// -------------------
// O Service é a camada intermédia entre o Controller e a
// Database. Ele contém TODA a lógica de negócio e as queries
// SQL. O Controller NÃO deve saber SQL — ele só gere pedidos
// e respostas HTTP.
//
// Arquitetura (separação de responsabilidades):
//
//   Route (rota) → Controller (pedido/resposta)
//                  → Service (lógica de negócio + SQL)
//                     → Database (dados)
//
// Vantagens desta separação:
// 1. Código mais organizado e fácil de dar manutenção
// 2. Podes testar o service sem precisar de HTTP
// 3. Podes reutilizar o service noutros controllers
// 4. Cada camada tem uma responsabilidade única
//
// Regra: Este ficheiro NÃO sabe o que é req, res, HTTP...
//         Só trabalha com dados puros (objetos, arrays)
// ============================================================

// --------------------------------------
// Importar as funções da base de dados
// --------------------------------------
// Só o Service fala com a Database!
// Routes e Controllers NÃO importam database diretamente.
const { dbAll, dbGet, dbRun } = require("../database");

// ============================================================
// CONSTANTES
// ============================================================
// NUNCA uses "magic numbers" (números soltos sem contexto).
// Define constantes com nomes descritivos.

// Erros comuns que o serviço pode retornar
const ERRO_TITULO_OBRIGATORIO = "O título é obrigatório";
const ERRO_TITULO_VAZIO = "O título não pode estar vazio";
const ERRO_NAO_ENCONTRADA = "Tarefa não encontrada";
const ERRO_SEM_CAMPOS = "Nenhum campo para atualizar";
const SUCESSO_APAGADA = "Tarefa apagada com sucesso";

// ============================================================
// FUNÇÕES DO SERVIÇO (CRUD)
// ============================================================
// Cada função é:
// 1. Pura (recebe dados, devolve dados, não lida com HTTP)
// 2. Independente (podes chamar de qualquer sítio)
// 3. Testável (testes unitários sem precisar de servidor)

// --------------------------------------
// listarTodas — Busca todas as tarefas
// --------------------------------------
// Retorna: Array de tarefas (ordenadas da mais recente para a mais antiga)
function listarTodas() {
  return dbAll("SELECT * FROM tarefas ORDER BY criada_em DESC");
}

// --------------------------------------
// buscarPorId — Busca UMA tarefa pelo ID
// --------------------------------------
// Parâmetros: id (número)
// Retorna: Objeto da tarefa ou null se não existir
function buscarPorId(id) {
  return dbGet("SELECT * FROM tarefas WHERE id = ?", [id]);
}

// --------------------------------------
// criar — Cria uma nova tarefa
// --------------------------------------
// Parâmetros: dados { titulo, descricao? }
// Retorna: Objeto da tarefa criada
// Lança: Erro se título estiver vazio
function criar(dados) {
  // 1. VALIDAÇÃO dos dados
  //    O Service valida a lógica de negócio.
  //    O Controller valida o formato do pedido HTTP.
  if (!dados.titulo || dados.titulo.trim() === "") {
    // Em vez de res.status(400).json(...), lançamos um erro
    // com um código e mensagem. O controller decide o HTTP.
    throw { status: 400, mensagem: ERRO_TITULO_OBRIGATORIO };
  }

  // 2. Inserir na base de dados
  dbRun(
    "INSERT INTO tarefas (titulo, descricao) VALUES (?, ?)",
    [dados.titulo.trim(), dados.descricao?.trim() || ""]
  );

  // 3. Buscar a tarefa que acabámos de criar
  const tarefa = dbGet("SELECT * FROM tarefas WHERE id = (SELECT max(id) FROM tarefas)");

  return tarefa;
}

// --------------------------------------
// atualizar — Atualiza uma tarefa existente
// --------------------------------------
// Parâmetros: id (número), dados { titulo?, descricao?, concluida? }
// Retorna: Objeto da tarefa atualizada
// Lança: Erro se não existir ou se título for vazio
function atualizar(id, dados) {
  // 1. Verificar se a tarefa existe
  const tarefaExistente = buscarPorId(id);
  if (!tarefaExistente) {
    throw { status: 404, mensagem: ERRO_NAO_ENCONTRADA };
  }

  // 2. Validar campos
  if (dados.titulo !== undefined && dados.titulo.trim() === "") {
    throw { status: 400, mensagem: ERRO_TITULO_VAZIO };
  }

  // 3. Construir SQL dinamicamente (só atualiza o que veio)
  const campos = [];
  const valores = [];

  if (dados.titulo !== undefined) {
    campos.push("titulo = ?");
    valores.push(dados.titulo.trim());
  }
  if (dados.descricao !== undefined) {
    campos.push("descricao = ?");
    valores.push(dados.descricao);
  }
  if (dados.concluida !== undefined) {
    campos.push("concluida = ?");
    valores.push(dados.concluida ? 1 : 0);
  }

  if (campos.length === 0) {
    throw { status: 400, mensagem: ERRO_SEM_CAMPOS };
  }

  // 4. Atualizar data da modificação
  campos.push("atualizada_em = datetime('now', 'localtime')");

  // 5. Executar UPDATE
  valores.push(id);
  dbRun(`UPDATE tarefas SET ${campos.join(", ")} WHERE id = ?`, valores);

  // 6. Devolver a tarefa atualizada
  return buscarPorId(id);
}

// --------------------------------------
// apagar — Apaga uma tarefa
// --------------------------------------
// Parâmetros: id (número)
// Retorna: Mensagem de sucesso
// Lança: Erro se não existir
function apagar(id) {
  // 1. Verificar se existe
  const tarefa = buscarPorId(id);
  if (!tarefa) {
    throw { status: 404, mensagem: ERRO_NAO_ENCONTRADA };
  }

  // 2. Apagar
  dbRun("DELETE FROM tarefas WHERE id = ?", [id]);

  return { mensagem: SUCESSO_APAGADA };
}

// ============================================================
// EXPORTAR funções do serviço
// ============================================================
// Só o Controller importa o Service.
// As Routes importam o Controller.
module.exports = {
  listarTodas,
  buscarPorId,
  criar,
  atualizar,
  apagar,
};
