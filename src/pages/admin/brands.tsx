import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Plus, Pencil, Trash2, X } from "lucide-react";
import { BrandService } from "../../services/brand/brand.services";
import {
  useCreateBrand,
  useUpdateBrand,
  useDeleteBrand,
  BRANDS_QUERY_KEY,
} from "../../hooks/useBrandMutations";
import type { BrandRes } from "../../types/brand/Brand.res.type";

// ── Design tokens ─────────────────────────────────────────────────
const ROSEWOOD = "#C07850";
const BROWN_DARK = "#3D2B1F";
const BORDER_SOFT = "#E8D5CF";
const PANEL_BG = "#FDF0ED";

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
        style={{ backgroundColor: PANEL_BG }}
      >
        {/* Header */}
        <div
          className="flex shrink-0 items-center justify-between border-b px-6 py-4"
          style={{ borderColor: BORDER_SOFT }}
        >
          <h2
            className="font-serif text-base font-bold"
            style={{ color: BROWN_DARK }}
          >
            Thêm brand mới
          </h2>
          <button
            onClick={onClose}
            className="rounded-lg p-1 transition-colors hover:bg-black/10"
          >
            <X size={18} style={{ color: BROWN_DARK }} />
          </button>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="flex flex-1 flex-col gap-4 px-6 py-5"
        >
          <div>
            <label
              className="mb-1.5 block text-xs font-semibold uppercase tracking-wider"
              style={{ color: "#B09490" }}
            >
              Tên brand *
            </label>
            <input
              type="text"
              value={brandName}
              onChange={(e) => setBrandName(e.target.value)}
              placeholder="Gucci, Chanel, ..."
              required
              className="w-full rounded-lg border px-3 py-2 text-sm outline-none focus:ring-2"
              style={{
                borderColor: BORDER_SOFT,
                color: BROWN_DARK,
                backgroundColor: "#fff",
              }}
            />
          </div>

          <div className="mt-auto flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 rounded-lg border py-2 text-sm font-medium transition-opacity hover:opacity-70"
              style={{ borderColor: BORDER_SOFT, color: BROWN_DARK }}
            >
              Hủy
            </button>
            <button
              type="submit"
              disabled={isPending || !brandName.trim()}
              className="flex-1 rounded-lg py-2 text-sm font-medium text-white transition-opacity hover:opacity-80 disabled:opacity-50"
              style={{ backgroundColor: ROSEWOOD }}
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
        style={{ backgroundColor: PANEL_BG }}
      >
        {/* Header */}
        <div
          className="flex shrink-0 items-center justify-between border-b px-6 py-4"
          style={{ borderColor: BORDER_SOFT }}
        >
          <h2
            className="font-serif text-base font-bold"
            style={{ color: BROWN_DARK }}
          >
            Chỉnh sửa brand
          </h2>
          <button
            onClick={onClose}
            className="rounded-lg p-1 transition-colors hover:bg-black/10"
          >
            <X size={18} style={{ color: BROWN_DARK }} />
          </button>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="flex flex-1 flex-col gap-4 px-6 py-5"
        >
          <div>
            <label
              className="mb-1.5 block text-xs font-semibold uppercase tracking-wider"
              style={{ color: "#B09490" }}
            >
              Tên brand *
            </label>
            <input
              type="text"
              value={brandName}
              onChange={(e) => setBrandName(e.target.value)}
              required
              className="w-full rounded-lg border px-3 py-2 text-sm outline-none focus:ring-2"
              style={{
                borderColor: BORDER_SOFT,
                color: BROWN_DARK,
                backgroundColor: "#fff",
              }}
            />
          </div>

          <div className="mt-auto flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 rounded-lg border py-2 text-sm font-medium transition-opacity hover:opacity-70"
              style={{ borderColor: BORDER_SOFT, color: BROWN_DARK }}
            >
              Hủy
            </button>
            <button
              type="submit"
              disabled={isPending || !brandName.trim()}
              className="flex-1 rounded-lg py-2 text-sm font-medium text-white transition-opacity hover:opacity-80 disabled:opacity-50"
              style={{ backgroundColor: ROSEWOOD }}
            >
              {isPending ? "Đang lưu..." : "Cập nhật"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────
// Sub-component: BrandDeleteButton
// Handles DELETE /brands/{id}
// ─────────────────────────────────────────────────────────────────
function BrandDeleteButton({ id }: { id: string }) {
  const { mutate, isPending } = useDeleteBrand();

  const handleClick = () => {
    if (!window.confirm("Bạn có chắc muốn xóa brand này không?")) return;
    mutate(id);
  };

  return (
    <button
      onClick={handleClick}
      disabled={isPending}
      className="rounded-lg p-1.5 transition-colors hover:bg-red-50 disabled:opacity-40"
      title="Xóa"
    >
      <Trash2 size={15} style={{ color: "#C04040" }} />
    </button>
  );
}

// ─────────────────────────────────────────────────────────────────
// Sub-component: BrandList
// Handles GET /brands
// ─────────────────────────────────────────────────────────────────
function BrandList({ onEdit }: { onEdit: (brand: BrandRes) => void }) {
  const { data, isLoading } = useQuery({
    queryKey: BRANDS_QUERY_KEY,
    queryFn: () => BrandService.getAllBrands(),
  });

  const brands = data?.data?.data ?? [];

  if (isLoading) {
    return (
      <div className="py-16 text-center text-sm" style={{ color: "#B09490" }}>
        Đang tải...
      </div>
    );
  }

  if (brands.length === 0) {
    return (
      <div className="py-16 text-center text-sm" style={{ color: "#B09490" }}>
        Chưa có brand nào.
      </div>
    );
  }

  return (
    <table className="w-full text-sm">
      <thead>
        <tr
          className="border-b text-left text-xs font-semibold uppercase tracking-wider"
          style={{
            borderColor: BORDER_SOFT,
            color: "#B09490",
            backgroundColor: "#F5E6E0",
          }}
        >
          <th className="px-4 py-3">Logo</th>
          <th className="px-4 py-3">Tên</th>
          <th className="px-4 py-3">Mô tả</th>
          <th className="px-4 py-3 text-right">Thao tác</th>
        </tr>
      </thead>
      <tbody>
        {brands.map((brand, idx) => (
          <tr
            key={brand._id}
            className="border-b last:border-0 hover:bg-[#F5E6E0]/40"
            style={{
              borderColor: BORDER_SOFT,
              backgroundColor:
                idx % 2 === 1 ? "rgba(248,237,235,0.5)" : "transparent",
            }}
          >
            <td className="px-4 py-3">
              {brand.logo ? (
                <img
                  src={brand.logo}
                  alt={brand.brandName}
                  className="h-9 w-9 rounded-lg border object-contain"
                  style={{ borderColor: BORDER_SOFT }}
                />
              ) : (
                <div
                  className="flex h-9 w-9 items-center justify-center rounded-lg border text-xs font-bold"
                  style={{
                    borderColor: BORDER_SOFT,
                    color: ROSEWOOD,
                    backgroundColor: "#F5E6E0",
                  }}
                >
                  {brand.brandName.charAt(0).toUpperCase()}
                </div>
              )}
            </td>
            <td className="px-4 py-3 font-medium" style={{ color: BROWN_DARK }}>
              {brand.brandName}
            </td>
            <td
              className="px-4 py-3 max-w-xs truncate"
              style={{ color: "#7A5C52" }}
            >
              {brand.description || "—"}
            </td>
            <td className="px-4 py-3">
              <div className="flex items-center justify-end gap-1">
                <button
                  onClick={() => onEdit(brand)}
                  className="rounded-lg p-1.5 transition-colors hover:bg-[#FCD5CE]/40"
                  title="Chỉnh sửa"
                >
                  <Pencil size={15} style={{ color: ROSEWOOD }} />
                </button>
                <BrandDeleteButton id={brand._id} />
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

// ─────────────────────────────────────────────────────────────────
// Page: Brands
// ─────────────────────────────────────────────────────────────────
export default function Brands() {
  const [showCreate, setShowCreate] = useState(false);
  const [editingBrand, setEditingBrand] = useState<BrandRes | null>(null);

  return (
    <div className="p-6" style={{ color: BROWN_DARK }}>
      {/* ── Page header ── */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1
            className="font-serif text-xl font-bold tracking-wide"
            style={{ color: BROWN_DARK }}
          >
            Thương Hiệu
          </h1>
          <p className="mt-0.5 text-sm" style={{ color: "#B09490" }}>
            Quản lý danh sách brand
          </p>
        </div>

        <button
          onClick={() => setShowCreate(true)}
          className="flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium text-white transition-opacity hover:opacity-80"
          style={{ backgroundColor: ROSEWOOD }}
        >
          <Plus size={15} />
          Thêm brand
        </button>
      </div>

      {/* ── Table ── */}
      <div
        className="overflow-hidden rounded-xl border"
        style={{ borderColor: BORDER_SOFT, backgroundColor: PANEL_BG }}
      >
        <BrandList onEdit={setEditingBrand} />
      </div>

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
