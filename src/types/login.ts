// NOTE : 추후 수정 예정 (임시 로그인)
export interface PostLoginRequest {
  loginId: string;
  password: string;
}

export interface PostLoginResponse {
  accessToken: string;
  refreshToken: string;
}

export interface PostRefreshRequest {
  refreshToken: string;
}
