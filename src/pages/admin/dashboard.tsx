import { useEffect, useState } from "react";
import { BaseService } from "../../app/api/base.service";
import {
  AdminPageHeader,
  AdminTableWrapper,
  AdminRoleBadge,
  AdminVerifyBadge,
  ADMIN_BORDER_SOFT,
  ADMIN_BROWN_DARK,
  ADMIN_MUTED,
  ADMIN_ROW_HOVER,
  ADMIN_THEAD_BG,
} from "../../components/admin/AdminShared";

type Collector = {
  _id: string;
  name: string;
  email: string;
  role: number | string;
  verify: number;
};

type GetCollectorsRes = {
  message: string;
  data: Collector[];
};

export default function AdminDashboard() {
  const [collectors, setCollectors] = useState<Collector[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    BaseService.get<GetCollectorsRes>({
      url: "/admin/collectors",
      isLoading: false,
    })
      .then((res) => {
        if (!isMounted) return;
        setError(null);
        setCollectors(res.data.data ?? []);
        setLoading(false);
      })
      .catch((err) => {
        if (!isMounted) return;
        console.error("Failed to fetch collectors", err);
        setError("Không tải được danh sách thành viên.");
        setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-16">
        <div
          className="h-10 w-10 rounded-full border-2 border-t-[#C07850] animate-spin"
          style={{ borderColor: ADMIN_BORDER_SOFT }}
        />
        <p className="mt-3 text-sm" style={{ color: ADMIN_MUTED }}>
          Đang tải danh sách thành viên...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div
        className="rounded-2xl border px-5 py-4 text-sm"
        style={{
          borderColor: ADMIN_BORDER_SOFT,
          backgroundColor: "rgba(248,237,235,0.8)",
          color: "#C05050",
        }}
      >
        {error}
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6">
      <AdminPageHeader
        title="Danh sách thành viên"
        subtitle="Quản lý tài khoản thành viên trong hệ thống"
        count={collectors.length}
      />

      {collectors.length === 0 ? (
        <AdminTableWrapper>
          <div
            className="py-16 text-center text-sm"
            style={{ color: ADMIN_MUTED }}
          >
            Chưa có thành viên nào.
          </div>
        </AdminTableWrapper>
      ) : (
        <AdminTableWrapper>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[500px] text-sm">
              <thead>
                <tr
                  className="text-left text-xs font-semibold uppercase tracking-wider"
                  style={{
                    backgroundColor: ADMIN_THEAD_BG,
                    color: ADMIN_MUTED,
                    borderBottom: `1px solid ${ADMIN_BORDER_SOFT}`,
                  }}
                >
                  <th className="px-5 py-3.5 font-medium">Tên</th>
                  <th className="px-5 py-3.5 font-medium">Email</th>
                  <th className="px-5 py-3.5 font-medium">Vai trò</th>
                  <th className="px-5 py-3.5 font-medium">Trạng thái</th>
                </tr>
              </thead>
              <tbody>
                {collectors.map((c) => (
                  <tr
                    key={c._id}
                    className="transition-colors duration-150"
                    style={{
                      borderBottom: `1px solid ${ADMIN_BORDER_SOFT}`,
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = ADMIN_ROW_HOVER;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = "transparent";
                    }}
                  >
                    <td
                      className="px-5 py-3.5 font-medium"
                      style={{ color: ADMIN_BROWN_DARK }}
                    >
                      {c.name || "—"}
                    </td>
                    <td className="px-5 py-3.5" style={{ color: ADMIN_BROWN_DARK }}>
                      {c.email || "—"}
                    </td>
                    <td className="px-5 py-3.5">
                      <AdminRoleBadge role={c.role} />
                    </td>
                    <td className="px-5 py-3.5">
                      <AdminVerifyBadge verified={c.verify === 1} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </AdminTableWrapper>
      )}
    </div>
  );
}
