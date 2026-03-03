import { useNavigate } from "react-router-dom";
import { UserRole } from "../../app/enums/role";
import { useAuth } from "../../contexts/Auth.context";

export default function LoginPage() {
  const nav = useNavigate();
  const { setRole, getDefaultPathByRole } = useAuth();

  return (
    <div style={{ padding: 24 }}>
      <h2>Login</h2>

      <button
        onClick={() => {
          setRole(UserRole.USER);
          nav(getDefaultPathByRole(UserRole.USER), { replace: true });
        }}
      >
        Login as USER
      </button>

      <button
        style={{ marginLeft: 12 }}
        onClick={() => {
          setRole(UserRole.ADMIN);
          nav(getDefaultPathByRole(UserRole.ADMIN), { replace: true });
        }}
      >
        Login as ADMIN
      </button>
    </div>
  );
}
