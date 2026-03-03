import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { ROUTER_URL } from "../../consts/router.path.const";
import { useAuth } from "../../contexts/Auth.context";

interface Props {
  component: ReactNode;
  allowedRoles: string[];
}

export default function GuardProtectedRoute({
  component,
  allowedRoles,
}: Props) {
  const { role, isLoading } = useAuth();

  if (isLoading) return <div>Loading...</div>;
  if (!role) return <Navigate to={ROUTER_URL.AUTH.LOGIN} replace />;

  if (!allowedRoles.includes(role)) {
    return <Navigate to={ROUTER_URL.AUTH.UNAUTHORIZED} replace />;
  }

  return <>{component}</>;
}
