import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Plus, X } from "lucide-react";
import { BrandService } from "../../services/brand/brand.services";
import {
  useCreateBrand,
  useUpdateBrand,
  useDeleteBrand,
  BRANDS_QUERY_KEY,
} from "../../hooks/useBrandMutations";
import type { BrandRes } from "../../types/brand/Brand.res.type";
import {
  AdminPageHeader,
  AdminTableWrapper,
  AdminActionButtons,
  ADMIN_ROSEWOOD,
  ADMIN_BROWN_DARK,
  ADMIN_BORDER_SOFT,
  ADMIN_PANEL_BG,
  ADMIN_MUTED,
  ADMIN_ROW_HOVER,
  ADMIN_THEAD_BG,
} from "../../components/admin/AdminShared";

// ─────────────────────────────────────────────────────────────────
// Sub-component: BrandCreateForm
// Handles POST /brands
// ─────────────────────────────────────────────────────────────────
function BrandCreateForm({ onClose }: { onClose: () => void }) {
  const [brandName, setBrandName] = useState("");
  const { mutate, isPending } = useCreateBrand(onClose);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!brandName.trim()) return;
    mutate(brandName.trim());
  };

  return (
    <div className="fixed inset-0 z-50 flex">
      <div className="flex-1 bg-black/30" onClick={onClose} />
      <div
        className="flex h-full w-full max-w-md flex-col shadow-2xl"
        style={{ backgroundColor: ADMIN_PANEL_BG }}
      >
        <div
          className="flex shrink-0 items-center justify-between border-b px-6 py-4"
          style={{ borderColor: ADMIN_BORDER_SOFT }}
        >
          <h2 className="text-base font-semibold" style={{ color: ADMIN_BROWN_DARK }}>
            Thêm thương hiệu mới
          </h2>
          <button
            onClick={onClose}
            className="rounded-xl p-2 transition-colors hover:bg-black/10"
          >
            <X size={18} style={{ color: ADMIN_BROWN_DARK }} />
          </button>
        </div>

        <form
          onSubmit={handleSubmit}
          className="flex flex-1 flex-col gap-4 px-6 py-5"
        >
          <div>
            <label
              className="mb-1.5 block text-xs font-semibold uppercase tracking-wider"
              style={{ color: ADMIN_MUTED }}
            >
              Tên thương hiệu *
            </label>
            <input
              type="text"
              value={brandName}
              onChange={(e) => setBrandName(e.target.value)}
              placeholder="VD: Gucci, Chanel..."
              required
              className="w-full rounded-xl border px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-rosewood/20"
              style={{
                borderColor: ADMIN_BORDER_SOFT,
                color: ADMIN_BROWN_DARK,
                backgroundColor: "#fff",
              }}
            />
          </div>

          <div className="mt-auto flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 rounded-xl border py-2.5 text-sm font-medium transition-opacity hover:opacity-70"
              style={{ borderColor: ADMIN_BORDER_SOFT, color: ADMIN_BROWN_DARK }}
            >
              Hủy
            </button>
            <button
              type="submit"
              disabled={isPending || !brandName.trim()}
              className="flex-1 rounded-xl py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90 disabled:opacity-50"
              style={{ backgroundColor: ADMIN_ROSEWOOD }}
            >
              {isPending ? "Đang lưu..." : "Lưu"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────
// Sub-component: BrandEditForm
// Handles PUT /brands/{id}
// ─────────────────────────────────────────────────────────────────
function BrandEditForm({
  brand,
  onClose,
}: {
  brand: BrandRes;
  onClose: () => void;
}) {
  const [brandName, setBrandName] = useState(brand.brandName);
  const { mutate, isPending } = useUpdateBrand(onClose);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!brandName.trim()) return;
    mutate({ id: brand._id, brandName: brandName.trim() });
  };

  return (
    <div className="fixed inset-0 z-50 flex">
      <div className="flex-1 bg-black/30" onClick={onClose} />
      <div
        className="flex h-full w-full max-w-md flex-col shadow-2xl"
        style={{ backgroundColor: ADMIN_PANEL_BG }}
      >
        <div
          className="flex shrink-0 items-center justify-between border-b px-6 py-4"
          style={{ borderColor: ADMIN_BORDER_SOFT }}
        >
          <h2 className="text-base font-semibold" style={{ color: ADMIN_BROWN_DARK }}>
            Chỉnh sửa thương hiệu
          </h2>
          <button
            onClick={onClose}
            className="rounded-xl p-2 transition-colors hover:bg-black/10"
          >
            <X size={18} style={{ color: ADMIN_BROWN_DARK }} />
          </button>
        </div>

        <form
          onSubmit={handleSubmit}
          className="flex flex-1 flex-col gap-4 px-6 py-5"
        >
          <div>
            <label
              className="mb-1.5 block text-xs font-semibold uppercase tracking-wider"
              style={{ color: ADMIN_MUTED }}
            >
              Tên thương hiệu *
            </label>
            <input
              type="text"
              value={brandName}
              onChange={(e) => setBrandName(e.target.value)}
              required
              className="w-full rounded-xl border px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-rosewood/20"
              style={{
                borderColor: ADMIN_BORDER_SOFT,
                color: ADMIN_BROWN_DARK,
                backgroundColor: "#fff",
              }}
            />
          </div>

          <div className="mt-auto flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 rounded-xl border py-2.5 text-sm font-medium transition-opacity hover:opacity-70"
              style={{ borderColor: ADMIN_BORDER_SOFT, color: ADMIN_BROWN_DARK }}
            >
              Hủy
            </button>
            <button
              type="submit"
              disabled={isPending || !brandName.trim()}
              className="flex-1 rounded-xl py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90 disabled:opacity-50"
              style={{ backgroundColor: ADMIN_ROSEWOOD }}
            >
              {isPending ? "Đang lưu..." : "Cập nhật"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ── BrandList: bảng danh sách thương hiệu (style premium) ──────────────────
function BrandList({ onEdit }: { onEdit: (brand: BrandRes) => void }) {
  const { data, isLoading } = useQuery({
    queryKey: BRANDS_QUERY_KEY,
    queryFn: () => BrandService.getAllBrands(),
  });
  const { mutate: deleteBrand, isPending: isDeleting } = useDeleteBrand();
  const brands = data?.data?.data ?? [];

  if (isLoading) {
    return (
      <div className="py-16 text-center text-sm" style={{ color: ADMIN_MUTED }}>
        Đang tải...
      </div>
    );
  }

  if (brands.length === 0) {
    return (
      <div className="py-16 text-center text-sm" style={{ color: ADMIN_MUTED }}>
        Chưa có thương hiệu nào.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[420px] text-sm">
        <thead>
          <tr
            className="text-left text-xs font-semibold uppercase tracking-wider"
            style={{
              borderBottom: `1px solid ${ADMIN_BORDER_SOFT}`,
              backgroundColor: ADMIN_THEAD_BG,
              color: ADMIN_MUTED,
            }}
          >
            <th className="px-5 py-3.5 font-medium w-[72px]">Logo</th>
            <th className="px-5 py-3.5 font-medium">Tên</th>
            <th className="px-5 py-3.5 font-medium max-w-[240px]">Mô tả</th>
            <th className="px-5 py-3.5 text-right font-medium">Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {brands.map((brand) => (
            <tr
              key={brand._id}
              className="transition-colors duration-150"
              style={{ borderBottom: `1px solid ${ADMIN_BORDER_SOFT}` }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = ADMIN_ROW_HOVER;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "transparent";
              }}
            >
              <td className="px-5 py-3.5">
                <div className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-xl border bg-white shrink-0" style={{ borderColor: ADMIN_BORDER_SOFT }}>
                  {brand.logo ? (
                    <img
                      src={brand.logo}
                      alt=""
                      className="h-full w-full object-contain p-0.5"
                    />
                  ) : (
                    <span
                      className="text-sm font-semibold"
                      style={{ color: ADMIN_ROSEWOOD }}
                    >
                      {brand.brandName?.charAt(0)?.toUpperCase() ?? "—"}
                    </span>
                  )}
                </div>
              </td>
              <td className="px-5 py-3.5 font-medium" style={{ color: ADMIN_BROWN_DARK }}>
                {brand.brandName || "—"}
              </td>
              <td className="px-5 py-3.5 max-w-[240px]">
                <span
                  className="block truncate text-xs"
                  style={{ color: brand.description?.trim() ? "#7A5C52" : ADMIN_MUTED }}
                >
                  {brand.description?.trim() ? brand.description : "Chưa có mô tả"}
                </span>
              </td>
              <td className="px-5 py-3.5">
                <AdminActionButtons
                  onEdit={() => onEdit(brand)}
                  onDelete={() => {
                    if (!window.confirm("Bạn có chắc muốn xóa thương hiệu này không?")) return;
                    deleteBrand(brand._id);
                  }}
                  deleteDisabled={isDeleting}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// ── Page: Brands ───────────────────────────────────────────────────────────
export default function Brands() {
  const [showCreate, setShowCreate] = useState(false);
  const [editingBrand, setEditingBrand] = useState<BrandRes | null>(null);

  return (
    <div className="p-4 sm:p-6">
      <AdminPageHeader
        title="Thương hiệu"
        subtitle="Quản lý danh sách thương hiệu nước hoa"
        actionLabel="Thêm thương hiệu"
        actionIcon={<Plus size={16} />}
        onAction={() => setShowCreate(true)}
      />

      <AdminTableWrapper>
        <BrandList onEdit={setEditingBrand} />
      </AdminTableWrapper>

      {/* ── Create drawer ── */}
      {showCreate && <BrandCreateForm onClose={() => setShowCreate(false)} />}

      {/* ── Edit drawer ── */}
      {editingBrand && (
        <BrandEditForm
          brand={editingBrand}
          onClose={() => setEditingBrand(null)}
        />
      )}
    </div>
  );
}
