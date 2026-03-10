import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { ImageIcon, Plus, Pencil, Trash2, Upload, X } from "lucide-react";
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

// ── Design tokens ─────────────────────────────────────────────────
const ROSEWOOD = "#C07850";
const BROWN_DARK = "#3D2B1F";
const BORDER_SOFT = "#E8D5CF";
const PANEL_BG = "#FDF0ED";

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
  {
    name: "targetAudience",
    label: "Đối tượng",
    type: "text",
    required: true,
  },
] as const;

// ─────────────────────────────────────────────────────────────────
// Shared: ImageUploadField
// ─────────────────────────────────────────────────────────────────
function ImageUploadField({
  previewUrl,
  uploadedImage,
  uploadError,
  selectedFile,
  isUploading,
  onSelectFile,
  onUpload,
  onDelete,
}: {
  previewUrl: string | null;
  uploadedImage: { url: string; key: string } | null;
  uploadError: string | null;
  selectedFile: File | null;
  isUploading: boolean;
  onSelectFile: (file: File | null) => void;
  onUpload: () => void;
  onDelete: () => void;
}) {
  return (
    <div>
      <label
        className="mb-1.5 block text-xs font-semibold uppercase tracking-wider"
        style={{ color: "#B09490" }}
      >
        Ảnh sản phẩm *
      </label>
      <div
        className="relative mb-2 flex h-44 w-full items-center justify-center overflow-hidden rounded-xl border-2 border-dashed"
        style={{ borderColor: BORDER_SOFT }}
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
            style={{ color: "#B09490" }}
          >
            <ImageIcon size={32} />
            <span>Chọn ảnh để xem trước</span>
            <span className="text-xs">JPG / PNG / WEBP, tối đa 5 MB</span>
          </div>
        )}
        {uploadedImage && (
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
          style={{ borderColor: BORDER_SOFT, color: BROWN_DARK }}
        >
          <ImageIcon size={13} />
          Chọn ảnh
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => onSelectFile(e.target.files?.[0] ?? null)}
          />
        </label>
        <button
          type="button"
          onClick={onUpload}
          disabled={!selectedFile || isUploading || !!uploadedImage}
          className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium text-white transition-opacity hover:opacity-80 disabled:cursor-not-allowed disabled:opacity-40"
          style={{ backgroundColor: ROSEWOOD }}
        >
          <Upload size={13} />
          {isUploading ? "Đang upload..." : "Upload ảnh"}
        </button>
        {uploadedImage && (
          <button
            type="button"
            onClick={onDelete}
            disabled={isUploading}
            className="flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-medium transition-colors hover:bg-red-50 disabled:opacity-40"
            style={{ borderColor: BORDER_SOFT, color: "#ef4444" }}
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
        style={{ color: "#B09490" }}
      >
        Thương hiệu
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-lg border px-3 py-2 text-sm outline-none transition-colors focus:border-[#C07850]"
        style={{
          borderColor: BORDER_SOFT,
          backgroundColor: "#fff",
          color: BROWN_DARK,
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

  const handleUploadImage = async () => {
    const result = await handleUpload();
    if (result) setForm((prev) => ({ ...prev, uri: result.url }));
  };

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
        style={{ backgroundColor: PANEL_BG }}
      >
        <div
          className="flex shrink-0 items-center justify-between border-b px-6 py-4"
          style={{ borderColor: BORDER_SOFT }}
        >
          <h2
            className="font-serif text-base font-bold"
            style={{ color: BROWN_DARK }}
          >
            Thêm nước hoa mới
          </h2>
          <button
            onClick={onClose}
            className="rounded-lg p-1 transition-colors hover:bg-black/10"
          >
            <X size={18} style={{ color: BROWN_DARK }} />
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
            selectedFile={selectedFile}
            isUploading={isUploading}
            onSelectFile={handleSelectFile}
            onUpload={handleUploadImage}
            onDelete={handleDeleteImage}
          />

          {TEXT_FIELDS.map(({ name, label, type, required }) => (
            <div key={name}>
              <label
                htmlFor={`create-${name}`}
                className="mb-1 block text-xs font-semibold uppercase tracking-wider"
                style={{ color: "#B09490" }}
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
                  borderColor: BORDER_SOFT,
                  backgroundColor: "#fff",
                  color: BROWN_DARK,
                }}
              />
            </div>
          ))}

          <div>
            <label
              htmlFor="create-description"
              className="mb-1 block text-xs font-semibold uppercase tracking-wider"
              style={{ color: "#B09490" }}
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
                borderColor: BORDER_SOFT,
                backgroundColor: "#fff",
                color: BROWN_DARK,
              }}
            />
          </div>

          <div>
            <label
              htmlFor="create-ingredients"
              className="mb-1 block text-xs font-semibold uppercase tracking-wider"
              style={{ color: "#B09490" }}
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
                borderColor: BORDER_SOFT,
                backgroundColor: "#fff",
                color: BROWN_DARK,
              }}
            />
          </div>

          <BrandSelect
            value={form.brand}
            onChange={(v) => setForm((p) => ({ ...p, brand: v }))}
          />

          <div
            className="sticky bottom-0 flex shrink-0 gap-3 border-t pt-4"
            style={{ borderColor: BORDER_SOFT, backgroundColor: PANEL_BG }}
          >
            <button
              type="button"
              onClick={onClose}
              className="flex-1 rounded-lg border py-2 text-sm font-medium transition-colors hover:bg-black/5"
              style={{ borderColor: BORDER_SOFT, color: BROWN_DARK }}
            >
              Hủy
            </button>
            <button
              type="submit"
              disabled={isPending || isUploading || !form.uri}
              className="flex-1 rounded-lg py-2 text-sm font-medium text-white transition-opacity hover:opacity-80 disabled:cursor-not-allowed disabled:opacity-40"
              style={{ backgroundColor: ROSEWOOD }}
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

  const handleUploadImage = async () => {
    const result = await handleUpload();
    if (result) setForm((prev) => ({ ...prev, uri: result.url }));
  };

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
        style={{ backgroundColor: PANEL_BG }}
      >
        <div
          className="flex shrink-0 items-center justify-between border-b px-6 py-4"
          style={{ borderColor: BORDER_SOFT }}
        >
          <h2
            className="font-serif text-base font-bold"
            style={{ color: BROWN_DARK }}
          >
            Chỉnh sửa nước hoa
          </h2>
          <button
            onClick={onClose}
            className="rounded-lg p-1 transition-colors hover:bg-black/10"
          >
            <X size={18} style={{ color: BROWN_DARK }} />
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
            selectedFile={selectedFile}
            isUploading={isUploading}
            onSelectFile={handleSelectFile}
            onUpload={handleUploadImage}
            onDelete={handleDeleteImage}
          />

          {TEXT_FIELDS.map(({ name, label, type, required }) => (
            <div key={name}>
              <label
                htmlFor={`edit-${name}`}
                className="mb-1 block text-xs font-semibold uppercase tracking-wider"
                style={{ color: "#B09490" }}
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
                  borderColor: BORDER_SOFT,
                  backgroundColor: "#fff",
                  color: BROWN_DARK,
                }}
              />
            </div>
          ))}

          <div>
            <label
              htmlFor="edit-description"
              className="mb-1 block text-xs font-semibold uppercase tracking-wider"
              style={{ color: "#B09490" }}
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
                borderColor: BORDER_SOFT,
                backgroundColor: "#fff",
                color: BROWN_DARK,
              }}
            />
          </div>

          <div>
            <label
              htmlFor="edit-ingredients"
              className="mb-1 block text-xs font-semibold uppercase tracking-wider"
              style={{ color: "#B09490" }}
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
                borderColor: BORDER_SOFT,
                backgroundColor: "#fff",
                color: BROWN_DARK,
              }}
            />
          </div>

          <BrandSelect
            value={form.brand}
            onChange={(v) => setForm((p) => ({ ...p, brand: v }))}
          />

          <div
            className="sticky bottom-0 flex shrink-0 gap-3 border-t pt-4"
            style={{ borderColor: BORDER_SOFT, backgroundColor: PANEL_BG }}
          >
            <button
              type="button"
              onClick={onClose}
              className="flex-1 rounded-lg border py-2 text-sm font-medium transition-colors hover:bg-black/5"
              style={{ borderColor: BORDER_SOFT, color: BROWN_DARK }}
            >
              Hủy
            </button>
            <button
              type="submit"
              disabled={isPending || isUploading}
              className="flex-1 rounded-lg py-2 text-sm font-medium text-white transition-opacity hover:opacity-80 disabled:cursor-not-allowed disabled:opacity-40"
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
// Sub-component: PerfumeDeleteButton — DELETE /perfumes/{id}
// ─────────────────────────────────────────────────────────────────
function PerfumeDeleteButton({ id }: { id: string }) {
  const { mutate, isPending } = useDeletePerfume();

  const handleClick = () => {
    if (!window.confirm("Bạn có chắc muốn xóa nước hoa này không?")) return;
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
// Sub-component: PerfumeList — GET /perfumes
// ─────────────────────────────────────────────────────────────────
function PerfumeList({ onEdit }: { onEdit: (p: PerfumeRes) => void }) {
  const { data, isLoading } = useQuery({
    queryKey: PERFUMES_QUERY_KEY,
    queryFn: () => PerfumeService.getAllPerfumes(),
  });

  const perfumes = data?.data?.data ?? [];

  if (isLoading) {
    return (
      <div className="py-16 text-center text-sm" style={{ color: "#B09490" }}>
        Đang tải...
      </div>
    );
  }

  if (perfumes.length === 0) {
    return (
      <div className="py-16 text-center text-sm" style={{ color: "#B09490" }}>
        Chưa có sản phẩm nào.
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
          <th className="px-4 py-3">Ảnh</th>
          <th className="px-4 py-3">Tên</th>
          <th className="px-4 py-3">Giá</th>
          <th className="px-4 py-3">Nồng độ</th>
          <th className="px-4 py-3">Dung tích</th>
          <th className="px-4 py-3">Đối tượng</th>
          <th className="px-4 py-3 text-right">Thao tác</th>
        </tr>
      </thead>
      <tbody>
        {perfumes.map((p, idx) => (
          <tr
            key={p._id}
            className="border-b last:border-0 hover:bg-[#F5E6E0]/40"
            style={{
              borderColor: BORDER_SOFT,
              backgroundColor:
                idx % 2 === 1 ? "rgba(248,237,235,0.5)" : "transparent",
            }}
          >
            <td className="px-4 py-3">
              {p.uri ? (
                <img
                  src={p.uri}
                  alt={p.perfumeName}
                  className="h-10 w-10 rounded-lg border object-cover"
                  style={{ borderColor: BORDER_SOFT }}
                />
              ) : (
                <div
                  className="flex h-10 w-10 items-center justify-center rounded-lg border"
                  style={{ borderColor: BORDER_SOFT, color: "#B09490" }}
                >
                  <ImageIcon size={16} />
                </div>
              )}
            </td>
            <td className="px-4 py-3 font-medium" style={{ color: BROWN_DARK }}>
              {p.perfumeName}
            </td>
            <td className="px-4 py-3">{p.price.toLocaleString("vi-VN")}₫</td>
            <td className="px-4 py-3">{p.concentration}</td>
            <td className="px-4 py-3">{p.volume} ml</td>
            <td className="px-4 py-3">{p.targetAudience}</td>
            <td className="px-4 py-3">
              <div className="flex items-center justify-end gap-1">
                <button
                  onClick={() => onEdit(p)}
                  className="rounded-lg p-1.5 transition-colors hover:bg-[#FCD5CE]/40"
                  title="Chỉnh sửa"
                >
                  <Pencil size={15} style={{ color: ROSEWOOD }} />
                </button>
                <PerfumeDeleteButton id={p._id} />
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

// ─────────────────────────────────────────────────────────────────
// Page: Perfumes
// ─────────────────────────────────────────────────────────────────
export default function Perfumes() {
  const [showCreate, setShowCreate] = useState(false);
  const [editingPerfume, setEditingPerfume] = useState<PerfumeRes | null>(null);

  return (
    <div className="p-6" style={{ color: BROWN_DARK }}>
      {/* ── Page header ── */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1
            className="font-serif text-xl font-bold tracking-wide"
            style={{ color: BROWN_DARK }}
          >
            Nước Hoa
          </h1>
          <p className="mt-0.5 text-sm" style={{ color: "#B09490" }}>
            Quản lý danh sách sản phẩm
          </p>
        </div>
        <button
          onClick={() => setShowCreate(true)}
          className="flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium text-white transition-opacity hover:opacity-80"
          style={{ backgroundColor: ROSEWOOD }}
        >
          <Plus size={15} />
          Thêm nước hoa
        </button>
      </div>

      {/* ── Table ── */}
      <div
        className="overflow-hidden rounded-xl border"
        style={{ borderColor: BORDER_SOFT, backgroundColor: PANEL_BG }}
      >
        <PerfumeList onEdit={setEditingPerfume} />
      </div>

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
