export interface LoginReq {
  email: string;
  password: string;
}

export interface RegisterReq {
  email: string;
  password: string;
  confirmPassword: string;
  name: string;
  date_of_birth: string;
}

export interface ChangePasswordReq {
  old_password: string;
  new_password: string;
  confirm_new_password: string;
}
