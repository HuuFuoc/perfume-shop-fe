import { Outlet, NavLink } from "react-router-dom";
import { ROUTER_URL } from "../../consts/router.path.const";

export default function AdminLayout() {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "240px 1fr",
        minHeight: "100vh",
      }}
    >
      <aside style={{ borderRight: "1px solid #eee", padding: 16 }}>
        <h3>Admin</h3>
        <nav style={{ display: "grid", gap: 8 }}>
          <NavLink
            to={`${ROUTER_URL.ADMIN.BASE}/${ROUTER_URL.ADMIN.DASHBOARD}`}
          >
            Dashboard
          </NavLink>
        </nav>
      </aside>

      <main style={{ padding: 24 }}>
        <Outlet />
      </main>
    </div>
  );
}
