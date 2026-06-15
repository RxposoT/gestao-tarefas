# 📋 Sistema de Gestão de Tarefas — CRUD Completo

**Bem-vindo ao teu primeiro projeto fullstack!** 🚀

Este projeto foi criado para te ensinar os fundamentos do desenvolvimento web moderno. Vamos construir **um sistema completo de gestão de tarefas** passo a passo, desde a base de dados até à interface do utilizador.

---

## 📑 Índice

1. [O que vais aprender](#-o-que-vais-aprender)
2. [Visão Geral do Projeto](#-visão-geral-do-projeto)
3. [Tecnologias Utilizadas](#-tecnologias-utilizadas)
4. [Como Executar o Projeto](#-como-executar-o-projeto)
5. [Estrutura de Pastas](#-estrutura-de-pastas)
6. [Backend — A API](#️-backend--a-api)
   - [O que é um servidor?](#o-que-é-um-servidor)
   - [O que é uma API?](#o-que-é-uma-api)
   - [O que é Express?](#o-que-é-o-express)
   - [O que são rotas?](#o-que-são-rotas)
   - [Entender o CRUD](#entender-o-crud)
   - [Base de Dados SQLite](#base-de-dados-sqlite)
   - [Métodos HTTP](#métodos-http)
   - [Códigos de Resposta HTTP](#códigos-de-resposta-http)
7. [Frontend — A Interface](#-frontend--a-interface)
   - [O que é o React?](#o-que-é-o-react)
   - [O que é JSX?](#o-que-é-jsx)
   - [O que são Componentes?](#o-que-são-componentes)
   - [O que são Props?](#o-que-são-props)
   - [O que é Estado (State)?](#o-que-é-estado-state)
   - [O que são Hooks?](#o-que-são-hooks)
   - [O que é o useEffect?](#o-que-é-o-useeffect)
   - [Comunicação com a API (fetch)](#comunicação-com-a-api-fetch)
   - [O que é o Tailwind CSS?](#o-que-é-o-tailwind-css)
   - [O que é o Vite?](#o-que-é-o-vite)
8. [Fluxo Completo de um Pedido](#-fluxo-completo-de-um-pedido)
9. [Conceitos Importantes](#-conceitos-importantes)
10. [Próximos Passos](#-próximos-passos)

---

## 🎯 O que vais aprender

Ao estudar este projeto, vais aprender:

| Conceito | O que é |
|----------|---------|
| **Servidor** | Programa que recebe pedidos e devolve respostas |
| **API REST** | Conjunto de regras para comunicação entre sistemas |
| **CRUD** | Create, Read, Update, Delete — as 4 operações básicas |
| **Express** | Framework para criar servidores em Node.js |
| **SQLite** | Base de dados leve em ficheiro único |
| **React** | Biblioteca para construir interfaces de utilizador |
| **Componentes** | Blocos reutilizáveis que formam a interface |
| **Props** | Dados que um componente pai passa ao filho |
| **Estado (State)** | Dados que mudam e afetam o que vemos no ecrã |
| **Hooks** | Funções especiais do React (useState, useEffect) |
| **Tailwind CSS** | Biblioteca de classes CSS utilitárias |
| **Vite** | Ferramenta de desenvolvimento rápida para React |
| **Fetch** | API nativa do JavaScript para fazer pedidos HTTP |

---

## 🏗️ Visão Geral do Projeto

```
┌─────────────────────────────────────────────────────┐
│                   UTILIZADOR                        │
│   (abre o navegador em localhost:5173)              │
└─────────────────┬───────────────────────────────────┘
                  │
                  ▼
┌─────────────────────────────────────────────────────┐
│              FRONTEND (React + Vite)                │
│  Porta: 5173                                        │
│  • Componentes React                                │
│  • Tailwind CSS (design)                            │
│  • fetch() para comunicar com a API                 │
└─────────────────┬───────────────────────────────────┘
                  │  Proxy do Vite redireciona
                  │  /api/* → localhost:3000
                  ▼
┌─────────────────────────────────────────────────────┐
│               BACKEND (Express + Node)              │
│  Porta: 3000                                        │
│  • Rotas CRUD (/api/tarefas)                        │
│  • Validação de dados                               │
│  • Lógica de negócio                                │
└─────────────────┬───────────────────────────────────┘
                  │
                  ▼
┌─────────────────────────────────────────────────────┐
│              BASE DE DADOS (SQLite)                 │
│  Ficheiro: backend/database.sqlite                  │
│  Tabela: tarefas                                    │
└─────────────────────────────────────────────────────┘
```

---

## 🛠️ Tecnologias Utilizadas

### Backend

| Tecnologia | Versão | O que é |
|------------|--------|---------|
| **Node.js** | 18+ | Ambiente que permite correr JavaScript no servidor |
| **Express** | 4.21 | Framework para criar servidores web |
| **better-sqlite3** | 11 | Biblioteca para usar SQLite com JavaScript |
| **cors** | 2.8 | Middleware para permitir pedidos entre domínios |

### Frontend

| Tecnologia | Versão | O que é |
|------------|--------|---------|
| **React** | 18.3 | Biblioteca para interfaces de utilizador |
| **Vite** | 5.4 | Ferramenta de desenvolvimento (substitui CRA) |
| **Tailwind CSS** | 3.4 | Biblioteca de classes CSS utilitárias |
| **PostCSS** | 8.4 | Processador de CSS (necessário para Tailwind) |
| **Autoprefixer** | 10.4 | Adiciona prefixos CSS automaticamente |

---

## 🚀 Como Executar o Projeto

### Pré-requisitos

Antes de começar, precisas de ter instalado:

1. **Node.js** (versão 18 ou superior) — [nodejs.org](https://nodejs.org)
2. **npm** (vem com o Node.js)
3. **Git** (opcional) — [git-scm.com](https://git-scm.com)

Para verificar se tens o Node instalado:
```bash
node --version    # Exemplo: v18.17.0
npm --version     # Exemplo: 9.6.7
```

### 1️⃣ Clonar ou criar o projeto

```bash
# Se tiveres Git:
git clone <url-do-repositorio>
cd gestao-tarefas

# Ou se criaste manualmente, navega até à pasta:
cd gestao-tarefas
```

### 2️⃣ Instalar dependências do Backend

```bash
cd backend
npm install
```

O que acontece aqui?
- O npm lê o ficheiro `package.json`
- Descarrega todas as bibliotecas listadas em `dependencies`
- Coloca-as na pasta `node_modules`
- Cria o ficheiro `package-lock.json` (registo das versões instaladas)

### 3️⃣ Instalar dependências do Frontend

```bash
cd ../frontend
npm install
```

### 4️⃣ Iniciar o Backend

Numa janela do terminal:
```bash
cd backend
npm run dev
```

Deves ver:
```
========================================
  🚀 Servidor rodando em:
  http://localhost:3000
  Endereço da API:
  http://localhost:3000/api/tarefas
========================================
```

Sabes que funcionou se... abrires `http://localhost:3000` no navegador e vires uma mensagem JSON.

### 5️⃣ Iniciar o Frontend (noutra janela de terminal)

```bash
cd frontend
npm run dev
```

Deves ver:
```
  VITE v5.x.x  ready in XXX ms
  ➜  Local:   http://localhost:5173/
```

Abre `http://localhost:5173/` no navegador. 🎉

### 6️⃣ Usar a aplicação

- **Criar tarefa**: Escreve um título e clica "Adicionar Tarefa"
- **Marcar como concluída**: Clica no checkbox
- **Editar**: Clica no ícone do lápis ✏️
- **Apagar**: Clica no ícone do lixo 🗑️

---

## 📂 Estrutura de Pastas

```
gestao-tarefas/
│
├── README.md              ← Este ficheiro (documentação)
├── .gitignore             ← Ficheiros que o Git ignora
│
├── backend/               ← CÓDIGO DO SERVIDOR (API)
│   ├── package.json       ← Dependências e scripts do backend
│   ├── database.sqlite    ← Base de dados (criada automaticamente)
│   └── src/
│       ├── index.js       ← Ponto de entrada do servidor
│       ├── database.js    ← Configuração da base de dados
│       └── routes/
│           └── tarefas.js ← Rotas CRUD da API
│
└── frontend/              ← CÓDIGO DA INTERFACE (React)
    ├── package.json       ← Dependências e scripts do frontend
    ├── index.html         ← HTML principal (ponto de entrada)
    ├── vite.config.js     ← Configuração do Vite
    ├── tailwind.config.js ← Configuração do Tailwind
    ├── postcss.config.js  ← Configuração do PostCSS
    └── src/
        ├── main.jsx       ← Monta o React no DOM
        ├── App.jsx        ← Componente principal
        ├── index.css      ← Estilos globais (ativa Tailwind)
        └── components/
            ├── FormularioTarefa.jsx  ← Formulário criar/editar
            ├── ListaTarefas.jsx      ← Lista de tarefas
            └── ItemTarefa.jsx        ← Cartão de uma tarefa
```

---

## ⚙️ Backend — A API

### O que é um servidor?

Um **servidor** é um programa que **fica à espera de pedidos** e **devolve respostas**.

Imagina um restaurante:
- **Tu** (cliente) chegas e fazes um pedido
- **O empregado** (servidor) recebe o pedido, vai à cozinha
- **A cozinha** (base de dados) prepara a comida
- **O empregado** (servidor) traz-te a resposta

No nosso caso:
- O **cliente** é o frontend React (ou o Postman, ou o navegador)
- O **servidor** é o Express a correr em `localhost:3000`
- A **cozinha** é a base de dados SQLite

### O que é uma API?

API = **A**pplication **P**rogramming **I**nterface
(Interface de Programação de Aplicações)

Uma API é como um **menu de restaurante**: define o que podes pedir e como pedir.

No nosso projeto, a API define:
- `GET /api/tarefas` → "Dá-me todas as tarefas"
- `POST /api/tarefas` → "Cria uma nova tarefa com estes dados"
- `PUT /api/tarefas/5` → "Atualiza a tarefa número 5"
- `DELETE /api/tarefas/5` → "Apaga a tarefa número 5"

**REST** é um estilo de arquitetura para APIs. As regras principais:
1. Usar métodos HTTP (GET, POST, PUT, DELETE)
2. URLs representam recursos (tarefas, utilizadores, etc.)
3. Sem estado (cada pedido é independente)

### O que é o Express?

**Express** é um framework para Node.js que facilita criar servidores web.

Sem Express, terias de escrever muito código para:
- Interpretar pedidos HTTP
- Gerir rotas
- Enviar respostas
- Lidar com JSON

Com Express, fazes tudo isto em poucas linhas:

```javascript
const express = require("express");
const app = express();

app.get("/ola", (req, res) => {
  res.json({ mensagem: "Olá, mundo!" });
});

app.listen(3000);
```

No nosso projeto, o ficheiro `backend/src/index.js` configura o Express e inicia o servidor.

### O que são rotas?

**Rotas** são os caminhos da API. Cada rota responde a um método HTTP e URL específicos.

```
Método  +  URL               =  Rota
GET       /api/tarefas         →  Listar tarefas
POST      /api/tarefas         →  Criar tarefa
GET       /api/tarefas/3       →  Ver tarefa 3
PUT       /api/tarefas/3       →  Atualizar tarefa 3
DELETE    /api/tarefas/3       →  Apagar tarefa 3
```

No Express, as rotas definem-se assim (exemplo do `tarefas.js`):

```javascript
// GET / → Listar todas
router.get("/", (req, res) => {
  // ... código para buscar e devolver tarefas
});

// GET /:id → Buscar uma específica
router.get("/:id", (req, res) => {
  // ... código para buscar tarefa com id = req.params.id
});
```

### Entender o CRUD

**CRUD** é o acrónimo das 4 operações fundamentais:

| Operação | SQL | HTTP | Rota |
|----------|-----|------|------|
| **C**reate (Criar) | INSERT | POST | `POST /api/tarefas` |
| **R**ead (Ler) | SELECT | GET | `GET /api/tarefas` |
| **U**pdate (Atualizar) | UPDATE | PUT | `PUT /api/tarefas/:id` |
| **D**elete (Apagar) | DELETE | DELETE | `DELETE /api/tarefas/:id` |

Cada uma delas está implementada no ficheiro `backend/src/routes/tarefas.js`.

### Base de Dados SQLite

**SQLite** é uma base de dados que:
- Não precisa de servidor (é "serverless")
- Guarda tudo num único ficheiro (`database.sqlite`)
- Usa SQL padrão
- É a base de dados mais usada no mundo (está no teu telemóvel!)

No nosso projeto, o ficheiro `backend/src/database.js`:
1. Abre/cria o ficheiro `database.sqlite`
2. Cria a tabela `tarefas` (se não existir)
3. Exporta o objeto `db` para ser usado nas rotas

A nossa tabela `tarefas`:

```sql
CREATE TABLE IF NOT EXISTS tarefas (
    id            INTEGER PRIMARY KEY AUTOINCREMENT,
    titulo        TEXT    NOT NULL,
    descricao     TEXT    DEFAULT '',
    concluida     BOOLEAN DEFAULT 0,
    criada_em     TEXT    DEFAULT (datetime('now', 'localtime')),
    atualizada_em TEXT    DEFAULT (datetime('now', 'localtime'))
);
```

**Colunas:**
- `id`: Número único (automático) que identifica cada tarefa
- `titulo`: O nome da tarefa (obrigatório)
- `descricao`: Detalhes adicionais (opcional)
- `concluida`: Estado (0 = não feita, 1 = feita)
- `criada_em`: Data/hora de criação (automática)
- `atualizada_em`: Data/hora da última alteração (automática)

### Métodos HTTP

| Método | O que faz | É seguro? | É idempotente? |
|--------|-----------|-----------|----------------|
| **GET** | Obter dados | ✅ Sim | ✅ Sim (repetir = mesmo resultado) |
| **POST** | Criar dados | ❌ Não | ❌ Não (cada vez cria um novo) |
| **PUT** | Atualizar dados | ❌ Não | ✅ Sim (mesmo resultado sempre) |
| **DELETE** | Apagar dados | ❌ Não | ✅ Sim (apagar 2x = mesma coisa) |

**Seguro** = Não altera dados
**Idempotente** = Fazer 1 vez é igual a fazer 10 vezes

### Códigos de Resposta HTTP

| Código | Significado | Quando usar |
|--------|-------------|-------------|
| **200** | OK | Pedido bem-sucedido |
| **201** | Created | Recurso criado com sucesso |
| **204** | No Content | Pedido bem-sucedido, sem conteúdo |
| **400** | Bad Request | Dados inválidos (ex: título vazio) |
| **404** | Not Found | Recurso não encontrado |
| **500** | Internal Server Error | Erro no servidor |

---

## 🎨 Frontend — A Interface

### O que é o React?

**React** é uma biblioteca JavaScript para construir interfaces de utilizador.

Criado pelo Facebook (Meta), é atualmente a biblioteca mais popular para frontend.

**Ideias principais do React:**

1. **Componentes**: A UI é dividida em peças independentes e reutilizáveis
2. **Declarativo**: Dizes "o que" queres, não "como" fazer
3. **Estado**: Os dados mudam e a UI atualiza-se automaticamente

### O que é JSX?

**JSX** é uma extensão de sintaxe que parece HTML mas está dentro de JavaScript.

```jsx
// Isto é JSX:
const elemento = <h1>Olá, mundo!</h1>;

// O React transforma em JavaScript:
const elemento = React.createElement("h1", null, "Olá, mundo!");
```

No JSX:
- Usas `{}` para inserir JavaScript: `{nomeDaVariavel}`
- Usas `className` em vez de `class` (porque `class` é palavra reservada)
- Podes ter expressões JavaScript dentro de `{}`

### O que são Componentes?

**Componentes** são os blocos de construção da interface. Cada componente é uma função que devolve JSX.

```jsx
// Componente simples
function Botao(props) {
  return <button>{props.texto}</button>;
}

// Usar o componente:
<Botao texto="Clica aqui" />
```

No nosso projeto:

```
App (componente principal)
├── FormularioTarefa (formulário para criar/editar)
├── ListaTarefas (lista de tarefas)
│   └── ItemTarefa (cada tarefa individual)
```

### O que são Props?

**Props** (propriedades) são como argumentos que passamos a um componente.

```jsx
// Pai passa props para o filho:
<ItemTarefa
  tarefa={tarefa}
  onToggle={alternarConclusao}
  onApagar={apagarTarefa}
/>

// Filho recebe e usa:
function ItemTarefa({ tarefa, onToggle, onApagar }) {
  // Posso usar tarefa.titulo, onToggle(), etc.
}
```

**Regras das props:**
- Vão de pai para filho (fluxo unidirecional)
- São imutáveis (o filho NÃO pode alterar as props)
- Podem ser qualquer valor (string, número, função, objeto)

### O que é Estado (State)?

**Estado** são dados que podem mudar ao longo do tempo e que afetam o que é renderizado.

```jsx
// Estado é como a "memória" do componente
const [contador, setContador] = useState(0);

// Quando clicas no botão:
<button onClick={() => setContador(contador + 1)}>
  Cliques: {contador}
</button>
```

**Diferença entre Props e State:**

| Props | State |
|------|-------|
| Vêm de fora (do pai) | É interno ao componente |
| São imutáveis | Pode ser alterado |
| Lê-se apenas | Lê-se e escreve-se |

No nosso `App.jsx`, temos vários estados:
- `tarefas`: Array de tarefas (o dado principal)
- `carregando`: Se está a carregar dados
- `erro`: Mensagem de erro (se houver)
- `tarefaEditando`: Tarefa a ser editada (ou null)

### O que são Hooks?

**Hooks** são funções especiais do React que permitem usar funcionalidades em componentes funcionais.

**Hooks que usamos neste projeto:**

| Hook | O que faz | Exemplo |
|------|-----------|---------|
| `useState` | Gerir estado | `const [x, setX] = useState(0)` |
| `useEffect` | Executar efeitos colaterais | Buscar dados da API quando o componente monta |
| `useCallback` | Memorizar funções | Evitar re-renderizações desnecessárias |

**Regras dos Hooks:**
1. Só chamar hooks ao nível mais alto (não dentro de loops, ifs, ou funções)
2. Só chamar hooks em componentes React ou hooks personalizados

### O que é o useEffect?

`useEffect` executa código **após** o componente ser renderizado.

Serve para:
- Buscar dados de uma API
- Subscrever eventos
- Manipular o DOM
- Timers (setInterval, setTimeout)

```jsx
useEffect(() => {
  // Código a executar (efeito)
  buscarDadosDaAPI();

  // Opcional: função de limpeza (cleanup)
  return () => {
    // Código a executar quando o componente desmonta
  };
}, [dependencias]);
// ↑ Se [] executa 1x (ao montar)
// Se [variavel] executa quando 'variavel' mudar
```

No nosso projeto:
```jsx
useEffect(() => {
  buscarTarefas(); // Busca tarefas da API ao carregar a página
}, []); // Array vazio = executa só 1 vez
```

### Comunicação com a API (fetch)

`fetch()` é a API nativa do JavaScript para fazer pedidos HTTP.

**Exemplo de GET (ler dados):**
```javascript
const resposta = await fetch("/api/tarefas");
const dados = await resposta.json();
```

**Exemplo de POST (criar dados):**
```javascript
const resposta = await fetch("/api/tarefas", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ titulo: "Comprar pão", descricao: "" }),
});
```

**Fluxo completo:**

```
1. fetch("/api/tarefas")
2. Vite proxy → redireciona para localhost:3000
3. Express recebe o pedido
4. Rota correspondente processa
5. Query SQL à base de dados
6. Resposta volta como JSON
7. React recebe os dados e atualiza a UI
```

### O que é o Tailwind CSS?

**Tailwind** é uma biblioteca CSS "utility-first".

Em vez de escrever CSS personalizado, usas classes pequenas e atómicas:

```html
<!-- CSS Tradicional: -->
<div class="card">
  <h2 class="card-title">Título</h2>
</div>

<!-- Tailwind: -->
<div class="bg-white rounded-lg shadow-md p-6">
  <h2 class="text-xl font-bold text-gray-800">Título</h2>
</div>
```

**Vantagens:**
- Não precisas de inventar nomes de classes
- Consistência garantida
- CSS final muito leve (só inclui o que usas)
- Desenvolvimento mais rápido

**Classes que mais usamos:**

| Categoria | Exemplos |
|-----------|----------|
| Cor de fundo | `bg-white`, `bg-blue-500`, `bg-gray-100` |
| Texto | `text-white`, `text-gray-800`, `text-xl`, `font-bold` |
| Espaçamento | `p-4` (padding), `m-2` (margin), `gap-3` |
| Layout | `flex`, `grid`, `items-center`, `justify-between` |
| Bordas | `rounded-lg`, `border`, `border-gray-300` |
| Sombras | `shadow-sm`, `shadow-md`, `shadow-lg` |

### O que é o Vite?

**Vite** é uma ferramenta de desenvolvimento que substitui o Create React App.

**Porquê Vite?**
- Início instantâneo (não precisa de "bundling" primeiro)
- Hot Module Replacement (HMR) instantâneo
- Configuração limpa e simples
- Build rápido com Rollup

**Proxy do Vite:**

No `vite.config.js`, configurámos um proxy:
```javascript
proxy: {
  "/api": {
    target: "http://localhost:3000",
    changeOrigin: true,
  },
}
```

Isto significa: "Quando o frontend fizer fetch a `/api/tarefas`, redireciona para `http://localhost:3000/api/tarefas`."

**Porquê?** Para evitar problemas de CORS em desenvolvimento e simplificar o código (o frontend não precisa de saber o URL completo do backend).

---

## 🔄 Fluxo Completo de um Pedido

Vamos seguir o que acontece quando **crias uma nova tarefa**:

### 1. Utilizador preenche o formulário

No `FormularioTarefa.jsx`:
- Escreve o título "Comprar pão"
- Clica em "Adicionar Tarefa"
- O `handleSubmit` é chamado

### 2. Validação no frontend

```javascript
if (!titulo.trim()) {
  setErro("O título é obrigatório!");
  return;
}
```

### 3. Chamada à API

```javascript
const resposta = await fetch("/api/tarefas", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ titulo: "Comprar pão", descricao: "" }),
});
```

### 4. Proxy do Vite redireciona

`/api/tarefas` → `http://localhost:3000/api/tarefas`

### 5. Express recebe o pedido

O `index.js` recebe o pedido e encaminha para a rota correta.

### 6. Middlewares processam

- `cors()`: Permite o pedido
- `express.json()`: Converte o JSON do body para objeto JS

### 7. Rota POST é executada

No `tarefas.js`:
```javascript
router.post("/", (req, res) => {
  const { titulo, descricao } = req.body;
  // Valida...
  // Insere na BD...
  res.status(201).json(tarefaCriada);
});
```

### 8. Query SQL

```javascript
db.prepare("INSERT INTO tarefas (titulo, descricao) VALUES (?, ?)")
  .run("Comprar pão", "");
```

### 9. Resposta volta

```json
{
  "id": 1,
  "titulo": "Comprar pão",
  "descricao": "",
  "concluida": 0,
  "criada_em": "2026-06-15 14:30:00",
  "atualizada_em": "2026-06-15 14:30:00"
}
```

### 10. Frontend recebe a resposta

No `App.jsx`, a função `salvarTarefa` espera pela resposta e chama `buscarTarefas()` para atualizar a lista.

### 11. UI atualiza

O React re-renderiza `ListaTarefas` com a nova tarefa incluída. 🎉

---

## 📚 Conceitos Importantes

### Assíncronismo (async/await)

JavaScript é single-thread (só faz uma coisa de cada vez). Mas algumas operações demoram (como pedidos à rede). Em vez de bloquear, o JavaScript usa **Promises** e **async/await**.

```javascript
// 🔴 Síncrono (bloqueia):
const dados = buscarDados(); // Programa para aqui até ter dados

// 🟢 Assíncrono (não bloqueia):
async function carregar() {
  const dados = await buscarDados(); // Espera, mas não bloqueia
  console.log(dados);
}
```

### Error Handling (try/catch)

Sempre que fazes algo que pode falhar (como pedidos à rede), deves usar try/catch:

```javascript
try {
  const resposta = await fetch("/api/tarefas");
  const dados = await resposta.json();
  // Usar dados...
} catch (erro) {
  // O que fazer se falhar
  console.error("Erro:", erro);
  mostrarErro("Não foi possível carregar as tarefas");
} finally {
  // Executa sempre (com ou sem erro)
  setCarregando(false);
}
```

### Renderização Condicional

No React, podes mostrar ou esconder elementos baseado em condições:

```jsx
// Se carregando, mostra spinner. Senão, mostra lista.
{carregando ? (
  <Spinner />
) : (
  <ListaTarefas />
)}

// Se houver erro, mostra mensagem
{erro && <div className="erro">{erro}</div>}
```

### Imutabilidade

Nunca modifiques o estado diretamente:

```javascript
// ❌ MAL: modificar diretamente
tarefas.push(novaTarefa); // Isto NÃO atualiza a UI
setTarefas(tarefas);

// ✅ BEM: criar novo array
setTarefas([...tarefas, novaTarefa]);
```

### Porque é que o backend valida e o frontend também?

**Segurança em camadas (Defense in Depth):**

1. **Frontend valida** → Para dar feedback rápido ao utilizador (UX)
2. **Backend valida** → Por segurança (o frontend pode ser contornado)

Nunca confies só na validação do frontend!
- O utilizador pode desativar JavaScript
- Alguém pode usar Postman/curl para enviar pedidos diretamente à API
- O frontend pode ter bugs

---

## 🔜 Próximos Passos

Agora que já tens o CRUD básico, aqui estão ideias para evoluíres o projeto:

### 🟢 Fáceis
- [ ] Adicionar campo "prazo/data limite" à tarefa
- [ ] Adicionar categorias/etiquetas às tarefas
- [ ] Filtros: mostrar só tarefas pendentes / concluídas
- [ ] Pesquisa de tarefas por texto

### 🟡 Intermédios
- [ ] Autenticação (login/registo)
- [ ] Ordenar tarefas por arrastar (drag & drop)
- [ ] Paginação (quando há muitas tarefas)
- [ ] Testes unitários (Jest, Vitest)

### 🔴 Avançados
- [ ] Base de dados PostgreSQL em vez de SQLite
- [ ] Deploy na nuvem (Vercel, Railway, Render)
- [ ] Modo escuro (dark mode)
- [ ] Versão mobile com React Native
- [ ] Docker para containerização
- [ ] CI/CD (GitHub Actions)

---

## 🆘 Ajuda e Recursos

### Documentação Oficial

- [React](https://react.dev/)
- [Express](https://expressjs.com/)
- [SQLite](https://www.sqlite.org/docs.html)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Vite](https://vitejs.dev/)
- [MDN Web Docs (JavaScript)](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript)

### Ferramentas Úteis

- **Postman** ou **Insomnia**: Para testar a API sem frontend
- **DB Browser for SQLite**: Para ver a base de dados visualmente
- **React DevTools**: Extensão do navegador para depurar React

---

**Feito com ❤️ para aprender. Bons estudos!** 🚀
