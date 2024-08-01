import { useMutation } from '@tanstack/react-query';

import { postDescriptionImage } from '@/api/event/description-image';
import useAuthAxios from '@hooks/useAuthAxios';

const usePostEventDescriptionImageQueryQuery = () => {
  const axiosInstance = useAuthAxios();
  return useMutation({
    mutationFn: (request: FormData) =>
      postDescriptionImage(request, axiosInstance),
  });
};

export default usePostEventDescriptionImageQueryQuery;
