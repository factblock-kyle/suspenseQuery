import { useMutation } from '@tanstack/react-query';

import { postDescriptionImage } from '@/api/event/description-image';
import useAuthAxios from '@hooks/useAuthAxios';

const usePostEventDescriptionImage = () => {
  const axiosInstance = useAuthAxios();
  return useMutation({
    mutationFn: (body: FormData) => postDescriptionImage(body, axiosInstance),
  });
};

export default usePostEventDescriptionImage;
