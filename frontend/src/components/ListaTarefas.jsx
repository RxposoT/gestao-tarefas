// ============================================================
// ListaTarefas.jsx — Lista de todas as tarefas
// ============================================================
//
// O que faz este componente?
// --------------------------
// Recebe um array de tarefas e renderiza cada uma usando
// o componente ItemTarefa. Também mostra:
// - Um título com contagem (ex: "3 tarefas pendentes")
// - Mensagem quando não há tarefas
// ============================================================

// Importamos o ItemTarefa para renderizar cada tarefa
import ItemTarefa from "./ItemTarefa";

// ==========================================================
// PROPS
// ==========================================================
// - tarefas: Array de objetos de tarefas
// - onToggle: Função para marcar/desmarcar conclusão
// - onEditar: Função para editar (passa a tarefa para o form)
// - onApagar: Função para apagar
export default function ListaTarefas({ tarefas, onToggle, onEditar, onApagar }) {
  // ==========================================================
  // Calcular estatísticas
  // ==========================================================
  // Array.filter(): Cria um novo array só com os elementos
  // que passam no teste.
  // Exemplo: tarefas.filter(t => t.concluida) → só as concluídas
  const tarefasConcluidas = tarefas.filter((t) => t.concluida === 1).length;
  const totalTarefas = tarefas.length;

  // ==========================================================
  // RENDERIZAÇÃO
  // ==========================================================
  return (
    <div>
      {/* ------------------------------------------
          CABEÇALHO DA LISTA
          ------------------------------------------ */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-gray-800">📋 Lista de Tarefas</h2>

        {/* 
          Badge com contagem: Mostra quantas tarefas existem
          Exemplo: "3 tarefas (2 concluídas)"
        */}
        <span className="text-sm bg-blue-100 text-blue-800 px-3 py-1 rounded-full">
          {totalTarefas} tarefa{totalTarefas !== 1 ? "s" : ""}
          {totalTarefas > 0 && (
            <> — {tarefasConcluidas} concluída{tarefasConcluidas !== 1 ? "s" : ""}</>
          )}
        </span>
      </div>

      {/* ------------------------------------------
          LISTA DE TAREFAS ou MENSAGEM VAZIA
          ------------------------------------------
          Renderização condicional com operador ternário:
          {condicao ? (seVerdadeiro) : (seFalso)}
          
          Se o array de tarefas estiver vazio, mostramos
          uma mensagem simpática em vez de uma lista vazia.
      */}
      {tarefas.length === 0 ? (
        /* 
          ESTADO VAZIO (Empty State)
          Importante em UX: Quando não há dados, mostra
          uma mensagem em vez de um ecrã em branco.
        */
        <div className="text-center py-12 bg-white rounded-lg shadow-sm">
          {/* 
            Emoji grande (podes substituir por SVG/ícone)
            text-4xl: Tamanho 4x (2.25rem)
            text-gray-400: Cor cinzenta clara
          */}
          <div className="text-4xl mb-3">📝</div>
          <p className="text-gray-500 text-lg">Nenhuma tarefa encontrada</p>
          <p className="text-gray-400 text-sm mt-1">
            Adiciona a tua primeira tarefa no formulário acima!
          </p>
        </div>
      ) : (
        /* 
          LISTA DE TAREFAS
          map(): Transforma cada tarefa num componente ItemTarefa
          
          map é um método de array que cria um NOVO array com
          os resultados de chamar uma função para cada elemento.
          
          Exemplo:
          [1, 2, 3].map(x => x * 2) → [2, 4, 6]
          
          Aqui: tarefas.map(tarefa => <ItemTarefa ... />)
          
          key: É obrigatório em listas! Ajuda o React a
          identificar cada elemento de forma única.
          Sem key, o React re-renderiza tudo em vez de
          só atualizar o que mudou.
        */
        <div className="space-y-3">
          {tarefas.map((tarefa) => (
            <ItemTarefa
              key={tarefa.id}
              tarefa={tarefa}
              onToggle={onToggle}
              onEditar={onEditar}
              onApagar={onApagar}
            />
          ))}
        </div>
      )}
    </div>
  );
}
