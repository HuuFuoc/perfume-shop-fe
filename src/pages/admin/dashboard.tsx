import { useEffect, useState } from "react";
import { BaseService } from "../../app/api/base.service";

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
        setError("Không tải được danh sách collectors.");
        setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  if (loading) {
    return <div className="p-6">Đang tải danh sách collectors...</div>;
  }

  if (error) {
    return <div className="p-6 text-red-500">{error}</div>;
  }

  return (
    <div className="p-6">
      <h1 className="mb-4 text-xl font-semibold">Danh sách Collectors</h1>
      {collectors.length === 0 ? (
        <div>Chưa có collector nào.</div>
      ) : (
        <div className="overflow-x-auto rounded-lg border border-gray-200">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-2 text-left font-medium text-gray-600">
                  Tên
                </th>
                <th className="px-4 py-2 text-left font-medium text-gray-600">
                  Email
                </th>
                <th className="px-4 py-2 text-left font-medium text-gray-600">
                  Role
                </th>
                <th className="px-4 py-2 text-left font-medium text-gray-600">
                  Trạng thái
                </th>
              </tr>
            </thead>
            <tbody>
              {collectors.map((c) => (
                <tr key={c._id} className="border-t border-gray-100">
                  <td className="px-4 py-2">{c.name}</td>
                  <td className="px-4 py-2">{c.email}</td>
                  <td className="px-4 py-2">{c.role}</td>
                  <td className="px-4 py-2">
                    {c.verify === 1 ? "Đã xác thực" : "Chưa xác thực"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
