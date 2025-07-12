# Let Me Ask Agents - Backend

**Backend da aplicação de perguntas e respostas com IA desenvolvida durante o NLW Agents da Rocketseat.**

Uma API REST moderna que oferece funcionalidades completas para criação de salas, perguntas por texto e áudio, com integração avançada de IA para transcrição e busca semântica.

## 🚀 Tecnologias Utilizadas

- **Node.js** com **TypeScript** - Ambiente de execução moderno
- **Fastify** - Framework web ultra-rápido e eficiente
- **PostgreSQL** + **pgvector** - Banco de dados com extensão para embeddings
- **Drizzle ORM** - Object-Relational Mapping type-safe e performático
- **Google Gemini** - IA para transcrição de áudio e geração de embeddings
- **Docker** - Containerização completa do ambiente
- **Zod v4** - Validação robusta de dados e tipos
- **Biome** - Linting e formatação unificados

## ✨ Funcionalidades

- 🏠 **CRUD de Salas** - Criação e listagem de salas
- ❓ **Sistema de Perguntas** - Criação e listagem de perguntas
- 🎤 **Upload de Áudio** - Recebe e processa arquivos de áudio
- 🤖 **Transcrição IA** - Converte áudio em texto usando Gemini
- 🔍 **Busca Semântica** - Embeddings vetoriais para busca inteligente
- 📊 **Banco Vetorial** - Armazenamento de embeddings com pgvector
- 🔒 **Validação Completa** - Schemas Zod para todos os endpoints
- 🐳 **Ambiente Dockerizado** - Setup automático com Docker Compose

## ⚙️ Setup e Configuração

### Primeira vez (setup completo):

```bash
npm install
npm run setup
```

### Depois de reiniciar o VS Code/PC:

```bash
npm run dev:full
```

## 📋 Comandos Disponíveis

| Comando               | Descrição                                      |
| --------------------- | ---------------------------------------------- |
| `npm run setup`       | Setup inicial completo (Docker + seed)         |
| `npm run dev:full`    | Desenvolvimento completo (Docker + servidor)   |
| `npm run dev`         | Apenas servidor (se Docker já estiver rodando) |
| `npm run db:seed`     | Popula banco com dados de exemplo              |
| `npm run db:generate` | Gera migrações do Drizzle                      |
| `npm run db:migrate`  | Aplica migrações no banco                      |
| `npm run studio`      | Abre Drizzle Studio para visualizar dados      |
| `npm start`           | Executa servidor em produção                   |

## 🔧 URLs Importantes

- **API Base**: http://localhost:3333
- **Health Check**: http://localhost:3333/health
- **Rooms**: http://localhost:3333/rooms
- **Questions**: http://localhost:3333/rooms/:roomId/questions
- **Audio Upload**: http://localhost:3333/rooms/:roomId/audio
- **PostgreSQL**: localhost:5432 (usuário: admin, senha: admin)
- **Drizzle Studio**: Disponível via `npm run studio`

## 📋 Rotas da API

### Salas

- `GET /rooms` - Lista todas as salas
- `POST /rooms` - Cria uma nova sala

### Perguntas

- `GET /rooms/:roomId/questions` - Lista perguntas de uma sala
- `POST /rooms/:roomId/questions` - Cria uma nova pergunta

### Upload de Áudio

- `POST /rooms/:roomId/audio` - Upload e transcrição de áudio

## 📝 Instruções de Setup

### Primeira Execução

1. **Abrir Docker Desktop** (necessário no Windows)
2. **Instalar dependências**: `npm install`
3. **Setup completo**: `npm run setup`
4. **Aguardar**: Mensagem "🚀 Server rodando na porta 3333!"

### Execuções Posteriores

1. **Abrir Docker Desktop**
2. **Executar**: `npm run dev:full`
3. **Aguardar**: Servidor inicializar

### Desenvolvimento Avançado

- **Apenas servidor**: `npm run dev` (se Docker já estiver rodando)
- **Repopular banco**: `npm run db:seed`
- **Ver dados**: `npm run studio`
- **Novas migrações**: `npm run db:generate` + `npm run db:migrate`

## 🐛 Troubleshooting

### Problemas Comuns

**Docker não conecta**

- Verifique se Docker Desktop está rodando
- No Windows: Reinicie o Docker Desktop se necessário

**Porta ocupada**

- Verifique se nada está rodando na porta 3333
- Altere `PORT` no arquivo `.env` se necessário

**Banco vazio após setup**

- Execute `npm run db:seed` manualmente
- Verifique logs do Docker Compose

**Erro de conexão com banco**

- Aguarde alguns segundos após `docker-compose up`
- PostgreSQL demora um pouco para inicializar

**Problemas com migrações**

- Execute `npm run db:migrate` para aplicar pendências
- Use `npm run studio` para verificar estado do banco

### Logs e Debug

```bash
# Ver logs do banco
docker-compose logs postgres

# Ver logs do container
docker-compose logs

# Resetar ambiente (cuidado: apaga dados)
docker-compose down -v
npm run setup
```
