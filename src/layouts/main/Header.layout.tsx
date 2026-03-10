import { useEffect, useRef, useState } from "react";
import CardNav from "../../components/common/CardNav";
import UserAvatarMenu from "../../components/common/UserAvatarMenu";
import { ROUTER_URL } from "../../consts/router.path.const";
import { getAuthToken, getRoleFromToken, TOKEN_ROLE } from "../../utils/cookie";

// ── Palette ─────────────────────────────────────
const BLUSH = "#F8EDEB";
const PETAL = "#FCD5CE";
const PETAL_DEEP = "#F4B8AE";
const PEACH = "#FFD7BA";
const BROWN_DARK = "#3D2B1F";
const ROSEWOOD = "#C07850";

// ── Nav items mapped to palette cards ───────────
const cardItems = [
  {
    label: "Trang Chủ",
    bgColor: PETAL,
    textColor: BROWN_DARK,
    links: [
      {
        label: "Trang chính",
        href: ROUTER_URL.PUBLIC.HOME,
        ariaLabel: "Về trang chủ",
      },
      {
        label: "Khám phá",
        href: ROUTER_URL.PUBLIC.PRODUCTS,
        ariaLabel: "Khám phá bộ sưu tập",
      },
    ],
  },
  {
    label: "Sản Phẩm",
    bgColor: PEACH,
    textColor: BROWN_DARK,
    links: [
      {
        label: "Nước hoa",
        href: ROUTER_URL.PUBLIC.PRODUCTS,
        ariaLabel: "Xem tất cả nước hoa",
      },
      {
        label: "Bộ sưu tập",
        href: ROUTER_URL.PUBLIC.PRODUCTS,
        ariaLabel: "Bộ sưu tập đặc biệt",
      },
    ],
  },
  {
    label: "Về Chúng Tôi",
    bgColor: PETAL_DEEP,
    textColor: BROWN_DARK,
    links: [
      {
        label: "Câu chuyện",
        href: ROUTER_URL.PUBLIC.ABOUT,
        ariaLabel: "Câu chuyện thương hiệu",
      },
      {
        label: "Liên hệ",
        href: ROUTER_URL.PUBLIC.ABOUT,
        ariaLabel: "Liên hệ với chúng tôi",
      },
    ],
  },
];

// ── Logo node ────────────────────────────────────
const LogoNode = () => (
  <a href={ROUTER_URL.PUBLIC.HOME} className="flex items-center gap-2.5 group">
    <div
      className="w-8 h-8 rounded-full flex items-center justify-center shadow-soft"
      style={{ backgroundColor: ROSEWOOD }}
    >
      <span className="text-sm" style={{ color: BLUSH }}>
        ✦
      </span>
    </div>
    <div className="leading-tight">
      <div
        className="font-serif text-base font-bold tracking-[0.18em] uppercase transition-colors duration-200 group-hover:opacity-75"
        style={{ color: BROWN_DARK }}
      >
        Perfume
      </div>
      <div
        className="text-[9px] tracking-[0.3em] uppercase font-light"
        style={{ color: ROSEWOOD }}
      >
        Maison de Luxe
      </div>
    </div>
  </a>
);

// ── Header ───────────────────────────────────────
const HeaderLayout = () => {
  const wrapperRef = useRef<HTMLDivElement>(null);

  // Check auth token from cookie to conditionally show avatar vs auth buttons
  const [isLoggedIn, setIsLoggedIn] = useState(() => !!getAuthToken());
  const [isAdmin, setIsAdmin] = useState(
    () => getRoleFromToken() === TOKEN_ROLE.ADMIN,
  );
  const [displayName] = useState("Tài khoản");

  useEffect(() => {
    setIsLoggedIn(!!getAuthToken());
    setIsAdmin(getRoleFromToken() === TOKEN_ROLE.ADMIN);
  }, []);

  // Dynamically adjust the wrapper height as the CardNav expands
  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    const nav = wrapper.querySelector(".card-nav") as HTMLElement | null;
    if (!nav) return;

    // Use a ResizeObserver to keep the wrapper height in sync
    const ro = new ResizeObserver(() => {
      wrapper.style.height = nav.offsetHeight + 24 + "px"; // 24 = top offset
    });
    ro.observe(nav);
    return () => ro.disconnect();
  }, []);

  return (
    <>
      {/* ── Free-shipping top bar ── */}
      <div
        className="w-full text-center py-1.5 text-xs tracking-widest font-light z-[100] relative"
        style={{ backgroundColor: ROSEWOOD, color: BLUSH }}
      >
        ✦ MIỄN PHÍ GIAO HÀNG CHO ĐƠN HÀNG TRÊN 500.000 vn₫ ✦
      </div>

      {/* ── CardNav wrapper ── keeps the floating nav in flow ── */}
      <div
        ref={wrapperRef}
        className="relative w-full"
        style={{
          height: "88px", // default collapsed height + top offset
          zIndex: 50,
        }}
      >
        <CardNav
          logoNode={<LogoNode />}
          items={cardItems}
          baseColor={BLUSH}
          menuColor={BROWN_DARK}
          ease="power3.out"
          {...(isLoggedIn
            ? {
                // Logged in: replace button area with avatar menu
                rightNode: (
                  <UserAvatarMenu displayName={displayName} isAdmin={isAdmin} />
                ),
              }
            : {
                // Guest: show register + login buttons
                buttonBgColor: ROSEWOOD,
                buttonTextColor: BLUSH,
                buttonLabel: "Đăng Ký",
                buttonHref: ROUTER_URL.AUTH.SIGN_UP,
                secondButtonLabel: "Đăng Nhập",
                secondButtonHref: ROUTER_URL.AUTH.LOGIN,
                secondButtonTextColor: "#F8EDEB",
                secondButtonBgColor: "#C07850",
              })}
        />
      </div>
    </>
  );
};

export default HeaderLayout;
