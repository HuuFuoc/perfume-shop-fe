import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { AuthShell } from "../../components/auth/AuthShell";
import { AuthInput } from "../../components/auth/AuthInput";
import { ROUTER_URL } from "../../consts/router.path.const";
import { AuthService } from "../../services/auth/auth.services";
import { setAuthToken } from "../../utils/cookie";
import { notificationMessage } from "../../utils/helper";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // ── Form submit handler ────────────────────────────────────────────
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Basic client-side validation
    if (!email.trim() || !password.trim()) {
      notificationMessage("Vui lòng nhập email và mật khẩu.", "error");
      return;
    }

    // Prevent duplicate submits
    if (loading) return;
    setLoading(true);

    try {
      // ── API call: POST /user/login ────────────────────────────────────
      const res = await AuthService.login({ email: email.trim(), password });
      // Backend returns { message, result: { access_token, refresh_token } }
      const token = res.data.result?.access_token;

      if (token) {
        // ── Cookie token storage ───────────────────────────────────────
        // Persists the JWT in a cookie so all subsequent API requests
        // (via base.service.ts interceptor) automatically include it.
        setAuthToken(token);

        // Persist user info for UI display (header, avatar, etc.)
        // res.data.result does not include a user object in the current backend
        // contract; this block is a safe no-op until the backend extends it.
        // if (res.data.result?.user) {
        //   localStorage.setItem("userInfo", JSON.stringify(res.data.result.user));
        // }

        notificationMessage("Đăng nhập thành công!", "success");

        // ── Redirect logic ────────────────────────────────────────────
        // Navigate to the user dashboard after a brief moment so the toast is visible.
        setTimeout(() => navigate(ROUTER_URL.USER.HOME), 800);
      } else {
        notificationMessage("Đăng nhập thất bại. Vui lòng thử lại.", "error");
      }
    } catch {
      // Error toast is already shown by the base service interceptor;
      // no duplicate message needed here.
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthShell>
      {/* Heading */}
      <div className="mb-8">
        <h1
          className="font-serif text-2xl lg:text-[28px] font-bold mb-2 leading-snug"
          style={{ color: "#3D2B1F" }}
        >
          Chào mừng trở lại
        </h1>
        <p className="text-sm" style={{ color: "#7A5C52" }}>
          Đăng nhập để tiếp tục hành trình hương thơm của bạn.
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="flex flex-col gap-5" noValidate>
        <AuthInput
          label="Email"
          type="email"
          placeholder="email@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          autoComplete="email"
        />

        <div className="flex flex-col gap-1.5">
          <AuthInput
            label="Mật khẩu"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoComplete="current-password"
          />
          <div className="text-right mt-1">
            <a
              href="#"
              className="text-[11px] font-medium hover:underline transition-colors"
              style={{ color: "#C07850" }}
            >
              Quên mật khẩu?
            </a>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full h-[48px] rounded-xl text-sm font-semibold tracking-[0.12em] uppercase mt-1 transition-all duration-200 hover:brightness-110 active:scale-[0.98] shadow-sm disabled:opacity-60 disabled:cursor-not-allowed"
          style={{ backgroundColor: "#C07850", color: "#F8EDEB" }}
        >
          {loading ? "Đang xử lý..." : "Đăng Nhập"}
        </button>
      </form>

      {/* Divider */}
      <div className="flex items-center gap-3 my-6">
        <div className="h-px flex-1" style={{ backgroundColor: "#E8D5CF" }} />
        <span
          className="text-[11px] tracking-wider"
          style={{ color: "#B09490" }}
        >
          hoặc
        </span>
        <div className="h-px flex-1" style={{ backgroundColor: "#E8D5CF" }} />
      </div>

      {/* Google */}
      <button
        type="button"
        className="w-full h-[48px] rounded-xl border text-sm font-medium flex items-center justify-center gap-3 transition-all duration-200 hover:bg-[#F8EDEB] active:scale-[0.98]"
        style={{
          backgroundColor: "white",
          borderColor: "#E8D5CF",
          color: "#3D2B1F",
        }}
      >
        <FcGoogle size={20} />
        Tiếp tục với Google
      </button>

      {/* Register link */}
      <p className="text-center text-sm mt-8" style={{ color: "#7A5C52" }}>
        Chưa có tài khoản?{" "}
        <Link
          to={ROUTER_URL.AUTH.SIGN_UP}
          className="font-semibold hover:underline transition-colors"
          style={{ color: "#C07850" }}
        >
          Đăng ký ngay
        </Link>
      </p>
    </AuthShell>
  );
}
