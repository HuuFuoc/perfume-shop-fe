import { Outlet } from "react-router-dom";
import FooterLayout from "../main/Footer.layout";
import HeaderLayout from "../main/Header.layout";

export default function UserLayout() {
  return (
    <div className="flex flex-col min-h-screen bg-blush">
      <HeaderLayout />

      <main className="flex-grow">
        <Outlet />
      </main>

      <FooterLayout />
    </div>
  );
}
