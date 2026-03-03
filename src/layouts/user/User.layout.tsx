import { Outlet, NavLink } from "react-router-dom";

export default function UserLayout() {
  return (
    <div style={{ minHeight: "100vh" }}>
      <header style={{ borderBottom: "1px solid #eee", padding: 16 }}>
        <NavLink to="/">Home</NavLink>
      </header>

      <main style={{ padding: 24 }}>
        <Outlet />
      </main>
    </div>
  );
}
