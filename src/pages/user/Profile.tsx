import { useEffect, useState } from "react";
import { AuthService, type UserProfile } from "../../services/auth/auth.services";

export default function Profile() {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    AuthService.getMe()
      .then((res) => {
        if (!isMounted) return;
        setUser(res.data.data ?? null);
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

  if (loading) {
    return (
      <div className="p-6">
        <p className="text-sm text-gray-500">Đang tải thông tin...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <p className="text-sm text-red-500">{error}</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="p-6">
        <p className="text-sm text-gray-500">Không có thông tin người dùng.</p>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-xl font-semibold text-gray-800 mb-6">Hồ sơ</h1>
      <div className="rounded-xl border border-gray-200 bg-white shadow-sm overflow-hidden">
        {user.cover_photo ? (
          <div
            className="h-32 bg-cover bg-center"
            style={{ backgroundImage: `url(${user.cover_photo})` }}
          />
        ) : (
          <div className="h-24 bg-gradient-to-r from-rose-100 to-amber-50" />
        )}
        <div className="px-6 pb-6 -mt-12 relative">
          <div className="flex items-end gap-4">
            {user.avatar ? (
              <img
                src={user.avatar}
                alt={user.name}
                className="w-24 h-24 rounded-full border-4 border-white object-cover shadow"
              />
            ) : (
              <div className="w-24 h-24 rounded-full border-4 border-white bg-rose-200 flex items-center justify-center text-2xl font-bold text-rose-700 shadow">
                {user.name.charAt(0).toUpperCase()}
              </div>
            )}
            <div className="flex-1 pt-2">
              <h2 className="text-lg font-semibold text-gray-900">{user.name}</h2>
              <p className="text-sm text-gray-500">{user.email}</p>
              {user.username && (
                <p className="text-xs text-gray-400 mt-0.5">@{user.username}</p>
              )}
            </div>
          </div>
          <dl className="mt-6 space-y-3 text-sm">
            {user.date_of_birth && (
              <div>
                <dt className="text-gray-500">Ngày sinh</dt>
                <dd className="text-gray-900">
                  {new Date(user.date_of_birth).toLocaleDateString("vi-VN")}
                </dd>
              </div>
            )}
            {user.bio && (
              <div>
                <dt className="text-gray-500">Giới thiệu</dt>
                <dd className="text-gray-900">{user.bio}</dd>
              </div>
            )}
            {user.location && (
              <div>
                <dt className="text-gray-500">Địa chỉ</dt>
                <dd className="text-gray-900">{user.location}</dd>
              </div>
            )}
            {user.website && (
              <div>
                <dt className="text-gray-500">Website</dt>
                <dd>
                  <a
                    href={user.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-rose-600 hover:underline"
                  >
                    {user.website}
                  </a>
                </dd>
              </div>
            )}
            {user.role != null && (
              <div>
                <dt className="text-gray-500">Vai trò</dt>
                <dd className="text-gray-900">{String(user.role)}</dd>
              </div>
            )}
            {user.verify != null && (
              <div>
                <dt className="text-gray-500">Xác thực</dt>
                <dd className="text-gray-900">
                  {user.verify === 1 ? "Đã xác thực" : "Chưa xác thực"}
                </dd>
              </div>
            )}
          </dl>
        </div>
      </div>
    </div>
  );
}
