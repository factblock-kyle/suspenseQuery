import { AxiosInstance } from 'axios';

export const postDescriptionImage = async (
  request: FormData,
  axiosInstance: AxiosInstance,
) => {
  const { data } = await axiosInstance.post<{ image_url: string }>(
    '/v1/event/description-image',
    request,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    },
  );

  return data;
};
