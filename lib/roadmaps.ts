// src/lib/roadmaps.ts

export type RoadmapSection = {
    id: string;
    title: string;
    description?: string;
    level?: "Beginner" | "Intermediate" | "Advanced" | "Any";
    topics: string[];
    optional?: boolean;
  };
  
  export type Roadmap = {
    slug: string;
    title: string;
    heroBadge: string;
    summary: string;
    roleLabel: string;
    sections: RoadmapSection[];
  };
  
  const frontendRoadmap: Roadmap = {
    slug: "frontend",
    title: "Frontend Developer Roadmap",
    heroBadge: "Front-end roadmap inspired by roadmap.sh",
    roleLabel: "Frontend Developer",
    summary:
      "Follow this roadmap to move from internet basics and HTML/CSS to JavaScript, frameworks, tooling, testing, and advanced browser APIs.",
    sections: [
      {
        id: "internet",
        title: "Internet",
        level: "Beginner",
        topics: [
          "How does the internet work?",
          "What is HTTP?",
          "What is a domain name?",
          "What is hosting?",
          "DNS and how it works?",
          "Browsers and how they work?",
        ],
      },
      {
        id: "html",
        title: "HTML",
        level: "Beginner",
        topics: [
          "Learn the basics",
          "Writing semantic HTML",
          "Forms and validations",
          "Accessibility",
          "SEO basics",
        ],
      },
      {
        id: "css",
        title: "CSS",
        level: "Beginner",
        topics: ["Learn the basics", "Making layouts", "Responsive design"],
      },
      {
        id: "javascript",
        title: "JavaScript",
        level: "Intermediate",
        topics: [
          "Learn the basics",
          "Learn DOM manipulation",
          "Fetch API / Ajax (XHR)",
        ],
      },
      {
        id: "version-control",
        title: "Version Control Systems",
        level: "Beginner",
        topics: ["Git"],
      },
      {
        id: "vcs-hosting",
        title: "VCS Hosting",
        level: "Beginner",
        topics: ["GitHub", "GitLab", "Bitbucket"],
      },
      {
        id: "package-managers",
        title: "Package Managers",
        level: "Intermediate",
        topics: ["npm", "pnpm", "yarn"],
      },
      {
        id: "frameworks",
        title: "Pick a Framework",
        level: "Intermediate",
        topics: ["React", "Vue.js", "Angular", "Svelte", "SolidJS", "Qwik"],
      },
      {
        id: "tailwind-css",
        title: "Tailwind & CSS Architecture",
        level: "Intermediate",
        topics: [
          "Tailwind",
          "Writing CSS",
          "BEM",
          "CSS architecture",
          "CSS preprocessors (Sass, PostCSS)",
        ],
        optional: true,
      },
      {
        id: "build-tools",
        title: "Build Tools & Bundlers",
        level: "Intermediate",
        topics: ["Vite", "Webpack", "Rollup", "Parcel", "esbuild", "SWC"],
      },
      {
        id: "linting",
        title: "Linters & Formatters",
        level: "Intermediate",
        topics: ["ESLint", "Prettier"],
      },
      {
        id: "testing",
        title: "Testing",
        level: "Intermediate",
        topics: ["Vitest", "Jest", "Playwright", "Cypress"],
        optional: true,
      },
      {
        id: "auth-security",
        title: "Authentication & Web Security",
        level: "Intermediate",
        topics: [
          "JWT, OAuth, SSO, Basic Auth, Session Auth",
          "CORS",
          "HTTPS",
          "Content Security Policy",
          "OWASP security risks",
        ],
      },
      {
        id: "web-components",
        title: "Web Components",
        level: "Advanced",
        topics: ["HTML Templates", "Custom Elements", "Shadow DOM"],
        optional: true,
      },
      {
        id: "type-checkers",
        title: "Type Checkers",
        level: "Intermediate",
        topics: ["TypeScript"],
      },
      {
        id: "ssr-spa",
        title: "SSR & Meta Frameworks",
        level: "Intermediate",
        topics: [
          "React Router",
          "Next.js",
          "Nuxt.js",
          "SvelteKit",
          "Astro",
          "Remix (optional)",
        ],
      },
      {
        id: "graphql",
        title: "GraphQL (Optional)",
        level: "Advanced",
        topics: ["GraphQL basics", "Apollo", "Relay Modern"],
        optional: true,
      },
      {
        id: "ssg",
        title: "Static Site Generators",
        level: "Intermediate",
        topics: ["Next.js", "Astro", "Nuxt.js", "Eleventy"],
        optional: true,
      },
      {
        id: "pwas",
        title: "PWAs & Performance",
        level: "Advanced",
        topics: [
          "PRPL pattern",
          "RAIL model",
          "Performance metrics",
          "Using Lighthouse",
          "Using DevTools",
        ],
        optional: true,
      },
      {
        id: "browser-apis",
        title: "Browser APIs",
        level: "Advanced",
        topics: [
          "Storage",
          "WebSockets",
          "Server-Sent Events",
          "Service Workers",
          "Location",
          "Notifications",
          "Device orientation",
          "Payments",
          "Credentials",
        ],
        optional: true,
      },
      {
        id: "desktop-mobile",
        title: "Desktop & Mobile Apps",
        level: "Advanced",
        topics: ["React Native", "Flutter", "Ionic", "Electron", "Tauri"],
        optional: true,
      },
      {
        id: "next-tracks",
        title: "Continue Learning",
        level: "Any",
        topics: ["TypeScript", "Node.js", "Full-stack"],
      },
    ],
  };
  
  // in-memory store (later replace with real API)
  const ROADMAPS: Record<string, Roadmap> = {
    [frontendRoadmap.slug]: frontendRoadmap,
  };
  
  export async function getRoadmapBySlug(slug: string): Promise<Roadmap | null> {
    // later: replace with real `fetch` to backend
    await new Promise((r) => setTimeout(r, 30));
    return ROADMAPS[slug] ?? null;
  }
  
  export async function getAllRoadmaps(): Promise<Roadmap[]> {
    await new Promise((r) => setTimeout(r, 10));
    return Object.values(ROADMAPS);
  }
  