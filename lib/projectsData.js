export const projectsData = {
  baltimore: {
    title: "Baltimore",
    subtitle: "Plain James",
    slug: "baltimore",
    mainImage: "/images/guestclosed.png",
    hoverImage: "/images/guestopen.png",
    accentTitle: false,
    
    // Project Info
    type: "Custom Cabinetry & Millwork",
    credits: {
      architect: null,
      engineer: null,
      trades: null,
      photography: null,
    },
    description: [
      "Project description goes here. This first paragraph introduces the project scope and client vision.",
      "Second paragraph details the craftsmanship, materials, and techniques used throughout the build.",
    ],
    
    // Gallery images with captions
    images: [
      { 
        src: "/images/guestopen.png", 
        caption: "Custom built-in cabinetry with soft-close Blum hardware." 
      },
      { 
        src: "/images/guestclosed.png", 
        caption: "Panels closed, maintaining clean sight lines throughout the space." 
      },
    ],
  },

  darwin: {
    title: "Darwin",
    subtitle: "Plain James",
    slug: "darwin",
    mainImage: "/images/darwin.png",
    hoverImage: null,
    accentTitle: false,
    
    type: "Custom Millwork",
    credits: {
      architect: null,
      engineer: null,
      trades: null,
      photography: null,
    },
    description: [
      "Project description goes here. This first paragraph introduces the project scope and client vision.",
      "Second paragraph details the craftsmanship, materials, and techniques used throughout the build.",
    ],
    
    images: [
      { src: "/images/darwin-1.jpg", caption: "" },
      { src: "/images/darwin-2.jpg", caption: "" },
    ],
  },

  pergota: {
    title: "Pergota",
    subtitle: "Plain James",
    slug: "pergota",
    mainImage: "/images/pergota.png",
    hoverImage: null,
    accentTitle: true,
    
    type: "Outdoor Structure",
    credits: {
      architect: null,
      engineer: null,
      trades: null,
      photography: null,
    },
    description: [
      "Project description goes here. This first paragraph introduces the project scope and client vision.",
      "Second paragraph details the craftsmanship, materials, and techniques used throughout the build.",
    ],
    
    images: [
      { src: "/images/pergota.png", caption: "" },
      { src: "/images/pergota-2.jpg", caption: "" },
    ],
  },

  "petit-socco": {
    title: "Petit Socco",
    subtitle: "Plain James",
    slug: "petit-socco",
    mainImage: "/images/petit.png",
    hoverImage: null,
    accentTitle: false,
    
    type: "Commercial Millwork",
    credits: {
      architect: null,
      engineer: null,
      trades: null,
      photography: null,
    },
    description: [
      "Project description goes here. This first paragraph introduces the project scope and client vision.",
      "Second paragraph details the craftsmanship, materials, and techniques used throughout the build.",
    ],
    
    images: [
      { src: "/images/petit.png", caption: "" },
      { src: "/images/petit-socco-2.jpg", caption: "" },
    ],
  },
};

// Featured projects (shown on home page)
export const featuredProjects = ["baltimore", "petit-socco", "darwin"];

// Get all projects as array
export const getAllProjects = () => Object.values(projectsData);

// Get featured projects
export const getFeaturedProjects = () => featuredProjects.map((slug) => projectsData[slug]);

// Get single project
export const getProject = (slug) => projectsData[slug];