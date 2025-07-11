<div align="center">
  <h1>🤖 Let Me Ask Agents</h1>
  <p>Sistema de perguntas e respostas desenvolvido durante o <strong>NLW Agents</strong> da <strong>Rocketseat</strong></p>
  
  [![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
  [![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
  [![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
  [![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)](https://www.postgresql.org/)
  [![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)](https://www.docker.com/)
</div>

---

## 📋 Sobre o Projeto

**Let Me Ask Agents** é uma aplicação moderna e interativa que permite criar salas para fazer perguntas e obter respostas. O projeto foi desenvolvido utilizando as mais recentes tecnologias do mercado, seguindo as melhores práticas de desenvolvimento.

### ✨ Funcionalidades

- 🏠 Listagem de salas disponíveis
- 🔄 Sistema de perguntas em tempo real
- 📱 Interface responsiva e moderna
- 🔒 Validação de dados robusta
- 🎯 Roteamento inteligente
- 💾 Persistência de dados com PostgreSQL

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

- **Node.js** + **TypeScript** - Ambiente de execução
- **Fastify** - Framework web rápido e eficiente
- **PostgreSQL** + **pgvector** - Banco de dados com extensão para embeddings
- **Drizzle ORM** - Object-Relational Mapping type-safe
- **Docker** - Containerização do ambiente
- **Zod** - Validação de esquemas e tipos

### 🎨 Frontend (`/web`)

**Stack Principal:**

- **React 19** + **TypeScript** - Interface moderna e reativa
- **Vite** - Build tool e servidor de desenvolvimento
- **React Router DOM** - Roteamento para SPA
- **TanStack Query** - Gerenciamento de estado assíncrono
- **Tailwind CSS** - Framework CSS utilitário
- **Shadcn/ui** - Sistema de componentes acessíveis

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
- **Backend API**: <http://localhost:5000>
- **Health Check**: <http://localhost:5000/health>

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
│   │   │   ├── 📁 schema/         # Esquemas do banco
│   │   │   └── 📁 migrations/     # Migrações
│   │   └── 📁 http/
│   │       └── 📁 routes/         # Rotas da API
│   ├── 📁 docker/
│   ├── package.json
│   ├── docker-compose.yml
│   └── drizzle.config.ts
│
├── 📁 web/
│   ├── 📁 src/
│   │   ├── main.tsx              # Ponto de entrada
│   │   ├── app.tsx               # App principal
│   │   ├── 📁 components/
│   │   │   └── 📁 ui/            # Componentes Shadcn
│   │   ├── 📁 pages/             # Páginas da aplicação
│   │   └── 📁 lib/               # Utilitários
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

| Comando            | Descrição                                  |
| ------------------ | ------------------------------------------ |
| `npm run setup`    | Setup inicial completo (Docker + seed)     |
| `npm run dev:full` | Desenvolvimento completo (Docker + server) |
| `npm run dev`      | Apenas servidor (Docker já rodando)        |
| `npm run db:seed`  | Popula banco com dados de exemplo          |

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

- **Fastify** - Framework web performático
- **PostgreSQL** - Banco relacional robusto
- **Drizzle ORM** - ORM type-safe moderno
- **Zod** - Validação de schemas

### 🎨 Frontend

- **React 19** - Biblioteca UI mais recente
- **Vite** - Build tool rápido
- **Tailwind CSS** - CSS utilitário
- **Radix UI** - Primitivos acessíveis
- **TanStack Query** - State management assíncrono

---

## 📝 Licença

Este projeto foi desenvolvido durante o **NLW Agents** da **Rocketseat** e está sob a [licença MIT](./LICENSE).

---

## 👩‍💻 Desenvolvido por

<div align="center">
  <table>
    <tr>
      <td align="center">
        <img src="./devpixel.png" width="100px" alt="Joanna Braccini"/>
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
