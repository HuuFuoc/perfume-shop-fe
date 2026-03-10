import { useState } from "react";
import { AuthService } from "../../services/auth/auth.services";
import { notificationMessage } from "../../utils/helper";

export default function Setting() {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (newPassword.length < 6) {
      setError("Mật khẩu mới phải có ít nhất 6 ký tự.");
      return;
    }
    if (newPassword !== confirmPassword) {
      setError("Mật khẩu mới và xác nhận không trùng khớp.");
      return;
    }

    setSubmitting(true);
    AuthService.changePassword({
      old_password: oldPassword,
      new_password: newPassword,
      confirm_new_password: confirmPassword,
    })
      .then(() => {
        notificationMessage("Đổi mật khẩu thành công.", "success");
        setOldPassword("");
        setNewPassword("");
        setConfirmPassword("");
      })
      .catch((err) => {
        setError(
          err.response?.data?.message ??
            "Đổi mật khẩu thất bại. Kiểm tra lại mật khẩu hiện tại.",
        );
      })
      .finally(() => setSubmitting(false));
  };

  return (
    <div className="px-4 sm:px-6 py-8 max-w-xl mx-auto">
      <h1 className="text-lg sm:text-xl font-semibold text-brown-dark tracking-tight mb-6">
        Cài đặt
      </h1>

      <div className="rounded-2xl border border-border-soft bg-white shadow-soft p-6 sm:p-8">
        <h2 className="text-xs font-semibold tracking-[0.12em] text-brown-muted uppercase mb-6">
          Đổi mật khẩu
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="old_password"
              className="block text-xs font-semibold tracking-[0.12em] text-brown-muted uppercase mb-2"
            >
              Mật khẩu hiện tại
            </label>
            <input
              id="old_password"
              type="password"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              required
              autoComplete="current-password"
              className="w-full rounded-xl border border-border-soft bg-white/80 px-4 py-3 text-sm text-brown-dark placeholder:text-brown-muted outline-none transition-colors focus:border-rosewood focus:ring-1 focus:ring-rosewood/30"
              placeholder="Nhập mật khẩu hiện tại"
            />
          </div>
          <div>
            <label
              htmlFor="new_password"
              className="block text-xs font-semibold tracking-[0.12em] text-brown-muted uppercase mb-2"
            >
              Mật khẩu mới
            </label>
            <input
              id="new_password"
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
              minLength={6}
              autoComplete="new-password"
              className="w-full rounded-xl border border-border-soft bg-white/80 px-4 py-3 text-sm text-brown-dark placeholder:text-brown-muted outline-none transition-colors focus:border-rosewood focus:ring-1 focus:ring-rosewood/30"
              placeholder="Ít nhất 6 ký tự"
            />
          </div>
          <div>
            <label
              htmlFor="confirm_new_password"
              className="block text-xs font-semibold tracking-[0.12em] text-brown-muted uppercase mb-2"
            >
              Xác nhận mật khẩu mới
            </label>
            <input
              id="confirm_new_password"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              minLength={6}
              autoComplete="new-password"
              className="w-full rounded-xl border border-border-soft bg-white/80 px-4 py-3 text-sm text-brown-dark placeholder:text-brown-muted outline-none transition-colors focus:border-rosewood focus:ring-1 focus:ring-rosewood/30"
              placeholder="Nhập lại mật khẩu mới"
            />
          </div>
          {error && (
            <p className="text-sm text-brown-mid bg-petal/30 border border-petal-deep/50 rounded-xl px-4 py-3">
              {error}
            </p>
          )}
          <button
            type="submit"
            disabled={submitting}
            className="w-full sm:w-auto rounded-xl bg-rosewood px-6 py-3 text-sm font-semibold text-white hover:bg-rosewood-deep transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {submitting ? "Đang xử lý..." : "Đổi mật khẩu"}
          </button>
        </form>
      </div>
    </div>
  );
}
