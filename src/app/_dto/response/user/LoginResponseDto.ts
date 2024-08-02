export type LoginResponseType = {
    access_token: string;
    refresh_token: string;
    need_agreement: boolean;
  };
  
  export type LoginErrorResponseType = {
    code: number;
    fields: string;
    message: string;
  };
  
  export type PostRefreshTokenArgsType = {
    userId: number;
    accessToken: string;
    refreshToken: string;
  };