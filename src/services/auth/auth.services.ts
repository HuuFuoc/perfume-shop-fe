import { BaseService } from "../../app/api/base.service";
import type { ResponseSuccess } from "../../app/interface";
import { API_PATH } from "../../consts/api.path.const";

/** Current user profile returned by POST /user/get-me */
export interface UserProfile {
  _id: string;
  name: string;
  email: string;
  date_of_birth: string;
  bio?: string;
  location?: string;
  website?: string;
  username?: string;
  avatar?: string;
  cover_photo?: string;
  role?: number | string;
  verify?: number;
}

export interface GetMeResponse {
  message: string;
  data: UserProfile;
}

/** Payload for PUT /user/update-me (all optional) */
export interface UpdateMeReq {
  name?: string;
  date_of_birth?: string;
  bio?: string;
  location?: string;
  website?: string;
}

export interface UpdateMeResponse {
  message: string;
  data: UserProfile;
}

/** Payload for PUT /user/change-password */
export interface ChangePasswordReq {
  old_password: string;
  new_password: string;
  confirm_new_password: string;
}

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

  /** POST /user/get-me — get current user (requires auth token) */
  getMe() {
    return BaseService.post<GetMeResponse>({
      url: API_PATH.USER.GET_ME,
      payload: {},
      isLoading: false,
    });
  },

  /** PUT /user/update-me — update current user profile */
  updateMe(payload: UpdateMeReq) {
    return BaseService.put<UpdateMeResponse>({
      url: API_PATH.USER.UPDATE_ME,
      payload,
      isLoading: false,
    });
  },

  /** PUT /user/change-password — change password */
  changePassword(payload: ChangePasswordReq) {
    return BaseService.put<{ message: string }>({
      url: API_PATH.USER.CHANGE_PASSWORD,
      payload,
      isLoading: false,
    });
  },
};
