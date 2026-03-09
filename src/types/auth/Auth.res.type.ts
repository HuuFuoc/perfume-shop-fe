export interface LoginRes {
  message: string;
  result: {
    access_token: string;
    refresh_token: string;
  };
}
