import { getCommunitiesForHome } from '@/api/home';
import { useSuspenseQuery } from '@tanstack/react-query';

export const useGetCommunitiesForHome = () => {
  return useSuspenseQuery({
    queryKey: ['forhopme'],
    queryFn: () => getCommunitiesForHome(),
  });
};
