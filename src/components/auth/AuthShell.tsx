import type { ReactNode } from "react";

interface AuthShellProps {
  children: ReactNode;
}

const BrandPanel = () => (
  <div
    className="hidden lg:flex lg:w-[44%] flex-col items-center justify-center relative overflow-hidden p-14 shrink-0"
    style={{ backgroundColor: "#3D2B1F" }}
  >
    {/* Decorative blobs */}
    <div
      className="absolute -top-24 -left-24 w-80 h-80 rounded-full"
      style={{ backgroundColor: "#C07850", opacity: 0.08 }}
    />
    <div
      className="absolute -bottom-16 -right-16 w-64 h-64 rounded-full"
      style={{ backgroundColor: "#C07850", opacity: 0.1 }}
    />
    <div
      className="absolute top-1/3 -right-8 w-32 h-32 rounded-full"
      style={{ backgroundColor: "#FCD5CE", opacity: 0.07 }}
    />
    <div
      className="absolute bottom-1/3 -left-8 w-20 h-20 rounded-full"
      style={{ backgroundColor: "#FCD5CE", opacity: 0.07 }}
    />

    {/* Content */}
    <div className="relative z-10 text-center select-none">
      {/* Logo mark */}
      <div
        className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-8 shadow-lg"
        style={{ backgroundColor: "#C07850" }}
      >
        <span className="text-2xl" style={{ color: "#F8EDEB" }}>
          ✦
        </span>
      </div>

      <div
        className="font-serif text-3xl font-bold tracking-[0.22em] uppercase mb-1"
        style={{ color: "#F8EDEB" }}
      >
        Perfume
      </div>
      <div
        className="text-[10px] tracking-[0.42em] uppercase font-light mb-10"
        style={{ color: "#C07850" }}
      >
        Maison de Luxe
      </div>

      <div
        className="w-10 h-px mx-auto mb-10"
        style={{ backgroundColor: "#C07850" }}
      />

      <p
        className="text-sm leading-relaxed max-w-[260px] mx-auto"
        style={{ color: "#B09490" }}
      >
        Khám phá thế giới nước hoa cao cấp. Mỗi mùi hương là một câu chuyện, mỗi
        chai là một tác phẩm nghệ thuật.
      </p>

      {/* Bottom quotes */}
      <div className="mt-16 space-y-1">
        <div className="text-xs italic font-light" style={{ color: "#7A5C52" }}>
          "A fragrance is an invisible accessory
        </div>
        <div className="text-xs italic font-light" style={{ color: "#7A5C52" }}>
          that speaks louder than words."
        </div>
      </div>
    </div>
  </div>
);

const MobileBrand = () => (
  <div className="flex items-center gap-2.5 mb-10 lg:hidden">
    <div
      className="w-9 h-9 rounded-full flex items-center justify-center shadow-sm"
      style={{ backgroundColor: "#C07850" }}
    >
      <span className="text-sm" style={{ color: "#F8EDEB" }}>
        ✦
      </span>
    </div>
    <div className="leading-tight">
      <div
        className="font-serif text-base font-bold tracking-[0.18em] uppercase"
        style={{ color: "#3D2B1F" }}
      >
        Perfume
      </div>
      <div
        className="text-[9px] tracking-[0.3em] uppercase font-light"
        style={{ color: "#C07850" }}
      >
        Maison de Luxe
      </div>
    </div>
  </div>
);

export const AuthShell = ({ children }: AuthShellProps) => (
  <div className="min-h-screen flex" style={{ backgroundColor: "#F8EDEB" }}>
    <BrandPanel />

    {/* Form side */}
    <div className="flex-1 flex items-center justify-center p-6 sm:p-10 lg:p-16 overflow-y-auto">
      <div className="w-full max-w-[420px]">
        <MobileBrand />
        {children}
      </div>
    </div>
  </div>
);
