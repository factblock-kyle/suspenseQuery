import { useSuspenseQuery } from '@tanstack/react-query';

import { getBanners } from '@/api/home';
import { BannerPrams } from '@dto/bannerprams';

export const useGetBanners = (params: BannerPrams) => {
  return useSuspenseQuery({
    queryKey: [params],
    queryFn: () => getBanners(params),
  });
};
