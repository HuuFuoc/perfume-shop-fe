import { BaseService } from "../../app/api/base.service";
import type { ResponseSuccess } from "../../app/interface";
import { API_PATH } from "../../consts/api.path.const";

// ── Auth request / response types ────────────────────────────────────────────
export interface LoginReq {
  email: string;
  password: string;
}

export interface RegisterReq {
  name: string;
  email: string;
  password: string;
  confirm_password: string;
  date_of_birth: string;
}

/** Tokens returned by the backend on successful login */
export interface LoginResult {
  access_token: string;
  refresh_token: string;
}

/**
 * Actual backend login response shape:
 * { message: string; result: { access_token: string; refresh_token: string } }
 */
export interface LoginResponseBody {
  message: string;
  result: LoginResult;
}

/** Shape returned by the backend on successful register */
export interface RegisterRes {
  _id: string;
  email: string;
  name?: string;
}

export const AuthService = {
  /** POST /user/login — returns { message, result: { access_token, refresh_token } } */
  login(payload: LoginReq) {
    return BaseService.post<LoginResponseBody>({
      url: API_PATH.AUTH.LOGIN,
      payload,
      isLoading: false,
    });
  },

  /** POST /user/register — creates a new user account */
  register(payload: RegisterReq) {
    return BaseService.post<ResponseSuccess<RegisterRes>>({
      url: API_PATH.AUTH.REGISTER,
      payload,
      isLoading: false,
    });
  },

  verifyEmail(email_verify_token: string) {
    return BaseService.get<ResponseSuccess<null>>({
      url: API_PATH.AUTH.VERIFY_EMAIL,
      payload: { email_verify_token },
      isLoading: false,
    });
  },
};
