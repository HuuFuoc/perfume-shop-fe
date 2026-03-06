import { useEffect, useRef } from "react";
import CardNav from "../../components/common/CardNav";
import UserAvatarMenu from "../../components/common/UserAvatarMenu";
import { ROUTER_URL } from "../../consts/router.path.const";

// ── Palette (mirrors Header.layout.tsx) ──────────
const BLUSH = "#F8EDEB";
const PETAL = "#FCD5CE";
const PETAL_DEEP = "#F4B8AE";
const PEACH = "#FFD7BA";
const BROWN_DARK = "#3D2B1F";
const ROSEWOOD = "#C07850";

// ── Nav items ────────────────────────────────────
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

// ── Logo node ─────────────────────────────────────
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

// ── UserHeader ────────────────────────────────────
const UserHeaderLayout = () => {
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;
    const nav = wrapper.querySelector(".card-nav") as HTMLElement | null;
    if (!nav) return;
    const ro = new ResizeObserver(() => {
      wrapper.style.height = nav.offsetHeight + 24 + "px";
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

      {/* ── CardNav wrapper ── */}
      <div
        ref={wrapperRef}
        className="relative w-full"
        style={{ height: "88px", zIndex: 50 }}
      >
        <CardNav
          logoNode={<LogoNode />}
          items={cardItems}
          baseColor={BLUSH}
          menuColor={BROWN_DARK}
          ease="power3.out"
          rightNode={<UserAvatarMenu displayName="Người dùng" />}
        />
      </div>
    </>
  );
};

export default UserHeaderLayout;
