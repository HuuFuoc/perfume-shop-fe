import { Outlet } from "react-router-dom";
import HeaderLayout from "./Header.layout";
import FooterLayout from "./Footer.layout";

export default function MainLayout() {
  return (
    <div className="flex flex-col min-h-screen bg-[#f8f5f0]">
      <HeaderLayout />

      <main className="flex-grow">
        <Outlet />
      </main>

      <FooterLayout />
    </div>
  );
}

/* ── Keep legacy export alias so existing imports don't break ── */
export { MainLayout as LandingLayout };
