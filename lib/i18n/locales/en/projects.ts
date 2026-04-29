export const projects = {
  kicker: "Projects",
  bgWord: "PROJECTS",
  titleBefore: "From",
  titleGradient: "team work",
  titleAfter: "to what I build on the side",
  p: "Production apps, study pieces, and experiments—most of them open on GitHub with a live demo when available.",
  stack: {
    frontend: "Frontend",
    backend: "Backend",
    full: "Full stack",
  },
  openSite: "Open site: {{name}}",
  openRepo: "GitHub repository: {{name}}",
  ctaView: "View project",
  ctaGithub: "GitHub",
  tileAria: "Technologies",
  coverAlt: "Project cover for {{name}}",
  stackShowMore: "+{{count}} more",
  stackShowLess: "Show less",
  carouselHeading: "Featured projects",
  carouselNav: "Choose project slide",
  carouselPrev: "Previous project",
  carouselNext: "Next project",
  carouselGoTo: "Go to {{title}}",
  carouselSlideKicker: "Project",
  items: {
    workoutTracker: {
      name: "Workout Tracker",
      description:
        "Web app to plan workouts, log sessions, and track gym progress: dashboards, profile, auth, and metrics—create and edit routines, upload images, and follow performance over time.",
    },
    autoCars: {
      name: "AutoCars",
      description:
        "Vehicle listing platform: publish and browse ads, favorites, comments, and a seller dashboard to manage listings end to end.",
    },
    autoCarsBackend: {
      name: "AutoCars API",
      description:
        "Backend for AutoCars with SOLID, DDD-flavored modules, and clean boundaries. Prisma + PostgreSQL, JWT auth, Swagger, file storage via MinIO, and email—ready to grow into payments and buyer–seller chat.",
    },
    fincheck: {
      name: "Fincheck",
      description:
        "Personal finance web app: bank accounts, income and expense entries, and filters by month, year, type, and account so cash flow stays easy to read.",
    },
    documentSignature: {
      name: "Document Signature",
      description:
        "BFF-style app for sign-in, PDF upload, preview, and digital signatures—streamlined flow for authenticating users and managing documents.",
    },
    cinematecando: {
      name: "Cinematecando",
      description:
        "Discover films and series: search, genres, cast details, related titles, light/dark theme, and a personal watchlist in a responsive, immersive UI.",
    },
    setupProStore: {
      name: "Setup Pro Store",
      description:
        "E-commerce with catalog, cart, and checkout plus an admin area for orders, products, and categories—organized, responsive storefront.",
    },
    marvelTechTest: {
      name: "Marvel explorer (tech test)",
      description:
        "Paginated Marvel characters with search, detail pages, related comics, and navigation that preserves filters when going back—tuned to avoid redundant requests.",
    },
    valorantHub: {
      name: "Valorant Info Hub",
      description:
        "Reference hub for Valorant: agents, abilities, maps, weapons, skins, and game data in one structured, fast-browsing experience.",
    },
  },
} as const;
