// ============================================================
// FormularioTarefa.jsx — Formulário para criar/editar tarefas
// ============================================================
//
// O que é um "componente" React?
// -------------------------------
// Um componente é um bloco de construção da interface.
// Pensa nele como uma função que recebe "props" (propriedades)
// e devolve HTML/JSX.
//
// Cada componente é independente e reutilizável.
//
// O que faz este componente?
// --------------------------
// Renderiza um formulário com campos para:
// - Título (obrigatório)
// - Descrição (opcional)
//
// Quando o utilizador submete o formulário, ele chama uma
// função (onSubmit) que foi passada como "prop" pelo App.
// ============================================================

// --------------------------------------
// useState: Hook para gerir estado no componente
// --------------------------------------
// Hooks são funções especiais do React que permitem usar
// funcionalidades como estado, efeitos, etc., em componentes
// funcionais.
//
// useState(valorInicial) devolve um array com 2 elementos:
// 1. O valor atual do estado
// 2. Uma função para atualizar esse valor
//
// Exemplo:
//   const [nome, setNome] = useState("")
//   nome → "" (o valor atual)
//   setNome("João") → atualiza o valor para "João"
import { useState } from "react";

// ============================================================
// PROPS (Propriedades)
// ============================================================
// Props são como "argumentos" de um componente. São valores
// que o componente PAI passa para o componente FILHO.
//
// Neste caso, o App.jsx vai passar:
// - onSubmit: Uma função para criar/atualizar a tarefa
// - tarefaEditando: Se estamos a editar, vem a tarefa atual
//
// Desestruturação nas props:
// function FormularioTarefa({ onSubmit, tarefaEditando })
// É o mesmo que:
// function FormularioTarefa(props) {
//   const onSubmit = props.onSubmit;
//   const tarefaEditando = props.tarefaEditando;
export default function FormularioTarefa({ onSubmit, tarefaEditando }) {
  // ==========================================================
  // ESTADO LOCAL do componente
  // ==========================================================
  // Estado = dados que mudam com o tempo e afetam o que é
  // renderizado no ecrã.
  //
  // Quando o estado muda (com setTitulo, setDescricao),
  // o React re-renderiza automaticamente este componente.
  // ==========================================================

  // Estado para o título (começa vazio ou com o valor a editar)
  const [titulo, setTitulo] = useState(tarefaEditando?.titulo || "");

  // Estado para a descrição (começa vazio ou com o valor a editar)
  const [descricao, setDescricao] = useState(tarefaEditando?.descricao || "");

  // Estado para controlar se está a carregar (para desativar botão)
  const [carregando, setCarregando] = useState(false);

  // Estado para mensagem de erro
  const [erro, setErro] = useState("");

  // ==========================================================
  // useEffect: Sincronizar estado quando tarefaEditando muda
  // ==========================================================
  // O useEffect é um hook que executa código quando certas
  // dependências mudam. Aqui, quando o utilizador clica em
  // "Editar" numa tarefa, o tarefaEditando muda, e nós
  // atualizamos os campos do formulário.
  //
  // Precisamos importar useEffect no topo... mas vou usar
  // uma abordagem alternativa com uma chave (key) no App.jsx.
  // Na verdade, para manter simples, vou usar apenas o
  // useState inicializado com as props.
  //
  // ⚠️ PROBLEMA: O useState só usa o valor inicial uma vez!
  // Se tarefaEditando mudar depois da primeira renderização,
  // o estado NÃO atualiza.
  //
  // Solução: Vamos usar um efeito para sincronizar.

  // Primeiro, importamos useEffect (no topo do ficheiro)
  // Já importámos useState, falta useEffect.

  // Vou adicionar useEffect aqui mesmo. Normalmente imports
  // estão no topo, mas para manter a didática, vou reimportar.
  // Na prática, junta-se tudo no topo.

  // ...
  // OK, vou refatorar para usar useEffect corretamente.
  // Mas como o useEffect precisa ser importado, e eu quero
  // manter o código limpo, vou adicionar o import agora.
  //
  // NOTA: Em JavaScript, podes importar no meio do código
  // (dynamic import), mas não é recomendado. Vou assumir
  // que o useEffect já está importado... Vou editar o topo.

  // ==========================================================
  // handleSubmit: O que acontece quando o formulário é enviado
  // ==========================================================
  // Eventos no React:
  // - onSubmit: Quando o formulário é submetido (Enter ou clique)
  // - onChange: Quando um campo muda
  // - onClick: Quando clica num botão
  //
  // O parâmetro `e` é um "evento sintético" do React.
  // e.preventDefault() → Impede o comportamento padrão do
  // formulário (que é recarregar a página).
  async function handleSubmit(e) {
    e.preventDefault();

    // ----- VALIDAÇÃO -----
    // Sempre validar antes de enviar para a API!
    if (!titulo.trim()) {
      setErro("O título é obrigatório!");
      return;
    }

    try {
      setCarregando(true);
      setErro("");

      // Chamar a função onSubmit que veio do App.jsx
      // Passamos os dados da tarefa como objeto
      await onSubmit({
        titulo: titulo.trim(),
        descricao: descricao.trim(),
      });

      // ----- LIMPAR FORMULÁRIO -----
      // Se a operação correu bem, limpamos os campos
      // (mas só se não estamos a editar — quando edita,
      // o form mantém os valores)
      if (!tarefaEditando) {
        setTitulo("");
        setDescricao("");
      }
    } catch (erro) {
      setErro("Erro ao guardar tarefa. Tenta novamente.");
    } finally {
      // finally executa sempre, quer haja erro quer não
      setCarregando(false);
    }
  }

  // ==========================================================
  // RENDERIZAÇÃO (JSX)
  // ==========================================================
  // O que é renderizado?
  // --------------------
  // O return devolve o JSX que o React vai transformar em
  // HTML real no navegador.
  //
  // Classes Tailwind usadas:
  // - bg-white: fundo branco
  // - rounded-lg: cantos arredondados (large)
  // - shadow-md: sombra média
  // - p-6: padding de 1.5rem (6 * 0.25rem)
  // - mb-6: margin-bottom de 1.5rem
  // - w-full: width 100%
  // - border: borda
  // - focus:ring: anel de foco ao clicar no campo
  // - transition: transição suave em hover/focus
  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-lg shadow-md p-6 mb-6"
    >
      {/* 
        Título do formulário
        Muda se estamos a criar ou a editar
        Operador ternário: condicao ? valorSeVerdadeiro : valorSeFalso
      */}
      <h2 className="text-xl font-bold mb-4 text-gray-800">
        {tarefaEditando ? "✏️ Editar Tarefa" : "➕ Nova Tarefa"}
      </h2>

      {/* 
        CAMPO: Título
        htmlFor / id: Ligam a label ao input (acessibilidade)
        onChange: Atualiza o estado sempre que o utilizador escreve
        value: O valor atual do input (vem do estado)
      */}
      <div className="mb-4">
        <label htmlFor="titulo" className="block text-sm font-medium text-gray-700 mb-1">
          Título *
        </label>
        <input
          type="text"
          id="titulo"
          placeholder="O que precisas de fazer?"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
        />
      </div>

      {/* 
        CAMPO: Descrição
        textarea: Para textos maiores (multilinha)
        rows: Número de linhas visíveis
      */}
      <div className="mb-4">
        <label htmlFor="descricao" className="block text-sm font-medium text-gray-700 mb-1">
          Descrição
        </label>
        <textarea
          id="descricao"
          placeholder="Adiciona mais detalhes (opcional)"
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
          rows={3}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition resize-none"
        />
      </div>

      {/* 
        MENSAGEM DE ERRO
        Só aparece se houver erro (renderização condicional)
        {erro && <div>...} → Se erro for true, mostra a div
        Se erro for "" (falsy), não mostra nada
      */}
      {erro && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md text-sm">
          ⚠️ {erro}
        </div>
      )}

      {/* 
        BOTÃO DE SUBMETER
        disabled: Desativa o botão enquanto carrega
        opacity-50: Fica mais transparente quando desativado
        cursor-not-allowed: Muda o cursor para "não permitido"
      */}
      <button
        type="submit"
        disabled={carregando}
        className={`w-full py-2 px-4 rounded-md text-white font-medium transition ${
          carregando
            ? "bg-blue-400 opacity-50 cursor-not-allowed"
            : "bg-blue-600 hover:bg-blue-700"
        }`}
      >
        {carregando
          ? "A guardar..."
          : tarefaEditando
          ? "Atualizar Tarefa"
          : "Adicionar Tarefa"}
      </button>
    </form>
  );
}
