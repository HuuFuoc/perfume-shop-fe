import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { cn } from "../../lib/utils";

interface AuthInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export const AuthInput: React.FC<AuthInputProps> = ({
  label,
  error,
  type = "text",
  className,
  id,
  ...props
}) => {
  const [showPass, setShowPass] = useState(false);
  const isPassword = type === "password";
  const inputType = isPassword ? (showPass ? "text" : "password") : type;
  const inputId = id ?? label.toLowerCase().replace(/\s+/g, "-");

  return (
    <div className="flex flex-col gap-1.5">
      <label
        htmlFor={inputId}
        className="text-[11px] font-semibold tracking-[0.12em] uppercase"
        style={{ color: "#7A5C52" }}
      >
        {label}
      </label>
      <div className="relative">
        <input
          id={inputId}
          type={inputType}
          className={cn(
            "w-full h-[48px] px-4 rounded-xl border text-sm outline-none transition-all duration-200",
            "bg-white border-[#E8D5CF] text-[#3D2B1F] placeholder:text-[#B09490]",
            "focus:border-[#C07850] focus:ring-2 focus:ring-[#C07850]/20",
            error &&
              "border-red-400 focus:border-red-400 focus:ring-red-400/20",
            isPassword && "pr-12",
            className,
          )}
          {...props}
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPass((v) => !v)}
            aria-label={showPass ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
            className="absolute right-3 top-1/2 -translate-y-1/2 transition-colors duration-150"
            style={{ color: "#B09490" }}
            tabIndex={-1}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#C07850")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "#B09490")}
          >
            {showPass ? <EyeOff size={17} /> : <Eye size={17} />}
          </button>
        )}
      </div>
      {error && <p className="text-[11px] text-red-500 mt-0.5">{error}</p>}
    </div>
  );
};
