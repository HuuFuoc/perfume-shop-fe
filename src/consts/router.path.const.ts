export const ROUTER_URL = {
  PUBLIC: {
    BASE: "/",
    HOME: "/",
    PRODUCTS: "/perfumes",
    ABOUT: "/about",
  },
  AUTH: {
    LOGIN: "/login",
    SIGN_UP: "/register",
    UNAUTHORIZED: "/unauthorized",
  },
  ADMIN: {
    BASE: "/admin",
    DASHBOARD: "/dashboard",
    BRANDS: "/brands",
    PERFUMES: "/perfumes",
  },
  USER: {
    BASE: "/app",
    HOME: "",
    PROFILE: "/profile",
    SETTING: "/setting",
  },
  COMMON: {
    HOME: "/",
    ABOUT: "/ve-chung-toi",
    CONTACT: "/lien-he",
    FAQ: "/cau-hoi-thuong-gap",
    COVER: "/cover",
  },
} as const;
