# 🎯 Let Me Ask Agents - Sistema Completo

Sistema de perguntas e respostas com IA utilizando busca vetorial e cache inteligente.

## ✨ Funcionalidades Implementadas

### 🔍 Busca Inteligente em Cascata

1. **Chunks da sala atual** - Busca no conteúdo de áudio da sala (threshold: 0.75)
2. **Chunks de outras salas** - Expande busca para outras salas (threshold: 0.75)
3. **Respostas existentes** - Fallback para perguntas já respondidas (threshold: 0.8)

### 🎯 Filtros de Qualidade

- Remove respostas genéricas ("não possuo informações", etc.)
- Prioriza respostas com conteúdo útil
- Evita cache de respostas ruins

### 🧠 Busca Vetorial

- Embeddings de 768 dimensões via Google Gemini
- Similaridade por produto escalar
- PostgreSQL com extensão pgvector

### 🗂️ Organização Temática

- **Frontend**: React, Hooks, Context API, SPA, Web Components
- **Backend**: APIs REST, Autenticação, HTTP, Middleware, CORS
- **Banco de Dados**: SQL vs NoSQL, JOINs, Migrations, ORM
- **DevOps**: Docker, Testes, CI/CD
- **Arquitetura**: TypeScript, Promises, SOLID

### 🎨 Interface Inteligente

- Formulário com limpeza automática após envio
- Sugestões de navegação para salas relevantes
- Cards visuais com indicação de salas alternativas
- Layout responsivo e moderno

## 🏗️ Arquitetura

### Backend (Node.js + TypeScript)

```
server/src/
├── db/
│   ├── connection.ts      # Conexão PostgreSQL
│   ├── seed.ts           # Dados iniciais com embeddings
│   └── schema/           # Schemas Drizzle ORM
├── http/routes/
│   ├── create-question.ts # Lógica principal de busca
│   ├── create-room.ts
│   └── get-*.ts
├── services/
│   ├── gemini.ts         # IA e embeddings
│   └── env.ts
└── scripts/
    └── reset-database.ts # Utilitário de reset
```

### Frontend (React + TypeScript)

```
web/src/
├── components/
│   ├── question-form.tsx    # Formulário inteligente
│   ├── question-item.tsx    # Item com sugestões
│   ├── question-list.tsx
│   └── room-list.tsx
├── http/
│   ├── use-*.ts            # React Query hooks
│   └── types/              # Tipos TypeScript
└── pages/
    ├── room.tsx            # Página principal
    └── create-room.tsx
```

## 🔧 Comandos Principais

### 🏁 Setup Inicial

```bash
# 1. Clone e instale dependências
git clone <repo>
cd let-me-ask-agents
npm install

# 2. Configure ambiente
cp server/.env.example server/.env
# Edite o .env com suas chaves

# 3. Inicie o banco + populate dados
npm run setup
```

### 🚀 Desenvolvimento

```bash
npm run dev              # Inicia servidor + frontend
npm run dev:server       # Apenas servidor (watch mode)
npm run dev:web          # Apenas frontend (Vite)
npm run start            # Servidor em produção
```

### 🗄️ Banco de Dados

```bash
# Setup e Reset
npm run setup            # Docker + configuração inicial
npm run db:fresh         # Reset completo + seed (⭐ recomendado)
npm run db:reset         # Apenas limpa tabelas
npm run db:seed          # Apenas popula dados

# Migrations
npm run db:generate      # Gera migrations
npm run db:migrate       # Aplica migrations

# Ferramentas
npm run db:studio        # Drizzle Studio (GUI)
```

### 🐳 Reset Completo com Docker

```bash
# Para casos extremos (apaga TUDO)
docker-compose down -v   # Remove volumes
npm run setup            # Recria do zero
```

### 🔍 Qualidade e Build

```bash
npm run lint             # Verificação de código
npm run build            # Build de produção
npm run preview          # Preview do build
```

## 🌟 Algoritmo de Busca

```typescript
// ETAPA 1: Chunks da sala atual
const chunks = buscarChunks(salaAtual, threshold: 0.75)
if (chunks.length > 0) {
  return gerarResposta(chunks)
}

// ETAPA 2: Chunks de outras salas
const outrosChunks = buscarChunks(outrasSalas, threshold: 0.75)
if (outrosChunks.length > 0) {
  return {
    resposta: gerarResposta(outrosChunks),
    sugestoes: extrairSalas(outrosChunks)
  }
}

// ETAPA 3: Respostas existentes (fallback)
const respostasExistentes = buscarRespostas(threshold: 0.8, filtrarGenericas: true)
if (respostasExistentes.length > 0) {
  return {
    resposta: respostasExistentes[0].answer,
    sugestoes: respostasExistentes[0].roomId !== salaAtual ? [sala] : []
  }
}
```

## 🎯 Próximas Melhorias

- [ ] Cache Redis para embeddings
- [ ] Busca híbrida (texto + vetor)
- [ ] Análise de sentimento
- [ ] Métricas de satisfação
- [ ] Rate limiting inteligente

## 📚 Tecnologias

- **Backend**: Node.js, TypeScript, Fastify, Drizzle ORM
- **Frontend**: React, TypeScript, Vite, TailwindCSS, React Query
- **Banco**: PostgreSQL + pgvector
- **IA**: Google Gemini (embeddings + geração)
- **Infra**: Docker, npm workspaces

---

_Sistema desenvolvido com foco em inteligência e experiência do usuário_ ✨
