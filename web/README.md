# Let Me Ask Agents - Frontend

**Interface moderna e interativa para o sistema de perguntas e respostas com IA desenvolvido durante o NLW Agents da Rocketseat.**

Uma aplicação React moderna que oferece uma experiência completa para criação de salas, perguntas por texto e gravação de áudio, com design responsivo e componentes acessíveis.

## 🚀 Tecnologias

Este projeto foi desenvolvido com as seguintes tecnologias principais:

### Frontend Core

- **React 19** - Biblioteca para criação de interfaces com as últimas funcionalidades
- **TypeScript** - Tipagem estática para JavaScript com máxima segurança
- **Vite 7** - Build tool e dev server extremamente rápido
- **React Router DOM v7** - Roteamento para SPA com novas funcionalidades
- **TanStack Query v5** - Gerenciamento de estado assíncrono poderoso
- **Tailwind CSS v4** - Framework de CSS utilitário com novas funcionalidades

### UI e UX

- **Shadcn/ui** - Sistema de componentes reutilizáveis baseado em Radix UI
- **Radix UI** - Componentes primitivos acessíveis e personalizáveis
- **Lucide React** - Ícones SVG modernos e consistentes
- **React Hook Form** - Gerenciamento de formulários performático
- **Zod v4** - Validação de formulários type-safe

### Recursos Avançados

- **Web Audio API** - Gravação de áudio nativa do navegador
- **MediaRecorder API** - Captura de mídia em tempo real
- **Speech Recognition** - Suporte para reconhecimento de voz (tipado)
- **Day.js** - Manipulação de datas leve e moderna

## 📋 Funcionalidades

- ✅ **Listagem de salas** - Visualize todas as salas disponíveis com informações detalhadas
- ✅ **Criação de salas** - Crie novas salas com formulário validado
- ✅ **Sistema de perguntas** - Faça perguntas por texto de forma intuitiva
- ✅ **Gravação de áudio** - Grave perguntas por áudio usando Web Audio API
- ✅ **Navegação fluida** - Roteamento SPA com React Router DOM v7
- ✅ **Interface responsiva** - Design moderno que funciona em qualquer dispositivo
- ✅ **Integração com API** - Comunicação eficiente com backend via TanStack Query
- ✅ **Gerenciamento de estado** - Estado assíncrono gerenciado de forma inteligente
- ✅ **Componentes acessíveis** - UI baseada em Radix UI com foco em acessibilidade
- ✅ **Formulários validados** - Validação robusta com React Hook Form + Zod
- ✅ **Tipagem completa** - TypeScript em 100% do código para máxima segurança
- ✅ **Design system** - Componentes consistentes com Shadcn/ui e Tailwind CSS

## 🔧 Como executar

### Pré-requisitos

- **Node.js** (versão 18 ou superior)
- **npm**, **yarn** ou **pnpm**
- **Backend rodando** na porta 3333 (veja README do servidor)

### Instalação e Execução

```bash
# Clone o repositório (se ainda não fez)
git clone https://github.com/JoannaBraccini/let-me-ask-agents.git

# Entre na pasta do projeto frontend
cd let-me-ask-agents/web

# Instale as dependências
npm install
# ou
yarn install
# ou
pnpm install

# Execute o projeto em modo desenvolvimento
npm run dev
# ou
yarn dev
# ou
pnpm dev
```

A aplicação estará disponível em `http://localhost:5173`

> **Importante**: Certifique-se de que o backend esteja rodando na porta 3333 antes de iniciar o frontend.

### Scripts disponíveis

```bash
# Desenvolvimento
npm run dev              # Inicia servidor de desenvolvimento

# Build e Deploy
npm run build            # Build otimizada para produção
npm run preview          # Preview da build de produção

# Qualidade de Código
npm run lint             # Verificação de código com Biome
npm run lint:fix         # Correção automática de problemas

npm run format           # Formatação de código com Biome

npm run check            # Verificação completa (lint + format)
npm run check:fix        # Correção completa automática

# TypeScript
npx tsc --noEmit         # Verificação de tipos sem gerar arquivos
```

## 📁 Estrutura do projeto

```text
src/
├── components/          # Componentes reutilizáveis
│   ├── create-room-form.tsx     # Formulário de criação de sala
│   ├── question-form.tsx        # Formulário de perguntas
│   ├── question-item.tsx        # Item individual da pergunta
│   ├── question-list.tsx        # Lista de perguntas
│   ├── room-list.tsx            # Lista de salas
│   └── ui/                      # Componentes da UI (Shadcn/ui)
├── http/                # Hooks e utilitários para API
│   ├── use-create-question.ts   # Hook para criar perguntas
│   ├── use-create-room.ts       # Hook para criar salas
│   ├── use-room-questions.ts    # Hook para buscar perguntas
│   ├── use-rooms.ts             # Hook para buscar salas
│   └── types/                   # Tipos TypeScript para API
├── lib/                 # Utilitários e configurações
│   ├── dayjs.ts                 # Configuração do Day.js
│   └── utils.ts                 # Utilitários gerais
├── pages/               # Páginas da aplicação
│   ├── create-room.tsx          # Página de criação de sala
│   ├── record-room-audio.tsx    # Página de gravação de áudio
│   └── room.tsx                 # Página da sala com perguntas
├── app.tsx              # Componente principal com roteamento
├── main.tsx             # Ponto de entrada da aplicação
├── index.css            # Estilos globais e configuração Tailwind
└── vite-env.d.ts        # Tipos do Vite
```

## 🎨 Design System

O projeto utiliza o **Shadcn/ui** como base para os componentes, garantindo:

- Consistência visual
- Acessibilidade
- Customização fácil
- Componentes reutilizáveis

## 🔗 Rotas e Navegação

| Rota                  | Página     | Descrição                                    |
| --------------------- | ---------- | -------------------------------------------- |
| `/`                   | Home       | Listagem de todas as salas disponíveis       |
| `/create-room`        | Criar Sala | Formulário para criação de nova sala         |
| `/room/:roomId`       | Sala       | Visualização de perguntas da sala específica |
| `/room/:roomId/audio` | Gravação   | Página para gravar perguntas por áudio       |

### Navegação Programática

O projeto utiliza React Router DOM v7 com:

- Navegação type-safe com `useNavigate()`
- Parâmetros de rota tipados com `useParams<T>()`
- Loading states integrados
- Fallbacks para rotas não encontradas

## 🛠️ Configuração e Tecnologias

### Tailwind CSS v4

Configurado com as últimas funcionalidades:

- CSS Variables nativas para temas
- Animações customizadas com `tw-animate-css`
- Plugin oficial `@tailwindcss/vite` para melhor performance
- Design tokens consistentes

### TypeScript

Configuração rigorosa para máxima segurança:

- Strict mode habilitado
- Path mapping configurado (`@/*` → `src/*`)
- Verificações de qualidade de código
- Tipos para Web APIs (Speech Recognition, MediaRecorder)

### Biome

Ferramenta unificada moderna para:

- Linting avançado com regras customizadas
- Formatação automática consistente
- Verificação de código em tempo real
- Integração com VS Code

### TanStack Query v5

Gerenciamento de estado assíncrono com:

- Cache inteligente de requisições
- Sincronização automática
- Loading e error states
- Otimistic updates
- Background refetching

### Vite 7

Build tool moderno com:

- Hot Module Replacement (HMR) ultra-rápido
- Tree shaking otimizado
- Build de produção otimizada
- Suporte nativo a TypeScript

## 📱 Responsividade e Acessibilidade

### Design Responsivo

A aplicação é totalmente responsiva e otimizada para:

- **Desktop** (1024px+) - Layout em grid com múltiplas colunas
- **Tablet** (768px-1023px) - Layout adaptado para toque
- **Mobile** (320px-767px) - Interface otimizada para celulares

### Acessibilidade

Recursos de acessibilidade implementados:

- **Navegação por teclado** completa
- **Screen readers** com ARIA labels apropriados
- **Contraste** adequado seguindo WCAG 2.1
- **Focus management** bem definido
- **Componentes semânticos** baseados em Radix UI

### Web APIs Utilizadas

- **MediaRecorder API** - Gravação de áudio nativa
- **getUserMedia API** - Acesso ao microfone
- **Web Audio API** - Processamento de áudio
- **Speech Recognition API** - Reconhecimento de voz (tipado)

## 🚀 Performance

### Otimizações Implementadas

- **Code splitting** automático por rotas
- **Lazy loading** de componentes pesados
- **Tree shaking** para reduzir bundle size
- **Asset optimization** com Vite
- **Cache strategies** com TanStack Query

## 🐛 Troubleshooting

### Problemas Comuns

**Backend não conecta**

- Verifique se o servidor está rodando na porta 3333
- Confirme que não há erros no console do backend
- Teste a URL `http://localhost:3333/health`

**Erro de CORS**

- Certifique-se de que o backend está configurado para aceitar requisições do frontend
- Verifique se as URLs estão corretas

**Gravação de áudio não funciona**

- Verifique se o navegador suporta MediaRecorder API
- Confirme permissões de microfone
- Teste em HTTPS (algumas APIs requerem contexto seguro)

**Build falha**

- Execute `npm run check` para verificar erros de TypeScript
- Limpe node_modules: `rm -rf node_modules && npm install`
- Verifique versão do Node.js (mínimo 18)

### Logs e Debug

```bash
# Verificar erros de TypeScript
npx tsc --noEmit

# Verificar problemas de linting
npm run lint

# Debug detalhado do Vite
npm run dev -- --debug

# Análise do bundle
npm run build -- --analyze
```

---

## 📝 Licença

Este projeto foi desenvolvido durante o **NLW Agents** da **Rocketseat** e está sob a licença MIT.

---

<div align="center">
  <p>
    💜 Desenvolvido com muito carinho durante o <strong>NLW Agents</strong> da <strong>Rocketseat</strong>
  </p>
  <p>
    <i>"A melhor interface é aquela que conecta pessoas de forma natural"</i>
  </p>
</div>
