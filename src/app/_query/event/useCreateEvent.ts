import { useMutation } from '@tanstack/react-query';

import { createEvent } from '@/api/event';
import { CreateEventRequestDto } from '@dto/request/CreateEventRequestDto';
import useAuthAxios from '@hooks/useAuthAxios';

const useCreateEventQuery = () => {
  const axiosInstance = useAuthAxios();
  return useMutation({
    mutationFn: (request: CreateEventRequestDto) =>
      createEvent(request, axiosInstance),
  });
};

export default useCreateEventQuery;
