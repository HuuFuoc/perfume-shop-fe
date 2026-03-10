import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { PerfumeService } from "../../services/perfume/perfume.services";
import type { PerfumeRes } from "../../types/perfume/Perfume.res.type";
import { notificationMessage } from "../../utils/helper";

// ── Local comment shape (fields inferred from typical API response) ───────────
interface PerfumeReview {
  _id?: string;
  author?: string;
  content?: string;
  rating?: number;
  createdAt?: string;
  [key: string]: unknown;
}

// ── Meta badge card ───────────────────────────────────────────────────────────
function MetaBadge({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col items-center gap-1.5 px-5 py-3.5 bg-white/80 rounded-2xl shadow-soft border border-border-soft min-w-[88px] backdrop-blur-sm">
      <span className="text-[9px] tracking-[0.3em] text-brown-muted uppercase font-semibold">
        {label}
      </span>
      <span className="text-sm font-semibold text-brown-dark truncate max-w-[100px] text-center leading-tight">
        {value}
      </span>
    </div>
  );
}

// ── Star icons ────────────────────────────────────────────────────────────────
function StarRating({ filled, total }: { filled: number; total: number }) {
  return (
    <div className="flex items-center gap-1.5">
      {Array.from({ length: 5 }, (_, i) => (
        <svg
          key={i}
          viewBox="0 0 20 20"
          fill={i < filled ? "#C07850" : "none"}
          stroke="#C07850"
          strokeWidth="1.3"
          className="w-4 h-4 flex-shrink-0"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
      <span className="text-xs text-brown-muted ml-1">({total})</span>
    </div>
  );
}

// ── Decorative section heading ────────────────────────────────────────────────
function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-4 mb-5">
      <span className="text-[10px] tracking-[0.38em] text-rosewood uppercase font-semibold whitespace-nowrap">
        {children}
      </span>
      <div className="h-px flex-1 bg-border-soft" />
    </div>
  );
}

// ── Loading skeleton ──────────────────────────────────────────────────────────
function LoadingScreen() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-blush">
      <div className="flex flex-col items-center gap-5">
        <div className="relative w-14 h-14">
          <div className="absolute inset-0 rounded-full border-4 border-petal" />
          <div className="absolute inset-0 rounded-full border-4 border-t-rosewood animate-spin" />
        </div>
        <p className="text-[10px] tracking-[0.45em] text-brown-muted uppercase font-medium">
          Loading
        </p>
      </div>
    </div>
  );
}

// ── Error / not-found screen ──────────────────────────────────────────────────
function ErrorScreen({
  message,
  onBack,
}: {
  message: string;
  onBack: () => void;
}) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-blush gap-6 px-4 text-center">
      <div className="text-6xl text-rosewood/20 font-light select-none">✦</div>
      <p className="text-brown-mid text-sm tracking-wide max-w-xs">{message}</p>
      <button
        onClick={onBack}
        className="text-xs text-rosewood tracking-[0.3em] uppercase hover:underline underline-offset-4 transition-all"
      >
        ← Go Back
      </button>
    </div>
  );
}

// ── MAIN PAGE COMPONENT ───────────────────────────────────────────────────────
type PerfumeWithComments = PerfumeRes & { comments: Comment[] | null };

function fetchPerfume(
  id: string,
  onSuccess: (data: PerfumeWithComments) => void,
  onError: (message: string) => void,
) {
  PerfumeService.getPerfumeById({ id })
    .then((res) => onSuccess(res.data.data as PerfumeWithComments))
    .catch((err) => {
      console.error("Error fetching perfume:", err);
      onError("Unable to load perfume details. Please try again.");
    });
}

export default function PerfumeDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [perfume, setPerfume] = useState<PerfumeWithComments | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Comment form
  const [commentContent, setCommentContent] = useState("");
  const [commentRating, setCommentRating] = useState(5);
  const [commentSubmitting, setCommentSubmitting] = useState(false);
  const [commentError, setCommentError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    fetchPerfume(
      id,
      (data) => {
        setPerfume(data);
        setLoading(false);
      },
      (msg) => {
        setError(msg);
        setLoading(false);
      },
    );
  }, [id]);

  const refetchPerfume = () => {
    if (!id || !perfume) return;
    fetchPerfume(id, setPerfume, () => {});
  };

  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!id || !perfume) return;
    const content = commentContent.trim();
    if (!content) {
      setCommentError("Vui lòng nhập nội dung đánh giá.");
      return;
    }
    setCommentError(null);
    setCommentSubmitting(true);
    PerfumeService.createComment({ id, content, rating: commentRating })
      .then(() => {
        setCommentContent("");
        setCommentRating(5);
        notificationMessage("Đánh giá đã được gửi.", "success");
        refetchPerfume();
      })
      .catch((err) => {
        setCommentError(
          err.response?.data?.message ?? "Gửi đánh giá thất bại. Vui lòng thử lại.",
        );
      })
      .finally(() => setCommentSubmitting(false));
  };

  if (loading) return <LoadingScreen />;
  if (error || !perfume)
    return (
      <ErrorScreen
        message={error ?? "Perfume not found."}
        onBack={() => navigate(-1)}
      />
    );

  const reviews = (perfume.comments ?? []) as unknown as PerfumeReview[];
  const reviewCount = reviews.length;
  const hasValidImage =
    perfume.uri && perfume.uri !== "string" && perfume.uri.startsWith("http");

  // Derive a representative filled-star count for the hero rating (avg or 4 if no data)
  const avgRating =
    reviewCount > 0
      ? Math.round(
          reviews
            .map((r) => (typeof r.rating === "number" ? r.rating : 4))
            .reduce((a, b) => a + b, 0) / reviewCount,
        )
      : 4;

  return (
    <div className="min-h-screen bg-blush text-brown-dark font-sans overflow-x-hidden">
      {/* ── Breadcrumb ───────────────────────────────────────────────────── */}
      <nav className="max-w-7xl mx-auto px-6 lg:px-16 pt-8 pb-0">
        <ol className="flex items-center flex-wrap gap-2 text-[10px] text-brown-muted tracking-[0.25em] uppercase">
          <li>
            <a
              href="/"
              className="hover:text-rosewood transition-colors duration-200"
            >
              Home
            </a>
          </li>
          <li className="opacity-40">/</li>
          <li>
            <a
              href="/perfumes"
              className="hover:text-rosewood transition-colors duration-200"
            >
              Perfumes
            </a>
          </li>
          <li className="opacity-40">/</li>
          <li className="text-brown-mid truncate max-w-[200px]">
            {perfume.perfumeName}
          </li>
        </ol>
      </nav>

      {/* ── Main 2-col product section ───────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-6 lg:px-16 pt-10 pb-6 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
        {/* ── LEFT: Image column ─────────────────────────────────────────── */}
        <div className="flex flex-col gap-4 lg:sticky lg:top-6">
          {/* Main image card */}
          <div className="relative w-full aspect-[4/5] rounded-[2rem] overflow-hidden bg-gradient-to-br from-petal/50 via-peach/30 to-blush shadow-card group">
            {/* Soft ambient inner glow */}
            <div className="absolute inset-0 bg-gradient-to-tr from-petal/30 via-transparent to-peach/20 pointer-events-none z-10" />
            {/* Decorative ring */}
            <div className="absolute inset-6 rounded-[1.5rem] border border-white/40 pointer-events-none z-10" />

            {hasValidImage ? (
              <img
                src={perfume.uri}
                alt={perfume.perfumeName}
                className="absolute inset-0 w-full h-full object-contain p-10 transition-transform duration-700 group-hover:scale-105 z-0"
              />
            ) : (
              <div className="flex flex-col items-center justify-center h-full gap-3 z-0 relative">
                <span className="text-[7rem] leading-none opacity-20 select-none">
                  🌸
                </span>
                <span className="text-[10px] tracking-[0.35em] text-brown-muted uppercase">
                  No Image Available
                </span>
              </div>
            )}

            {/* Concentration pill floating badge */}
            <div className="absolute top-5 left-5 z-20 bg-white/75 backdrop-blur-md px-4 py-2 rounded-full border border-border-soft shadow-soft">
              <span className="text-[10px] font-semibold tracking-[0.22em] text-brown-dark uppercase">
                {perfume.concentration}
              </span>
            </div>
          </div>

          {/* Volume + audience info strip */}
          <div className="grid grid-cols-2 gap-3">
            <div className="flex items-center gap-3 px-5 py-4 bg-white/60 rounded-2xl border border-border-soft shadow-soft backdrop-blur-sm">
              <span className="text-lg opacity-60">💧</span>
              <div>
                <p className="text-[9px] tracking-[0.3em] text-brown-muted uppercase font-semibold">
                  Volume
                </p>
                <p className="text-sm font-semibold text-brown-dark leading-tight mt-0.5">
                  {perfume.volume} ml
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3 px-5 py-4 bg-white/60 rounded-2xl border border-border-soft shadow-soft backdrop-blur-sm">
              <span className="text-lg opacity-60">✨</span>
              <div>
                <p className="text-[9px] tracking-[0.3em] text-brown-muted uppercase font-semibold">
                  Audience
                </p>
                <p className="text-sm font-semibold text-brown-dark leading-tight mt-0.5">
                  {perfume.targetAudience}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ── RIGHT: Detail column ───────────────────────────────────────── */}
        <div className="flex flex-col gap-7">
          {/* Brand eyebrow */}
          <div className="flex items-center gap-3">
            <div className="h-px w-7 bg-rosewood/40" />
            <span className="text-[10px] tracking-[0.42em] text-rosewood uppercase font-semibold">
              {perfume.brand ?? "Independent Label"}
            </span>
          </div>

          {/* Perfume name — hero title */}
          <h1 className="text-4xl sm:text-5xl font-light leading-[1.1] tracking-tight text-brown-dark">
            {perfume.perfumeName}
          </h1>

          {/* Rating row */}
          <div className="flex items-center gap-4">
            <StarRating filled={avgRating} total={reviewCount} />
            {reviewCount > 0 && (
              <span className="text-[10px] tracking-[0.25em] text-brown-muted uppercase">
                {reviewCount} {reviewCount === 1 ? "review" : "reviews"}
              </span>
            )}
          </div>

          {/* Price block */}
          <div className="flex flex-col gap-1.5">
            <p className="text-[2.4rem] font-semibold text-rosewood leading-none tracking-tight">
              {perfume.price.toLocaleString("vi-VN")}
              <span className="text-2xl font-light">₫</span>
            </p>
            <p className="text-[11px] text-brown-muted tracking-wide">
              Free delivery on orders over 500,000₫
            </p>
          </div>

          {/* Short description */}
          <p className="text-brown-mid text-sm leading-relaxed line-clamp-3">
            {perfume.description}
          </p>

          {/* Metadata badges */}
          <div className="flex flex-wrap gap-3">
            <MetaBadge label="Volume" value={`${perfume.volume} ml`} />
            <MetaBadge label="Audience" value={perfume.targetAudience} />
            <MetaBadge label="Type" value={perfume.concentration} />
          </div>

          {/* Divider */}
          <div className="h-px bg-border-soft" />

          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            <button className="flex-1 py-4 bg-rosewood text-white text-[11px] font-bold tracking-[0.3em] uppercase rounded-[1.2rem] shadow-card hover:bg-rosewood-deep transition-all duration-300 active:scale-[0.97]">
              Buy Now
            </button>
            <button className="flex-1 py-4 border-2 border-border-soft text-brown-mid text-[11px] font-bold tracking-[0.3em] uppercase rounded-[1.2rem] hover:border-rosewood hover:text-rosewood hover:bg-petal/20 transition-all duration-300">
              Add to Cart
            </button>
          </div>

          {/* Trust / delivery badge */}
          <div className="flex items-center gap-4 px-5 py-4 bg-white/50 border border-border-soft rounded-2xl backdrop-blur-sm">
            <div className="w-9 h-9 rounded-full bg-petal flex items-center justify-center flex-shrink-0">
              <span className="text-rosewood text-base">✦</span>
            </div>
            <div>
              <p className="text-xs font-semibold text-brown-dark tracking-wide">
                Authentic Luxury Fragrance
              </p>
              <p className="text-[11px] text-brown-muted mt-0.5 leading-relaxed">
                100% genuine — sourced directly from certified suppliers.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Description & Ingredients ─────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-6 lg:px-16 py-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white/65 backdrop-blur-sm rounded-3xl p-8 border border-border-soft shadow-soft">
          <SectionHeading>Description</SectionHeading>
          <p className="text-brown-mid text-sm leading-[1.85] whitespace-pre-wrap">
            {perfume.description}
          </p>
        </div>

        <div className="bg-white/65 backdrop-blur-sm rounded-3xl p-8 border border-border-soft shadow-soft">
          <SectionHeading>Ingredients</SectionHeading>
          <p className="text-brown-mid text-sm leading-[1.85] whitespace-pre-wrap">
            {perfume.ingredients}
          </p>
        </div>
      </section>

      {/* ── Reviews / comments ────────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-6 lg:px-16 py-8 pb-24">
        <SectionHeading>
          Reviews{reviewCount > 0 ? ` · ${reviewCount}` : ""}
        </SectionHeading>

        {/* ── Write comment form ── */}
        <div className="mb-10 rounded-3xl border border-border-soft bg-white/65 p-6 shadow-soft backdrop-blur-sm md:p-8">
          <p className="mb-4 text-[10px] tracking-[0.38em] text-rosewood uppercase font-semibold">
            Viết đánh giá
          </p>
          <form onSubmit={handleSubmitComment} className="flex flex-col gap-4">
            <div>
              <label className="mb-2 block text-xs font-medium text-brown-dark">
                Đánh giá của bạn (1–5 sao)
              </label>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setCommentRating(star)}
                    className="focus:outline-none"
                    aria-label={`${star} sao`}
                  >
                    <svg
                      viewBox="0 0 20 20"
                      fill={star <= commentRating ? "#C07850" : "none"}
                      stroke="#C07850"
                      strokeWidth="1.3"
                      className="h-8 w-8 transition-opacity hover:opacity-80"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label htmlFor="comment-content" className="mb-2 block text-xs font-medium text-brown-dark">
                Nội dung
              </label>
              <textarea
                id="comment-content"
                value={commentContent}
                onChange={(e) => setCommentContent(e.target.value)}
                placeholder="Chia sẻ trải nghiệm của bạn về mùi hương này..."
                rows={4}
                className="w-full resize-none rounded-xl border border-border-soft bg-white/80 px-4 py-3 text-sm text-brown-dark placeholder:text-brown-muted outline-none transition-colors focus:border-rosewood focus:ring-1 focus:ring-rosewood/30"
              />
            </div>
            {commentError && (
              <p className="text-xs text-red-500">{commentError}</p>
            )}
            <button
              type="submit"
              disabled={commentSubmitting}
              className="self-start rounded-xl bg-rosewood px-6 py-3 text-xs font-semibold uppercase tracking-wider text-white transition-colors hover:bg-rosewood-deep disabled:cursor-not-allowed disabled:opacity-50"
            >
              {commentSubmitting ? "Đang gửi..." : "Gửi đánh giá"}
            </button>
          </form>
        </div>

        {reviewCount === 0 ? (
          /* ── Empty state ── */
          <div className="flex flex-col items-center justify-center py-20 gap-5 bg-white/40 rounded-3xl border border-dashed border-petal-deep/60">
            <div className="w-16 h-16 rounded-full bg-petal/40 flex items-center justify-center">
              <span className="text-2xl text-rosewood/50 select-none">✦</span>
            </div>
            <div className="text-center">
              <p className="text-sm font-medium text-brown-mid tracking-wide">
                No reviews yet
              </p>
              <p className="text-xs text-brown-muted mt-1 tracking-wide">
                Be the first to share your experience with this fragrance.
              </p>
            </div>
          </div>
        ) : (
          /* ── Review cards ── */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {reviews.map((review, idx) => {
              const authorName = review.author
                ? String(review.author)
                : "Anonymous";
              const initial = authorName.charAt(0).toUpperCase();
              const ratingVal =
                typeof review.rating === "number" ? review.rating : 4;

              return (
                <div
                  key={review._id ?? idx}
                  className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-border-soft shadow-soft flex flex-col gap-4 hover:shadow-card transition-shadow duration-300"
                >
                  {/* Author row */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-gradient-to-br from-petal to-peach flex items-center justify-center flex-shrink-0 shadow-soft">
                        <span className="text-brown-dark font-bold text-xs">
                          {initial}
                        </span>
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-brown-dark leading-tight">
                          {authorName}
                        </p>
                        {review.createdAt && (
                          <p className="text-[10px] text-brown-muted mt-0.5">
                            {new Date(
                              String(review.createdAt),
                            ).toLocaleDateString("en-GB", {
                              day: "2-digit",
                              month: "short",
                              year: "numeric",
                            })}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Star rating */}
                  <StarRating filled={ratingVal} total={ratingVal} />

                  {/* Comment content */}
                  <p className="text-brown-mid text-sm leading-relaxed">
                    {review.content
                      ? String(review.content)
                      : "No content provided."}
                  </p>
                </div>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
}
