export const projectsData = {
  baltimore: {
    title: "Baltimore",
    subtitle: "Millwork & Management",
    slug: "baltimore",
    mainImage: "/images/projects/baltimore/baltimore_main_bath_out.jpg",
    accentTitle: false,

    type: "Design, Carpentry, Management, Millwork ",
    credits: {
      architect: null,
      engineer: null,
      trades:
        "APEX plumbing, Surface-Studio, Urban Lumber, DIN,",
      photography: "Plain James",
    },
    description: [
      {
        key: "project",
        text: "Full update of top floor bathrooms, doorways and a closet system",
        style: "font-medium",
      },
      {
        key: "materials",
        text: "Monochromatic tile and grout, microcement and white oak. Clean and minimal finishes.",
        style: "italic text-stone-600",
      },
    ],

    // Layout: width options are "full" (default), "half", "third", "quarter"
    images: [
      {
        src: "/images/projects/baltimore/baltimore_upstairs_entrance.jpg",
        width: "full",
        caption: "Local Project Manager",
      },
      {
        src: "/images/projects/baltimore/baltimore_transom_window.jpg",
        width: "full",
        caption:
          "Shop made transom window frame. Tempered pane from Alder glass",
      },
      {
        src: "/images/projects/baltimore/baltimore_guest_closed.jpg",
        width: "half",
        caption: "Custom full height grain matched doors",
      },
      {
        src: "/images/projects/baltimore/baltimore_guest_open.jpg",
        width: "half",
        caption: "Built for use on doorway regardless of load-bearing wall",
      },
      {
        src: "/images/projects/baltimore/baltimore_guest_plinth.jpg",
        width: "full",
        caption: "Minimal plinth, radiant floors. simple",
      },
      {
        src: "/images/projects/baltimore/baltimore_office_light.jpg",
        width: "full",
        caption: "The light in this home is unreal, entrance to the office.",
      },
      {
        src: "/images/projects/baltimore/baltimore_main_closed.jpg",
        width: "half",
        caption: "New",
      },
      {
        src: "/images/projects/baltimore/baltimore_main_open.jpg",
        width: "half",
        caption: "Entrances",
      },
      {
        src: "/images/projects/baltimore/baltimore_main_bath_in.jpg",
        width: "full",
        caption:
          "Custom millwork, lighting, radiant floors and updated plumbing.",
      },
      {
        src: "/images/projects/baltimore/baltimore_main_bath_out.jpg",
        width: "full",
        caption: "Hard to explain how the room feels",
      },
    ],
  },

  "petit-socco": {
    title: "Petit Socco",
    subtitle: "Millwork",
    slug: "petit-socco",
    mainImage: "/images/projects/petit-socco/petit.jpg",
    accentTitle: false,

    type: "Millwork",
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

    images: [{ src: "/images/projects/petit-socco/hero.jpg", width: "full" }],
  },
};

export const featuredProjects = ["baltimore", "petit-socco"];

export const getAllProjects = () => Object.values(projectsData);

export const getFeaturedProjects = () =>
  featuredProjects.map((slug) => projectsData[slug]);

export const getProject = (slug) => projectsData[slug];
