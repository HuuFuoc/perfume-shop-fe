import { Outlet } from "react-router-dom";
import UserHeaderLayout from "./UserHeader.layout";
import FooterLayout from "../main/Footer.layout";

export default function UserLayout() {
  return (
    <div className="flex flex-col min-h-screen bg-blush">
      <UserHeaderLayout />

      <main className="flex-grow">
        <Outlet />
      </main>

      <FooterLayout />
    </div>
  );
}
