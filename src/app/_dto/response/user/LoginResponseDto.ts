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
  