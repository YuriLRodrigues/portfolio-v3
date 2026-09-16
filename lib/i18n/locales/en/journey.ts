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
    p1: {
      period: "Mar 2026 — present",
      title: "Full Stack Developer (Mid-level)",
      org: "Agência Molla",
      locationPlace: "São Paulo, SP",
      locationMode: "Remote",
      description:
        "Promoted to mid-level, now responsible for more than 10 B2B incentive program projects for large brands, from build to maintenance. I develop the panel the operations team works in daily and the dashboards the brand watches: role- and permission-scoped access, merchandising photo submission and approval, scoring rules with daily calculation, gamified rankings, and a rewards catalog. Next.js and NestJS, with performance and automated tests on the flows that move points and prizes.",
    },
    p2: {
      period: "Jun 2025 — Mar 2026",
      title: "Full Stack Developer",
      org: "PokerNetic",
      orgSecondary: "Independent contractor",
      locationPlace: "Lisbon, Portugal",
      locationMode: "Remote",
      description:
        "End-to-end work on PokerNetic’s professional poker platform—marketplace, coaching, rakeback, team management, and core tools for players, coaches, brands, and teams. Shipped full-stack features beyond the main dashboard: subscription and plan flows, video-rich library and learning content, internationalization, and marketplace experiences, plus APIs tying the stack together. Emphasis on clear data UX, real-time performance insight, scalability, and stable releases.",
    },
    p3: {
      period: "Jun 2024 — Feb 2025",
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
        "PJ frontend for a low-interest loan product: back-office flows to view loans, history, simulations, and live status, integrated with the company’s Node REST API. Applied scalable Next.js and React Query patterns, atomic design, Storybook, and strong testing with Jest, RTL, and Cypress. Contributed to documentation, architecture discussions, and Figma-based prototypes; activity metrics averaging above 70%.",
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
