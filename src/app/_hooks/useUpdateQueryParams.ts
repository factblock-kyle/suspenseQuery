'use client';

import { useCallback } from 'react';

import { useRouter, useSearchParams } from 'next/navigation';

type UseUpdateQueryParams = (
  lng: string,
  url: string,
) => (queryParams: Record<string, string>) => void;

const useUpdateQueryParams: UseUpdateQueryParams = (
  lng: string,
  url: string,
) => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const updateQueryAndNavigate = useCallback(
    (queryParams: Record<string, string>) => {
      const params = new URLSearchParams(searchParams.toString());

      Object.entries(queryParams).forEach(([key, value]) => {
        if (value !== '') {
          params.set(key, value);
        } else {
          params.delete(key);
        }
      });

      router.push(`/${lng}/${url}?${params.toString()}`);
    },
    [lng, router, searchParams, url],
  );

  return updateQueryAndNavigate;
};

export default useUpdateQueryParams;
