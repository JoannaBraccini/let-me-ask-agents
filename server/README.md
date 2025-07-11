# NLW Agents - Server

Projeto desenvolvido durante o evento NLW Agents da Rocketseat.

## 🚀 Tecnologias Utilizadas

- **Node.js** com TypeScript
- **Fastify** - Framework web
- **PostgreSQL** - Banco de dados
- **pgvector** - Extensão para embeddings
- **Drizzle ORM** - Object-Relational Mapping
- **Docker** - Containerização
- **Zod** - Validação de dados

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

| Comando            | Descrição                                      |
| ------------------ | ---------------------------------------------- |
| `npm run setup`    | Inicia Docker + popula banco (primeira vez)    |
| `npm run dev:full` | Inicia Docker + servidor (uso diário)          |
| `npm run dev`      | Apenas servidor (se Docker já estiver rodando) |
| `npm run db:seed`  | Popula banco com dados fake                    |

## 🔧 URLs Importantes

- **API**: http://localhost:5000
- **Health Check**: http://localhost:5000/health
- **Rooms**: http://localhost:5000/rooms
- **PostgreSQL**: localhost:5432

## 📝 Instruções de Setup

1. **Abrir Docker Desktop** (necessário no Windows)
2. **Executar**: `npm run dev:full`
3. **Aguardar**: Mensagem "🚀 Server rodando na porta 5000!"

## 🐛 Troubleshooting

- **Porta ocupada**: Altere `PORT` no arquivo `.env`
- **Docker não conecta**: Verifique se Docker Desktop está rodando
- **Banco vazio**: Execute `npm run db:seed`
