'use client';

import { BannerPrams } from '@dto/bannerprams';
import { useGetBanners } from '@query/useGetBanners';

export function Banner() {
  const homeBannerPrams: BannerPrams = {
    lang: 'KR',
    page: '1',
    community_id: undefined,
  };
  const { data } = useGetBanners(homeBannerPrams);
  return <div>First Query using Suspense</div>;
}
