import { Pencil, Trash2 } from "lucide-react";

// ── Design tokens (đồng bộ với admin layout & tailwind) ─────────────────────
export const ADMIN_ROSEWOOD = "#C07850";
export const ADMIN_BROWN_DARK = "#3D2B1F";
export const ADMIN_BORDER_SOFT = "#E8D5CF";
export const ADMIN_PANEL_BG = "#FDF0ED";
export const ADMIN_MUTED = "#B09490";
export const ADMIN_ROW_HOVER = "rgba(252,213,206,0.35)";
export const ADMIN_THEAD_BG = "rgba(248,237,235,0.9)";

// ── Admin page header: tiêu đề + mô tả + nút hành động chính ──────────────
export function AdminPageHeader({
  title,
  subtitle,
  actionLabel,
  actionIcon,
  onAction,
  count,
}: {
  title: string;
  subtitle: string;
  actionLabel?: string;
  actionIcon?: React.ReactNode;
  onAction?: () => void;
  count?: number;
}) {
  return (
    <div className="mb-6 flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <div className="flex items-baseline gap-2 flex-wrap">
          <h1
            className="text-xl font-semibold tracking-tight"
            style={{ color: ADMIN_BROWN_DARK }}
          >
            {title}
          </h1>
          {count !== undefined && (
            <span
              className="text-sm font-medium tabular-nums"
              style={{ color: ADMIN_MUTED }}
            >
              {count} mục
            </span>
          )}
        </div>
        <p className="mt-1 text-sm" style={{ color: ADMIN_MUTED }}>
          {subtitle}
        </p>
      </div>
      {actionLabel && onAction && (
        <button
          type="button"
          onClick={onAction}
          className="mt-3 sm:mt-0 flex items-center justify-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:opacity-90 active:scale-[0.98] shrink-0"
          style={{ backgroundColor: ADMIN_ROSEWOOD }}
        >
          {actionIcon}
          {actionLabel}
        </button>
      )}
    </div>
  );
}

// ── Wrapper bảng: bo góc, border, nền, overflow ───────────────────────────
export function AdminTableWrapper({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`overflow-hidden rounded-2xl border shadow-sm ${className}`}
      style={{
        borderColor: ADMIN_BORDER_SOFT,
        backgroundColor: ADMIN_PANEL_BG,
        boxShadow: "0 2px 16px 0 rgba(180,120,100,0.08)",
      }}
    >
      {children}
    </div>
  );
}

// ── Badge trạng thái: Đã xác thực / Chưa xác thực ──────────────────────────
export function AdminVerifyBadge({ verified }: { verified: boolean }) {
  return (
    <span
      className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium"
      style={
        verified
          ? { backgroundColor: "rgba(34,197,94,0.12)", color: "#15803d" }
          : { backgroundColor: "rgba(148,163,184,0.2)", color: "#64748b" }
      }
    >
      {verified ? "Đã xác thực" : "Chưa xác thực"}
    </span>
  );
}

// ── Badge vai trò: map số sang text thân thiện ─────────────────────────────
export function AdminRoleBadge({ role }: { role: number | string }) {
  const r = typeof role === "string" ? parseInt(role, 10) : role;
  const label =
    r === 0
      ? "Quản trị viên"
      : r === 2
        ? "Thành viên"
        : Number.isNaN(r) || r == null
          ? "—"
          : "Thành viên";
  return (
    <span
      className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium"
      style={{
        backgroundColor: r === 0 ? "rgba(192,120,80,0.15)" : "rgba(248,237,235,0.9)",
        color: r === 0 ? ADMIN_ROSEWOOD : ADMIN_BROWN_DARK,
        border: `1px solid ${ADMIN_BORDER_SOFT}`,
      }}
    >
      {label}
    </span>
  );
}

// ── Nút icon hành động: Sửa + Xóa, vùng bấm rõ, hover đẹp ──────────────────
export function AdminActionButtons({
  onEdit,
  onDelete,
  editTitle = "Chỉnh sửa",
  deleteTitle = "Xóa",
  deleteDisabled = false,
}: {
  onEdit: () => void;
  onDelete: () => void;
  editTitle?: string;
  deleteTitle?: string;
  deleteDisabled?: boolean;
}) {
  return (
    <div className="flex items-center justify-end gap-1">
      <button
        type="button"
        onClick={onEdit}
        className="flex h-9 w-9 items-center justify-center rounded-xl transition-colors hover:opacity-90"
        style={{ backgroundColor: "rgba(192,120,80,0.12)", color: ADMIN_ROSEWOOD }}
        title={editTitle}
      >
        <Pencil size={16} />
      </button>
      <button
        type="button"
        onClick={onDelete}
        disabled={deleteDisabled}
        className="flex h-9 w-9 items-center justify-center rounded-xl transition-colors hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed"
        style={{
          backgroundColor: "rgba(220,80,80,0.1)",
          color: "#C05050",
        }}
        title={deleteTitle}
      >
        <Trash2 size={16} />
      </button>
    </div>
  );
}
