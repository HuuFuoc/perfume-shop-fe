import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { CheckCircle, XCircle, Loader2 } from "lucide-react";
import { AuthShell } from "../../components/auth/AuthShell";
import { AuthService } from "../../services/auth/auth.services";
import { HttpException } from "../../app/exceptions";
import { ROUTER_URL } from "../../consts/router.path.const";

type VerifyState = "loading" | "success" | "error" | "no-token";

export default function VerifyEmail() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [state, setState] = useState<VerifyState>("loading");
  const [errorMessage, setErrorMessage] = useState<string>(
    "Liên kết xác minh không hợp lệ hoặc đã hết hạn.",
  );

  useEffect(() => {
    const token = searchParams.get("email_verify_token");

    if (!token) {
      setState("no-token");
      return;
    }

    AuthService.verifyEmail(token)
      .then(() => {
        setState("success");
      })
      .catch((err: unknown) => {
        if (err instanceof HttpException && err.status === 422) {
          setErrorMessage("Liên kết xác minh không hợp lệ hoặc đã hết hạn.");
        } else {
          setErrorMessage("Đã xảy ra lỗi. Vui lòng thử lại sau.");
        }
        setState("error");
      });
  }, [searchParams]);

  return (
    <AuthShell>
      <div className="flex flex-col items-center text-center">
        {state === "loading" && (
          <>
            <Loader2
              size={44}
              className="animate-spin mb-6"
              style={{ color: "#C07850" }}
            />
            <h1
              className="font-serif text-2xl lg:text-[28px] font-bold mb-2 leading-snug"
              style={{ color: "#3D2B1F" }}
            >
              Đang xác minh...
            </h1>
            <p className="text-sm" style={{ color: "#7A5C52" }}>
              Vui lòng chờ trong giây lát.
            </p>
          </>
        )}

        {state === "success" && (
          <>
            <div
              className="w-16 h-16 rounded-full flex items-center justify-center mb-6"
              style={{ backgroundColor: "#C07850" }}
            >
              <CheckCircle size={30} style={{ color: "#F8EDEB" }} />
            </div>
            <h1
              className="font-serif text-2xl lg:text-[28px] font-bold mb-2 leading-snug"
              style={{ color: "#3D2B1F" }}
            >
              Xác minh thành công!
            </h1>
            <p className="text-sm mb-8" style={{ color: "#7A5C52" }}>
              Email của bạn đã được xác minh. Bạn có thể đăng nhập ngay bây giờ.
            </p>
            <div
              className="w-full"
              style={{
                borderTop: "1px solid #E8D5CF",
                marginBottom: "1.75rem",
              }}
            />
            <button
              onClick={() => navigate(ROUTER_URL.AUTH.LOGIN)}
              className="w-full h-[48px] rounded-xl text-sm font-semibold tracking-[0.12em] uppercase transition-all duration-200 hover:brightness-110 active:scale-[0.98] shadow-sm"
              style={{ backgroundColor: "#C07850", color: "#F8EDEB" }}
            >
              Đăng nhập
            </button>
          </>
        )}

        {(state === "error" || state === "no-token") && (
          <>
            <div
              className="w-16 h-16 rounded-full flex items-center justify-center mb-6"
              style={{ backgroundColor: "#3D2B1F" }}
            >
              <XCircle size={30} style={{ color: "#F8EDEB" }} />
            </div>
            <h1
              className="font-serif text-2xl lg:text-[28px] font-bold mb-2 leading-snug"
              style={{ color: "#3D2B1F" }}
            >
              Xác minh thất bại
            </h1>
            <p className="text-sm mb-8" style={{ color: "#7A5C52" }}>
              {state === "no-token"
                ? "Liên kết không hợp lệ. Vui lòng kiểm tra lại email của bạn."
                : errorMessage}
            </p>
            <div
              className="w-full"
              style={{
                borderTop: "1px solid #E8D5CF",
                marginBottom: "1.75rem",
              }}
            />
            <button
              onClick={() => navigate(ROUTER_URL.PUBLIC.HOME)}
              className="w-full h-[48px] rounded-xl text-sm font-semibold tracking-[0.12em] uppercase transition-all duration-200 hover:brightness-110 active:scale-[0.98] shadow-sm"
              style={{ backgroundColor: "#3D2B1F", color: "#F8EDEB" }}
            >
              Về trang chủ
            </button>
          </>
        )}
      </div>
    </AuthShell>
  );
}
