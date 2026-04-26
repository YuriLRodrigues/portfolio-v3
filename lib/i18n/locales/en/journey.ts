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
      period: "2024 — present",
      title: "Full stack developer",
      org: "Studio / digital product",
      location: "Remote & hybrid",
      description: "Feature work in Next.js, Node APIs, and third-party integrations. Architecture decisions, code review, and alignment with design.",
    },
    p2: {
      period: "2021 — 2024",
      title: "Frontend developer",
      org: "B2B software company",
      description: "Complex UIs with a focus on performance and accessibility. Internal design system, tests, and continuous delivery with product and QA.",
    },
    p3: {
      period: "2019 — 2021",
      title: "Junior developer",
      org: "Digital agency",
      location: "On-site",
      description: "Landing pages, CMS integrations, and first contact with deploy pipelines and team versioning.",
    },
  },
  academic: {
    a1: {
      period: "2018 — 2022",
      title: "BSc in Computer Science",
      institution: "University (replace with real name)",
      description: "Strong foundation in algorithms, data structures, software engineering, and group projects. Capstone aligned with web applications.",
    },
    a2: {
      period: "2023",
      title: "Advanced web development certification",
      institution: "Platform / bootcamp (optional)",
      description: "Deeper work on frontend architecture, API patterns, and deploy best practices.",
    },
  },
  certificates: {
    c1: {
      title: "Certificate (PDF template)",
      issuer: "Institution or course",
      issued: "2025",
      format: "PDF",
    },
    c2: {
      title: "Verifiable credential (template)",
      issuer: "Badge platform",
      issued: "2024",
      format: "Online",
    },
  },
  certIssued: "Issued {{date}}",
  certDownload: "Download PDF",
  certOpen: "Open credential",
  certHint: "Put PDFs in public/certificados/ — edit titles, issuer, and links in journey-data.ts.",
} as const;
