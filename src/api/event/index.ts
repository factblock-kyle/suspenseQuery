import { AxiosInstance } from 'axios';

import { CreateEventRequestDto } from '@dto/request/CreateEventRequestDto';
import {
  CreateEventErrorResponseDto,
  CreateEventResponseDto,
} from '@dto/response/CreateEventResponseDto';

export const createEvent = async (
  request: CreateEventRequestDto,
  axiosInstance: AxiosInstance,
) => {
  const { data } = await axiosInstance.post<
    CreateEventResponseDto | CreateEventErrorResponseDto
  >('/v1/event', request);

  return data;
};
