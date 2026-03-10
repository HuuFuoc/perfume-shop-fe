import { useEffect, useState } from "react";
import {
  AuthService,
  type UserProfile,
  type UpdateMeReq,
} from "../../services/auth/auth.services";
import { notificationMessage } from "../../utils/helper";

function formatDateForInput(dateStr: string) {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  return d.toISOString().slice(0, 10);
}

/** Form state chỉ gồm 2 field được phép chỉnh: name, date_of_birth */
type ProfileFormState = Pick<UpdateMeReq, "name" | "date_of_birth">;

export default function Profile() {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editing, setEditing] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState<ProfileFormState>({
    name: "",
    date_of_birth: "",
  });

  useEffect(() => {
    let isMounted = true;
    AuthService.getMe()
      .then((res) => {
        if (!isMounted) return;
        const data = res.data.data ?? null;
        setUser(data);
        if (data) {
          setForm({
            name: data.name ?? "",
            date_of_birth: data.date_of_birth
              ? formatDateForInput(data.date_of_birth)
              : "",
          });
        }
      })
      .catch((err) => {
        if (!isMounted) return;
        setError(
          err.response?.data?.message ?? "Không tải được thông tin tài khoản.",
        );
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const handleSubmitUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    const payload: UpdateMeReq = {};
    if (form.name !== undefined) payload.name = form.name;
    if (form.date_of_birth !== undefined && form.date_of_birth)
      payload.date_of_birth = new Date(form.date_of_birth).toISOString();

    AuthService.updateMe(payload)
      .then((res) => {
        setUser(res.data.data ?? user);
        notificationMessage("Cập nhật hồ sơ thành công.", "success");
        setEditing(false);
      })
      .catch((err) => {
        notificationMessage(
          err.response?.data?.message ?? "Cập nhật thất bại. Vui lòng thử lại.",
          "error",
        );
      })
      .finally(() => setSubmitting(false));
  };

  if (loading) {
    return (
      <div className="min-h-[40vh] flex items-center justify-center px-6">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 rounded-full border-2 border-border-soft border-t-rosewood animate-spin" />
          <p className="text-sm text-brown-muted">Đang tải thông tin...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-[40vh] flex items-center justify-center px-6">
        <div className="rounded-2xl border border-border-soft bg-white/80 p-6 max-w-md text-center shadow-soft">
          <p className="text-sm text-brown-mid">{error}</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-[40vh] flex items-center justify-center px-6">
        <div className="rounded-2xl border border-border-soft bg-white/80 p-6 max-w-md text-center shadow-soft">
          <p className="text-sm text-brown-muted">Không có thông tin người dùng.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="px-4 sm:px-6 py-8 max-w-xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-lg sm:text-xl font-semibold text-brown-dark tracking-tight">
          Hồ sơ
        </h1>
        {!editing ? (
          <button
            type="button"
            onClick={() => setEditing(true)}
            className="text-sm font-medium text-rosewood hover:text-rosewood-deep transition-colors"
          >
            Chỉnh sửa hồ sơ
          </button>
        ) : (
          <button
            type="button"
            onClick={() => setEditing(false)}
            className="text-sm text-brown-muted hover:text-brown-mid transition-colors"
          >
            Hủy
          </button>
        )}
      </div>

      {editing ? (
        /* ── Form cập nhật: chỉ 2 field Tên + Ngày sinh, submit đúng payload ── */
        <form
          onSubmit={handleSubmitUpdate}
          className="rounded-2xl border border-border-soft bg-white shadow-soft p-6 sm:p-8 space-y-6"
        >
          <div>
            <label className="block text-xs font-semibold tracking-[0.12em] text-brown-muted uppercase mb-2">
              Tên
            </label>
            <input
              type="text"
              value={form.name ?? ""}
              onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
              className="w-full rounded-xl border border-border-soft bg-white/80 px-4 py-3 text-sm text-brown-dark placeholder:text-brown-muted outline-none transition-colors focus:border-rosewood focus:ring-1 focus:ring-rosewood/30"
              placeholder="Họ và tên"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold tracking-[0.12em] text-brown-muted uppercase mb-2">
              Ngày sinh
            </label>
            <input
              type="date"
              value={form.date_of_birth ?? ""}
              onChange={(e) =>
                setForm((p) => ({ ...p, date_of_birth: e.target.value }))
              }
              className="w-full rounded-xl border border-border-soft bg-white/80 px-4 py-3 text-sm text-brown-dark outline-none transition-colors focus:border-rosewood focus:ring-1 focus:ring-rosewood/30"
            />
          </div>
          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <button
              type="submit"
              disabled={submitting}
              className="flex-1 rounded-xl bg-rosewood px-5 py-3 text-sm font-semibold text-white hover:bg-rosewood-deep transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {submitting ? "Đang lưu..." : "Lưu thay đổi"}
            </button>
            <button
              type="button"
              onClick={() => setEditing(false)}
              className="flex-1 rounded-xl border-2 border-border-soft px-5 py-3 text-sm font-semibold text-brown-mid hover:border-rosewood hover:text-rosewood hover:bg-petal/20 transition-colors"
            >
              Hủy
            </button>
          </div>
        </form>
      ) : (
        /* ── Xem hồ sơ: chỉ hiển thị Tên, Email, Ngày sinh ── */
        <div className="rounded-2xl border border-border-soft bg-white shadow-soft overflow-hidden">
          <div className="p-6 sm:p-8">
            <div className="flex flex-col sm:flex-row sm:items-center gap-6">
              {user.avatar ? (
                <img
                  src={user.avatar}
                  alt=""
                  className="w-20 h-20 rounded-full object-cover border-2 border-border-soft flex-shrink-0"
                />
              ) : (
                <div
                  className="w-20 h-20 rounded-full flex items-center justify-center text-2xl font-light text-rosewood/70 border-2 border-border-soft flex-shrink-0 bg-petal/30"
                  aria-hidden
                >
                  {user.name?.charAt(0)?.toUpperCase() ?? "?"}
                </div>
              )}
              <div className="flex-1 min-w-0">
                <h2 className="text-xl sm:text-2xl font-semibold text-brown-dark tracking-tight truncate">
                  {user.name || "Chưa cập nhật tên"}
                </h2>
                <p className="text-sm text-brown-muted mt-1 truncate">
                  {user.email}
                </p>
              </div>
            </div>
            <div className="mt-6 pt-6 border-t border-border-soft">
              <span className="block text-xs font-semibold tracking-[0.12em] text-brown-muted uppercase mb-1">
                Ngày sinh
              </span>
              <p className="text-sm text-brown-dark">
                {user.date_of_birth
                  ? new Date(user.date_of_birth).toLocaleDateString("vi-VN", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                    })
                  : "Chưa cập nhật"}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
