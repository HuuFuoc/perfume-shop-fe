import { lazy } from "react";
import type { RouteObject } from "react-router-dom";
import { ROUTER_URL } from "../../consts/router.path.const";
import Perfume from "../../pages/user/Perfume";
import About from "../../pages/user/About";
import HomePage from "@/pages/user/home";
import Register from "@/pages/auth/register";
import AdminLayout from "@/layouts/admin/Admin.layout";
import AdminDashboard from "@/pages/admin/dashboard";
import Brands from "@/pages/admin/brands";
import Perfumes from "@/pages/admin/perfumes";
import UserLayout from "@/layouts/user/User.layout";
import UserHome from "@/pages/user/home";
import Profile from "@/pages/user/Profile";
import Setting from "@/pages/user/Setting";

const MainLayout = lazy(() => import("../../layouts/main/Main.layout"));
const LoginPage = lazy(() => import("../../pages/auth/login"));

export const publicRoutes: RouteObject[] = [
  // Pages WITH header & footer
  {
    path: ROUTER_URL.PUBLIC.BASE,
    element: <MainLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: ROUTER_URL.PUBLIC.PRODUCTS.slice(1), element: <Perfume /> },
      { path: ROUTER_URL.PUBLIC.ABOUT.slice(1), element: <About /> },
    ],
  },
  // Auth pages – standalone (NO header / footer)
  {
    path: ROUTER_URL.AUTH.LOGIN,
    element: <LoginPage />,
  },
  {
    path: ROUTER_URL.AUTH.SIGN_UP.slice(1),
    element: <Register />,
  },
  // User pages (for testing — no auth guard)
  {
    path: ROUTER_URL.USER.BASE,
    element: <UserLayout />,
    children: [
      { index: true, element: <UserHome /> },
      { path: ROUTER_URL.USER.PROFILE.slice(1), element: <Profile /> },
      { path: ROUTER_URL.USER.SETTING.slice(1), element: <Setting /> },
    ],
  },
  // Admin pages
  {
    path: ROUTER_URL.ADMIN.BASE,
    element: <AdminLayout />,
    children: [
      {
        path: ROUTER_URL.ADMIN.DASHBOARD.slice(1),
        element: <AdminDashboard />,
      },
      {
        path: ROUTER_URL.ADMIN.BRANDS.slice(1),
        element: <Brands />,
      },
      {
        path: ROUTER_URL.ADMIN.PERFUMES.slice(1),
        element: <Perfumes />,
      },
    ],
  },
];
