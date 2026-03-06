import { useState } from "react";
import { Link } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { AuthShell } from "../../components/auth/AuthShell";
import { AuthInput } from "../../components/auth/AuthInput";
import { ROUTER_URL } from "../../consts/router.path.const";

export default function Register() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [confirmError, setConfirmError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirm) {
      setConfirmError("Mật khẩu xác nhận không khớp.");
      return;
    }
    setConfirmError("");
    // TODO: handle register logic
  };

  return (
    <AuthShell>
      {/* Heading */}
      <div className="mb-8">
        <h1
          className="font-serif text-2xl lg:text-[28px] font-bold mb-2 leading-snug"
          style={{ color: "#3D2B1F" }}
        >
          Tạo tài khoản
        </h1>
        <p className="text-sm" style={{ color: "#7A5C52" }}>
          Tham gia cộng đồng yêu hương thơm cao cấp của chúng tôi.
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="flex flex-col gap-5" noValidate>
        <AuthInput
          label="Họ và tên"
          type="text"
          placeholder="Nguyễn Văn A"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          required
          autoComplete="name"
        />

        <AuthInput
          label="Email"
          type="email"
          placeholder="email@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          autoComplete="email"
        />

        <AuthInput
          label="Mật khẩu"
          type="password"
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          autoComplete="new-password"
        />

        <AuthInput
          label="Xác nhận mật khẩu"
          type="password"
          placeholder="••••••••"
          value={confirm}
          onChange={(e) => {
            setConfirm(e.target.value);
            if (confirmError) setConfirmError("");
          }}
          required
          autoComplete="new-password"
          error={confirmError}
        />

        <button
          type="submit"
          className="w-full h-[48px] rounded-xl text-sm font-semibold tracking-[0.12em] uppercase mt-1 transition-all duration-200 hover:brightness-110 active:scale-[0.98] shadow-sm"
          style={{ backgroundColor: "#C07850", color: "#F8EDEB" }}
        >
          Đăng Ký
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
        Đăng ký với Google
      </button>

      {/* Login link */}
      <p className="text-center text-sm mt-8" style={{ color: "#7A5C52" }}>
        Đã có tài khoản?{" "}
        <Link
          to={ROUTER_URL.AUTH.LOGIN}
          className="font-semibold hover:underline transition-colors"
          style={{ color: "#C07850" }}
        >
          Đăng nhập ngay
        </Link>
      </p>
    </AuthShell>
  );
}
