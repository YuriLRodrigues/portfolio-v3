export const journey = {
  kicker: "Journey",
  titleBefore: "My path as a",
  titleGradient: "developer",
  intro:
    "I organized my path in three areas: professional experience and real projects; academic training and study in technology; and certificates, where I list courses and credentials that validate my skills.",
  tabs: {
    professional: "Professional",
    academic: "Academic",
    certificates: "Certificates",
  },
  professional: {
    p0: {
      period: "Jul 2026 — present",
      title: "Full Stack Developer (Mid-level)",
      org: "Agência Molla",
      locationPlace: "São Paulo, SP",
      locationMode: "Remote",
      description:
        "With the promotion I took on more than 10 B2B incentive programs in production and the template every new project at the agency starts from. I turned one of Azul's campaign portals into Hub Azul, the single login for all of the airline's campaigns, and shipped Agente Tá On, a portal for about 21,000 travel agents with rankings recalculated every 30 minutes. I moved the template into a Turborepo monorepo with a UI package shared by the API, portal and dashboard: once the client's rules are defined, a new program goes live in about 10 days. I also built Molla's new landing page in three languages, with a DNA section where Trade, Marketing and Sales braid into a helix, and generated technical documentation for seven projects straight from the code.",
    },
    p1: {
      period: "Mar 2026 — Jul 2026",
      title: "Full Stack Developer (Junior)",
      org: "Agência Molla",
      locationPlace: "São Paulo, SP",
      locationMode: "Remote",
      description:
        "I came back to Molla after almost a year at PokerNetic and right away picked up campaigns for five brands at once. I shipped Seleção de Craques and Pronto para Voar for Azul, started the Farmax portal and its daily sell-out ETL, and delivered work for Ingram Micro, Sancor Seguros with Sicoob, and Pernambucanas. Four months after coming back, I was promoted to mid-level.",
    },
    p2: {
      period: "May 2025 — Mar 2026",
      title: "Full Stack Developer",
      org: "PokerNetic",
      orgSecondary: "Independent contractor",
      locationPlace: "Lisbon, Portugal",
      locationMode: "Remote",
      description:
        "I joined PokerNetic, a professional poker platform based in Lisbon, while the product was still being built. I worked from the system's foundations to the features planned for launch: the main dashboard with real-time individual and team performance, the marketplace where players buy packages, the part that connects players, coaches, brands and teams, plans and subscriptions, a video library, internationalization and the APIs between the product layers. Before the official launch, I got the offer to come back to Molla.",
    },
    p3: {
      period: "Jun 2024 — Apr 2025",
      title: "Full Stack Developer (Junior)",
      org: "Agência Molla",
      locationPlace: "São Paulo, SP",
      locationMode: "Remote",
      description:
        "PJ role at a strategy, creative, and technology agency serving large brands (Kellanova/Kellogg’s, AB Mauri, Dux Experts, MZB, LuxRaybn). Built and maintained B2B incentive programs end to end: photo-based merchandising submissions with admin approval, dynamic scoring with daily performance calculation, gamified rankings, and reward redemption. Panels split by role and permission gave the operations team autonomy and ended manual database edits. Unit, integration, and E2E tests over the approval and scoring flows, plus Amazon S3 and SendGrid integration, code review, and mentoring junior developers.",
    },
    p4: {
      period: "Jan 2024 — Jun 2024",
      title: "Frontend Developer (Junior II)",
      org: "Dinheirow",
      locationPlace: "Vila Velha, ES",
      locationMode: "Remote",
      description:
        "A fintech offering low-interest payroll-deductible loans. I worked on the back office the operations team used to follow customers' loans: loan screens, contract history, simulations and real-time status, integrated with a Node.js REST API. I structured the front end with Next.js and React Query in atomic design, with components documented in Storybook, and wrote tests with Jest, React Testing Library and Cypress on the main flows. I took part in code review, sprint planning, technical documentation and Figma prototypes.",
    },
  },
  academic: {
    a1: {
      period: "Jan 2025 — present",
      title: "Full stack & mobile web development",
      institution: "JStack",
      description:
        "End-to-end program on the most widely used JavaScript stack: Node.js, React, and React Native. 150+ hours from fundamentals to advanced topics—Docker, SQL and NoSQL databases, WebSockets, testing, scalable architecture, and AWS (Lambda and related services). Practical projects, quizzes, and live sessions to solidify skills for real-world delivery.",
    },
    a2: {
      period: "Planned — from Jan 2025",
      title: "English: beginner to advanced",
      institution: "Udemy — Paulo Andrade",
      description:
        "Structured course to build strong speaking, listening, reading, and writing skills, with confidence in academic and professional contexts. Goal: higher fluency and clearer access to international opportunities and growth.",
    },
    a3: {
      period: "Nov 2023 — Dec 2023",
      title: "NestJS fundamentals",
      institution: "HCode — Udemy",
      description:
        "Focused backend track on NestJS: project structure, modules and providers, and production-oriented patterns. Covers unit, integration, and E2E testing plus core features such as email and common API building blocks.",
    },
    a4: {
      period: "Jun 2023",
      title: "Full stack web development",
      institution: "One Bit Code",
      description:
        "Intensive full-stack path with modern front end—Next.js, React, JavaScript, TypeScript, HTML5, CSS, SASS, Tailwind CSS, and Bootstrap—and back end with Node.js, Express, and MongoDB. Git and GitHub for collaboration. Projects from small apps to complete systems across the web stack.",
    },
    a5: {
      period: "Oct 2021 — May 2023",
      title: "Technical diploma in IT",
      institution: "Senac Minas",
      description:
        "Hands-on technical program spanning Python, automation, Power BI, Office, and networking. Strengthened teamwork, communication, and a learning mindset—useful for adapting to fast-changing market demands.",
    },
  },
  certificates: {
    c1: {
      title: "Full stack developer certificate",
      issuer: "One Bit Code",
      issued: "Jun 2023",
      format: "PDF",
    },
    c2: {
      title: "Automated testing",
      issuer: "Professional training",
      issued: "2023",
      format: "PDF",
    },
    c3: {
      title: "JavaScript from basics to advanced",
      issuer: "Professional training",
      issued: "2023",
      format: "PDF",
    },
  },
  stackLabel: "Stack",
  stackShowMore: "+{{count}} more",
  stackShowLess: "Show less",
  certIssued: "Issued {{date}}",
  certDownload: "Download PDF",
  certOpen: "Open credential",
} as const;
