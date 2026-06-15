// ============================================================
// ItemTarefa.jsx — Cartão individual de uma tarefa
// ============================================================
//
// O que faz este componente?
// --------------------------
// Mostra uma única tarefa na lista, com:
// - Checkbox para marcar como concluída/não concluída
// - Título e descrição
// - Botões para editar e apagar
//
// Como é usado?
// -------------
// O componente ListaTarefas.jsx usa este componente para
// cada tarefa, passando os dados através de props.
// ============================================================

// ==========================================================
// PROPS que este componente recebe:
// ==========================================================
// - tarefa: Objeto com { id, titulo, descricao, concluida }
// - onToggle: Função para marcar/desmarcar como concluída
// - onEditar: Função para editar a tarefa
// - onApagar: Função para apagar a tarefa
export default function ItemTarefa({ tarefa, onToggle, onEditar, onApagar }) {
  // ==========================================================
  // Estado local para confirmação de delete
  // ==========================================================
  // Quando o utilizador clica em "Apagar", mostramos uma
  // confirmação antes de apagar de vez.
  // Isto é um padrão UX chamado "double confirmation".

  // ==========================================================
  // RENDERIZAÇÃO
  // ==========================================================
  return (
    // ----------------------------------------------
    // Cartão da tarefa
    // ----------------------------------------------
    // O className muda consoante o estado "concluida"
    // Usamos template strings (``) para juntar classes
    // condicionais.
    //
    // Explicação das classes:
    // - flex: Layout flexível (itens lado a lado)
    // - items-start: Alinha ao topo
    // - gap-3: Espaço de 0.75rem entre itens
    // - opacity-60: Fica mais transparente se concluída
    // - line-through: Risca o texto se concluída
    <div
      className={`bg-white rounded-lg shadow-sm p-4 border-l-4 transition ${
        tarefa.concluida
          ? "border-l-green-500 opacity-60"
          : "border-l-blue-500 hover:shadow-md"
      }`}
    >
      <div className="flex items-start gap-3">
        {/* ------------------------------------------
            CHECKBOX: Marcar/desmarcar conclusão
            ------------------------------------------
            checked: Se está ou não marcado
            onChange: O que acontece quando clica
            type="checkbox": Caixa de seleção
        */}
        <input
          type="checkbox"
          checked={tarefa.concluida === 1}
          onChange={() => onToggle(tarefa.id, !tarefa.concluida)}
          className="mt-1 h-5 w-5 text-blue-600 rounded border-gray-300 focus:ring-blue-500 cursor-pointer"
        />

        {/* ------------------------------------------
            CONTEÚDO: Título + Descrição
            ------------------------------------------ */}
        <div className="flex-1">
          {/* Título (riscado se concluída) */}
          <h3
            className={`font-semibold text-gray-800 ${
              tarefa.concluida ? "line-through text-gray-400" : ""
            }`}
          >
            {tarefa.titulo}
          </h3>

          {/* Descrição (só aparece se existir) */}
          {tarefa.descricao && (
            <p
              className={`text-sm mt-1 ${
                tarefa.concluida ? "text-gray-400" : "text-gray-600"
              }`}
            >
              {tarefa.descricao}
            </p>
          )}

          {/* Data de criação (informativo) */}
          <p className="text-xs text-gray-400 mt-2">
            Criada em:{" "}
            {/* 
              Intl.DateTimeFormat: API nativa do JavaScript
              para formatar datas de forma legível.
              Exemplo: "15/06/2026, 14:30"
            */}
            {new Intl.DateTimeFormat("pt-PT", {
              dateStyle: "short",
              timeStyle: "short",
            }).format(new Date(tarefa.criada_em))}
          </p>
        </div>

        {/* ------------------------------------------
            BOTÕES DE AÇÃO
            ------------------------------------------ */}
        <div className="flex gap-2">
          {/* 
            BOTÃO EDITAR
            onClick: Chama onEditar com a tarefa completa
            title: Texto que aparece ao passar o rato (tooltip)
            Classes: text-blue-600, hover:text-blue-800
          */}
          <button
            onClick={() => onEditar(tarefa)}
            className="text-blue-600 hover:text-blue-800 transition p-1"
            title="Editar tarefa"
          >
            {/* 
              SVG do ícone de lápis (editar)
              SVG = Scalable Vector Graphics (gráfico vetorial)
              ViewBox: Define a área visível do desenho
            */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
            </svg>
          </button>

          {/* 
            BOTÃO APAGAR
            onClick: Chama onApagar com o id da tarefa
            confirm(): Função nativa do navegador que
            mostra uma caixa de confirmação "OK/Cancelar"
            Se o utilizador cancelar, a função retorna false
            e o onClick não prossegue.
          */}
          <button
            onClick={() => {
              if (window.confirm("Tens a certeza que queres apagar esta tarefa?")) {
                onApagar(tarefa.id);
              }
            }}
            className="text-red-500 hover:text-red-700 transition p-1"
            title="Apagar tarefa"
          >
            {/* SVG do ícone de lixo (apagar) */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
