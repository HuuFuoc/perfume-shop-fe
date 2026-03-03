import { createContext, useContext, useMemo, useState } from "react";
import type { ReactNode } from "react";
import type { UserRoleType } from "../app/enums/role";
import { ROUTER_URL } from "../consts/router.path.const";

function getDefaultPathByRole(role: UserRoleType): string {
  if (role === "ADMIN")
    return `${ROUTER_URL.ADMIN.BASE}/${ROUTER_URL.ADMIN.DASHBOARD}`;
  return ROUTER_URL.USER.BASE;
}

type AuthValue = {
  role: UserRoleType | null;
  isLoading: boolean;
  setRole: (r: UserRoleType | null) => void;
  getDefaultPathByRole: (role: UserRoleType) => string;
};

const AuthContext = createContext<AuthValue | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [role, setRole] = useState<UserRoleType | null>(null);

  const value = useMemo<AuthValue>(
    () => ({ role, setRole, isLoading: false, getDefaultPathByRole }),
    [role],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
