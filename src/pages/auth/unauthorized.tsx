import { Link } from "react-router-dom";
import { ROUTER_URL } from "../../consts/router.path.const";

export default function UnauthorizedPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-blush px-6 text-brown-dark">
      <div className="text-center max-w-md">
        <p className="text-5xl font-light text-rosewood/30 select-none mb-4">
          ∿
        </p>
        <h1 className="text-xl font-semibold tracking-wide mb-2">
          Bạn không có quyền truy cập
        </h1>
        <p className="text-sm text-brown-mid mb-8">
          Tài khoản của bạn không đủ quyền để xem nội dung này. Vui lòng đăng nhập bằng tài khoản có quyền hoặc quay lại trang chủ.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            to={ROUTER_URL.AUTH.LOGIN}
            className="inline-flex items-center justify-center rounded-xl px-6 py-3 text-sm font-semibold tracking-wide transition-colors"
            style={{ backgroundColor: "#C07850", color: "#F8EDEB" }}
          >
            Đăng nhập
          </Link>
          <Link
            to={ROUTER_URL.COMMON.HOME}
            className="inline-flex items-center justify-center rounded-xl px-6 py-3 text-sm font-medium border-2 transition-colors"
            style={{ borderColor: "#E8D5CF", color: "#3D2B1F" }}
          >
            Về trang chủ
          </Link>
        </div>
      </div>
    </div>
  );
}
