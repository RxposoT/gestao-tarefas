// ============================================================
// index.js — PONTO DE ENTRADA DO SERVIDOR BACKEND
// ============================================================
//
// O que é este ficheiro?
// ----------------------
// Este é o ficheiro principal do servidor. É o primeiro a ser
// executado quando corremos `node src/index.js` ou `npm start`.
//
// O que ele faz?
// --------------
// 1. Importa as bibliotecas necessárias
// 2. Inicializa a base de dados (sql.js precisa de async)
// 3. Cria o servidor Express
// 4. Configura middlewares (cors, json)
// 5. Conecta as rotas da API
// 6. Inicia o servidor e fica à escuta de pedidos
// ============================================================

// --------------------------------------
// 1. Importar o Express
// --------------------------------------
// Express é um framework para Node.js que facilita a criação
// de servidores web e APIs. É o "coração" do nosso backend.
const express = require("express");

// --------------------------------------
// 2. Importar o CORS
// --------------------------------------
// CORS (Cross-Origin Resource Sharing) é um mecanismo de
// segurança dos navegadores. Por defeito, um site em
// http://localhost:5173 (Vite) não consegue fazer pedidos
// a http://localhost:3000 (Express) sem permissão.
const cors = require("cors");

// --------------------------------------
// 3. Importar as funções da base de dados
// --------------------------------------
// Precisamos da função `inicializarDatabase()` para preparar
// a base de dados antes de começar o servidor.
const { inicializarDatabase } = require("./database");

// --------------------------------------
// 4. Importar as rotas de tarefas
// --------------------------------------
const tarefasRouter = require("./routes/tarefasRoutes");

// --------------------------------------
// 5. Função principal (assíncrona)
// --------------------------------------
// Como a inicialização da base de dados é assíncrona,
// criamos uma função main() para usar async/await.
//
// Isto é um padrão comum: uma função auto-invocada
// (async () => { ... })() que corre ao iniciar.
async function main() {
  try {
    // --------------------------------------
    // 5a. Inicializar a base de dados
    // --------------------------------------
    // Antes de criar o servidor, precisamos que a base de
    // dados esteja pronta. Esta função:
    // 1. Carrega o WebAssembly do SQLite
    // 2. Abre ou cria o ficheiro database.sqlite
    // 3. Cria a tabela "tarefas" se não existir
    console.log("🔄 A iniciar base de dados...");
    await inicializarDatabase();
    console.log("✅ Base de dados pronta!");

    // --------------------------------------
    // 5b. Criar a aplicação Express
    // --------------------------------------
    const app = express();

    // --------------------------------------
    // 5c. Middlewares
    // --------------------------------------
    // Middleware = função que processa o pedido ANTES dele
    // chegar à rota final.
    //
    // app.use() → Aplica o middleware a TODOS os pedidos.

    // CORS: Permite pedidos de outras origens
    app.use(cors());

    // JSON: Converte o corpo dos pedidos para objeto JS
    app.use(express.json());

    // --------------------------------------
    // 5d. Montar as rotas da API
    // --------------------------------------
    // app.use(prefixo, router) → "Sempre que alguém aceder
    // a /api/tarefas, usa as rotas definidas em tarefasRouter"
    app.use("/api/tarefas", tarefasRouter);

    // --------------------------------------
    // 5e. Rota de saúde (health check)
    // --------------------------------------
    app.get("/", (req, res) => {
      res.json({
        mensagem: "🚀 API de Gestão de Tarefas no ar!",
        versao: "1.0.0",
        endpoints: {
          listar: "GET /api/tarefas",
          buscar: "GET /api/tarefas/:id",
          criar: "POST /api/tarefas",
          atualizar: "PUT /api/tarefas/:id",
          apagar: "DELETE /api/tarefas/:id",
        },
      });
    });

    // --------------------------------------
    // 5f. Iniciar o servidor
    // --------------------------------------
    const PORTA = 3000;
    app.listen(PORTA, () => {
      console.log(`\n========================================`);
      console.log(`  🚀 Servidor rodando em:`);
      console.log(`  http://localhost:${PORTA}`);
      console.log(`  Endereço da API:`);
      console.log(`  http://localhost:${PORTA}/api/tarefas`);
      console.log(`========================================\n`);
    });
  } catch (erro) {
    // Se a base de dados não conseguir iniciar, o servidor
    // nem sequer começa. Melhor assim do que começar quebrado.
    console.error("❌ Erro fatal ao iniciar o servidor:", erro);
    process.exit(1); // Sai do processo com código de erro
  }
}

// --------------------------------------
// 6. Executar a função principal
// --------------------------------------
main();
