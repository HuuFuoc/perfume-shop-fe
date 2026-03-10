import { useRef, useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { Link, useNavigate } from "react-router-dom";
import {
  User,
  Settings,
  LogOut,
  ChevronDown,
  LayoutDashboard,
} from "lucide-react";
import { ROUTER_URL } from "../../consts/router.path.const";
import { removeAuthToken } from "../../utils/cookie";

interface UserAvatarMenuProps {
  displayName?: string;
  avatarUrl?: string;
  isAdmin?: boolean;
}

const ROSEWOOD = "#C07850";
const BLUSH = "#F8EDEB";
const BROWN_DARK = "#3D2B1F";
const BORDER_SOFT = "#E8D5CF";

const menuItems = [
  {
    icon: User,
    label: "Hồ sơ",
    href: ROUTER_URL.USER.BASE + ROUTER_URL.USER.PROFILE,
  },
  {
    icon: Settings,
    label: "Cài đặt",
    href: ROUTER_URL.USER.BASE + ROUTER_URL.USER.SETTING,
  },
];

export default function UserAvatarMenu({
  displayName = "Khách",
  avatarUrl,
  isAdmin = false,
}: UserAvatarMenuProps) {
  const [open, setOpen] = useState(false);
  const [dropdownStyle, setDropdownStyle] = useState<React.CSSProperties>({});
  const buttonRef = useRef<HTMLButtonElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  // Position dropdown relative to viewport when opening
  const handleToggle = () => {
    if (!open && buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setDropdownStyle({
        position: "fixed",
        top: rect.bottom + 8,
        right: window.innerWidth - rect.right,
        zIndex: 9999,
      });
    }
    setOpen((v) => !v);
  };

  // Close on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (
        buttonRef.current?.contains(e.target as Node) ||
        dropdownRef.current?.contains(e.target as Node)
      )
        return;
      setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const initials = displayName
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  const handleLogout = () => {
    setOpen(false);
    // Clear the auth token cookie so the header reverts to guest state
    removeAuthToken();
    navigate(ROUTER_URL.AUTH.LOGIN);
  };

  const dropdown = open ? (
    <div
      ref={dropdownRef}
      style={{
        ...dropdownStyle,
        backgroundColor: BLUSH,
        borderColor: BORDER_SOFT,
      }}
      className="w-52 rounded-2xl shadow-lg border overflow-hidden"
    >
      <div className="px-4 py-3 border-b" style={{ borderColor: BORDER_SOFT }}>
        <p
          className="text-xs font-semibold tracking-wide truncate"
          style={{ color: BROWN_DARK }}
        >
          {displayName}
        </p>
      </div>

      <div className="py-1.5">
        {isAdmin && (
          <Link
            to={ROUTER_URL.ADMIN.BASE + ROUTER_URL.ADMIN.DASHBOARD}
            onClick={() => setOpen(false)}
            className="flex items-center gap-2.5 px-4 py-2.5 text-sm transition-colors duration-150 hover:bg-[#FCD5CE]/40"
            style={{ color: BROWN_DARK }}
          >
            <LayoutDashboard size={15} style={{ color: ROSEWOOD }} />
            Khu vực quản trị
          </Link>
        )}
        {menuItems.map(({ icon: Icon, label, href }) => (
          <Link
            key={label}
            to={href}
            onClick={() => setOpen(false)}
            className="flex items-center gap-2.5 px-4 py-2.5 text-sm transition-colors duration-150 hover:bg-[#FCD5CE]/40"
            style={{ color: BROWN_DARK }}
          >
            <Icon size={15} style={{ color: ROSEWOOD }} />
            {label}
          </Link>
        ))}
      </div>

      <div className="border-t py-1.5" style={{ borderColor: BORDER_SOFT }}>
        <button
          type="button"
          onClick={handleLogout}
          className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm transition-colors duration-150 hover:bg-red-50"
          style={{ color: "#C04040" }}
        >
          <LogOut size={15} />
          Đăng xuất
        </button>
      </div>
    </div>
  ) : null;

  return (
    <div className="relative flex items-center">
      <button
        ref={buttonRef}
        type="button"
        onClick={handleToggle}
        aria-haspopup="true"
        aria-expanded={open}
        aria-label="Tài khoản của tôi"
        className="flex items-center gap-2 rounded-xl px-2 h-[42px] cursor-pointer transition-all duration-200 hover:opacity-85 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C07850]/40"
      >
        <div
          className="w-[34px] h-[34px] rounded-full flex items-center justify-center text-xs font-semibold shrink-0 overflow-hidden shadow-sm"
          style={{ backgroundColor: ROSEWOOD, color: BLUSH }}
        >
          {avatarUrl ? (
            <img
              src={avatarUrl}
              alt={displayName}
              className="w-full h-full object-cover"
            />
          ) : (
            <span>{initials}</span>
          )}
        </div>

        <span
          className="hidden lg:flex items-center gap-1 text-sm font-medium"
          style={{ color: BROWN_DARK }}
        >
          {displayName}
          <ChevronDown
            size={14}
            className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`}
            style={{ color: ROSEWOOD }}
          />
        </span>
      </button>

      {createPortal(dropdown, document.body)}
    </div>
  );
}
