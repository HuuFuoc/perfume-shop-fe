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
    DASHBOARD: "dashboard",
  },
  USER: {
    BASE: "/app",
    HOME: "",
  },
} as const;
