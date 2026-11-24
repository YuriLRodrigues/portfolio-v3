export const projects = {
  kicker: "Projetos",
  bgWord: "PROJETOS",
  titleBefore: "Do",
  titleGradient: "trabalho em time",
  titleAfter: "ao que fiz por conta",
  p: "Uma seleção do que está aberto no meu GitHub: projetos autorais, estudos que virei do avesso e testes técnicos. Cada um abre o repositório — o código é a parte que importa.",

  stack: {
    frontend: "Frontend",
    backend: "Backend",
    full: "Full stack",
  },
  kind: {
    authorial: "Autoral",
    study: "Estudo",
    challenge: "Teste técnico",
  },
  repo: {
    repo: "Repositório",
    web: "Repo web",
    api: "Repo API",
  },
  filters: {
    all: "Todos",
    full: "Full stack",
    frontend: "Frontend",
    backend: "Backend",
  },

  filtersLabel: "Filtrar por stack",
  filterCount_one: "{{count}} projeto",
  filterCount_other: "{{count}} projetos",
  prev: "Projeto anterior",
  next: "Próximo projeto",
  indexLabel: "Índice de projetos",
  indexKicker: "Escolha um projeto",
  stageLabel: "Projeto em destaque",
  highlightsLabel: "O que tem dentro",
  tileAria: "Tecnologias",
  yearLabel: "Período",
  coverAlt: "Capa ilustrada do projeto {{name}}",
  openRepo: "Abrir {{repo}} de {{name}} no GitHub",
  selectProject: "Ver {{name}}",
  stackShowMore: "+{{count}} mais",
  stackShowLess: "Mostrar menos",
  githubCta: "Ver tudo no GitHub",
  githubCtaAria: "Abrir meu perfil no GitHub",

  items: {
    fullstackTemplates: {
      name: "Fullstack Templates",
      tagline: "API e front que já nascem com padrão",
      description:
        "Dois templates open source feitos para trabalhar em par: uma API em NestJS com Drizzle e Clean Architecture, e um front em Next.js 16 que consome essa API por um client gerado do OpenAPI. Vêm com cadastro, login e um CRUD de tarefas rodando de verdade. Mantenha, adapte ou apague.",
      h1: "Camadas garantidas pelo ESLint, use cases que devolvem Either e um contrato de erro só, da API até o toast",
      h2: "Testes unitários, de integração e E2E contra Postgres via PGlite, sem Docker; no front, E2E com Playwright sem subir backend",
      h3: "CLAUDE.md e skills do Claude Code para criar módulo, use case e migration e para revisar um diff contra os padrões",
    },
    nitroHub: {
      name: "NITRO HUB",
      tagline: "O que o PC gamer pedia em vários programas, num app só",
      description:
        "Medir FPS, ver temperatura, deixar o Windows pronto para jogar e consultar o hardware pedia um programa para cada coisa. O NITRO HUB junta tudo num app grátis para Windows 10 e 11. Construí o app do começo ao fim com o Claude Code, em C# e .NET, uma stack fora do meu dia a dia, para ver até onde a IA chega quando eu cuido do produto e das decisões.",
      h1: "Overlay de FPS, sensores com alertas, Modo jogo automático e otimizações do Windows sempre com botão de desfazer",
      h2: "Instalador com SHA-256 publicado em cada versão e atualização automática pelas releases do GitHub",
      h3: "Landing page em Next.js 16 estática no GitHub Pages, com guias, uma página por recurso e o hash do instalador conferido no navegador",
    },
    workoutTracker: {
      name: "Workout Tracker",
      tagline: "Treino, carga e progresso no mesmo lugar",
      description:
        "App de academia escrito dos dois lados: API em NestJS e web em Next.js 15 com React 19. O usuário monta treinos, registra série por série e acompanha a evolução em gráficos semanais e mensais.",
      h1: "API dividida em core, domínio e infraestrutura, com casos de uso e repositórios por interface",
      h2: "Cliente HTTP gerado pelo Kubb a partir do Swagger, então mudança de contrato aparece no build",
      h3: "Upload de avatar no MinIO, sessão por cookie JWT e recuperação de senha por e-mail",
    },
    autoCars: {
      name: "AutoCars",
      tagline: "Classificados de veículo, do anúncio ao painel do vendedor",
      description:
        "Plataforma de anúncios com busca, favoritos, comentários e um dashboard onde o vendedor cuida dos próprios anúncios. Front e API em repositórios separados, cada um com a sua suíte de testes.",
      h1: "Domínio coberto por testes no Vitest com repositórios in-memory — a suíte roda sem subir banco",
      h2: "Favoritos e comentários com UI otimista; skeleton no lugar de spinner em toda listagem",
      h3: "Tipos da API gerados com Orval, tema claro/escuro e cor de destaque à escolha do usuário",
    },
    fincheck: {
      name: "Fincheck",
      tagline: "Entradas, saídas e o saldo que sobra",
      description:
        "Controle de finanças pessoais com contas bancárias e lançamentos de entrada e saída, filtrados por mês, ano, tipo e conta. Projeto de estudo com API em NestJS e front em React com Vite.",
      h1: "Zod validando nas duas pontas, com os tipos vindo do mesmo schema",
      h2: "Autenticação JWT com guard no Nest e rota protegida no cliente",
      h3: "Postgres e Prisma em Docker — o ambiente sobe com um comando",
    },
    documentSignature: {
      name: "Document Signature",
      tagline: "Do login ao PDF assinado",
      description:
        "Teste técnico em Next.js para autenticar, subir, visualizar e assinar PDFs. Cada documento carrega status (pendente ou assinado) e carimbo de data da assinatura.",
      h1: "Login por credenciais e GitHub OAuth via NextAuth, com proteção de rota no middleware",
      h2: "Prisma resolvendo dados direto no Server Component onde a rota de API não agregava nada",
      h3: "README honesto sobre o que ficou de fora e por quê — upload local em vez de S3, testes fora do prazo",
    },
    cinematecando: {
      name: "Cinematecando",
      tagline: "Filme, série e elenco sem sair da mesma tela",
      description:
        "Catálogo para explorar filmes e séries com busca, filtro por gênero e tipo, página de detalhe, elenco e filmografia do ator. Tem lista pessoal e alterna entre tema claro e escuro.",
      h1: "Busca e filtros que continuam válidos ao navegar e voltar",
      h2: "Estado dividido entre Zustand e Jotai conforme o escopo de cada tela",
      h3: "Layout responsivo com componentes acessíveis do shadcn/ui",
    },
    setupProStore: {
      name: "Setup Pro Store",
      tagline: "Loja de periféricos com checkout de verdade",
      description:
        "E-commerce de periféricos com vitrine por categoria, carrinho e pagamento pela Stripe. Feito na Full Stack Week e depois estendido para rodar o ciclo inteiro do pedido.",
      h1: "Checkout na Stripe com webhook confirmando o pagamento antes de fechar o pedido",
      h2: "Login com Google pelo NextAuth, sem formulário de senha para manter",
      h3: "Catálogo e descontos modelados no Prisma sobre PostgreSQL",
    },
    fastKing: {
      name: "Fast King",
      tagline: "Autoatendimento de fast food, do cardápio ao acompanhamento",
      description:
        "Totem de pedidos inspirado no McDonald's: o cliente escolhe a loja, monta o pedido por categoria, paga e acompanha o status. O pedido fica vinculado a nome e CPF, sem exigir cadastro.",
      h1: "Pagamento pela Stripe com webhook atualizando o status do pedido",
      h2: "Cardápio filtrado por loja, com rota dinâmica por slug",
      h3: "Carrinho com ajuste de quantidade e resumo antes de fechar",
    },
    marvelTechTest: {
      name: "Marvel Explorer",
      tagline: "Teste técnico que virou exercício de cache",
      description:
        "Listagem paginada de personagens da Marvel com busca, página de detalhe e quadrinhos relacionados. A parte interessante foi a navegação: voltar da ficha preserva página e busca, sem refazer a requisição.",
      h1: "Cache do TanStack Query evitando requisição repetida ao voltar",
      h2: "Busca e paginação guardadas na URL, então o link compartilhado abre no mesmo ponto",
      h3: "Transições com Framer Motion sem atrapalhar quem prefere menos movimento",
    },
    valorantHub: {
      name: "Valorant Info Hub",
      tagline: "Agentes, mapas e arsenal em um só lugar",
      description:
        "Referência de Valorant montada em cima da API pública do jogo: agentes e habilidades, mapas com layout, armas e skins. Foi o projeto onde eu comecei a separar domínio de infraestrutura de verdade.",
      h1: "Camadas separadas desde o começo, antes de o projeto pedir por isso",
      h2: "Dados da API pública tratados e tipados na borda da aplicação",
      h3: "Galeria de mapas e skins com tema claro/escuro",
    },
  },
} as const;
