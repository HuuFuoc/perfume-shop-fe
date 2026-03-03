import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../contexts/Auth.context";

interface Props {
  component: ReactNode;
}

export default function GuardGuestRoute({ component }: Props) {
  const { role, isLoading, getDefaultPathByRole } = useAuth();

  if (isLoading) return <div>Loading...</div>;
  if (role) return <Navigate to={getDefaultPathByRole(role)} replace />;
  return <>{component}</>;
}
