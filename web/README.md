# Let Me Ask Agents

Um projeto de sistema de perguntas e respostas desenvolvido durante o **NLW Agents** da **Rocketseat**. Uma aplicação moderna e interativa que permite criar salas para fazer perguntas e obter respostas.

## 🚀 Tecnologias

Este projeto foi desenvolvido com as seguintes tecnologias principais:

### Frontend

- **React 19** - Biblioteca para criação de interfaces
- **TypeScript** - Tipagem estática para JavaScript
- **Vite** - Build tool e dev server
- **React Router DOM** - Roteamento para SPA
- **TanStack Query** - Gerenciamento de estado assíncrono
- **Tailwind CSS** - Framework de CSS utilitário
- **Shadcn/ui** - Componentes UI reutilizáveis

### Ferramentas de Desenvolvimento

- **Biome** - Linting e formatação de código
- **Lucide React** - Ícones SVG
- **Radix UI** - Componentes primitivos acessíveis

## 📋 Funcionalidades

- ✅ Listagem de salas disponíveis
- ✅ Navegação entre páginas
- ✅ Roteamento com validação
- ✅ Interface responsiva e moderna
- ✅ Integração com API
- ✅ Gerenciamento de estado
- ✅ Tipagem completa com TypeScript

## 🔧 Como executar

### Pré-requisitos

- Node.js (versão 18 ou superior)
- npm, yarn ou pnpm

### Instalação

```bash
# Clone o repositório
git clone https://github.com/JoannaBraccini/let-me-ask-agents.git

# Entre na pasta do projeto
cd let-me-ask-agents/web

# Instale as dependências
npm install
# ou
yarn install
# ou
pnpm install
```

### Executando o projeto

```bash
# Modo desenvolvimento
npm run dev
# ou
yarn dev
# ou
pnpm dev
```

A aplicação estará disponível em `http://localhost:5173`

### Scripts disponíveis

```bash
# Desenvolvimento
npm run dev

# Build para produção
npm run build

# Preview da build
npm run preview

# Linting
npm run lint
npm run lint:fix

# Formatação de código
npm run format

# Verificação completa (lint + format)
npm run check
npm run check:fix
```

## 📁 Estrutura do projeto

```text
src/
├── components/          # Componentes reutilizáveis
│   └── ui/             # Componentes da UI (Shadcn)
├── lib/                # Utilitários e configurações
├── pages/              # Páginas da aplicação
├── app.tsx             # Componente principal
├── main.tsx            # Ponto de entrada
└── index.css           # Estilos globais
```

## 🎨 Design System

O projeto utiliza o **Shadcn/ui** como base para os componentes, garantindo:

- Consistência visual
- Acessibilidade
- Customização fácil
- Componentes reutilizáveis

## 🔗 Rotas

- `/` - Página inicial com listagem de salas
- `/room/:roomId` - Página da sala específica

## 🛠️ Configuração

### Tailwind CSS

Configurado com Tailwind CSS 4.0 e variáveis CSS customizadas para temas.

### TypeScript

Configuração rigorosa com:

- Strict mode habilitado
- Path mapping configurado (`@/*`)
- Verificações de qualidade de código

### Biome

Ferramenta unificada para:

- Linting
- Formatação
- Verificação de código

## 📱 Responsividade

A aplicação é totalmente responsiva e otimizada para:

- Desktop
- Tablet
- Mobile

<!-- ## 🎯 Próximos passos

- [ ] Implementar criação de salas
- [ ] Sistema de perguntas em tempo real
- [ ] Autenticação de usuários
- [ ] Moderação de salas
- [ ] Sistema de votação
- [ ] Notificações em tempo real -->

## 📝 Licença

Este projeto foi desenvolvido durante o **NLW Agents** da **Rocketseat**.

---

Desenvolvido com ❤️ durante o **NLW Agents** da **Rocketseat**
