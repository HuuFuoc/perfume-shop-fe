import { lazy, Suspense } from "react";
import type { RouteObject } from "react-router-dom";
import type { JSX } from "react";
import { UserRole } from "../../app/enums/role";
import GuardProtectedRoute from "./GuardProtectedRoute";
import { ROUTER_URL } from "../../consts/router.path.const";

const AdminLayout = lazy(() => import("../../layouts/admin/Admin.layout"));
const UserLayout = lazy(() => import("../../layouts/user/User.layout"));

const AdminDashboard = lazy(() => import("../../pages/admin/dashboard"));
const UserHome = lazy(() => import("../../pages/user/home"));

const wrap = (el: JSX.Element, roles: string[]) => (
  <Suspense>
    <GuardProtectedRoute component={el} allowedRoles={roles} />
  </Suspense>
);

export default function useProtectedRoutes(): RouteObject[] {
  return [
    // USER group (layout + child)
    {
      path: ROUTER_URL.USER.BASE,
      element: wrap(<UserLayout />, [UserRole.USER, UserRole.ADMIN]), // admin cũng vào user area nếu bạn muốn
      children: [
        {
          index: true,
          element: wrap(<UserHome />, [UserRole.USER, UserRole.ADMIN]),
        },
      ],
    },

    // ADMIN group
    {
      path: ROUTER_URL.ADMIN.BASE,
      element: wrap(<AdminLayout />, [UserRole.ADMIN]),
      children: [
        {
          path: ROUTER_URL.ADMIN.DASHBOARD,
          element: wrap(<AdminDashboard />, [UserRole.ADMIN]),
        },
      ],
    },
  ];
}
