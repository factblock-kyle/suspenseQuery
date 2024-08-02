/* eslint-disable no-param-reassign */

'use client';

import { useEffect } from 'react';

import { AxiosError } from 'axios';
import { signOut, useSession } from 'next-auth/react';

import { axiosAuth } from '@utils/customAxios';

import { useRefreshToken } from './useRefreshToken';

const useAuthAxios = () => { 
const { data: session } = useSession();
const refreshToken = useRefreshToken();

useEffect(() => {
  const requestIntercept = axiosAuth.interceptors.request.use(
    (config) => {
      if (!config.headers.Authorization) {
        config.headers.Authorization = `Bearer ${session?.accessToken}`;
      }

      return config;
    },
    (error) => Promise.reject(error),
  );

  const responseIntercept = axiosAuth.interceptors.response.use(
    (response) => response,
    async (error) => {
      const preRequest = error?.config;
      if (error.response.status === 401 && !preRequest.sent) {
        preRequest.sent = true;

        try {
          await refreshToken();
        } catch (err) {
          const axiosError = err as AxiosError;
          if (axiosError.response?.status === 401) {
            signOut();
          }
        }
        preRequest.headers.Authorization = `Bearer ${session?.accessToken}`;

        return axiosAuth(preRequest);
      }

      return Promise.reject(error);
    },
  );

  return () => {
    axiosAuth.interceptors.request.eject(requestIntercept);
    axiosAuth.interceptors.response.eject(responseIntercept);
  };
}, [session, refreshToken]);

return axiosAuth;
};

export default useAuthAxios;
