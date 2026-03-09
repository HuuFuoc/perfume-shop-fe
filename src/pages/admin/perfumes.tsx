import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { ImageIcon, Plus, X, Upload } from "lucide-react";
import { PerfumeService } from "../../services/perfume/perfume.services";
import { useS3Upload } from "../../hooks/useS3Upload";
import type { CreatePerfumeReq } from "../../types/perfume/Perfume.req.type";
import { notificationMessage } from "../../utils/helper";

// ── Design tokens (matches Admin.layout.tsx) ─────────────────────
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

export default function Perfumes() {
  const queryClient = useQueryClient();
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState<CreatePerfumeReq>(EMPTY_FORM);
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  const { data, isLoading } = useQuery({
    queryKey: ["admin-perfumes"],
    queryFn: () => PerfumeService.getAllPerfumes({}),
  });

  const perfumes = data?.data?.data ?? [];

  const handleOpenForm = () => {
    setForm(EMPTY_FORM);
    resetUpload();
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    resetUpload();
  };

  const handleUploadImage = async () => {
    const result = await handleUpload();
    if (result) {
      setForm((prev) => ({ ...prev, uri: result.url }));
    }
  };

  const handleDeleteImage = async () => {
    await handleDelete();
    setForm((prev) => ({ ...prev, uri: "" }));
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === "price" || name === "volume" ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.uri) {
      notificationMessage("Vui lòng upload ảnh trước khi lưu.", "error");
      return;
    }

    try {
      setIsSubmitting(true);
      await PerfumeService.createPerfume(form);
      notificationMessage("Thêm nước hoa thành công!", "success");
      await queryClient.invalidateQueries({ queryKey: ["admin-perfumes"] });
      handleCloseForm();
    } catch {
      notificationMessage("Thêm nước hoa thất bại. Vui lòng thử lại.", "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-6" style={{ color: BROWN_DARK }}>
      {/* ── Header ── */}
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
          onClick={handleOpenForm}
          className="flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-opacity hover:opacity-80"
          style={{ backgroundColor: ROSEWOOD, color: "#fff" }}
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
        {isLoading ? (
          <div
            className="py-16 text-center text-sm"
            style={{ color: "#B09490" }}
          >
            Đang tải...
          </div>
        ) : perfumes.length === 0 ? (
          <div
            className="py-16 text-center text-sm"
            style={{ color: "#B09490" }}
          >
            Chưa có sản phẩm nào.
          </div>
        ) : (
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
                  <td
                    className="px-4 py-3 font-medium"
                    style={{ color: BROWN_DARK }}
                  >
                    {p.perfumeName}
                  </td>
                  <td className="px-4 py-3">
                    {p.price.toLocaleString("vi-VN")}₫
                  </td>
                  <td className="px-4 py-3">{p.concentration}</td>
                  <td className="px-4 py-3">{p.volume} ml</td>
                  <td className="px-4 py-3">{p.targetAudience}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* ── Drawer / Form overlay ── */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex">
          {/* Backdrop */}
          <div className="flex-1 bg-black/30" onClick={handleCloseForm} />

          {/* Panel */}
          <div
            className="flex h-full w-full max-w-md flex-col overflow-y-auto shadow-2xl"
            style={{ backgroundColor: PANEL_BG }}
          >
            {/* Panel header */}
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
                onClick={handleCloseForm}
                className="rounded-lg p-1 transition-colors hover:bg-black/10"
              >
                <X size={18} style={{ color: BROWN_DARK }} />
              </button>
            </div>

            {/* Form body */}
            <form
              onSubmit={handleSubmit}
              className="flex flex-1 flex-col gap-4 px-6 py-5"
            >
              {/* ── Image upload ── */}
              <div>
                <label
                  className="mb-1.5 block text-xs font-semibold uppercase tracking-wider"
                  style={{ color: "#B09490" }}
                >
                  Ảnh sản phẩm *
                </label>

                {/* Preview / placeholder */}
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
                      <span className="text-xs">
                        JPG / PNG / WEBP, tối đa 5 MB
                      </span>
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
                  {/* File picker */}
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
                      onChange={(e) =>
                        handleSelectFile(e.target.files?.[0] ?? null)
                      }
                    />
                  </label>

                  {/* Upload button */}
                  <button
                    type="button"
                    onClick={handleUploadImage}
                    disabled={!selectedFile || isUploading || !!uploadedImage}
                    className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium text-white transition-opacity hover:opacity-80 disabled:cursor-not-allowed disabled:opacity-40"
                    style={{ backgroundColor: ROSEWOOD }}
                  >
                    <Upload size={13} />
                    {isUploading ? "Đang upload..." : "Upload ảnh"}
                  </button>

                  {/* Delete S3 image */}
                  {uploadedImage && (
                    <button
                      type="button"
                      onClick={handleDeleteImage}
                      disabled={isUploading}
                      className="flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-medium transition-colors hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-40"
                      style={{ borderColor: BORDER_SOFT, color: "#ef4444" }}
                    >
                      <X size={13} />
                      Xóa ảnh
                    </button>
                  )}
                </div>
              </div>

              {/* ── Text fields ── */}
              {(
                [
                  {
                    name: "perfumeName",
                    label: "Tên nước hoa",
                    type: "text",
                    required: true,
                  },
                  {
                    name: "price",
                    label: "Giá (VNĐ)",
                    type: "number",
                    required: true,
                  },
                  {
                    name: "concentration",
                    label: "Nồng độ (EDP, EDT...)",
                    type: "text",
                    required: true,
                  },
                  {
                    name: "volume",
                    label: "Dung tích (ml)",
                    type: "number",
                    required: true,
                  },
                  {
                    name: "targetAudience",
                    label: "Đối tượng",
                    type: "text",
                    required: true,
                  },
                  {
                    name: "brand",
                    label: "Thương hiệu",
                    type: "text",
                    required: false,
                  },
                ] as const
              ).map(({ name, label, type, required }) => (
                <div key={name}>
                  <label
                    htmlFor={name}
                    className="mb-1 block text-xs font-semibold uppercase tracking-wider"
                    style={{ color: "#B09490" }}
                  >
                    {label} {required && "*"}
                  </label>
                  <input
                    id={name}
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

              {/* Description */}
              <div>
                <label
                  htmlFor="description"
                  className="mb-1 block text-xs font-semibold uppercase tracking-wider"
                  style={{ color: "#B09490" }}
                >
                  Mô tả
                </label>
                <textarea
                  id="description"
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

              {/* Ingredients */}
              <div>
                <label
                  htmlFor="ingredients"
                  className="mb-1 block text-xs font-semibold uppercase tracking-wider"
                  style={{ color: "#B09490" }}
                >
                  Thành phần
                </label>
                <textarea
                  id="ingredients"
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

              {/* Submit */}
              <div
                className="sticky bottom-0 flex shrink-0 gap-3 border-t pt-4"
                style={{ borderColor: BORDER_SOFT, backgroundColor: PANEL_BG }}
              >
                <button
                  type="button"
                  onClick={handleCloseForm}
                  className="flex-1 rounded-lg border py-2 text-sm font-medium transition-colors hover:bg-black/5"
                  style={{ borderColor: BORDER_SOFT, color: BROWN_DARK }}
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting || isUploading || !form.uri}
                  className="flex-1 rounded-lg py-2 text-sm font-medium text-white transition-opacity hover:opacity-80 disabled:cursor-not-allowed disabled:opacity-40"
                  style={{ backgroundColor: ROSEWOOD }}
                >
                  {isSubmitting ? "Đang lưu..." : "Lưu nước hoa"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
