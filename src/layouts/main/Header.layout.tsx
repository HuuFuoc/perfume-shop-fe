import { useState, useEffect } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { ROUTER_URL } from "../../consts/router.path.const";

const navItems = [
  { name: "Trang Chủ", path: ROUTER_URL.PUBLIC.HOME },
  { name: "Sản Phẩm", path: ROUTER_URL.PUBLIC.PRODUCTS },
  { name: "Về Chúng Tôi", path: ROUTER_URL.PUBLIC.ABOUT },
];

const HeaderLayout = () => {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  return (
    <header
      className={`sticky top-0 z-50 transition-shadow duration-300 bg-white ${
        scrolled ? "shadow-md" : "shadow-sm"
      }`}
    >
      {/* Top bar */}
      <div className="bg-[#1a1a1a] text-[#c5a572] text-xs text-center py-1.5 tracking-widest font-light">
        ✦ FREE SHIPPING ON ORDERS OVER 500.000₫ ✦
      </div>

      {/* Main header */}
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link
          to={ROUTER_URL.PUBLIC.HOME}
          className="flex items-center gap-3 group"
        >
          <div className="w-10 h-10 rounded-full bg-[#1a1a1a] flex items-center justify-center">
            <span className="text-[#c5a572] text-lg font-serif">✦</span>
          </div>
          <div className="leading-tight">
            <div className="text-[#1a1a1a] font-serif text-xl font-bold tracking-widest uppercase group-hover:text-[#c5a572] transition-colors">
              Perfume
            </div>
            <div className="text-[#c5a572] text-[10px] tracking-[0.3em] uppercase font-light">
              Maison de Luxe
            </div>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === "/"}
              className={({ isActive }) =>
                `text-sm font-medium tracking-widest uppercase transition-colors duration-200 pb-0.5 border-b-2 ${
                  isActive
                    ? "text-[#c5a572] border-[#c5a572]"
                    : "text-[#1a1a1a] border-transparent hover:text-[#c5a572] hover:border-[#c5a572]"
                }`
              }
            >
              {item.name}
            </NavLink>
          ))}
        </nav>

        {/* Auth Buttons */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            to={ROUTER_URL.AUTH.LOGIN}
            className="px-5 py-2 text-sm font-medium tracking-widest uppercase border border-[#1a1a1a] text-[#1a1a1a] hover:bg-[#1a1a1a] hover:text-white transition-colors duration-200"
          >
            Đăng Nhập
          </Link>
          <Link
            to={ROUTER_URL.AUTH.SIGN_UP}
            className="px-5 py-2 text-sm font-medium tracking-widest uppercase bg-[#c5a572] text-white hover:bg-[#9b834c] transition-colors duration-200"
          >
            Đăng Ký
          </Link>
        </div>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-label="Toggle menu"
        >
          <span
            className={`block h-0.5 w-6 bg-[#1a1a1a] transition-transform duration-300 ${menuOpen ? "rotate-45 translate-y-2" : ""}`}
          />
          <span
            className={`block h-0.5 w-6 bg-[#1a1a1a] transition-opacity duration-300 ${menuOpen ? "opacity-0" : ""}`}
          />
          <span
            className={`block h-0.5 w-6 bg-[#1a1a1a] transition-transform duration-300 ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`}
          />
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 bg-white border-t border-gray-100 ${
          menuOpen ? "max-h-80" : "max-h-0"
        }`}
      >
        <div className="container mx-auto px-6 py-4 flex flex-col gap-4">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === "/"}
              className={({ isActive }) =>
                `text-sm font-medium tracking-widest uppercase py-2 border-b border-gray-100 ${
                  isActive ? "text-[#c5a572]" : "text-[#1a1a1a]"
                }`
              }
            >
              {item.name}
            </NavLink>
          ))}
          <div className="flex flex-col gap-2 pt-2">
            <Link
              to={ROUTER_URL.AUTH.LOGIN}
              className="text-center py-2.5 text-sm font-medium tracking-widest uppercase border border-[#1a1a1a] text-[#1a1a1a]"
            >
              Đăng Nhập
            </Link>
            <Link
              to={ROUTER_URL.AUTH.SIGN_UP}
              className="text-center py-2.5 text-sm font-medium tracking-widest uppercase bg-[#c5a572] text-white"
            >
              Đăng Ký
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default HeaderLayout;
