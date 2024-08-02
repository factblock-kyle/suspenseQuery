'use client';

import axios from 'axios';
import { useSession } from 'next-auth/react';

import {
  LoginResponseType,
  PostRefreshTokenArgsType,
} from '@dto/response/user/LoginResponseDto';
import { keysToSnakeCase } from '@utils/query/keysToSnakeCase';

export const useRefreshToken = () => {
  const { data: session, update } = useSession();

  const refreshToken = async () => {
    const args: PostRefreshTokenArgsType = {
      userId: session?.userId || 0,
      accessToken: session?.accessToken || '',
      refreshToken: session?.refreshToken || '',
    };

    const { data } = await axios.post<LoginResponseType>(
      `${process.env.NEXT_PUBLIC_DEV_ENDPOINT}/v1/user/jwt/refresh`,
      {
        ...keysToSnakeCase(args),
      },
    );

    await update({
      ...session,
      accessToken: data.access_token,
      refreshToken: data.refresh_token,
    });

    if (session) {
      session.accessToken = data.access_token;
      session.refreshToken = data.refresh_token;
    }

    // else need to signIn
  };

  return refreshToken;
};
