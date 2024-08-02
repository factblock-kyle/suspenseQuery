import axios from "axios";

import { PostLoginArgs } from "@dto/request/user/LoginRequestDto";
import { LoginErrorResponseType, LoginResponseType } from "@dto/response/user/LoginResponseDto";
import { keysToSnakeCase } from "@utils/query/keysToSnakeCase";

export const postLogin = async (args: PostLoginArgs) => {
    // cookie remove는 useSaveTrackIdInCookie에서 함.
    try {
      const response = await axios.post<
        LoginResponseType | LoginErrorResponseType
      >(`${process.env.NEXT_PUBLIC_DEV_ENDPOINT}/v1/user/login`, {
        ...keysToSnakeCase(args),
      });
      if (response.status === 200) {
        return [response.status, response.data as LoginResponseType];
      }
      return [response.status, response.data as LoginErrorResponseType];
    } catch (error) {
      console.error(`post login error: ${error}`);
      throw error;
    }
  };