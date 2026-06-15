// ============================================================
// App.jsx — Componente PRINCIPAL da aplicação
// ============================================================
//
// O que é o App?
// --------------
// É o componente raiz, o "pai" de todos os outros.
// Tudo o que aparece no ecrã está dentro de <App>.
//
// Responsabilidades do App:
// 1. Gerir o estado global (lista de tarefas)
// 2. COMUNICAR COM A API através do SERVICE (não usa fetch direto)
// 3. Passar dados e funções para os componentes filhos
// 4. Coordenar o fluxo: criar, ler, atualizar, apagar
//
// FLUXO DE DADOS (Data Flow):
// ============================
// 
//   Service (fetch) ←→ App.jsx ←→ FormularioTarefa
//                            ↕
//                       ListaTarefas
//                            ↕
//                       ItemTarefa
//
// NOTA: App.jsx NÃO tem fetch() direto!
//       Toda a comunicação com a API está no Service.
// ============================================================

// --------------------------------------
// 1. Hooks do React
// --------------------------------------
import { useState, useEffect, useCallback } from "react";

// --------------------------------------
// 2. Importar o SERVICE (NUNCA fetch direto!)
// --------------------------------------
// O service contém TODAS as chamadas à API.
// O componente só chama funções como:
//   listarTarefas(), criarTarefa(), etc.
//
// Isto é uma boa prática porque:
// - Separa a lógica de rede da lógica da UI
// - Se a API mudar, só alteras o service
// - Podes testar o service isoladamente
import {
  listarTarefas,
  criarTarefa,
  atualizarTarefa,
  apagarTarefa,
} from "./services/tarefasService";

// --------------------------------------
// 3. Importar os componentes filhos
// --------------------------------------
import FormularioTarefa from "./components/FormularioTarefa";
import ListaTarefas from "./components/ListaTarefas";

// ==========================================================
// COMPONENTE PRINCIPAL
// ==========================================================
export default function App() {
  // ==========================================================
  // ESTADOS (useState)
  // ==========================================================
  const [tarefas, setTarefas] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);
  const [tarefaEditando, setTarefaEditando] = useState(null);

  // ==========================================================
  // useEffect: Buscar dados ao montar o componente
  // ==========================================================
  useEffect(() => {
    carregarTarefas();
  }, []);

  // ==========================================================
  // FUNÇÃO: Carregar tarefas (usa o SERVICE)
  // ==========================================================
  // Antes: const resposta = await fetch(API_URL);
  //        const dados = await resposta.json();
  //
  // Agora: const dados = await listarTarefas();
  //
  // O service trata do fetch, do JSON, e dos erros!
  const carregarTarefas = useCallback(async () => {
    try {
      setCarregando(true);
      setErro(null);

      // ⭐ Chamar o service (não há fetch aqui!)
      const dados = await listarTarefas();

      setTarefas(dados);
    } catch (erro) {
      console.error("Erro ao buscar tarefas:", erro);
      setErro("Não foi possível carregar as tarefas. Verifica se o servidor está ligado.");
    } finally {
      setCarregando(false);
    }
  }, []);

  // ==========================================================
  // FUNÇÃO: Salvar tarefa (criar ou atualizar)
  // ==========================================================
  // Usa o service: criarTarefa() ou atualizarTarefa()
  const salvarTarefa = useCallback(
    async (dadosTarefa) => {
      try {
        if (tarefaEditando) {
          // 📝 EDITAR: chama atualizarTarefa() do service
          await atualizarTarefa(tarefaEditando.id, dadosTarefa);
        } else {
          // ➕ CRIAR: chama criarTarefa() do service
          await criarTarefa(dadosTarefa);
        }

        // Recarregar a lista (sempre)
        await carregarTarefas();
        setTarefaEditando(null);
      } catch (erro) {
        // O erro já vem formatado do service
        throw erro; // O formulário trata de mostrar o erro
      }
    },
    [tarefaEditando, carregarTarefas]
  );

  // ==========================================================
  // FUNÇÃO: Alternar conclusão
  // ==========================================================
  const alternarConclusao = useCallback(
    async (id, concluida) => {
      try {
        // ⭐ Usa o service
        await atualizarTarefa(id, { concluida });
        await carregarTarefas();
      } catch (erro) {
        console.error("Erro ao alternar conclusão:", erro);
        setErro("Erro ao atualizar tarefa.");
      }
    },
    [carregarTarefas]
  );

  // ==========================================================
  // FUNÇÃO: Apagar tarefa
  // ==========================================================
  const apagarTarefaCallback = useCallback(
    async (id) => {
      try {
        // ⭐ Usa o service
        await apagarTarefa(id);
        await carregarTarefas();
      } catch (erro) {
        console.error("Erro ao apagar tarefa:", erro);
        setErro("Erro ao apagar tarefa.");
      }
    },
    [carregarTarefas]
  );

  // ==========================================================
  // FUNÇÃO: Iniciar edição
  // ==========================================================
  const editarTarefa = useCallback((tarefa) => {
    setTarefaEditando(tarefa);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  // ==========================================================
  // FUNÇÃO: Cancelar edição
  // ==========================================================
  const cancelarEdicao = useCallback(() => {
    setTarefaEditando(null);
  }, []);

  // ==========================================================
  // RENDERIZAÇÃO
  // ==========================================================
  return (
    <div className="min-h-screen bg-gray-100">
      {/* CABEÇALHO */}
      <header className="bg-gradient-to-r from-blue-600 to-blue-800 text-white shadow-lg">
        <div className="max-w-2xl mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold">📋 Gestão de Tarefas</h1>
          <p className="text-blue-200 mt-1">
            Aprende React + Express + CRUD na prática!
          </p>
        </div>
      </header>

      {/* CONTEÚDO */}
      <main className="max-w-2xl mx-auto px-4 py-8">
        {/* MENSAGEM DE ERRO */}
        {erro && (
          <div className="mb-6 p-4 bg-red-100 border-l-4 border-red-500 text-red-700 rounded-md">
            <p className="font-medium">❌ Erro</p>
            <p className="text-sm">{erro}</p>
            <button
              onClick={() => setErro(null)}
              className="text-sm underline mt-1 hover:text-red-900"
            >
              Fechar
            </button>
          </div>
        )}

        {/* FORMULÁRIO */}
        <FormularioTarefa
          onSubmit={salvarTarefa}
          tarefaEditando={tarefaEditando}
        />

        {/* CANCELAR EDIÇÃO */}
        {tarefaEditando && (
          <div className="mb-4">
            <button
              onClick={cancelarEdicao}
              className="text-sm text-gray-500 hover:text-gray-700 underline"
            >
              ← Cancelar edição
            </button>
          </div>
        )}

        {/* LISTA / CARREGAMENTO */}
        {carregando ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-blue-500 border-t-transparent"></div>
            <p className="text-gray-500 mt-2">A carregar tarefas...</p>
          </div>
        ) : (
          <ListaTarefas
            tarefas={tarefas}
            onToggle={alternarConclusao}
            onEditar={editarTarefa}
            onApagar={apagarTarefaCallback}
          />
        )}
      </main>

      {/* RODAPÉ */}
      <footer className="text-center py-6 text-gray-400 text-sm">
        <p>Feito para aprender 🚀 • React + Express + SQLite + Tailwind</p>
        <p className="mt-1">Projeto de Gestão de Tarefas — CRUD Completo</p>
      </footer>
    </div>
  );
}
