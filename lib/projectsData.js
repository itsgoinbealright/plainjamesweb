export const projectsData = {
  baltimore: {
    title: "Baltimore",
    subtitle: "Plain James",
    slug: "baltimore",
    mainImage: "/images/guestclosed.png",
    hoverImage: "/images/guestopen.png",
    // Case Study Info
    type: "Custom Cabinetry & Millwork",
    architect: null,
    engineer: null,
    trades: null,
    photography: null,
    description: [
      "Project description goes here. This first paragraph introduces the project scope and client vision.",
      "Second paragraph details the craftsmanship, materials, and techniques used throughout the build.",
    ],
    images: ["/images/guestopen.png"],
    accentTitle: false,
  },
  darwin: {
    title: "Darwin",
    subtitle: "Plain James",
    slug: "darwin",
    mainImage: "/images/darwin.png",
    hoverImage: null,
    // Case Study Info
    type: "Custom Millwork",
    architect: null,
    engineer: null,
    trades: null,
    photography: null,
    description: [
      "Project description goes here. This first paragraph introduces the project scope and client vision.",
      "Second paragraph details the craftsmanship, materials, and techniques used throughout the build.",
    ],
    images: ["/images/darwin-1.jpg", "/images/darwin-2.jpg"],
    accentTitle: false,
  },
  pergota: {
    title: "Pergota",
    subtitle: "Plain James",
    slug: "pergota",
    mainImage: "/images/pergota.png",
    hoverImage: null,
    // Case Study Info
    type: "Outdoor Structure",
    architect: null,
    engineer: null,
    trades: null,
    photography: null,
    description: [
      "Project description goes here. This first paragraph introduces the project scope and client vision.",
      "Second paragraph details the craftsmanship, materials, and techniques used throughout the build.",
    ],
    images: ["/images/pergota.png", "/images/pergota-2.jpg"],
    accentTitle: true,
  },
  "petit-socco": {
    title: "Petit Socco",
    subtitle: "Plain James",
    slug: "petit-socco",
    mainImage: "/images/petit.png",
    hoverImage: null,
    // Case Study Info
    type: "Commercial Millwork",
    architect: null,
    engineer: null,
    trades: null,
    photography: null,
    description: [
      "Project description goes here. This first paragraph introduces the project scope and client vision.",
      "Second paragraph details the craftsmanship, materials, and techniques used throughout the build.",
    ],
    images: ["/images/petit.png", "/images/petit-socco-2.jpg"],
    accentTitle: false,
  },
};

// Featured projects (shown on home page)
export const featuredProjects = ["baltimore", "petit-socco", "darwin"];

// Get all projects as array
export const getAllProjects = () => {
  return Object.values(projectsData);
};

// Get featured projects
export const getFeaturedProjects = () => {
  return featuredProjects.map((slug) => projectsData[slug]);
};

// Get single project
export const getProject = (slug) => {
  return projectsData[slug];
};