import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
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
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-10 text-center shadow-md">
        {state === "loading" && (
          <>
            <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-4 border-gray-200 border-t-gray-700" />
            <p className="text-gray-600">Đang xác minh email của bạn...</p>
          </>
        )}

        {state === "success" && (
          <>
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-green-100">
              <svg
                className="h-7 w-7 text-green-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <h2 className="mb-2 text-xl font-semibold text-gray-800">
              Xác minh thành công!
            </h2>
            <p className="mb-6 text-gray-500">
              Email của bạn đã được xác minh. Bạn có thể đăng nhập ngay bây giờ.
            </p>
            <button
              onClick={() => navigate(ROUTER_URL.AUTH.LOGIN)}
              className="rounded-lg bg-gray-800 px-6 py-2.5 text-sm font-medium text-white transition hover:bg-gray-700"
            >
              Đăng nhập
            </button>
          </>
        )}

        {(state === "error" || state === "no-token") && (
          <>
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-red-100">
              <svg
                className="h-7 w-7 text-red-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </div>
            <h2 className="mb-2 text-xl font-semibold text-gray-800">
              Xác minh thất bại
            </h2>
            <p className="mb-6 text-gray-500">
              {state === "no-token"
                ? "Liên kết không hợp lệ. Vui lòng kiểm tra lại email của bạn."
                : errorMessage}
            </p>
            <button
              onClick={() => navigate(ROUTER_URL.PUBLIC.HOME)}
              className="rounded-lg bg-gray-800 px-6 py-2.5 text-sm font-medium text-white transition hover:bg-gray-700"
            >
              Về trang chủ
            </button>
          </>
        )}
      </div>
    </div>
  );
}
