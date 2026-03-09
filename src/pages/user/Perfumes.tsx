import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { PerfumeService } from "../../services/perfume/perfume.services";
import type { getAllPerfumeRes } from "../../types/perfume/Perfume.res.type";

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

// ── Empty State ───────────────────────────────────────────────────────────────
function EmptyState() {
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
          Chưa có sản phẩm
        </p>
        <p
          className="text-sm max-w-xs leading-relaxed"
          style={{ color: BROWN_MUTED }}
        >
          Bộ sưu tập đang được cập nhật. Hãy quay lại sau nhé.
        </p>
      </div>
    </div>
  );
}

// ── Product Card ──────────────────────────────────────────────────────────────
function PerfumeCard({
  perfume,
  onClick,
}: {
  perfume: getAllPerfumeRes;
  onClick: () => void;
}) {
  return (
    <article
      onClick={onClick}
      className="group relative flex flex-col cursor-pointer"
      style={{
        backgroundColor: "#fff",
        border: `1px solid ${BORDER_SOFT}`,
        borderRadius: "16px",
        overflow: "hidden",
        transition: "box-shadow 0.3s ease, transform 0.3s ease",
        boxShadow: "0 2px 16px 0 rgba(180,120,100,0.08)",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.boxShadow =
          "0 12px 40px 0 rgba(180,120,100,0.20)";
        (e.currentTarget as HTMLElement).style.transform = "translateY(-4px)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.boxShadow =
          "0 2px 16px 0 rgba(180,120,100,0.08)";
        (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
      }}
    >
      {/* ── Image frame ── */}
      <div
        className="relative overflow-hidden"
        style={{
          height: "260px",
          backgroundColor: BLUSH,
          borderBottom: `1px solid ${BORDER_SOFT}`,
        }}
      >
        {perfume.uri && perfume.uri !== "string" ? (
          <img
            src={perfume.uri}
            alt={perfume.perfumeName}
            className="w-full h-full object-cover"
            style={{
              transition: "transform 0.6s cubic-bezier(0.25,0.46,0.45,0.94)",
            }}
            onMouseEnter={(e) =>
              ((e.currentTarget as HTMLElement).style.transform = "scale(1.06)")
            }
            onMouseLeave={(e) =>
              ((e.currentTarget as HTMLElement).style.transform = "scale(1)")
            }
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center gap-3">
            <span className="text-5xl opacity-40">🌸</span>
          </div>
        )}

        {/* Subtle vignette overlay */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(to top, rgba(61,43,31,0.12) 0%, transparent 55%)",
          }}
        />

        {/* Concentration badge */}
        {perfume.concentration && (
          <span
            className="absolute top-3 left-3 text-[10px] font-semibold tracking-[0.2em] uppercase px-2.5 py-1"
            style={{
              backgroundColor: "rgba(248,237,235,0.92)",
              color: ROSEWOOD,
              border: `1px solid ${BORDER_SOFT}`,
              borderRadius: "20px",
              backdropFilter: "blur(4px)",
            }}
          >
            {perfume.concentration}
          </span>
        )}
      </div>

      {/* ── Content ── */}
      <div className="flex flex-col flex-1 p-5 gap-3">
        {/* Name + Brand */}
        <div>
          <h3
            className="text-sm font-semibold tracking-wide leading-snug line-clamp-1"
            style={{ color: BROWN_DARK }}
          >
            {perfume.perfumeName}
          </h3>
          {perfume.brand && (
            <p
              className="text-[10px] tracking-[0.28em] uppercase mt-0.5"
              style={{ color: BROWN_MUTED }}
            >
              {perfume.brand}
            </p>
          )}
        </div>

        {/* Description */}
        <p
          className="text-xs leading-relaxed line-clamp-2 flex-1"
          style={{ color: BROWN_MID }}
        >
          {perfume.description}
        </p>

        {/* Meta pills */}
        <div className="flex items-center gap-2 flex-wrap">
          <span
            className="inline-flex items-center gap-1 text-[10px] tracking-wide px-2 py-0.5"
            style={{
              backgroundColor: BLUSH,
              color: BROWN_MID,
              border: `1px solid ${BORDER_SOFT}`,
              borderRadius: "20px",
            }}
          >
            <span style={{ color: ROSEWOOD, fontSize: "9px" }}>◉</span>
            {perfume.volume} ml
          </span>
          <span
            className="inline-flex items-center gap-1 text-[10px] tracking-wide px-2 py-0.5"
            style={{
              backgroundColor: BLUSH,
              color: BROWN_MID,
              border: `1px solid ${BORDER_SOFT}`,
              borderRadius: "20px",
            }}
          >
            <span style={{ color: ROSEWOOD, fontSize: "9px" }}>◈</span>
            {perfume.targetAudience}
          </span>
        </div>

        {/* Divider */}
        <div style={{ height: "1px", backgroundColor: BORDER_SOFT }} />

        {/* Price + CTA */}
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <span
              className="text-[10px] tracking-[0.22em] uppercase"
              style={{ color: BROWN_MUTED }}
            >
              Giá
            </span>
            <span
              className="text-base font-semibold tracking-tight"
              style={{ color: ROSEWOOD }}
            >
              {perfume.price.toLocaleString("vi-VN")}
              <span className="text-xs ml-0.5 font-normal">₫</span>
            </span>
          </div>

          <button
            type="button"
            className="text-xs font-semibold tracking-[0.18em] uppercase px-4 py-2 transition-all duration-200"
            style={{
              backgroundColor: BROWN_DARK,
              color: BLUSH,
              borderRadius: "8px",
              border: `1px solid ${BROWN_DARK}`,
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.backgroundColor = ROSEWOOD;
              (e.currentTarget as HTMLElement).style.borderColor = ROSEWOOD;
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.backgroundColor =
                BROWN_DARK;
              (e.currentTarget as HTMLElement).style.borderColor = BROWN_DARK;
            }}
          >
            Xem chi tiết
          </button>
        </div>
      </div>
    </article>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────
export default function Perfume() {
  const [perfumes, setPerfumes] = useState<getAllPerfumeRes[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    PerfumeService.getAllPerfumes({})
      .then((res) => {
        setPerfumes(res.data.data ?? []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error:", err);
        setLoading(false);
      });
  }, []);

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

      {/* ── Catalog ───────────────────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        {perfumes.length === 0 ? (
          <EmptyState />
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
