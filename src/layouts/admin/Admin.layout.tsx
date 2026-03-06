import { useState } from "react";
import { Outlet, NavLink, Link } from "react-router-dom";
import {
  LayoutDashboard,
  Tag,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  LogOut,
} from "lucide-react";
import { ROUTER_URL } from "../../consts/router.path.const";

// ── Palette (design system) ─────────────────────
const SIDEBAR_BG = "#FDF0ED"; // warmer blush for sidebar
const SIDEBAR_BORDER = "#E8D5CF"; // border-soft
const ROSEWOOD = "#C07850";
const BROWN_DARK = "#3D2B1F";
const TEXT_MUTED = "#B09490"; // brown-muted
const ACTIVE_BG = "rgba(192,120,80,0.12)";
const HOVER_BG = "rgba(192,120,80,0.07)";

const navItems = [
  {
    label: "Dashboard",
    icon: LayoutDashboard,
    to: `${ROUTER_URL.ADMIN.BASE}${ROUTER_URL.ADMIN.DASHBOARD}`,
  },
  {
    label: "Brands",
    icon: Tag,
    to: `${ROUTER_URL.ADMIN.BASE}${ROUTER_URL.ADMIN.BRANDS}`,
  },
  {
    label: "Perfumes",
    icon: Sparkles,
    to: `${ROUTER_URL.ADMIN.BASE}${ROUTER_URL.ADMIN.PERFUMES}`,
  },
];

export default function AdminLayout() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="flex min-h-screen" style={{ backgroundColor: "#F8EDEB" }}>
      {/* ── Sidebar ── */}
      <aside
        className="flex flex-col shrink-0 transition-[width] duration-300 ease-in-out relative"
        style={{
          width: collapsed ? 64 : 220,
          backgroundColor: SIDEBAR_BG,
          borderRight: `1px solid ${SIDEBAR_BORDER}`,
        }}
      >
        {/* Brand / Logo */}
        <div
          className="flex items-center gap-3 px-4 py-5 overflow-hidden"
          style={{ borderBottom: `1px solid ${SIDEBAR_BORDER}` }}
        >
          <Link
            to={ROUTER_URL.COMMON.HOME}
            className="flex items-center gap-3 shrink-0"
          >
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 shadow"
              style={{ backgroundColor: ROSEWOOD }}
            >
              <span className="text-sm font-bold" style={{ color: BROWN_DARK }}>
                ✦
              </span>
            </div>
            {!collapsed && (
              <div className="leading-tight overflow-hidden">
                <div
                  className="font-serif text-sm font-bold tracking-[0.16em] uppercase whitespace-nowrap"
                  style={{ color: BROWN_DARK }}
                >
                  Perfume
                </div>
                <div
                  className="text-[9px] tracking-[0.28em] uppercase font-light whitespace-nowrap"
                  style={{ color: ROSEWOOD }}
                >
                  Admin Panel
                </div>
              </div>
            )}
          </Link>
        </div>

        {/* Nav section label */}
        {!collapsed && (
          <div
            className="px-4 pt-5 pb-1.5 text-[10px] font-semibold tracking-[0.2em] uppercase"
            style={{ color: TEXT_MUTED }}
          >
            Menu
          </div>
        )}

        {/* Nav items */}
        <nav className="flex flex-col gap-1 px-2 pt-2 flex-1">
          {navItems.map(({ label, icon: Icon, to }) => (
            <NavLink
              key={to}
              to={to}
              className="group"
              style={({ isActive }) => ({
                display: "flex",
                alignItems: "center",
                gap: 10,
                padding: collapsed ? "10px 14px" : "9px 12px",
                borderRadius: 10,
                textDecoration: "none",
                transition: "background 0.15s",
                backgroundColor: isActive ? ACTIVE_BG : "transparent",
                color: isActive ? ROSEWOOD : BROWN_DARK,
                fontWeight: isActive ? 600 : 400,
                fontSize: 13,
                letterSpacing: "0.02em",
                justifyContent: collapsed ? "center" : "flex-start",
              })}
              onMouseEnter={(e) => {
                const el = e.currentTarget;
                if (!el.getAttribute("aria-current"))
                  el.style.backgroundColor = HOVER_BG;
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget;
                if (!el.getAttribute("aria-current"))
                  el.style.backgroundColor = "transparent";
              }}
              title={collapsed ? label : undefined}
            >
              {({ isActive }) => (
                <>
                  <Icon
                    size={16}
                    className="shrink-0"
                    style={{ color: isActive ? ROSEWOOD : TEXT_MUTED }}
                  />
                  {!collapsed && (
                    <span className="whitespace-nowrap">{label}</span>
                  )}
                  {isActive && !collapsed && (
                    <span
                      className="ml-auto w-1.5 h-1.5 rounded-full shrink-0"
                      style={{ backgroundColor: ROSEWOOD }}
                    />
                  )}
                </>
              )}
            </NavLink>
          ))}
        </nav>

        {/* Bottom: logout + collapse toggle */}
        <div
          className="flex flex-col gap-1 px-2 pb-4 pt-3"
          style={{ borderTop: `1px solid ${SIDEBAR_BORDER}` }}
        >
          <Link
            to={ROUTER_URL.AUTH.LOGIN}
            className="flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-[13px] transition-colors duration-150 hover:bg-[rgba(192,80,80,0.1)]"
            style={{
              color: "#C05050",
              justifyContent: collapsed ? "center" : "flex-start",
              textDecoration: "none",
            }}
            title={collapsed ? "Đăng xuất" : undefined}
          >
            <LogOut size={15} className="shrink-0" />
            {!collapsed && <span>Đăng xuất</span>}
          </Link>

          <button
            type="button"
            onClick={() => setCollapsed((v) => !v)}
            className="flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-[12px] transition-colors duration-150 hover:bg-[rgba(192,120,80,0.07)] w-full mt-1"
            style={{
              color: TEXT_MUTED,
              justifyContent: collapsed ? "center" : "flex-start",
            }}
            aria-label={collapsed ? "Mở rộng sidebar" : "Thu gọn sidebar"}
          >
            {collapsed ? (
              <ChevronRight size={15} />
            ) : (
              <>
                <ChevronLeft size={15} />
                <span>Thu gọn</span>
              </>
            )}
          </button>
        </div>
      </aside>

      {/* ── Main content ── */}
      <div className="flex flex-col flex-1 min-w-0">
        {/* Top bar */}
        <header
          className="h-14 flex items-center px-6 shrink-0 border-b"
          style={{ backgroundColor: "white", borderColor: "#E8D5CF" }}
        >
          <span
            className="text-xs font-semibold tracking-[0.18em] uppercase"
            style={{ color: "#B09490" }}
          >
            Admin Dashboard
          </span>
        </header>

        <main className="flex-1 p-6 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
