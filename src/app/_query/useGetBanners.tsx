import { useSuspenseQuery } from '@tanstack/react-query';

import { getBanners } from '@/api/home';
import { BannerPrams } from '@dto/bannerprams';

export const useGetBanners = () => {
  return useSuspenseQuery({
    queryKey: ['banners'],
    queryFn: () => getBanners(),
  });
};
