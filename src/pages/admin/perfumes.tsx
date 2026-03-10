import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { ImageIcon, Plus, X } from "lucide-react";
import { PerfumeService } from "../../services/perfume/perfume.services";
import { BrandService } from "../../services/brand/brand.services";
import { useS3Upload } from "../../hooks/useS3Upload";
import {
  useCreatePerfume,
  useUpdatePerfume,
  useDeletePerfume,
  PERFUMES_QUERY_KEY,
} from "../../hooks/usePerfumeMutations";
import { BRANDS_QUERY_KEY } from "../../hooks/useBrandMutations";
import { notificationMessage } from "../../utils/helper";
import type { PerfumeRes } from "../../types/perfume/Perfume.res.type";
import type { CreatePerfumeReq } from "../../types/perfume/Perfume.req.type";
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

const EMPTY_FORM: CreatePerfumeReq = {
  perfumeName: "",
  uri: "",
  price: 0,
  concentration: "",
  description: "",
  ingredients: "",
  volume: 0,
  targetAudience: "",
  brand: "",
};

const TEXT_FIELDS = [
  { name: "perfumeName", label: "Tên nước hoa", type: "text", required: true },
  { name: "price", label: "Giá (VNĐ)", type: "number", required: true },
  {
    name: "concentration",
    label: "Nồng độ (EDP, EDT...)",
    type: "text",
    required: true,
  },
  { name: "volume", label: "Dung tích (ml)", type: "number", required: true },
] as const;

// ─────────────────────────────────────────────────────────────────
// Shared: TargetAudienceSelect
// ─────────────────────────────────────────────────────────────────
const TARGET_AUDIENCE_OPTIONS = [
  { value: "Male", label: "Nam (Male)" },
  { value: "Female", label: "Nữ (Female)" },
  { value: "Unisex", label: "Unisex" },
];

function TargetAudienceSelect({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div>
      <label
        className="mb-1 block text-xs font-semibold uppercase tracking-wider"
        style={{ color: ADMIN_MUTED }}
      >
        Đối tượng *
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required
        className="w-full rounded-lg border px-3 py-2 text-sm outline-none transition-colors focus:border-[#C07850]"
        style={{
          borderColor: ADMIN_BORDER_SOFT,
          backgroundColor: "#fff",
          color: value ? ADMIN_BROWN_DARK : ADMIN_MUTED,
        }}
      >
        <option value="">— Chọn đối tượng —</option>
        {TARGET_AUDIENCE_OPTIONS.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────
// Shared: ImageUploadField
// ─────────────────────────────────────────────────────────────────
function ImageUploadField({
  previewUrl,
  uploadedImage,
  uploadError,
  isUploading,
  onSelectFile,
  onDelete,
}: {
  previewUrl: string | null;
  uploadedImage: { url: string; key: string } | null;
  uploadError: string | null;
  isUploading: boolean;
  onSelectFile: (file: File | null) => void;
  onDelete: () => void;
}) {
  return (
    <div>
      <label
        className="mb-1.5 block text-xs font-semibold uppercase tracking-wider"
        style={{ color: ADMIN_MUTED }}
      >
        Ảnh sản phẩm *
      </label>
      <div
        className="relative mb-2 flex h-44 w-full items-center justify-center overflow-hidden rounded-xl border-2 border-dashed"
        style={{ borderColor: ADMIN_BORDER_SOFT }}
      >
        {previewUrl ? (
          <img
            src={previewUrl}
            alt="preview"
            className="h-full w-full object-cover"
          />
        ) : (
          <div
            className="flex flex-col items-center gap-2 text-sm"
            style={{ color: ADMIN_MUTED }}
          >
            <ImageIcon size={32} />
            <span>Chọn ảnh để xem trước</span>
            <span className="text-xs">JPG / PNG / WEBP, tối đa 5 MB</span>
          </div>
        )}
        {isUploading && (
          <div className="absolute inset-0 flex items-center justify-center rounded-xl bg-black/30">
            <span className="text-xs font-semibold text-white">
              Đang upload...
            </span>
          </div>
        )}
        {uploadedImage && !isUploading && (
          <span
            className="absolute right-2 top-2 rounded-full px-2 py-0.5 text-[10px] font-semibold"
            style={{ backgroundColor: "#22c55e", color: "#fff" }}
          >
            Đã upload
          </span>
        )}
      </div>

      {uploadError && (
        <p className="mb-2 text-xs text-red-500">{uploadError}</p>
      )}

      <div className="flex gap-2">
        <label
          className="flex cursor-pointer items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-medium transition-colors hover:bg-black/5"
          style={{ borderColor: ADMIN_BORDER_SOFT, color: ADMIN_BROWN_DARK }}
        >
          <ImageIcon size={13} />
          {isUploading
            ? "Đang upload..."
            : uploadedImage
              ? "Đổi ảnh"
              : "Chọn ảnh"}
          <input
            type="file"
            accept="image/*"
            className="hidden"
            disabled={isUploading}
            onChange={(e) => onSelectFile(e.target.files?.[0] ?? null)}
          />
        </label>
        {uploadedImage && (
          <button
            type="button"
            onClick={onDelete}
            disabled={isUploading}
            className="flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-medium transition-colors hover:bg-red-50 disabled:opacity-40"
            style={{ borderColor: ADMIN_BORDER_SOFT, color: "#ef4444" }}
          >
            <X size={13} />
            Xóa ảnh
          </button>
        )}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────
// Shared: BrandSelect — dropdown from GET /brands
// ─────────────────────────────────────────────────────────────────
function BrandSelect({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) {
  const { data } = useQuery({
    queryKey: BRANDS_QUERY_KEY,
    queryFn: () => BrandService.getAllBrands(),
  });
  const brands = data?.data?.data ?? [];

  return (
    <div>
      <label
        className="mb-1 block text-xs font-semibold uppercase tracking-wider"
        style={{ color: ADMIN_MUTED }}
      >
        Thương hiệu
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-lg border px-3 py-2 text-sm outline-none transition-colors focus:border-[#C07850]"
        style={{
          borderColor: ADMIN_BORDER_SOFT,
          backgroundColor: "#fff",
          color: ADMIN_BROWN_DARK,
        }}
      >
        <option value="">— Không chọn —</option>
        {brands.map((b) => (
          <option key={b._id} value={b._id}>
            {b.brandName}
          </option>
        ))}
      </select>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────
// Sub-component: PerfumeCreateForm — POST /perfumes
// ─────────────────────────────────────────────────────────────────
function PerfumeCreateForm({ onClose }: { onClose: () => void }) {
  const [form, setForm] = useState<CreatePerfumeReq>(EMPTY_FORM);
  const {
    selectedFile,
    previewUrl,
    uploadedImage,
    isUploading,
    uploadError,
    handleSelectFile,
    handleUpload,
    handleDelete,
    reset: resetUpload,
  } = useS3Upload();

  const { mutate, isPending } = useCreatePerfume(() => {
    resetUpload();
    onClose();
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === "price" || name === "volume" ? Number(value) : value,
    }));
  };

  // Auto-upload when file is selected
  useEffect(() => {
    if (!selectedFile) return;
    handleUpload().then((result) => {
      if (result) setForm((prev) => ({ ...prev, uri: result.url }));
    });
  }, [selectedFile]);

  const handleDeleteImage = async () => {
    await handleDelete();
    setForm((prev) => ({ ...prev, uri: "" }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.uri) {
      notificationMessage("Vui lòng upload ảnh trước khi lưu.", "error");
      return;
    }
    mutate(form);
  };

  return (
    <div className="fixed inset-0 z-50 flex">
      <div className="flex-1 bg-black/30" onClick={onClose} />
      <div
        className="flex h-full w-full max-w-md flex-col overflow-y-auto shadow-2xl"
        style={{ backgroundColor: ADMIN_PANEL_BG }}
      >
        <div
          className="flex shrink-0 items-center justify-between border-b px-6 py-4"
          style={{ borderColor: ADMIN_BORDER_SOFT }}
        >
          <h2
            className="font-serif text-base font-bold"
            style={{ color: ADMIN_BROWN_DARK }}
          >
            Thêm nước hoa mới
          </h2>
          <button
            onClick={onClose}
            className="rounded-lg p-1 transition-colors hover:bg-black/10"
          >
            <X size={18} style={{ color: ADMIN_BROWN_DARK }} />
          </button>
        </div>

        <form
          onSubmit={handleSubmit}
          className="flex flex-1 flex-col gap-4 px-6 py-5"
        >
          <ImageUploadField
            previewUrl={previewUrl}
            uploadedImage={uploadedImage}
            uploadError={uploadError}
            isUploading={isUploading}
            onSelectFile={handleSelectFile}
            onDelete={handleDeleteImage}
          />

          {TEXT_FIELDS.map(({ name, label, type, required }) => (
            <div key={name}>
              <label
                htmlFor={`create-${name}`}
                className="mb-1 block text-xs font-semibold uppercase tracking-wider"
                style={{ color: ADMIN_MUTED }}
              >
                {label} {required && "*"}
              </label>
              <input
                id={`create-${name}`}
                name={name}
                type={type}
                required={required}
                value={form[name]}
                onChange={handleChange}
                min={type === "number" ? 0 : undefined}
                className="w-full rounded-lg border px-3 py-2 text-sm outline-none transition-colors focus:border-[#C07850]"
                style={{
                  borderColor: ADMIN_BORDER_SOFT,
                  backgroundColor: "#fff",
                  color: ADMIN_BROWN_DARK,
                }}
              />
            </div>
          ))}
          <TargetAudienceSelect
            value={form.targetAudience}
            onChange={(v) => setForm((p) => ({ ...p, targetAudience: v }))}
          />
          <div>
            <label
              htmlFor="create-description"
              className="mb-1 block text-xs font-semibold uppercase tracking-wider"
              style={{ color: ADMIN_MUTED }}
            >
              Mô tả
            </label>
            <textarea
              id="create-description"
              name="description"
              rows={3}
              value={form.description}
              onChange={handleChange}
              className="w-full resize-none rounded-lg border px-3 py-2 text-sm outline-none transition-colors focus:border-[#C07850]"
              style={{
                borderColor: ADMIN_BORDER_SOFT,
                backgroundColor: "#fff",
                color: ADMIN_BROWN_DARK,
              }}
            />
          </div>

          <div>
            <label
              htmlFor="create-ingredients"
              className="mb-1 block text-xs font-semibold uppercase tracking-wider"
              style={{ color: ADMIN_MUTED }}
            >
              Thành phần
            </label>
            <textarea
              id="create-ingredients"
              name="ingredients"
              rows={2}
              value={form.ingredients}
              onChange={handleChange}
              className="w-full resize-none rounded-lg border px-3 py-2 text-sm outline-none transition-colors focus:border-[#C07850]"
              style={{
                borderColor: ADMIN_BORDER_SOFT,
                backgroundColor: "#fff",
                color: ADMIN_BROWN_DARK,
              }}
            />
          </div>

          <BrandSelect
            value={form.brand}
            onChange={(v) => setForm((p) => ({ ...p, brand: v }))}
          />

          <div
            className="sticky bottom-0 flex shrink-0 gap-3 border-t pt-4"
            style={{
              borderColor: ADMIN_BORDER_SOFT,
              backgroundColor: ADMIN_PANEL_BG,
            }}
          >
            <button
              type="button"
              onClick={onClose}
              className="flex-1 rounded-lg border py-2 text-sm font-medium transition-colors hover:bg-black/5"
              style={{
                borderColor: ADMIN_BORDER_SOFT,
                color: ADMIN_BROWN_DARK,
              }}
            >
              Hủy
            </button>
            <button
              type="submit"
              disabled={isPending || isUploading || !form.uri}
              className="flex-1 rounded-lg py-2 text-sm font-medium text-white transition-opacity hover:opacity-80 disabled:cursor-not-allowed disabled:opacity-40"
              style={{ backgroundColor: ADMIN_ROSEWOOD }}
            >
              {isPending ? "Đang lưu..." : "Lưu nước hoa"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────
// Sub-component: PerfumeEditForm — PUT /perfumes/{id}
// ─────────────────────────────────────────────────────────────────
function PerfumeEditForm({
  perfume,
  onClose,
}: {
  perfume: PerfumeRes;
  onClose: () => void;
}) {
  const [form, setForm] = useState<CreatePerfumeReq>({
    perfumeName: perfume.perfumeName,
    uri: perfume.uri,
    price: perfume.price,
    concentration: perfume.concentration,
    description: perfume.description,
    ingredients: perfume.ingredients,
    volume: perfume.volume,
    targetAudience: perfume.targetAudience,
    brand: perfume.brand ?? "",
  });

  const {
    selectedFile,
    previewUrl,
    uploadedImage,
    isUploading,
    uploadError,
    handleSelectFile,
    handleUpload,
    handleDelete,
    reset: resetUpload,
  } = useS3Upload();

  const { mutate, isPending } = useUpdatePerfume(() => {
    resetUpload();
    onClose();
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === "price" || name === "volume" ? Number(value) : value,
    }));
  };

  // Auto-upload when file is selected
  useEffect(() => {
    if (!selectedFile) return;
    handleUpload().then((result) => {
      if (result) setForm((prev) => ({ ...prev, uri: result.url }));
    });
  }, [selectedFile]);

  const handleDeleteImage = async () => {
    await handleDelete();
    setForm((prev) => ({ ...prev, uri: "" }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutate({ id: perfume._id, ...form });
  };

  // show existing image as preview when no new file picked
  const displayPreview = previewUrl || form.uri || null;

  return (
    <div className="fixed inset-0 z-50 flex">
      <div className="flex-1 bg-black/30" onClick={onClose} />
      <div
        className="flex h-full w-full max-w-md flex-col overflow-y-auto shadow-2xl"
        style={{ backgroundColor: ADMIN_PANEL_BG }}
      >
        <div
          className="flex shrink-0 items-center justify-between border-b px-6 py-4"
          style={{ borderColor: ADMIN_BORDER_SOFT }}
        >
          <h2
            className="font-serif text-base font-bold"
            style={{ color: ADMIN_BROWN_DARK }}
          >
            Chỉnh sửa nước hoa
          </h2>
          <button
            onClick={onClose}
            className="rounded-lg p-1 transition-colors hover:bg-black/10"
          >
            <X size={18} style={{ color: ADMIN_BROWN_DARK }} />
          </button>
        </div>

        <form
          onSubmit={handleSubmit}
          className="flex flex-1 flex-col gap-4 px-6 py-5"
        >
          <ImageUploadField
            previewUrl={displayPreview}
            uploadedImage={uploadedImage}
            uploadError={uploadError}
            isUploading={isUploading}
            onSelectFile={handleSelectFile}
            onDelete={handleDeleteImage}
          />

          {TEXT_FIELDS.map(({ name, label, type, required }) => (
            <div key={name}>
              <label
                htmlFor={`edit-${name}`}
                className="mb-1 block text-xs font-semibold uppercase tracking-wider"
                style={{ color: ADMIN_MUTED }}
              >
                {label} {required && "*"}
              </label>
              <input
                id={`edit-${name}`}
                name={name}
                type={type}
                required={required}
                value={form[name]}
                onChange={handleChange}
                min={type === "number" ? 0 : undefined}
                className="w-full rounded-lg border px-3 py-2 text-sm outline-none transition-colors focus:border-[#C07850]"
                style={{
                  borderColor: ADMIN_BORDER_SOFT,
                  backgroundColor: "#fff",
                  color: ADMIN_BROWN_DARK,
                }}
              />
            </div>
          ))}

          <TargetAudienceSelect
            value={form.targetAudience}
            onChange={(v) => setForm((p) => ({ ...p, targetAudience: v }))}
          />

          <div>
            <label
              htmlFor="edit-description"
              className="mb-1 block text-xs font-semibold uppercase tracking-wider"
              style={{ color: ADMIN_MUTED }}
            >
              Mô tả
            </label>
            <textarea
              id="edit-description"
              name="description"
              rows={3}
              value={form.description}
              onChange={handleChange}
              className="w-full resize-none rounded-lg border px-3 py-2 text-sm outline-none transition-colors focus:border-[#C07850]"
              style={{
                borderColor: ADMIN_BORDER_SOFT,
                backgroundColor: "#fff",
                color: ADMIN_BROWN_DARK,
              }}
            />
          </div>

          <div>
            <label
              htmlFor="edit-ingredients"
              className="mb-1 block text-xs font-semibold uppercase tracking-wider"
              style={{ color: ADMIN_MUTED }}
            >
              Thành phần
            </label>
            <textarea
              id="edit-ingredients"
              name="ingredients"
              rows={2}
              value={form.ingredients}
              onChange={handleChange}
              className="w-full resize-none rounded-lg border px-3 py-2 text-sm outline-none transition-colors focus:border-[#C07850]"
              style={{
                borderColor: ADMIN_BORDER_SOFT,
                backgroundColor: "#fff",
                color: ADMIN_BROWN_DARK,
              }}
            />
          </div>

          <BrandSelect
            value={form.brand}
            onChange={(v) => setForm((p) => ({ ...p, brand: v }))}
          />

          <div
            className="sticky bottom-0 flex shrink-0 gap-3 border-t pt-4"
            style={{
              borderColor: ADMIN_BORDER_SOFT,
              backgroundColor: ADMIN_PANEL_BG,
            }}
          >
            <button
              type="button"
              onClick={onClose}
              className="flex-1 rounded-lg border py-2 text-sm font-medium transition-colors hover:bg-black/5"
              style={{
                borderColor: ADMIN_BORDER_SOFT,
                color: ADMIN_BROWN_DARK,
              }}
            >
              Hủy
            </button>
            <button
              type="submit"
              disabled={isPending || isUploading}
              className="flex-1 rounded-lg py-2 text-sm font-medium text-white transition-opacity hover:opacity-80 disabled:cursor-not-allowed disabled:opacity-40"
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

// ── Helper: format giá/dung tích thân thiện, tránh raw "0đ", "0 ml" ───────────
function formatPrice(price: number): string {
  if (price == null || Number.isNaN(price)) return "—";
  return `${Number(price).toLocaleString("vi-VN")} ₫`;
}
function formatVolume(volume: number): string {
  if (volume == null || Number.isNaN(volume) || volume <= 0) return "—";
  return `${volume} ml`;
}

// ── PerfumeList: bảng danh sách nước hoa (hỗ trợ search + filter brand) ─────
function PerfumeList({
  onEdit,
  search = "",
  brandId = "",
}: {
  onEdit: (p: PerfumeRes) => void;
  search?: string;
  brandId?: string;
}) {
  const { data, isLoading } = useQuery({
    queryKey: [PERFUMES_QUERY_KEY, search.trim(), brandId],
    queryFn: () =>
      PerfumeService.getAllPerfumes({
        ...(search.trim() && { search: search.trim() }),
        ...(brandId && { brand: brandId }),
      }),
  });
  const { mutate: deletePerfume, isPending: isDeleting } = useDeletePerfume();
  const perfumes = data?.data?.data ?? [];

  if (isLoading) {
    return (
      <div className="py-16 text-center text-sm" style={{ color: ADMIN_MUTED }}>
        Đang tải...
      </div>
    );
  }

  if (perfumes.length === 0) {
    return (
      <div className="py-16 text-center text-sm" style={{ color: ADMIN_MUTED }}>
        {search.trim() || brandId
          ? "Không có sản phẩm nào phù hợp bộ lọc."
          : "Chưa có sản phẩm nào."}
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[640px] text-sm">
        <thead>
          <tr
            className="text-left text-xs font-semibold uppercase tracking-wider"
            style={{
              borderBottom: `1px solid ${ADMIN_BORDER_SOFT}`,
              backgroundColor: ADMIN_THEAD_BG,
              color: ADMIN_MUTED,
            }}
          >
            <th className="px-5 py-3.5 font-medium w-[64px]">Ảnh</th>
            <th className="px-5 py-3.5 font-medium">Tên</th>
            <th className="px-5 py-3.5 font-medium">Giá</th>
            <th className="px-5 py-3.5 font-medium">Dung tích</th>
            <th className="px-5 py-3.5 font-medium">Đối tượng</th>
            <th className="px-5 py-3.5 text-right font-medium">Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {perfumes.map((p) => (
            <tr
              key={p._id}
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
                <div
                  className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-xl border bg-white"
                  style={{ borderColor: ADMIN_BORDER_SOFT }}
                >
                  {p.uri ? (
                    <img
                      src={p.uri}
                      alt=""
                      className="h-full w-full object-cover"
                      onError={(e) => {
                        e.currentTarget.style.display = "none";
                        const parent = e.currentTarget.parentElement;
                        if (parent) {
                          const fallback = parent.querySelector(
                            ".perfume-img-fallback",
                          );
                          if (fallback)
                            (fallback as HTMLElement).style.display = "flex";
                        }
                      }}
                    />
                  ) : null}
                  <div
                    className="perfume-img-fallback h-full w-full items-center justify-center text-center"
                    style={{
                      display: p.uri ? "none" : "flex",
                      color: ADMIN_MUTED,
                      backgroundColor: "rgba(248,237,235,0.6)",
                    }}
                  >
                    <ImageIcon size={20} />
                  </div>
                </div>
              </td>
              <td className="px-5 py-3.5">
                <span
                  className="font-semibold"
                  style={{ color: ADMIN_BROWN_DARK }}
                >
                  {p.perfumeName || "—"}
                </span>
              </td>
              <td className="px-5 py-3.5" style={{ color: ADMIN_BROWN_DARK }}>
                {formatPrice(p.price)}
              </td>
              <td className="px-5 py-3.5" style={{ color: ADMIN_BROWN_DARK }}>
                {formatVolume(p.volume)}
              </td>
              <td className="px-5 py-3.5" style={{ color: ADMIN_BROWN_DARK }}>
                {p.targetAudience?.trim() ? p.targetAudience : "—"}
              </td>
              <td className="px-5 py-3.5">
                <AdminActionButtons
                  onEdit={() => onEdit(p)}
                  onDelete={() => {
                    if (
                      !window.confirm(
                        "Bạn có chắc muốn xóa nước hoa này không?",
                      )
                    )
                      return;
                    deletePerfume(p._id);
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

// ── Thanh tìm kiếm + lọc thương hiệu (admin) ─────────────────────────────────
function AdminPerfumeFilters({
  search,
  onSearchChange,
  brandId,
  onBrandChange,
  brandOptions,
}: {
  search: string;
  onSearchChange: (v: string) => void;
  brandId: string;
  onBrandChange: (v: string) => void;
  brandOptions: { _id: string; brandName: string }[];
}) {
  return (
    <div
      className="flex flex-col sm:flex-row gap-3 mb-4 p-4 rounded-2xl border"
      style={{
        borderColor: ADMIN_BORDER_SOFT,
        backgroundColor: "rgba(255,255,255,0.7)",
      }}
    >
      <input
        type="text"
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
        placeholder="Tìm theo tên nước hoa..."
        className="flex-1 min-w-0 rounded-xl border px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-rosewood/20"
        style={{ borderColor: ADMIN_BORDER_SOFT, color: ADMIN_BROWN_DARK }}
      />
      <select
        value={brandId}
        onChange={(e) => onBrandChange(e.target.value)}
        className="rounded-xl border px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-rosewood/20 min-w-[180px]"
        style={{
          borderColor: ADMIN_BORDER_SOFT,
          color: ADMIN_BROWN_DARK,
          backgroundColor: "#fff",
        }}
      >
        <option value="">Tất cả thương hiệu</option>
        {brandOptions.map((b) => (
          <option key={b._id} value={b._id}>
            {b.brandName}
          </option>
        ))}
      </select>
      {(search || brandId) && (
        <button
          type="button"
          onClick={() => {
            onSearchChange("");
            onBrandChange("");
          }}
          className="rounded-xl border px-4 py-2.5 text-sm font-medium shrink-0"
          style={{ borderColor: ADMIN_BORDER_SOFT, color: ADMIN_MUTED }}
        >
          Xóa bộ lọc
        </button>
      )}
    </div>
  );
}

// ── Page: Perfumes ──────────────────────────────────────────────────────────
export default function Perfumes() {
  const [showCreate, setShowCreate] = useState(false);
  const [editingPerfume, setEditingPerfume] = useState<PerfumeRes | null>(null);
  const [search, setSearch] = useState("");
  const [brandId, setBrandId] = useState("");

  const { data: brandsData } = useQuery({
    queryKey: BRANDS_QUERY_KEY,
    queryFn: () => BrandService.getAllBrands(),
  });
  const brandOptions = brandsData?.data?.data ?? [];

  return (
    <div className="p-4 sm:p-6">
      <AdminPageHeader
        title="Nước hoa"
        subtitle="Quản lý danh sách sản phẩm nước hoa"
        actionLabel="Thêm nước hoa"
        actionIcon={<Plus size={16} />}
        onAction={() => setShowCreate(true)}
      />

      <AdminPerfumeFilters
        search={search}
        onSearchChange={setSearch}
        brandId={brandId}
        onBrandChange={setBrandId}
        brandOptions={brandOptions}
      />

      <AdminTableWrapper>
        <PerfumeList
          onEdit={setEditingPerfume}
          search={search}
          brandId={brandId}
        />
      </AdminTableWrapper>

      {/* ── Create drawer ── */}
      {showCreate && <PerfumeCreateForm onClose={() => setShowCreate(false)} />}

      {/* ── Edit drawer ── */}
      {editingPerfume && (
        <PerfumeEditForm
          perfume={editingPerfume}
          onClose={() => setEditingPerfume(null)}
        />
      )}
    </div>
  );
}
