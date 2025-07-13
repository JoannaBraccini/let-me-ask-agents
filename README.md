<div align="center">
  <h1>🤖 Let Me Ask Agents</h1>
  <p>Sistema de perguntas e respostas desenvolvido durante o <strong>NLW Agents</strong> da <strong>Rocketseat</strong></p>
  
  [![TypeScript](https://img.shields.io/badge/TypeScript---

## 📚 Documentação

Para documentação técnica detalhada, consulte:

- 📁 [`docs/`](./docs/) - Documentação completa do sistema e features implementadas

---

## 📝 Licençale=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)

[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)](https://www.docker.com/)

</div>

---

## 🎬 Demonstração

<!-- Substitua pelo link gerado após upload no GitHub Assets -->

https://github.com/user-attachments/assets/SEU-VIDEO-AQUI

> 📹 **Vídeo demonstrando o sistema em funcionamento**
>
> _Upload do vídeo será feito em breve..._

---

## 📋 Sobre o Projeto

**Let Me Ask Agents** é uma aplicação moderna e interativa que permite criar salas para fazer perguntas e obter respostas. O projeto foi desenvolvido utilizando as mais recentes tecnologias do mercado, seguindo as melhores práticas de desenvolvimento.

### ✨ Funcionalidades

- 🏠 **Listagem de salas disponíveis** - Visualize todas as salas criadas
- ➕ **Criação de salas** - Crie novas salas para discussões
- ❓ **Sistema de perguntas** - Faça perguntas nas salas
- 🎤 **Gravação de áudio** - Grave perguntas por áudio usando Web APIs
- 🤖 **Transcrição IA** - Converta áudio em texto usando Google Gemini
- 🔍 **Busca por embeddings** - Encontre perguntas similares usando vetores
- 📱 **Interface responsiva** - Design moderno que funciona em qualquer dispositivo
- 🔒 **Validação robusta** - Validação completa de dados com Zod
- 🎯 **Roteamento inteligente** - Navegação SPA com React Router
- 💾 **Persistência avançada** - PostgreSQL com extensão pgvector para embeddings

---

## 🏗️ Arquitetura

Este é um projeto **full-stack** organizado em **monorepo** com duas aplicações principais:

```
let-me-ask-agents/
├── 📁 server/          # Backend - API REST
└── 📁 web/             # Frontend - React SPA
```

### 🔧 Backend (`/server`)

**Stack Principal:**

- **Node.js** + **TypeScript** - Ambiente de execução moderno
- **Fastify** - Framework web rápido e eficiente
- **PostgreSQL** + **pgvector** - Banco de dados com extensão para embeddings
- **Drizzle ORM** - Object-Relational Mapping type-safe
- **Google Gemini** - IA para transcrição de áudio e geração de embeddings
- **Docker** - Containerização do ambiente
- **Zod v4** - Validação de esquemas e tipos
- **Biome** - Linting e formatação unificados

### 🎨 Frontend (`/web`)

**Stack Principal:**

- **React 19** + **TypeScript** - Interface moderna e reativa com as últimas funcionalidades
- **Vite 7** - Build tool e servidor de desenvolvimento ultra-rápido
- **React Router DOM v7** - Roteamento para SPA
- **TanStack Query v5** - Gerenciamento de estado assíncrono poderoso
- **Tailwind CSS v4** - Framework CSS utilitário com novas funcionalidades
- **Shadcn/ui** - Sistema de componentes acessíveis baseado em Radix UI
- **Web Audio API** - Gravação de áudio nativa do navegador
- **React Hook Form** - Gerenciamento de formulários performático
- **Biome** - Linting e formatação modernos

---

## 🚀 Como Executar

### 📋 Pré-requisitos

- **Node.js** 18+ instalado
- **Docker Desktop** instalado e executando
- **Git** para versionamento

### ⚡ Início Rápido

```bash
# 1. Clone o repositório
git clone https://github.com/JoannaBraccini/let-me-ask-agents.git
cd let-me-ask-agents

# 2. Setup do Backend (primeira vez)
cd server
npm install
npm run setup        # Inicia Docker + popula banco

# 3. Setup do Frontend
cd ../web
npm install
npm run dev
```

### 🔄 Uso Diário

```bash
# Terminal 1 - Backend
cd server
npm run dev:full     # Inicia Docker + servidor

# Terminal 2 - Frontend
cd web
npm run dev
```

### 🌐 URLs de Acesso

- **Frontend**: <http://localhost:5173>
- **Backend API**: <http://localhost:3333>
- **Health Check**: <http://localhost:3333/health>
- **Drizzle Studio**: Disponível via `npm run studio` no backend

---

## 📁 Estrutura Detalhada

<details>
<summary>📂 Clique para expandir a estrutura completa</summary>

```
let-me-ask-agents/
├── 📁 server/
│   ├── 📁 src/
│   │   ├── server.ts              # Servidor principal
│   │   ├── 📁 db/
│   │   │   ├── connection.ts      # Conexão com banco
│   │   │   ├── seed.ts           # População de dados
│   │   │   ├── 📁 schema/         # Esquemas do banco (rooms, questions, audio-chunks)
│   │   │   └── 📁 migrations/     # Migrações do Drizzle
│   │   ├── 📁 http/
│   │   │   └── 📁 routes/         # Rotas da API (CRUD + upload áudio)
│   │   └── 📁 services/
│   │       ├── env.ts            # Validação de variáveis de ambiente
│   │       └── gemini.ts         # Integração com Google Gemini IA
│   ├── 📁 docker/
│   ├── package.json
│   ├── docker-compose.yml
│   └── drizzle.config.ts
│
├── 📁 web/
│   ├── 📁 src/
│   │   ├── main.tsx              # Ponto de entrada
│   │   ├── app.tsx               # App principal com roteamento
│   │   ├── 📁 components/
│   │   │   ├── create-room-form.tsx     # Formulário de criação
│   │   │   ├── question-form.tsx        # Formulário de perguntas
│   │   │   ├── question-item.tsx        # Item individual da pergunta
│   │   │   ├── question-list.tsx        # Lista de perguntas
│   │   │   ├── room-list.tsx            # Lista de salas
│   │   │   └── 📁 ui/                   # Componentes Shadcn/ui
│   │   ├── 📁 pages/             # Páginas da aplicação
│   │   │   ├── create-room.tsx          # Página de criação de sala
│   │   │   ├── record-room-audio.tsx    # Página de gravação de áudio
│   │   │   └── room.tsx                 # Página da sala
│   │   ├── 📁 http/              # Hooks para API
│   │   │   ├── use-create-question.ts
│   │   │   ├── use-create-room.ts
│   │   │   ├── use-room-questions.ts
│   │   │   ├── use-rooms.ts
│   │   │   └── 📁 types/               # Tipos TypeScript
│   │   └── 📁 lib/               # Utilitários (dayjs, utils)
│   ├── package.json
│   ├── vite.config.ts
│   └── components.json
│
└── README.md                     # Este arquivo
```

</details>

---

## 🛠️ Scripts Disponíveis

### Backend (`/server`)

| Comando               | Descrição                                  |
| --------------------- | ------------------------------------------ |
| `npm run setup`       | Setup inicial completo (Docker + seed)     |
| `npm run dev:full`    | Desenvolvimento completo (Docker + server) |
| `npm run dev`         | Apenas servidor (Docker já rodando)        |
| `npm run db:seed`     | Popula banco com dados de exemplo          |
| `npm run db:generate` | Gera migrações do Drizzle                  |
| `npm run db:migrate`  | Aplica migrações no banco                  |
| `npm run studio`      | Abre Drizzle Studio para visualizar dados  |

### Frontend (`/web`)

| Comando           | Descrição                   |
| ----------------- | --------------------------- |
| `npm run dev`     | Servidor de desenvolvimento |
| `npm run build`   | Build para produção         |
| `npm run preview` | Preview da build            |
| `npm run lint`    | Verificação de código       |
| `npm run format`  | Formatação automática       |

---

## 🎯 Tecnologias e Ferramentas

### 🔧 Desenvolvimento

- **TypeScript** - Tipagem estática
- **Biome** - Linting e formatação unificados
- **Docker** - Containerização
- **Git** - Controle de versão

### 🔙 Backend

- **Fastify** - Framework web performático e moderno
- **PostgreSQL** + **pgvector** - Banco relacional com suporte a embeddings
- **Drizzle ORM** - ORM type-safe moderno e performático
- **Google Gemini** - IA para transcrição de áudio e embeddings
- **Zod v4** - Validação de schemas robusta

### 🎨 Frontend

- **React 19** - Biblioteca UI com as últimas funcionalidades
- **Vite 7** - Build tool extremamente rápido
- **Tailwind CSS v4** - CSS utilitário com novas funcionalidades
- **Radix UI** - Primitivos acessíveis para componentes
- **TanStack Query v5** - State management assíncrono poderoso
- **Web Audio API** - Gravação de áudio nativa do navegador

---

## � Documentação

Para documentação técnica detalhada, consulte:

- 📁 [`docs/`](./docs/) - Documentação completa do sistema e features implementadas

---

## �📝 Licença

Este projeto foi desenvolvido durante o **NLW Agents** da **Rocketseat** e está sob a [licença MIT](./LICENSE).

---

## 👩‍💻 Desenvolvido por

<div align="center">
  <table>
    <tr>
      <td align="center">
        <img src="./assets/devpixel.png" width="100px" alt="Joanna Braccini"/>
        <br />
        <b>Joanna Braccini</b>
        <br />
        <sub>Desenvolvedora Full Stack</sub>
        <br />
        <br />
        <a href="https://github.com/JoannaBraccini">
          <img src="https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white" alt="GitHub"/>
        </a>
        <br />
        <a href="https://linkedin.com/in/joannabraccini">
          <img src="https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white" alt="LinkedIn"/>
        </a>
      </td>
    </tr>
  </table>
</div>

<div align="center">
  <p>
    💜 Desenvolvido com muito carinho durante o <strong>NLW Agents</strong> da <strong>Rocketseat</strong>
  </p>
  <p>
    <i>"A tecnologia é melhor quando aproxima pessoas"</i>
  </p>
</div>
