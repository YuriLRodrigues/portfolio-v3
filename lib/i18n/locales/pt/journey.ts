export const journey = {
  kicker: "Trajetória",
  titleBefore: "Minha evolução como",
  titleGradient: "desenvolvedor",
  intro:
    "Organizei minha trajetória em três áreas: Profissional, com a minha experiência no mercado e projetos reais; Acadêmico, com a minha formação e estudos em tecnologia; e Certificados, onde reúno cursos e validações das minhas competências.",
  tabs: {
    professional: "Profissional",
    academic: "Acadêmico",
    certificates: "Certificados",
  },
  professional: {
    p0: {
      period: "Jul 2026 — atual",
      title: "Desenvolvedor Full Stack Pleno",
      org: "Agência Molla",
      locationPlace: "São Paulo, SP",
      locationMode: "Remoto",
      description:
        "Com a promoção, passei a responder por mais de 10 programas de incentivo B2B em produção e pelo template que é a base dos projetos novos da agência. Transformei o portal de uma campanha da Azul no Hub Azul, o login único de todas as campanhas da marca, entreguei o Agente Tá On, portal para cerca de 21 mil agentes de viagem com ranking recalculado a cada 30 minutos, e mantenho os portais da Farmax e da Combrasil. Levei o template para um monorepo em Turborepo, com API, portal e dashboard no mesmo repositório, e construí o design system que portal e dashboard dividem, com mais de 80 componentes: com o template e a documentação em que atuei diretamente, um projeto novo é lançado em menos de 10 dias. Também desenvolvi o novo site da Molla, a página principal da agência e a vitrine de como ela se apresenta às marcas: substituiu o site antigo em ASP.NET, é multilíngue (português, inglês e espanhol) e tem logo 3D, animações em GSAP e a seção do DNA, em que Trade, Marketing e Vendas se trançam numa hélice. Por fim, gerei a documentação técnica de sete projetos a partir do código.",
    },
    p1: {
      period: "Mar 2026 — jul 2026",
      title: "Desenvolvedor Full Stack Júnior",
      org: "Agência Molla",
      locationPlace: "São Paulo, SP",
      locationMode: "Remoto",
      description:
        "Voltei para a Molla depois de quase um ano na PokerNetic e logo peguei campanhas de cinco marcas ao mesmo tempo. Entreguei a Seleção de Craques e a Pronto para Voar, da Azul, comecei o portal da Farmax e o ETL diário de sellout e fiz entregas para Ingram Micro, Sancor Seguros com o Sicoob e Pernambucanas. Quatro meses depois de voltar, fui promovido a pleno.",
    },
    p2: {
      period: "Mai 2025 — mar 2026",
      title: "Desenvolvedor Full Stack",
      org: "PokerNetic",
      orgSecondary: "Autônomo",
      locationPlace: "Lisboa, Portugal",
      locationMode: "Remoto",
      description:
        "Entrei na PokerNetic, plataforma profissional de poker com sede em Lisboa, quando o produto ainda estava sendo construído. Participei da base do sistema até as funcionalidades pensadas para o lançamento: o dashboard principal com desempenho individual e por equipe em tempo real, o marketplace onde os jogadores compram pacotes, a parte que conecta jogadores, coaches, marcas e times, planos e assinaturas, biblioteca de vídeos, internacionalização e as APIs entre as camadas do produto. Antes do lançamento oficial, recebi a proposta de voltar para a Molla.",
    },
    p3: {
      period: "Jun 2024 — abr 2025",
      title: "Desenvolvedor Full Stack Júnior",
      org: "Agência Molla",
      locationPlace: "São Paulo, SP",
      locationMode: "Remoto",
      description:
        "PJ em agência de planejamento, criação e tecnologia para grandes marcas (Kellanova/Kellogg’s, AB Mauri, Dux Experts, MZB, LuxRaybn). Construção e manutenção dos programas de incentivo B2B ponta a ponta: envio de fotos de merchandising com aprovação por administradores, pontuação dinâmica com cálculo diário de desempenho, rankings gamificados e resgate de premiação. Painéis separados por cargo e permissão deram autonomia ao time de operação e acabaram com o ajuste manual no banco. Testes unitários, de integração e E2E nos fluxos de aprovação e pontuação, integração com Amazon S3 e SendGrid e code review do time.",
    },
    p4: {
      period: "Jan 2024 — jun 2024",
      title: "Desenvolvedor Frontend Júnior II",
      org: "Dinheirow",
      locationPlace: "Vila Velha, ES",
      locationMode: "Remoto",
      description:
        "Fintech de empréstimo consignado com juros baixos. Atuei no backoffice que a operação usava para acompanhar os empréstimos dos clientes: telas de empréstimos, histórico de contratos, simulações e status em tempo real, integradas à API REST em Node.js. Estruturei o frontend com Next.js e React Query em atomic design, com componentes documentados no Storybook, e escrevi testes com Jest, React Testing Library e Cypress nos fluxos principais. Participei de code review, planejamento de sprint, documentação técnica e protótipos no Figma.",
    },
  },
  academic: {
    a1: {
      period: "Jan 2025 — em andamento",
      title: "Desenvolvimento Full Stack e Mobile",
      institution: "JStack",
      description:
        "Formação na stack JavaScript, do básico ao avançado, com mais de 150 horas de Node.js, React e React Native. Foi onde aprofundei arquitetura de API, testes e infraestrutura, coisas que hoje uso todo dia nos projetos da Molla. Construí o Fincheck, app de finanças pessoais com API em NestJS e Prisma, front em React com Vite, autenticação JWT e validação com Zod nas duas pontas, e estudei Docker, bancos SQL e NoSQL, WebSockets, testes automatizados e AWS (Lambda e serviços serverless). A arquitetura em camadas e a injeção de dependência que vi aqui foram para os templates em NestJS que mantenho hoje.",
    },
    a3: {
      period: "Nov 2023 — dez 2023",
      title: "NestJS: fundamentos",
      institution: "HCode (Udemy)",
      description: "Curso de NestJS para APIs de backend: organização do projeto em módulos, injeção de dependência, envio de e-mail e testes unitários, de integração e E2E.",
    },
    a4: {
      period: "Jun 2023 — jun 2024",
      title: "Desenvolvimento Full Stack",
      institution: "OneBitCode",
      description:
        "Minha primeira formação full stack, com mais de 100 horas de conteúdo e prática. Foi onde saí do HTML e CSS e cheguei a sistemas completos, com front e back escritos por mim: HTML, CSS moderno, Sass, Bootstrap, JavaScript, React e TypeScript no front; Node.js com Express, MongoDB e SQL com Sequelize nas APIs REST; Git e GitHub em todos os projetos. O projeto final foi uma plataforma de cursos online inspirada na Netflix, e ao longo da formação também concluí os módulos de Next.js, Docker, testes com Jest e Styled Components.",
    },
    a5: {
      period: "Out 2021 — mai 2023",
      title: "Técnico em Informática",
      institution: "Senac Minas",
      description: "Curso técnico com Python, automações, Power BI, pacote Office e redes.",
    },
  },
  certificates: {
    c1: {
      title: "Desenvolvedor Full Stack JavaScript",
      issuer: "OneBitCode",
      issued: "Jun 2023",
      format: "PDF",
    },
    c2: {
      title: "Testes Automatizados",
      issuer: "OneBitCode",
      issued: "2023",
      format: "PDF",
    },
    c3: {
      title: "JavaScript do básico ao avançado",
      issuer: "OneBitCode",
      issued: "2023",
      format: "PDF",
    },
  },
  stackLabel: "Stack",
  stackShowMore: "+{{count}} mais",
  stackShowLess: "Mostrar menos",
  certIssued: "Emitido em {{date}}",
  certDownload: "Baixar PDF",
  certOpen: "Abrir credencial",
  orgSite: "Abrir o site da {{org}} em nova aba",
} as const;
