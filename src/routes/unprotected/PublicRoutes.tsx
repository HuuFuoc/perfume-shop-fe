// import { lazy } from "react";
// import type { RouteObject } from "react-router-dom";
// import { ROUTER_URL } from "../../consts/router.path.const";

// const MainLayout = lazy(() => import("../../layouts/main/Main.layout"));
// const LandingPage = lazy(() => import("../../pages/public/landing"));
// const LoginPage = lazy(() => import("../../pages/auth/login"));

// export const publicRoutes: RouteObject[] = [
//   // Pages WITH header & footer
//   {
//     path: ROUTER_URL.PUBLIC.BASE,
//     element: <MainLayout />,
//     children: [
//       { index: true, element: <LandingPage /> },
//       { path: ROUTER_URL.PUBLIC.PRODUCTS.slice(1), element: <LandingPage /> },
//     ],
//   },
//   // Auth pages – standalone (NO header / footer)
//   {
//     path: ROUTER_URL.AUTH.LOGIN,
//     element: <LoginPage />,
//   },
//   {
//     path: ROUTER_URL.AUTH.SIGN_UP.slice(1),
//     element: <LoginPage />, // replace with RegisterPage when ready
//   },
// ];
