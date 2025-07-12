import { db, sql } from './connection.ts'
import { schema } from './schema/index.ts'

await db.delete(schema.rooms)
await db.delete(schema.questions)

const fullstackQuestions = [
  {
    question: 'Qual é a diferença entre SQL e NoSQL?',
    answer:
      'SQL são bancos relacionais com estrutura fixa e relacionamentos definidos, como PostgreSQL e MySQL. NoSQL são bancos não-relacionais mais flexíveis, como MongoDB e Redis, ideais para dados não estruturados e escalabilidade horizontal.',
  },
  {
    question: 'O que é uma API REST e quais são seus princípios?',
    answer:
      'REST é um estilo arquitetural para APIs que usa métodos HTTP (GET, POST, PUT, DELETE) de forma stateless. Princípios incluem: interface uniforme, stateless, cacheable, sistema em camadas e código sob demanda.',
  },
  {
    question: 'Explique o conceito de Virtual DOM no React',
    answer:
      'Virtual DOM é uma representação JavaScript do DOM real mantida em memória. O React compara o Virtual DOM atual com o anterior (diffing) e atualiza apenas as partes que mudaram no DOM real, melhorando a performance.',
  },
  {
    question: 'O que são Hooks no React e para que servem?',
    answer:
      'Hooks são funções que permitem usar estado e outras funcionalidades do React em componentes funcionais. Exemplos: useState para estado local, useEffect para efeitos colaterais, useContext para contexto global.',
  },
  {
    question: 'Qual é a diferença entre autenticação e autorização?',
    answer:
      'Autenticação verifica quem é o usuário (login/senha, JWT tokens). Autorização determina o que o usuário autenticado pode fazer (permissões, roles, ACL). São processos complementares na segurança de aplicações.',
  },
  {
    question: 'O que é Docker e quais suas vantagens?',
    answer:
      'Docker é uma plataforma de containerização que empacota aplicações com suas dependências. Vantagens: portabilidade entre ambientes, isolamento, versionamento, escalabilidade e deploy consistente.',
  },
  {
    question: 'Explique os métodos HTTP mais utilizados',
    answer:
      'GET: recupera dados. POST: cria novos recursos. PUT: atualiza recursos completos. PATCH: atualiza parcialmente. DELETE: remove recursos. HEAD: como GET mas só retorna headers. OPTIONS: verifica métodos permitidos.',
  },
  {
    question: 'O que é TypeScript e suas principais vantagens?',
    answer:
      'TypeScript é um superset do JavaScript que adiciona tipagem estática opcional. Vantagens: detecção de erros em tempo de compilação, melhor IDE support, refatoração segura, documentação através de tipos.',
  },
  {
    question: 'O que são Promises e async/await em JavaScript?',
    answer:
      'Promises representam operações assíncronas futuras com estados: pending, fulfilled, rejected. Async/await é syntactic sugar para Promises, tornando código assíncrono mais legível e similar ao síncrono.',
  },
  {
    question: 'Explique o conceito de middleware em frameworks web',
    answer:
      'Middleware são funções que executam durante o ciclo request-response, podendo modificar req/res ou encerrar o ciclo. Usados para autenticação, logging, parsing, CORS, tratamento de erros, etc.',
  },
  {
    question: 'O que é CORS e como resolver problemas relacionados?',
    answer:
      'CORS (Cross-Origin Resource Sharing) controla requisições entre diferentes domínios por segurança. Soluções: configurar headers no servidor, usar proxy de desenvolvimento, ou configurar adequadamente o backend.',
  },
  {
    question: 'Qual a diferença entre SQL JOIN types?',
    answer:
      'INNER JOIN: retorna registros com correspondência em ambas tabelas. LEFT JOIN: todos da esquerda + correspondentes da direita. RIGHT JOIN: inverso do LEFT. FULL JOIN: todos os registros de ambas.',
  },
  {
    question: 'O que são migrations em bancos de dados?',
    answer:
      'Migrations são scripts que modificam a estrutura do banco de forma controlada e versionada. Permitem evoluir o schema do banco, aplicar mudanças em diferentes ambientes e manter histórico de alterações.',
  },
  {
    question: 'Explique os princípios SOLID',
    answer:
      'S-Single Responsibility: uma classe, uma responsabilidade. O-Open/Closed: aberto para extensão, fechado para modificação. L-Liskov Substitution: subtipos substituíveis. I-Interface Segregation: interfaces específicas. D-Dependency Inversion: dependa de abstrações.',
  },
  {
    question: 'O que é Context API no React?',
    answer:
      'Context API permite compartilhar dados entre componentes sem prop drilling. Útil para temas, autenticação, idioma. Composto por Provider (fornece dados) e Consumer/useContext (consome dados).',
  },
  {
    question: 'Diferença entre localStorage, sessionStorage e cookies',
    answer:
      'localStorage: persiste até ser removido manualmente, ~5-10MB. sessionStorage: persiste apenas na sessão, ~5-10MB. Cookies: enviados automaticamente para servidor, ~4KB, podem ter expiração.',
  },
  {
    question: 'O que é um ORM e quais suas vantagens?',
    answer:
      'ORM (Object-Relational Mapping) mapeia objetos para tabelas de banco. Vantagens: abstração de SQL, type safety, migrations, relacionamentos automáticos, proteção contra SQL injection.',
  },
  {
    question: 'Explique o conceito de Single Page Application (SPA)',
    answer:
      'SPA carrega uma única página HTML e atualiza dinamicamente o conteúdo via JavaScript. Vantagens: experiência fluida, menos requisições. Desvantagens: SEO complexo, carregamento inicial maior.',
  },
  {
    question: 'O que são Web Components?',
    answer:
      'Web Components são tecnologias para criar elementos HTML customizados e reutilizáveis. Incluem Custom Elements, Shadow DOM, HTML Templates e ES Modules. Funcionam nativamente no browser.',
  },
  {
    question: 'Qual a diferença entre teste unitário, integração e E2E?',
    answer:
      'Unitário: testa componentes isolados. Integração: testa interação entre módulos. E2E (End-to-End): testa fluxos completos do usuário. Pirâmide de testes: muitos unitários, alguns integração, poucos E2E.',
  },
]

// Inserir salas com datas fixas no passado
await db.insert(schema.rooms).values([
  {
    name: 'Desenvolvimento Frontend Avançado',
    description:
      'Discussões sobre React, Vue, Angular e tecnologias frontend modernas.',
    createdAt: new Date('2025-01-15T10:00:00Z'),
  },
  {
    name: 'Backend e APIs RESTful',
    description:
      'Tudo sobre Node.js, Python, APIs, microserviços e arquitetura backend.',
    createdAt: new Date('2025-02-20T14:30:00Z'),
  },
  {
    name: 'Banco de Dados e SQL',
    description: 'PostgreSQL, MongoDB, MySQL, ORMs e otimização de queries.',
    createdAt: new Date('2025-03-25T09:15:00Z'),
  },
  {
    name: 'DevOps e Deploy',
    description: 'Docker, CI/CD, AWS, deploy e infraestrutura como código.',
    createdAt: new Date('2025-05-10T16:45:00Z'),
  },
  {
    name: 'Arquitetura de Software',
    description:
      'Design patterns, clean code, SOLID e melhores práticas de desenvolvimento.',
    createdAt: new Date('2025-06-15T11:20:00Z'),
  },
])

// Buscar as salas criadas para associar às perguntas
const rooms = await db.select().from(schema.rooms)

// Inserir perguntas com datas distribuídas de janeiro até julho 2025
const questionsToInsert = fullstackQuestions.map((q, index) => {
  // Distribui as 20 perguntas ao longo dos meses de janeiro a julho
  const month = Math.floor(index / 3) + 1 // 3-4 perguntas por mês
  const day = (index % 28) + 1 // Varia os dias
  const hour = 8 + (index % 12) // Varia as horas entre 8h e 19h

  return {
    roomId: rooms[index % rooms.length].id, // Distribui as perguntas entre as salas
    question: q.question,
    answer: q.answer,
    createdAt: new Date(
      `2025-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}T${hour.toString().padStart(2, '0')}:30:00Z`
    ),
  }
})

await db.insert(schema.questions).values(questionsToInsert)

await sql.end()
// biome-ignore lint/suspicious/noConsole: only used in development
console.log('Database seeded with proper content')
