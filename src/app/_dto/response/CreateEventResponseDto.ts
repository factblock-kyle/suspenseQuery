export interface CreateEventResponseDto {
  event_id: number;
}

export interface CreateEventErrorResponseDto {
  code: number;
  fields: string;
  message: string;
}
