import { Link } from "react-router-dom";
import { ROUTER_URL } from "../../consts/router.path.const";

export default function NotFoundPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-blush px-6 text-brown-dark">
      <div className="text-center max-w-md">
        <p className="text-6xl font-light text-rosewood/30 select-none mb-4">
          404
        </p>
        <h1 className="text-xl font-semibold tracking-wide mb-2">
          Trang không tồn tại
        </h1>
        <p className="text-sm text-brown-mid mb-8">
          Đường dẫn bạn truy cập có thể đã thay đổi hoặc không còn tồn tại.
        </p>
        <Link
          to={ROUTER_URL.COMMON.HOME}
          className="inline-flex items-center justify-center rounded-xl px-6 py-3 text-sm font-semibold tracking-wide transition-colors"
          style={{ backgroundColor: "#C07850", color: "#F8EDEB" }}
        >
          Về trang chủ
        </Link>
      </div>
    </div>
  );
}
