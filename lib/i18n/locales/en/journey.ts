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
        "With the promotion I took on more than 10 B2B incentive programs in production and the template every new project at the agency starts from. I turned one of Azul's campaign portals into Hub Azul, the single login for all of the airline's campaigns, and shipped Agente Tá On, a portal for about 21,000 travel agents with rankings recalculated every 30 minutes. I moved the template into a Turborepo monorepo with a UI package shared by the API, portal and dashboard: with it and the documentation I worked on directly, a new project launches in under 10 days. I also built Molla's new website, the agency's main page and the showcase of how it presents itself to brands: it replaced the old ASP.NET site, is multilingual (Portuguese, English and Spanish) and has a 3D logo, GSAP animations and a DNA section where Trade, Marketing and Sales braid into a helix. Finally, I generated technical documentation for seven projects straight from the code.",
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
      title: "Full Stack & Mobile Development",
      institution: "JStack",
      description:
        "A JavaScript-stack program from the basics to advanced topics, with more than 150 hours of Node.js, React, and React Native. It's where I went deeper into API architecture, testing, and infrastructure, which I now use every day on Molla's projects. I built Fincheck, a personal finance app with a NestJS and Prisma API, a React front end on Vite, JWT authentication, and Zod validation on both ends, and studied Docker, SQL and NoSQL databases, WebSockets, automated testing, and AWS (Lambda and serverless services). The layered architecture and dependency injection I learned here went into the NestJS templates I maintain today.",
    },
    a3: {
      period: "Nov 2023 — Dec 2023",
      title: "NestJS fundamentals",
      institution: "HCode (Udemy)",
      description: "A NestJS course for backend APIs: structuring the project in modules, dependency injection, sending email, and unit, integration, and E2E tests.",
    },
    a4: {
      period: "Jun 2023 — Jun 2024",
      title: "Full Stack Development",
      institution: "OneBitCode",
      description:
        "My first full stack program, with more than 100 hours of content and practice. It's where I went from HTML and CSS to complete systems, with the front and back end written by me: HTML, modern CSS, Sass, Bootstrap, JavaScript, React, and TypeScript on the front end; Node.js with Express, MongoDB, and SQL with Sequelize for REST APIs; Git and GitHub in every project. The final project was an online course platform inspired by Netflix, and along the way I also completed the Next.js, Docker, Jest testing, and Styled Components modules.",
    },
    a5: {
      period: "Oct 2021 — May 2023",
      title: "IT Technical Diploma",
      institution: "Senac Minas",
      description: "Technical course covering Python, automation, Power BI, Microsoft Office, and networking.",
    },
  },
  certificates: {
    c1: {
      title: "Full Stack JavaScript Developer",
      issuer: "OneBitCode",
      issued: "Jun 2023",
      format: "PDF",
    },
    c2: {
      title: "Automated Testing",
      issuer: "OneBitCode",
      issued: "2023",
      format: "PDF",
    },
    c3: {
      title: "JavaScript from Basics to Advanced",
      issuer: "OneBitCode",
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
