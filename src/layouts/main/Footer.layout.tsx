import { Link } from "react-router-dom";
import { ROUTER_URL } from "../../consts/router.path.const";

const footerLinks = {
  "Về Chúng Tôi": [
    { label: "Câu Chuyện Thương Hiệu", href: "#" },
    { label: "Triết Lý Nước Hoa", href: "#" },
    { label: "Nguyên Liệu Cao Cấp", href: "#" },
    { label: "Tuyển Dụng", href: "#" },
  ],
  "Sản Phẩm": [
    { label: "Nước Hoa Nam", href: ROUTER_URL.PUBLIC.PRODUCTS },
    { label: "Nước Hoa Nữ", href: ROUTER_URL.PUBLIC.PRODUCTS },
    { label: "Nước Hoa Unisex", href: ROUTER_URL.PUBLIC.PRODUCTS },
    { label: "Bộ Quà Tặng", href: ROUTER_URL.PUBLIC.PRODUCTS },
  ],
  "Dịch Vụ Khách Hàng": [
    { label: "Hướng Dẫn Chọn Hương", href: "#" },
    { label: "Chính Sách Đổi Trả", href: "#" },
    { label: "Theo Dõi Đơn Hàng", href: "#" },
    { label: "Câu Hỏi Thường Gặp", href: "#" },
  ],
  "Liên Hệ": [
    { label: "📍 123 Đường Hoa, Q.1, TP.HCM", href: "#" },
    { label: "📞 1800 1234", href: "tel:18001234" },
    { label: "✉️ hello@parfum.vn", href: "mailto:hello@parfum.vn" },
    { label: "🕙 Thứ 2 – Thứ 7: 9:00 – 21:00", href: "#" },
  ],
};

const FooterLayout = () => {
  return (
    <footer className="bg-[#1a1a1a] text-gray-300">
      {/* Main footer grid */}
      <div className="container mx-auto px-6 pt-14 pb-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand column */}
          <div className="lg:col-span-1 flex flex-col gap-4">
            <Link
              to={ROUTER_URL.PUBLIC.HOME}
              className="flex items-center gap-3 group w-fit"
            >
              <div className="w-9 h-9 rounded-full bg-[#c5a572] flex items-center justify-center">
                <span className="text-white text-base font-serif">✦</span>
              </div>
              <div className="leading-tight">
                <div className="text-white font-serif text-lg font-bold tracking-widest uppercase group-hover:text-[#c5a572] transition-colors">
                  Parfum
                </div>
                <div className="text-[#c5a572] text-[9px] tracking-[0.3em] uppercase font-light">
                  Maison de Luxe
                </div>
              </div>
            </Link>
            <p className="text-sm text-gray-400 leading-relaxed">
              Mang đến những tầng hương tinh tế — nơi mỗi giọt nước hoa là một
              câu chuyện chưa kể.
            </p>
            {/* Social icons */}
            <div className="flex gap-3 mt-1">
              {["f", "in", "ig", "yt"].map((icon) => (
                <a
                  key={icon}
                  href="#"
                  className="w-8 h-8 rounded-full border border-gray-600 flex items-center justify-center text-gray-400 hover:border-[#c5a572] hover:text-[#c5a572] transition-colors text-xs font-bold"
                >
                  {icon}
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title} className="flex flex-col gap-3">
              <h4 className="text-white text-xs font-semibold tracking-[0.2em] uppercase border-b border-[#c5a572] pb-2 w-fit">
                {title}
              </h4>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-gray-400 hover:text-[#c5a572] transition-colors duration-200"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter */}
        <div className="mt-12 border-t border-gray-800 pt-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <p className="text-white font-serif text-lg">
                Nhận ưu đãi độc quyền
              </p>
              <p className="text-gray-400 text-sm mt-1">
                Đăng ký nhận thông tin về bộ sưu tập mới và khuyến mãi đặc biệt.
              </p>
            </div>
            <form
              className="flex w-full md:w-auto"
              onSubmit={(e) => e.preventDefault()}
            >
              <input
                type="email"
                placeholder="Email của bạn"
                className="flex-1 md:w-64 px-4 py-2.5 bg-[#2a2a2a] border border-gray-700 text-gray-200 text-sm outline-none focus:border-[#c5a572] placeholder-gray-500"
              />
              <button
                type="submit"
                className="px-5 py-2.5 bg-[#c5a572] text-white text-sm font-medium tracking-widest uppercase hover:bg-[#9b834c] transition-colors whitespace-nowrap"
              >
                Đăng Ký
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-gray-800 py-5">
        <div className="container mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-gray-500">
          <p>
            © {new Date().getFullYear()} Parfum Maison de Luxe. All rights
            reserved.
          </p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-[#c5a572] transition-colors">
              Chính Sách Bảo Mật
            </a>
            <a href="#" className="hover:text-[#c5a572] transition-colors">
              Điều Khoản Sử Dụng
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterLayout;
