export const ask = {
  launcherAria: "Open quick questions about Yuri",
  launcherTooltip: "Ask",
  title: "Ask me anything",
  description: "Short answers about background, stack, projects, and contact.",
  window: "yuri@portfolio",
  close: "Close",
  clear: "Clear",
  clearAria: "Clear the conversation",
  greeting: "Ask in your own words, or pick one of the suggestions below.",
  transcriptLabel: "Conversation",
  inputLabel: "Your question",
  inputPlaceholder: "e.g. what's your stack today?",
  send: "Send",
  sendAria: "Send question",
  suggestionsLabel: "Suggested questions",
  hint: "Enter sends · Esc closes",
  unknown: "I don't have that one ready yet. Try one of the suggestions below — or write to me through the contact form and I'll answer.",

  actions: {
    goProjects: "Go to projects",
    goExperience: "See the timeline",
    goContact: "Go to contact",
    goTechnologies: "See the full stack",
    email: "Send an email",
    linkedin: "LinkedIn",
    github: "GitHub",
    resume: "Open résumé (PDF)",
  },

  commands: {
    whoami: {
      label: "Who are you?",
      keywords: "who are you,who,about you,yourself,your name,introduce,introduction,tell me about",
      answer:
        "Yuri Leite Rodrigues, full stack developer for three years.\nI write both sides: NestJS and PostgreSQL on one, Next.js and React on the other.\nBased in Conselheiro Lafaiete, Brazil, working remotely.",
    },
    stack: {
      label: "What's your stack?",
      keywords: "stack,tech,technology,technologies,tools,language,languages,framework,what do you use,work with",
      answer:
        "Day to day: TypeScript, Next.js, React, NestJS, and Node.js.\nData in PostgreSQL with Drizzle or Prisma, plus Redis where caching earns its place.\nTesting with Vitest, Jest, React Testing Library, and Cypress. Docker for the environment.",
    },
    now: {
      label: "What are you working on?",
      keywords: "now,today,currently,working on,where do you work,current job,current role,company,molla",
      answer:
        "I've been at Agência Molla since March 2026, remote, and was promoted to mid-level in July.\nI build B2B incentive platforms for brands like Azul, Farmax, and Combrasil: single sign-on, portals, scoring, rankings, and dashboards, on Next.js and NestJS.\nI also own the template every new project at the agency starts from.",
    },
    experience: {
      label: "What's your experience?",
      keywords: "experience,career,background,history,where have you worked,how long,years of experience,track record",
      answer:
        "Three years in production, always inside a team.\nAgência Molla (2024–2025, then 2026 onward), PokerNetic in Lisbon (2025–2026), and Dinheirow (2024).\nFrom B2B incentive programs to a marketplace with subscriptions and a lending backoffice.",
    },
    projects: {
      label: "What can I look at?",
      keywords: "project,projects,portfolio,repository,repositories,github,code,open source,what have you built",
      answer:
        "There are 11 projects in the portfolio, across personal builds, studies, and take-home tests, almost all open source on GitHub.\nThe newest are my open source NestJS and Next.js templates, built to work as a pair, and NITRO HUB, a closed-source Windows app; the biggest are Workout Tracker and AutoCars.\nEvery card links straight to the repository.",
    },
    contact: {
      label: "How do I reach you?",
      keywords: "contact,reach,talk,email,message,linkedin,get in touch,how do i find you",
      answer: "The form on this site lands straight in my inbox.\nEmail or LinkedIn work just as well if you prefer.",
    },
    resume: {
      label: "Do you have a résumé?",
      keywords: "resume,résumé,cv,curriculum,pdf,download resume",
      answer: "I do, as a PDF, kept current with my experience and education.",
    },
    availability: {
      label: "Are you available?",
      keywords: "available,availability,hiring,hire,freelance,contract,opportunity,open to work,take on projects",
      answer: "I'm currently full time at Agência Molla.\nEven so, a good conversation about product and architecture is always welcome — reach out through contact.",
    },
  },
} as const;
