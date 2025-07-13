import { generateEmbeddings } from "../services/gemini.ts";
import { schema } from "./schema/index.ts";
import { sql, db } from "./connection.ts";

await db.delete(schema.rooms);
await db.delete(schema.questions);

// Perguntas organizadas por tema/sala
const frontendQuestions = [
  {
    question: "Explique o conceito de Virtual DOM no React",
    answer:
      "Virtual DOM é uma representação JavaScript do DOM real mantida em memória. O React compara o Virtual DOM atual com o anterior (diffing) e atualiza apenas as partes que mudaram no DOM real, melhorando a performance.",
  },
  {
    question: "O que são Hooks no React e para que servem?",
    answer:
      "Hooks são funções que permitem usar estado e outras funcionalidades do React em componentes funcionais. Exemplos: useState para estado local, useEffect para efeitos colaterais, useContext para contexto global.",
  },
  {
    question: "O que é Context API no React?",
    answer:
      "Context API permite compartilhar dados entre componentes sem prop drilling. Útil para temas, autenticação, idioma. Composto por Provider (fornece dados) e Consumer/useContext (consome dados).",
  },
  {
    question: "Explique o conceito de Single Page Application (SPA)",
    answer:
      "SPA carrega uma única página HTML e atualiza dinamicamente o conteúdo via JavaScript. Vantagens: experiência fluida, menos requisições. Desvantagens: SEO complexo, carregamento inicial maior.",
  },
  {
    question: "O que são Web Components?",
    answer:
      "Web Components são tecnologias para criar elementos HTML customizados e reutilizáveis. Incluem Custom Elements, Shadow DOM, HTML Templates e ES Modules. Funcionam nativamente no browser.",
  },
  {
    question: "Diferença entre localStorage, sessionStorage e cookies",
    answer:
      "localStorage: persiste até ser removido manualmente, ~5-10MB. sessionStorage: persiste apenas na sessão, ~5-10MB. Cookies: enviados automaticamente para servidor, ~4KB, podem ter expiração.",
  },
];

const backendQuestions = [
  {
    question: "O que é uma API REST e quais são seus princípios?",
    answer:
      "REST é um estilo arquitetural para APIs que usa métodos HTTP (GET, POST, PUT, DELETE) de forma stateless. Princípios incluem: interface uniforme, stateless, cacheable, sistema em camadas e código sob demanda.",
  },
  {
    question: "Qual é a diferença entre autenticação e autorização?",
    answer:
      "Autenticação verifica quem é o usuário (login/senha, JWT tokens). Autorização determina o que o usuário autenticado pode fazer (permissões, roles, ACL). São processos complementares na segurança de aplicações.",
  },
  {
    question: "Explique os métodos HTTP mais utilizados",
    answer:
      "GET: recupera dados. POST: cria novos recursos. PUT: atualiza recursos completos. PATCH: atualiza parcialmente. DELETE: remove recursos. HEAD: como GET mas só retorna headers. OPTIONS: verifica métodos permitidos.",
  },
  {
    question: "Explique o conceito de middleware em frameworks web",
    answer:
      "Middleware são funções que executam durante o ciclo request-response, podendo modificar req/res ou encerrar o ciclo. Usados para autenticação, logging, parsing, CORS, tratamento de erros, etc.",
  },
  {
    question: "O que é CORS e como resolver problemas relacionados?",
    answer:
      "CORS (Cross-Origin Resource Sharing) controla requisições entre diferentes domínios por segurança. Soluções: configurar headers no servidor, usar proxy de desenvolvimento, ou configurar adequadamente o backend.",
  },
];

const databaseQuestions = [
  {
    question: "Qual é a diferença entre SQL e NoSQL?",
    answer:
      "SQL são bancos relacionais com estrutura fixa e relacionamentos definidos, como PostgreSQL e MySQL. NoSQL são bancos não-relacionais mais flexíveis, como MongoDB e Redis, ideais para dados não estruturados e escalabilidade horizontal.",
  },
  {
    question: "Qual a diferença entre SQL JOIN types?",
    answer:
      "INNER JOIN: retorna registros com correspondência em ambas tabelas. LEFT JOIN: todos da esquerda + correspondentes da direita. RIGHT JOIN: inverso do LEFT. FULL JOIN: todos os registros de ambas.",
  },
  {
    question: "O que são migrations em bancos de dados?",
    answer:
      "Migrations são scripts que modificam a estrutura do banco de forma controlada e versionada. Permitem evoluir o schema do banco, aplicar mudanças em diferentes ambientes e manter histórico de alterações.",
  },
  {
    question: "O que é um ORM e quais suas vantagens?",
    answer:
      "ORM (Object-Relational Mapping) mapeia objetos para tabelas de banco. Vantagens: abstração de SQL, type safety, migrations, relacionamentos automáticos, proteção contra SQL injection.",
  },
];

const devopsQuestions = [
  {
    question: "O que é Docker e quais suas vantagens?",
    answer:
      "Docker é uma plataforma de containerização que empacota aplicações com suas dependências. Vantagens: portabilidade entre ambientes, isolamento, versionamento, escalabilidade e deploy consistente.",
  },
  {
    question: "Qual a diferença entre teste unitário, integração e E2E?",
    answer:
      "Unitário: testa componentes isolados. Integração: testa interação entre módulos. E2E (End-to-End): testa fluxos completos do usuário. Pirâmide de testes: muitos unitários, alguns integração, poucos E2E.",
  },
];

const architectureQuestions = [
  {
    question: "O que é TypeScript e suas principais vantagens?",
    answer:
      "TypeScript é um superset do JavaScript que adiciona tipagem estática opcional. Vantagens: detecção de erros em tempo de compilação, melhor IDE support, refatoração segura, documentação através de tipos.",
  },
  {
    question: "O que são Promises e async/await em JavaScript?",
    answer:
      "Promises representam operações assíncronas futuras com estados: pending, fulfilled, rejected. Async/await é syntactic sugar para Promises, tornando código assíncrono mais legível e similar ao síncrono.",
  },
  {
    question: "Explique os princípios SOLID",
    answer:
      "S-Single Responsibility: uma classe, uma responsabilidade. O-Open/Closed: aberto para extensão, fechado para modificação. L-Liskov Substitution: subtipos substituíveis. I-Interface Segregation: interfaces específicas. D-Dependency Inversion: dependa de abstrações.",
  },
];

// Inserir salas com datas fixas no passado
await db.insert(schema.rooms).values([
  {
    name: "Desenvolvimento Frontend Avançado",
    description:
      "Discussões sobre React, Vue, Angular e tecnologias frontend modernas.",
    createdAt: new Date("2025-01-15T10:00:00Z"),
  },
  {
    name: "Backend e APIs RESTful",
    description:
      "Tudo sobre Node.js, Python, APIs, microserviços e arquitetura backend.",
    createdAt: new Date("2025-02-20T14:30:00Z"),
  },
  {
    name: "Banco de Dados e SQL",
    description: "PostgreSQL, MongoDB, MySQL, ORMs e otimização de queries.",
    createdAt: new Date("2025-03-25T09:15:00Z"),
  },
  {
    name: "DevOps e Deploy",
    description: "Docker, CI/CD, AWS, deploy e infraestrutura como código.",
    createdAt: new Date("2025-05-10T16:45:00Z"),
  },
  {
    name: "Arquitetura de Software",
    description:
      "Design patterns, clean code, SOLID e melhores práticas de desenvolvimento.",
    createdAt: new Date("2025-06-15T11:20:00Z"),
  },
]);

// Buscar as salas criadas para associar às perguntas
const rooms = await db.select().from(schema.rooms);

// Organizar perguntas por sala temática
const questionsToInsert = [
  // Frontend questions para sala "Desenvolvimento Frontend Avançado"
  ...frontendQuestions.map((q, index) => ({
    roomId: rooms[0].id, // Frontend room
    question: q.question,
    answer: q.answer,
    createdAt: new Date(
      `2025-01-${Math.min(index + 5, 28)
        .toString()
        .padStart(2, "0")}T${Math.min(8 + index, 23)
        .toString()
        .padStart(2, "0")}:30:00Z`
    ),
  })),

  // Backend questions para sala "Backend e APIs RESTful"
  ...backendQuestions.map((q, index) => ({
    roomId: rooms[1].id, // Backend room
    question: q.question,
    answer: q.answer,
    createdAt: new Date(
      `2025-02-${Math.min(index + 5, 28)
        .toString()
        .padStart(2, "0")}T${Math.min(8 + index, 23)
        .toString()
        .padStart(2, "0")}:30:00Z`
    ),
  })),

  // Database questions para sala "Banco de Dados e SQL"
  ...databaseQuestions.map((q, index) => ({
    roomId: rooms[2].id, // Database room
    question: q.question,
    answer: q.answer,
    createdAt: new Date(
      `2025-03-${Math.min(index + 5, 28)
        .toString()
        .padStart(2, "0")}T${Math.min(8 + index, 23)
        .toString()
        .padStart(2, "0")}:30:00Z`
    ),
  })),

  // DevOps questions para sala "DevOps e Deploy"
  ...devopsQuestions.map((q, index) => ({
    roomId: rooms[3].id, // DevOps room
    question: q.question,
    answer: q.answer,
    createdAt: new Date(
      `2025-05-${Math.min(index + 5, 28)
        .toString()
        .padStart(2, "0")}T${Math.min(8 + index, 23)
        .toString()
        .padStart(2, "0")}:30:00Z`
    ),
  })),

  // Architecture questions para sala "Arquitetura de Software"
  ...architectureQuestions.map((q, index) => ({
    roomId: rooms[4].id, // Architecture room
    question: q.question,
    answer: q.answer,
    createdAt: new Date(
      `2025-06-${Math.min(index + 5, 28)
        .toString()
        .padStart(2, "0")}T${Math.min(8 + index, 23)
        .toString()
        .padStart(2, "0")}:30:00Z`
    ),
  })),
];

// Inserir perguntas com embeddings
console.log("Gerando embeddings para perguntas...");

for (const questionData of questionsToInsert) {
  const embeddings = await generateEmbeddings(questionData.question);
  const embeddingsAsString = `[${embeddings.join(",")}]`;

  await sql`
    INSERT INTO questions (room_id, question, answer, created_at, embeddings)
    VALUES (${questionData.roomId}, ${questionData.question}, ${
    questionData.answer
  }, ${questionData.createdAt.toISOString()}, ${embeddingsAsString}::vector)
  `;
}

console.log("Perguntas inseridas com embeddings!");

// Inserir chunks de áudio simulados para as salas
const audioChunksData = [
  // Chunks para "Desenvolvimento Frontend Avançado"
  {
    roomId: rooms[0].id,
    transcription:
      "Vamos falar sobre React e seus hooks. O useState é um hook fundamental que permite adicionar estado local a componentes funcionais. Por exemplo, const [count, setCount] = useState(0) cria uma variável de estado count inicializada com 0.",
  },
  {
    roomId: rooms[0].id,
    transcription:
      "O useEffect é outro hook essencial no React. Ele permite executar efeitos colaterais em componentes funcionais, como chamadas para APIs, manipulação do DOM ou limpeza de recursos. É equivalente aos métodos componentDidMount, componentDidUpdate e componentWillUnmount das classes.",
  },
  {
    roomId: rooms[0].id,
    transcription:
      "O Virtual DOM é uma técnica de otimização onde o React mantém uma representação virtual da árvore de componentes em memória. Quando o estado muda, o React compara a nova árvore virtual com a anterior e atualiza apenas os nós que realmente mudaram no DOM real.",
  },

  // Chunks para "Backend e APIs RESTful"
  {
    roomId: rooms[1].id,
    transcription:
      "APIs REST seguem princípios específicos. O método GET é usado para recuperar dados, POST para criar novos recursos, PUT para atualizar recursos completos e DELETE para remover recursos. Cada operação deve ser stateless.",
  },
  {
    roomId: rooms[1].id,
    transcription:
      "A autenticação verifica a identidade do usuário através de credenciais como login e senha ou tokens JWT. Já a autorização determina quais ações o usuário autenticado pode realizar no sistema, através de roles e permissões.",
  },
  {
    roomId: rooms[1].id,
    transcription:
      "Middlewares são funções que executam durante o ciclo de vida de uma requisição HTTP. Eles podem modificar objetos de request e response, executar código, encerrar o ciclo ou chamar o próximo middleware na pilha.",
  },

  // Chunks para "Banco de Dados e SQL"
  {
    roomId: rooms[2].id,
    transcription:
      "Bancos SQL como PostgreSQL e MySQL são relacionais e usam esquemas fixos com tabelas, colunas e relacionamentos bem definidos. Suportam ACID e são ideais para dados estruturados com relacionamentos complexos.",
  },
  {
    roomId: rooms[2].id,
    transcription:
      "Bancos NoSQL como MongoDB e Redis são não-relacionais e mais flexíveis. O MongoDB armazena documentos JSON, enquanto o Redis é um banco chave-valor em memória. São ideais para escalabilidade horizontal e dados não estruturados.",
  },

  // Chunks para "DevOps e Deploy"
  {
    roomId: rooms[3].id,
    transcription:
      "Docker é uma plataforma de containerização que permite empacotar aplicações com todas suas dependências em containers leves e portáveis. Os containers compartilham o kernel do OS, sendo mais eficientes que máquinas virtuais.",
  },
  {
    roomId: rooms[3].id,
    transcription:
      "As principais vantagens do Docker incluem portabilidade entre diferentes ambientes, isolamento de aplicações, versionamento de imagens, facilidade de escalabilidade e deploy consistente em produção.",
  },
  {
    roomId: rooms[3].id,
    transcription:
      "CI/CD significa Continuous Integration e Continuous Deployment. É uma prática que automatiza a integração de código, execução de testes e deploy da aplicação, garantindo entregas mais rápidas e confiáveis.",
  },

  // Chunks para "Arquitetura de Software"
  {
    roomId: rooms[4].id,
    transcription:
      "TypeScript é um superset do JavaScript que adiciona tipagem estática opcional. Permite detectar erros em tempo de compilação, oferece melhor suporte de IDEs, facilita refatoração e serve como documentação viva do código.",
  },
  {
    roomId: rooms[4].id,
    transcription:
      "Promises são objetos que representam a eventual conclusão ou falha de uma operação assíncrona. O async/await é uma sintaxe mais limpa para trabalhar com Promises, tornando código assíncrono similar ao síncrono.",
  },
  {
    roomId: rooms[4].id,
    transcription:
      "Design patterns são soluções reutilizáveis para problemas comuns no desenvolvimento. Exemplos incluem Singleton para instância única, Observer para notificações e Factory para criação de objetos.",
  },
];

// Gerar embeddings para cada chunk e inserir no banco
console.log("Gerando embeddings para chunks de áudio...");
for (const chunk of audioChunksData) {
  const embeddings = await generateEmbeddings(chunk.transcription);
  const embeddingsAsString = `[${embeddings.join(",")}]`;

  await sql`
    INSERT INTO audio_chunks (room_id, transcription, embeddings)
    VALUES (${chunk.roomId}, ${chunk.transcription}, ${embeddingsAsString}::vector)
  `;
}

console.log("Chunks de áudio inseridos com sucesso!");

await sql.end();
console.log("Database seeded with proper content");
