import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, ChevronDown } from "lucide-react";
import { PerfumeService } from "../../services/perfume/perfume.services";
import { BrandService } from "../../services/brand/brand.services";
import type { PerfumeRes } from "../../types/perfume/Perfume.res.type";

type BrandOption = { _id: string; brandName: string };

// ── Palette (mirrors site theme) ─────────────────────────────────────────────
const BLUSH = "#F8EDEB";
const PETAL = "#FCD5CE";
const BROWN_DARK = "#3D2B1F";
const BROWN_MID = "#7A5C52";
const BROWN_MUTED = "#B09490";
const ROSEWOOD = "#C07850";
const ROSEWOOD_DEEP = "#A0613D";
const BORDER_SOFT = "#E8D5CF";

// ── Loading State ─────────────────────────────────────────────────────────────
function LoadingState() {
  return (
    <div
      className="flex items-center justify-center min-h-screen"
      style={{ backgroundColor: BLUSH }}
    >
      <div className="flex flex-col items-center gap-5">
        {/* Animated orb rings */}
        <div className="relative w-14 h-14 flex items-center justify-center">
          <span
            className="absolute inset-0 rounded-full border-2 animate-ping opacity-25"
            style={{ borderColor: ROSEWOOD }}
          />
          <span
            className="absolute inset-1 rounded-full border-2 animate-spin"
            style={{
              borderColor: `${ROSEWOOD} transparent transparent transparent`,
            }}
          />
          <span className="text-base" style={{ color: ROSEWOOD }}>
            ✦
          </span>
        </div>
        <div className="flex flex-col items-center gap-1">
          <p
            className="text-xs tracking-[0.35em] uppercase font-medium"
            style={{ color: ROSEWOOD }}
          >
            Đang tải bộ sưu tập
          </p>
          <div className="flex gap-1 mt-1">
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                className="w-1 h-1 rounded-full animate-pulse"
                style={{
                  backgroundColor: BROWN_MUTED,
                  animationDelay: `${i * 0.2}s`,
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Empty State (có thể tùy message khi không có kết quả bộ lọc) ─────────────
function EmptyState({
  isFiltered,
}: {
  isFiltered?: boolean;
} = {}) {
  return (
    <div className="flex flex-col items-center justify-center py-28 gap-5">
      <div
        className="w-16 h-16 rounded-full flex items-center justify-center"
        style={{ backgroundColor: PETAL }}
      >
        <span className="text-2xl" style={{ color: ROSEWOOD }}>
          ✦
        </span>
      </div>
      <div className="flex flex-col items-center gap-2 text-center">
        <p
          className="text-base font-medium tracking-wide"
          style={{ color: BROWN_DARK }}
        >
          {isFiltered ? "Không có sản phẩm phù hợp" : "Chưa có sản phẩm"}
        </p>
        <p
          className="text-sm max-w-xs leading-relaxed"
          style={{ color: BROWN_MUTED }}
        >
          {isFiltered
            ? "Thử đổi từ khóa hoặc bỏ bộ lọc thương hiệu."
            : "Bộ sưu tập đang được cập nhật. Hãy quay lại sau nhé."}
        </p>
      </div>
    </div>
  );
}

// ── Kiểm tra mô tả có đủ ý nghĩa để hiển thị (tránh placeholder "oke", rỗng) ──
function hasMeaningfulDescription(desc: string | undefined): boolean {
  if (!desc || typeof desc !== "string") return false;
  const t = desc.trim();
  return t.length > 2 && t.toLowerCase() !== "oke";
}

// ── Product Card: cao cấp, tối giản; không hiển thị type/concentration ──
function PerfumeCard({
  perfume,
  onClick,
}: {
  perfume: PerfumeRes;
  onClick: () => void;
}) {
  const showDesc = hasMeaningfulDescription(perfume.description);

  return (
    <article
      onClick={onClick}
      className="group relative flex flex-col cursor-pointer rounded-2xl overflow-hidden bg-white border border-border-soft shadow-soft hover:shadow-card-hover transition-all duration-300 ease-out hover:-translate-y-1"
      style={{ boxShadow: "0 2px 20px rgba(180,120,100,0.08)" }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = "0 12px 40px rgba(180,120,100,0.16)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = "0 2px 20px rgba(180,120,100,0.08)";
      }}
    >
      {/* Ảnh: tỷ lệ đẹp, bo góc trên, hover zoom nhẹ */}
      <div
        className="relative overflow-hidden rounded-t-2xl bg-blush"
        style={{ aspectRatio: "3/4", minHeight: "240px" }}
      >
        {perfume.uri && perfume.uri !== "string" ? (
          <img
            src={perfume.uri}
            alt={perfume.perfumeName}
            className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center">
            <span className="text-5xl opacity-30 select-none">🌸</span>
          </div>
        )}
        <div
          className="absolute inset-0 pointer-events-none rounded-t-2xl"
          style={{
            background:
              "linear-gradient(to top, rgba(61,43,31,0.08) 0%, transparent 50%)",
          }}
        />
      </div>

      {/* Nội dung: thoáng, phân cấp rõ */}
      <div className="flex flex-col flex-1 p-6 gap-4">
        {/* Tên + Thương hiệu */}
        <div className="space-y-1">
          <h3
            className="text-[15px] font-semibold leading-snug line-clamp-2 tracking-tight"
            style={{ color: BROWN_DARK }}
          >
            {perfume.perfumeName}
          </h3>
          {perfume.brand && (
            <p
              className="text-[11px] tracking-[0.2em] uppercase"
              style={{ color: BROWN_MUTED }}
            >
              {perfume.brand}
            </p>
          )}
        </div>

        {/* Mô tả: chỉ khi có nội dung có ý nghĩa */}
        {showDesc && (
          <p
            className="text-xs leading-relaxed line-clamp-2"
            style={{ color: BROWN_MID }}
          >
            {perfume.description?.trim()}
          </p>
        )}

        {/* Badge: dung tích + đối tượng — gọn, đồng bộ */}
        <div className="flex items-center gap-2 flex-wrap">
          <span
            className="inline-flex items-center gap-1.5 text-[11px] px-2.5 py-1 rounded-full font-medium"
            style={{
              backgroundColor: BLUSH,
              color: BROWN_MID,
              border: `1px solid ${BORDER_SOFT}`,
            }}
          >
            <span style={{ color: ROSEWOOD, fontSize: "10px" }}>◉</span>
            {perfume.volume} ml
          </span>
          <span
            className="inline-flex items-center gap-1.5 text-[11px] px-2.5 py-1 rounded-full font-medium"
            style={{
              backgroundColor: BLUSH,
              color: BROWN_MID,
              border: `1px solid ${BORDER_SOFT}`,
            }}
          >
            <span style={{ color: ROSEWOOD, fontSize: "10px" }}>◈</span>
            {perfume.targetAudience}
          </span>
        </div>

        {/* Giá nổi bật + CTA */}
        <div className="mt-auto pt-4 border-t flex items-end justify-between gap-3" style={{ borderColor: BORDER_SOFT }}>
          <div className="flex flex-col">
            <span
              className="text-[10px] tracking-[0.2em] uppercase mb-0.5"
              style={{ color: BROWN_MUTED }}
            >
              Giá
            </span>
            <span
              className="text-lg font-semibold tracking-tight"
              style={{ color: ROSEWOOD }}
            >
              {perfume.price.toLocaleString("vi-VN")}
              <span className="text-sm font-normal ml-0.5 opacity-90">₫</span>
            </span>
          </div>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onClick();
            }}
            className="shrink-0 px-4 py-2.5 rounded-xl text-xs font-semibold tracking-[0.12em] uppercase transition-all duration-200 hover:opacity-90 active:scale-[0.98]"
            style={{
              backgroundColor: BROWN_DARK,
              color: BLUSH,
              border: `1px solid ${BROWN_DARK}`,
            }}
          >
            Xem chi tiết
          </button>
        </div>
      </div>
    </article>
  );
}

// ── Filter bar: premium / boutique style, đồng bộ hero (chỉ UI, giữ logic) ─────
function PerfumeFilters({
  searchDraft,
  onSearchDraftChange,
  brandDraft,
  onBrandDraftChange,
  onApply,
  onClear,
  brandOptions,
}: {
  searchDraft: string;
  onSearchDraftChange: (v: string) => void;
  brandDraft: string;
  onBrandDraftChange: (v: string) => void;
  onApply: () => void;
  onClear: () => void;
  brandOptions: BrandOption[];
}) {
  const hasActiveFilter = !!(searchDraft.trim() || brandDraft);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onApply();
      }}
      className="mx-auto max-w-4xl rounded-[1.25rem] border p-5 sm:p-6 transition-shadow duration-200"
      style={{
        borderColor: BORDER_SOFT,
        backgroundColor: "rgba(255,255,255,0.72)",
        boxShadow: "0 1px 24px rgba(180,120,100,0.06)",
      }}
    >
      <div className="flex flex-col sm:flex-row sm:items-center gap-4">
        {/* Ô tìm kiếm — thành phần chính, có icon */}
        <div className="relative flex-1 min-w-0">
          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none"
            style={{ color: BROWN_MUTED }}
          />
          <input
            type="text"
            value={searchDraft}
            onChange={(e) => onSearchDraftChange(e.target.value)}
            placeholder="Tìm kiếm nước hoa..."
            className="w-full rounded-xl border bg-white/90 pl-11 pr-4 py-3 text-sm outline-none transition-[border-color,box-shadow] duration-200 placeholder:font-normal focus:border-rosewood/50 focus:ring-2 focus:ring-rosewood/10"
            style={{
              borderColor: BORDER_SOFT,
              color: BROWN_DARK,
            }}
            aria-label="Tìm kiếm theo tên nước hoa"
          />
        </div>

        {/* Dropdown thương hiệu — phụ, style đồng bộ, có chevron tinh tế */}
        <div className="relative w-full sm:w-auto sm:min-w-[200px]">
          <select
            value={brandDraft}
            onChange={(e) => onBrandDraftChange(e.target.value)}
            className="w-full rounded-xl border bg-white/90 pl-4 pr-10 py-3 text-sm outline-none transition-[border-color,box-shadow] duration-200 focus:border-rosewood/50 focus:ring-2 focus:ring-rosewood/10 appearance-none cursor-pointer"
            style={{
              borderColor: BORDER_SOFT,
              color: brandDraft ? BROWN_DARK : BROWN_MUTED,
            }}
            aria-label="Lọc theo thương hiệu"
          >
            <option value="">Tất cả thương hiệu</option>
            {brandOptions.map((b) => (
              <option key={b._id} value={b._id}>
                {b.brandName}
              </option>
            ))}
          </select>
          <ChevronDown
            size={18}
            className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none"
            style={{ color: BROWN_MUTED }}
          />
        </div>

        {/* Actions: Apply (primary) + Clear (secondary) */}
        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
          <button
            type="submit"
            className="w-full sm:w-auto shrink-0 rounded-xl px-5 py-3 text-sm font-semibold text-white outline-none transition-all duration-200 hover:opacity-95 active:scale-[0.99] focus:ring-2 focus:ring-rosewood/20"
            style={{ backgroundColor: ROSEWOOD }}
          >
            Áp dụng
          </button>

          {hasActiveFilter && (
            <button
              type="button"
              onClick={onClear}
              className="w-full sm:w-auto shrink-0 rounded-xl px-4 py-3 text-sm font-medium outline-none transition-colors duration-200 hover:bg-petal/25 focus:ring-2 focus:ring-rosewood/10 focus:ring-offset-0"
              style={{ color: BROWN_MUTED }}
              aria-label="Xóa bộ lọc"
            >
              Xóa bộ lọc
            </button>
          )}
        </div>
      </div>
    </form>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────
export default function Perfume() {
  const [perfumes, setPerfumes] = useState<PerfumeRes[]>([]);
  const [loading, setLoading] = useState(true);
  // Draft values: UI input only (apply mới fetch)
  const [searchDraft, setSearchDraft] = useState("");
  const [brandDraft, setBrandDraft] = useState("");
  // Applied values: dùng để call API
  const [search, setSearch] = useState("");
  const [brandId, setBrandId] = useState("");
  const [brands, setBrands] = useState<BrandOption[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    BrandService.getAllBrands()
      .then((res) => setBrands(res.data?.data ?? []))
      .catch(() => setBrands([]));
  }, []);

  useEffect(() => {
    setLoading(true);
    PerfumeService.getAllPerfumes({
      ...(search.trim() && { search: search.trim() }),
      ...(brandId && { brand: brandId }),
    })
      .then((res) => {
        setPerfumes(res.data.data ?? []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error:", err);
        setLoading(false);
      });
  }, [search, brandId]);

  if (loading) return <LoadingState />;

  return (
    <div className="min-h-screen" style={{ backgroundColor: BLUSH }}>
      {/* ── Hero banner ───────────────────────────────────────────────────── */}
      <section
        className="relative flex flex-col items-center justify-center text-center py-20 px-6 overflow-hidden"
        style={{ borderBottom: `1px solid ${BORDER_SOFT}` }}
      >
        {/* Soft decorative backdrop circle */}
        <div
          className="absolute pointer-events-none"
          style={{
            width: "520px",
            height: "520px",
            borderRadius: "50%",
            backgroundColor: PETAL,
            opacity: 0.28,
            filter: "blur(80px)",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        />

        <div className="relative z-10 flex flex-col items-center gap-4 max-w-2xl mx-auto">
          {/* Eyebrow */}
          <div className="flex items-center gap-3">
            <div
              className="h-px w-8"
              style={{ backgroundColor: `${ROSEWOOD}60` }}
            />
            <span
              className="text-[10px] tracking-[0.38em] uppercase font-medium"
              style={{ color: ROSEWOOD }}
            >
              Maison de Luxe
            </span>
            <div
              className="h-px w-8"
              style={{ backgroundColor: `${ROSEWOOD}60` }}
            />
          </div>

          {/* Title */}
          <h1
            className="text-4xl sm:text-5xl font-light tracking-tight leading-tight"
            style={{ color: BROWN_DARK }}
          >
            Bộ Sưu Tập{" "}
            <span
              className="italic"
              style={{ color: ROSEWOOD, fontStyle: "italic" }}
            >
              Nước Hoa
            </span>
          </h1>

          {/* Subtitle */}
          <p
            className="text-sm leading-relaxed max-w-sm"
            style={{ color: BROWN_MID }}
          >
            Từng chai nước hoa là một hành trình — được chắt lọc từ những nguyên
            liệu quý giá nhất trên thế giới.
          </p>

          {/* Count + decorative rule */}
          <div className="flex items-center gap-4 mt-1">
            <div
              className="h-px w-12"
              style={{ backgroundColor: BORDER_SOFT }}
            />
            <span
              className="text-xs tracking-[0.28em] uppercase"
              style={{ color: BROWN_MUTED }}
            >
              {perfumes.length} sản phẩm
            </span>
            <div
              className="h-px w-12"
              style={{ backgroundColor: BORDER_SOFT }}
            />
          </div>
        </div>
      </section>

      {/* ── Tìm kiếm + lọc thương hiệu (premium filter bar) ────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-6">
        <PerfumeFilters
          searchDraft={searchDraft}
          onSearchDraftChange={setSearchDraft}
          brandDraft={brandDraft}
          onBrandDraftChange={setBrandDraft}
          onApply={() => {
            setSearch(searchDraft);
            setBrandId(brandDraft);
          }}
          onClear={() => {
            setSearchDraft("");
            setBrandDraft("");
            setSearch("");
            setBrandId("");
          }}
          brandOptions={brands}
        />
      </section>

      {/* ── Catalog ───────────────────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        {perfumes.length === 0 ? (
          <EmptyState isFiltered={!!(search.trim() || brandId)} />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-7">
            {perfumes.map((perfume, idx) => (
              <PerfumeCard
                key={perfume._id ?? idx}
                perfume={perfume}
                onClick={() => navigate(`/perfumes/${perfume._id}`)}
              />
            ))}
          </div>
        )}
      </section>

      {/* ── Footer accent ─────────────────────────────────────────────────── */}
      <div
        className="flex items-center justify-center py-10 gap-4"
        style={{ borderTop: `1px solid ${BORDER_SOFT}` }}
      >
        <div className="h-px w-10" style={{ backgroundColor: BORDER_SOFT }} />
        <span className="text-xs" style={{ color: ROSEWOOD_DEEP }}>
          ✦
        </span>
        <span
          className="text-[10px] tracking-[0.35em] uppercase"
          style={{ color: BROWN_MUTED }}
        >
          Perfume · Maison de Luxe
        </span>
        <span className="text-xs" style={{ color: ROSEWOOD_DEEP }}>
          ✦
        </span>
        <div className="h-px w-10" style={{ backgroundColor: BORDER_SOFT }} />
      </div>
    </div>
  );
}
