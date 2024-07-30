'use client';

import customAxios from '@utils/customAxios';

const useAuthAxios = () =>
  // next-auth 작업 부분은 kyle 추후 작업 예정.
  customAxios;

export default useAuthAxios;
