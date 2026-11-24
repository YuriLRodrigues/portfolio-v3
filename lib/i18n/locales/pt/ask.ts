export const ask = {
  launcherAria: "Abrir perguntas rápidas sobre o Yuri",
  launcherTooltip: "Perguntar",
  title: "Pergunte o que quiser",
  description: "Respostas curtas sobre trajetória, stack, projetos e contato.",
  window: "yuri@portfolio",
  close: "Fechar",
  clear: "Limpar",
  clearAria: "Limpar a conversa",
  greeting: "Pergunte com as suas palavras ou escolha uma sugestão aqui embaixo.",
  transcriptLabel: "Conversa",
  inputLabel: "Sua pergunta",
  inputPlaceholder: "Ex.: qual é a sua stack hoje?",
  send: "Enviar",
  sendAria: "Enviar pergunta",
  suggestionsLabel: "Sugestões de pergunta",
  hint: "Enter envia · Esc fecha",
  unknown: "Essa eu não tenho pronta ainda. Tente uma das sugestões abaixo — ou me escreva direto pelo formulário de contato, que eu respondo.",

  actions: {
    goProjects: "Ir para os projetos",
    goExperience: "Ver a trajetória",
    goContact: "Ir para o contato",
    goTechnologies: "Ver a stack completa",
    email: "Mandar e-mail",
    linkedin: "LinkedIn",
    github: "GitHub",
    resume: "Abrir currículo (PDF)",
  },

  commands: {
    whoami: {
      label: "Quem é você?",
      keywords: "quem e voce,quem eh,quem é,quem,sobre voce,se apresenta,apresentacao,seu nome,qual seu nome,fala de voce",
      answer:
        "Yuri Leite Rodrigues, desenvolvedor full stack há três anos.\nEscrevo dos dois lados: NestJS e PostgreSQL de um, Next.js e React do outro.\nMoro em Conselheiro Lafaiete, Minas Gerais, e trabalho remoto.",
    },
    stack: {
      label: "Qual é a sua stack?",
      keywords: "stack,tecnologia,tecnologias,ferramenta,ferramentas,linguagem,linguagens,framework,o que usa,com o que trabalha",
      answer:
        "No dia a dia: TypeScript, Next.js, React, NestJS e Node.js.\nDados em PostgreSQL com Drizzle ou Prisma, e Redis quando cabe cache.\nTeste com Vitest, Jest, React Testing Library e Cypress. Docker no ambiente.",
    },
    now: {
      label: "No que está trabalhando agora?",
      keywords: "agora,hoje,atualmente,no que trabalha,onde trabalha,emprego atual,trabalho atual,empresa,molla",
      answer:
        "Estou na Agência Molla desde março de 2026, remoto, e fui promovido a pleno em julho.\nConstruo plataformas de incentivo B2B para marcas como Azul, Farmax e Combrasil: SSO, portais, apuração, rankings e dashboards, em Next.js e NestJS.\nTambém cuido do template que é a base dos projetos novos da agência.",
    },
    experience: {
      label: "Qual é a sua experiência?",
      keywords: "experiencia,carreira,trajetoria,historico,onde ja trabalhou,quanto tempo,anos de experiencia,curriculo profissional",
      answer:
        "Três anos em produção, sempre dentro de time.\nAgência Molla (2024–2025 e de 2026 em diante), PokerNetic em Lisboa (2025–2026) e Dinheirow (2024).\nDe programas de incentivo B2B a marketplace com assinatura e backoffice de empréstimos.",
    },
    projects: {
      label: "Que projetos posso ver?",
      keywords: "projeto,projetos,portfolio,portfólio,repositorio,repositorios,github,codigo,código,open source",
      answer:
        "São dez projetos abertos no GitHub: autorais, estudos e testes técnicos.\nOs mais recentes são os templates open source de NestJS e Next.js, feitos para trabalhar em par; os maiores, Workout Tracker e AutoCars.\nTodo card leva direto para o repositório.",
    },
    contact: {
      label: "Como falo com você?",
      keywords: "contato,contatar,falar,email,e-mail,mensagem,linkedin,chamar,como te acho,como entro em contato",
      answer: "Pelo formulário aqui do site, que cai direto na minha caixa de entrada.\nSe preferir, e-mail ou LinkedIn funcionam igual.",
    },
    resume: {
      label: "Tem currículo?",
      keywords: "curriculo,currículo,cv,resume,pdf,baixar curriculo",
      answer: "Tenho, em PDF, e está sempre atualizado com a experiência e a formação.",
    },
    availability: {
      label: "Está disponível?",
      keywords: "disponivel,disponível,vaga,contratar,freela,freelance,proposta,oportunidade,aceita projeto",
      answer: "No momento estou alocado em tempo integral na Agência Molla.\nMesmo assim, conversa boa sobre produto e arquitetura é sempre bem-vinda — me chama pelo contato.",
    },
  },
} as const;
