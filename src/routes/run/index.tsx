import { lazy, Suspense } from "react";
import { useRoutes } from "react-router-dom";
import type { RouteObject } from "react-router-dom";
import GuardGuestRoute from "../unprotected/GuardGuestRoute";
import { publicRoutes } from "../unprotected/GuestSubPaths";
import useProtectedRoutes from "../protected/useProtectedRoutes";
import { ROUTER_URL } from "../../consts/router.path.const";

const NotFoundPage = lazy(() => import("../../pages/auth/not_found"));
const UnauthorizedPage = lazy(() => import("../../pages/auth/unauthorized"));

export default function RunRoutes() {
  const protectedRoutes = useProtectedRoutes();

  // Wrap public layout-level element with GuardGuestRoute so logged-in
  // users are redirected away from public pages.
  const guestRoutes: RouteObject[] = publicRoutes.map((r) => ({
    ...r,
    element: (
      <Suspense>
        <GuardGuestRoute component={r.element} />
      </Suspense>
    ),
  }));

  const routes = useRoutes([
    ...guestRoutes,
    ...protectedRoutes,
    {
      path: ROUTER_URL.AUTH.UNAUTHORIZED,
      element: (
        <Suspense>
          <UnauthorizedPage />
        </Suspense>
      ),
    },
    {
      path: "*",
      element: (
        <Suspense>
          <NotFoundPage />
        </Suspense>
      ),
    },
  ]);

  return <>{routes}</>;
}
