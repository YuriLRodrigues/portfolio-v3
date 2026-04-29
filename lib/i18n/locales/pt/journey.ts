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
    p1: {
      period: "2024 — atual",
      title: "Desenvolvedor full stack",
      org: "Estúdio / produto digital",
      location: "Remoto & híbrido",
      description:
        "Evolução de features em Next.js, APIs em Node e integrações com serviços externos. Participação em decisões de arquitetura, revisão de código e alinhamento com design.",
    },
    p2: {
      period: "2021 — 2024",
      title: "Desenvolvedor frontend",
      org: "Empresa de software B2B",
      description: "Interfaces complexas com foco em performance e acessibilidade. Design system interno, testes e entrega contínua ao lado de produto e QA.",
    },
    p3: {
      period: "2019 — 2021",
      title: "Desenvolvedor júnior",
      org: "Agência digital",
      location: "Presencial",
      description: "Landing pages, integrações com CMS e primeiros contatos com pipeline de deploy e versionamento em time.",
    },
  },
  academic: {
    a1: {
      period: "2018 — 2022",
      title: "Bacharelado em Ciência da Computação",
      institution: "Universidade (troque pelo nome real)",
      description: "Base sólida em algoritmos, estruturas de dados, engenharia de software e projetos em grupo. Trabalho de conclusão alinhado a aplicações web.",
    },
    a2: {
      period: "2023",
      title: "Certificação em desenvolvimento web avançado",
      institution: "Plataforma / bootcamp (opcional)",
      description: "Aprofundamento em arquitetura frontend, padrões de API e boas práticas de deploy.",
    },
  },
  certificates: {
    c1: {
      title: "Certificado (modelo PDF)",
      issuer: "Instituição ou curso",
      issued: "2025",
      format: "PDF",
    },
    c2: {
      title: "Credencial verificável (modelo)",
      issuer: "Plataforma de badges",
      issued: "2024",
      format: "Online",
    },
  },
  certIssued: "Emitido em {{date}}",
  certDownload: "Baixar PDF",
  certOpen: "Abrir credencial",
  certHint: "PDFs em public/certificados/ — edite títulos, emitente e links em journey-data.ts.",
} as const;
