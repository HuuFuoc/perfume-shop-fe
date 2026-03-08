import { BaseService } from "../../app/api/base.service";
import type { ResponseSuccess } from "../../app/interface";
import { API_PATH } from "../../consts/api.path.const";

export const AuthService = {
  verifyEmail(email_verify_token: string) {
    return BaseService.get<ResponseSuccess<null>>({
      url: API_PATH.AUTH.VERIFY_EMAIL,
      payload: { email_verify_token },
      isLoading: false,
    });
  },
};
