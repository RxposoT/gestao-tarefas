// ============================================================
// database.js — Configuração do Banco de Dados SQLite
// ============================================================
//
// O que é este ficheiro?
// ----------------------
// Este ficheiro é responsável por criar e configurar a nossa
// base de dados. Usamos SQLite através da biblioteca sql.js.
//
// O que é o sql.js?
// -----------------
// sql.js é uma versão do SQLite compilada para JavaScript
// (via WebAssembly). Isto significa que não precisamos de
// instalar ferramentas de compilação C — funciona em qualquer
// sistema com Node.js.
//
// Diferença entre sql.js e better-sqlite3:
// - better-sqlite3: Mais rápido, mas precisa de compilação
// - sql.js: Um pouco mais lento, mas 100% JavaScript
// - Ambos fazem o mesmo: SQLite em Node.js
//
// Porquê SQLite?
// --------------
// Para aprender, SQLite é perfeito porque:
// 1. Não precisa instalar MySQL/PostgreSQL
// 2. Não precisa de servidor de base de dados
// 3. O banco é um único ficheiro que podes apagar à vontade
// 4. Usa SQL padrão que funciona igual em outros bancos
// ============================================================

// --------------------------------------
// 1. Importar módulos necessários
// --------------------------------------
// `path` é nativo do Node — ajuda com caminhos de ficheiros
// `fs` é nativo do Node — permite ler/escrever ficheiros
// `sql.js` é o pacote que instalamos com npm
const path = require("path");
const fs = require("fs");
const initSqlJs = require("sql.js");

// --------------------------------------
// 2. Definir o caminho do ficheiro da base de dados
// --------------------------------------
const DB_PATH = path.join(__dirname, "..", "database.sqlite");

// --------------------------------------
// 3. Variável global para a base de dados
// --------------------------------------
// Vamos guardar a conexão à BD nesta variável.
// Inicialmente é null, e é preenchida quando chamarmos
// a função `inicializarDatabase()`.
let db = null;

// --------------------------------------
// 4. Função para inicializar a base de dados
// --------------------------------------
// Como sql.js é assíncrono (precisa carregar WebAssembly),
// criamos uma função async que:
// 1. Carrega o motor SQL.js
// 2. Abre a base de dados existente OU cria uma nova
// 3. Cria a tabela de tarefas (se não existir)
// 4. Retorna o objeto db pronto a usar
//
// async = função assíncrona (devolve uma Promise)
// await = espera pela Promise
async function inicializarDatabase() {
  // --------------------------------------
  // 4a. Inicializar o motor SQL.js
  // --------------------------------------
  // initSqlJs() carrega o WebAssembly do SQLite.
  // É como "iniciar o programa SQLite" dentro do Node.
  const SQL = await initSqlJs();

  // --------------------------------------
  // 4b. Verificar se já existe um ficheiro de base de dados
  // --------------------------------------
  // fs.existsSync(DB_PATH): Verifica se o ficheiro existe
  // Se existir, carregamos esse ficheiro.
  // Se não existir, criamos uma base de dados nova em branco.
  if (fs.existsSync(DB_PATH)) {
    // Ler o ficheiro existente
    const buffer = fs.readFileSync(DB_PATH);
    // Criar base de dados a partir do ficheiro lido
    db = new SQL.Database(buffer);
    console.log("📂 Base de dados carregada do ficheiro existente.");
  } else {
    // Criar base de dados nova (vazia)
    db = new SQL.Database();
    console.log("🆕 Nova base de dados criada.");
  }

  // --------------------------------------
  // 4c. Criar a tabela de tarefas (se não existir)
  // --------------------------------------
  // db.run(SQL) executa uma query SQL sem devolver resultados.
  // É usado para CREATE TABLE, INSERT, UPDATE, DELETE.
  db.run(`
    CREATE TABLE IF NOT EXISTS tarefas (
      id            INTEGER PRIMARY KEY AUTOINCREMENT,
      titulo        TEXT    NOT NULL,
      descricao     TEXT    DEFAULT '',
      concluida     INTEGER DEFAULT 0,
      criada_em     TEXT    DEFAULT (datetime('now', 'localtime')),
      atualizada_em TEXT    DEFAULT (datetime('now', 'localtime'))
    )
  `);

  // Guardar as alterações no disco
  salvarDatabase();

  console.log("✅ Tabela 'tarefas' pronta!");
  return db;
}

// --------------------------------------
// 5. Função para guardar a base de dados no disco
// --------------------------------------
// sql.js mantém a base de dados em memória.
// Precisamos de a guardar explicitamente no ficheiro
// para não perder os dados quando o servidor reiniciar.
function salvarDatabase() {
  if (db) {
    // db.export() devolve um Uint8Array (bytes) com o
    // conteúdo completo da base de dados.
    const dados = db.export();
    // Escrever esses bytes no ficheiro .sqlite
    fs.writeFileSync(DB_PATH, Buffer.from(dados));
  }
}

// --------------------------------------
// 6. Wrappers para operações comuns da base de dados
// --------------------------------------
// Para tornar o código mais parecido com o better-sqlite3
// e mais fácil de usar nas rotas, criamos funções auxiliares
// que encapsulam a API do sql.js.
//
// Isto é uma boa prática: se um dia mudares de biblioteca,
// só precisas de alterar ESTE ficheiro!

/**
 * dbAll: Executa uma query SELECT e devolve TODAS as linhas
 * 
 * @param {string} sql - A query SQL (ex: "SELECT * FROM tarefas")
 * @param {Array} params - Parâmetros para os placeholders (ex: [id])
 * @returns {Array} Array de objetos (as linhas da tabela)
 * 
 * Exemplo:
 *   const tarefas = dbAll("SELECT * FROM tarefas WHERE concluida = ?", [1])
 *   // Resultado: [{ id: 1, titulo: "..." }, { id: 2, titulo: "..." }]
 */
function dbAll(sql, params = []) {
  // Preparar a query (compila o SQL)
  const stmt = db.prepare(sql);
  // Ligar os parâmetros aos placeholders (os ?)
  stmt.bind(params);
  
  // Array para guardar os resultados
  const resultados = [];
  
  // stmt.step() avança para a próxima linha
  // Enquanto houver linhas, continuamos
  while (stmt.step()) {
    // stmt.getAsObject() devolve a linha atual como objeto
    // Exemplo: { id: 1, titulo: "Comprar pão", concluida: 0 }
    resultados.push(stmt.getAsObject());
  }
  
  // Libertar a query (importante para evitar fugas de memória)
  stmt.free();
  
  return resultados;
}

/**
 * dbGet: Executa uma query e devolve APENAS a primeira linha
 * 
 * @param {string} sql - Query SQL
 * @param {Array} params - Parâmetros
 * @returns {object|null} A primeira linha ou null se não existir
 */
function dbGet(sql, params = []) {
  const stmt = db.prepare(sql);
  stmt.bind(params);
  
  let resultado = null;
  if (stmt.step()) {
    resultado = stmt.getAsObject();
  }
  
  stmt.free();
  return resultado;
}

/**
 * dbRun: Executa uma query que NÃO devolve linhas
 * (INSERT, UPDATE, DELETE)
 * 
 * @param {string} sql - Query SQL
 * @param {Array} params - Parâmetros
 * @returns {object} Objeto com informações da operação
 */
function dbRun(sql, params = []) {
  db.run(sql, params);
  
  // Guardar alterações no disco
  salvarDatabase();
  
  // Devolver informações úteis
  return {
    changes: db.getRowsModified(), // Número de linhas modificadas
  };
}

/**
 * dbRunInsert: Como dbRun, mas devolve o ID do último insert
 * 
 * @param {string} sql - Query SQL (INSERT)
 * @param {Array} params - Parâmetros
 * @returns {number} O ID da nova linha inserida
 */
function dbRunInsert(sql, params = []) {
  db.run(sql, params);
  salvarDatabase();
  
  // No sql.js, para obter o último ID inserido, fazemos
  // uma query especial: "SELECT last_insert_rowid()"
  const resultado = db.exec("SELECT last_insert_rowid()");
  return resultado[0].values[0][0];
}

// --------------------------------------
// 7. Exportar as funções para uso nas rotas
// --------------------------------------
// Em vez de exportar o objeto db diretamente (como fazíamos
// com better-sqlite3), exportamos as funções auxiliares.
//
// Isto é melhor porque:
// - Escondemos a complexidade do sql.js
// - As rotas ficam mais limpas
// - Se mudarmos de biblioteca, só mudamos este ficheiro
module.exports = {
  inicializarDatabase,
  dbAll,
  dbGet,
  dbRun,
  dbRunInsert,
};
