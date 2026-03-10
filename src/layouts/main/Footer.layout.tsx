import { Link } from "react-router-dom";
import { ROUTER_URL } from "../../consts/router.path.const";

// Design system palette
const BLUSH = "#F8EDEB";
const PETAL = "#FCD5CE";
const BORDER_SOFT = "#E8D5CF";
const BROWN_DARK = "#3D2B1F";
const BROWN_MID = "#7A5C52";
const BROWN_MUTED = "#B09490";
const ROSEWOOD = "#C07850";
const ROSEWOOD_DEEP = "#A0613D";

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
    <footer style={{ backgroundColor: PETAL, color: BROWN_DARK }}>
      {/* Main footer grid */}
      <div className="container mx-auto px-6 pt-14 pb-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand column */}
          <div className="lg:col-span-1 flex flex-col gap-4">
            <Link
              to={ROUTER_URL.PUBLIC.HOME}
              className="flex items-center gap-3 group w-fit"
            >
              <div
                className="w-9 h-9 rounded-full flex items-center justify-center"
                style={{ backgroundColor: ROSEWOOD }}
              >
                <span className="text-base font-serif" style={{ color: BLUSH }}>
                  ✦
                </span>
              </div>
              <div className="leading-tight">
                <div
                  className="font-serif text-lg font-bold tracking-widest uppercase transition-colors"
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
            </Link>
            <p className="text-sm leading-relaxed" style={{ color: BROWN_MID }}>
              Mang đến những tầng hương tinh tế — nơi mỗi giọt nước hoa là một
              câu chuyện chưa kể.
            </p>
            {/* Social icons */}
            <div className="flex gap-3 mt-1">
              {["f", "in", "ig", "yt"].map((icon) => (
                <a
                  key={icon}
                  href="#"
                  className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-colors"
                  style={{
                    border: `1px solid ${BORDER_SOFT}`,
                    color: BROWN_MUTED,
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLAnchorElement).style.borderColor =
                      ROSEWOOD;
                    (e.currentTarget as HTMLAnchorElement).style.color =
                      ROSEWOOD;
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLAnchorElement).style.borderColor =
                      BORDER_SOFT;
                    (e.currentTarget as HTMLAnchorElement).style.color =
                      BROWN_MUTED;
                  }}
                >
                  {icon}
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title} className="flex flex-col gap-3">
              <h4
                className="text-xs font-semibold tracking-[0.2em] uppercase pb-2 w-fit"
                style={{
                  color: BROWN_DARK,
                  borderBottom: `1px solid ${ROSEWOOD}`,
                }}
              >
                {title}
              </h4>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm transition-colors duration-200"
                      style={{ color: BROWN_MID }}
                      onMouseEnter={(e) =>
                        ((e.currentTarget as HTMLAnchorElement).style.color =
                          ROSEWOOD)
                      }
                      onMouseLeave={(e) =>
                        ((e.currentTarget as HTMLAnchorElement).style.color =
                          BROWN_MID)
                      }
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
        <div
          className="mt-12 pt-10"
          style={{ borderTop: `1px solid ${BORDER_SOFT}` }}
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <p className="font-serif text-lg" style={{ color: BROWN_DARK }}>
                Nhận ưu đãi độc quyền
              </p>
              <p className="text-sm mt-1" style={{ color: BROWN_MID }}>
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
                className="flex-1 md:w-64 px-4 py-2.5 text-sm outline-none"
                style={{
                  backgroundColor: BLUSH,
                  border: `1px solid ${BORDER_SOFT}`,
                  borderRight: "none",
                  color: BROWN_DARK,
                }}
                onFocus={(e) =>
                  ((e.currentTarget as HTMLInputElement).style.borderColor =
                    ROSEWOOD)
                }
                onBlur={(e) =>
                  ((e.currentTarget as HTMLInputElement).style.borderColor =
                    BORDER_SOFT)
                }
              />
              <button
                type="submit"
                className="px-5 py-2.5 text-sm font-medium tracking-widest uppercase transition-colors whitespace-nowrap"
                style={{ backgroundColor: ROSEWOOD, color: BLUSH }}
                onMouseEnter={(e) =>
                  ((
                    e.currentTarget as HTMLButtonElement
                  ).style.backgroundColor = ROSEWOOD_DEEP)
                }
                onMouseLeave={(e) =>
                  ((
                    e.currentTarget as HTMLButtonElement
                  ).style.backgroundColor = ROSEWOOD)
                }
              >
                Đăng Ký
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div style={{ borderTop: `1px solid ${BORDER_SOFT}` }} className="py-5">
        <div
          className="container mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs"
          style={{ color: BROWN_MUTED }}
        >
          <p>
            © {new Date().getFullYear()} Perfume Maison de Luxe. Bảo lưu mọi quyền.
          </p>
          <div className="flex gap-4">
            <a
              href="#"
              className="transition-colors"
              style={{ color: BROWN_MUTED }}
              onMouseEnter={(e) =>
                ((e.currentTarget as HTMLAnchorElement).style.color = ROSEWOOD)
              }
              onMouseLeave={(e) =>
                ((e.currentTarget as HTMLAnchorElement).style.color =
                  BROWN_MUTED)
              }
            >
              Chính Sách Bảo Mật
            </a>
            <a
              href="#"
              className="transition-colors"
              style={{ color: BROWN_MUTED }}
              onMouseEnter={(e) =>
                ((e.currentTarget as HTMLAnchorElement).style.color = ROSEWOOD)
              }
              onMouseLeave={(e) =>
                ((e.currentTarget as HTMLAnchorElement).style.color =
                  BROWN_MUTED)
              }
            >
              Điều Khoản Sử Dụng
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterLayout;
