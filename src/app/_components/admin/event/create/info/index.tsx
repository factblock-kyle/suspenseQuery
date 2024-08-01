import { useState } from 'react';

import { useParams, usePathname, useSearchParams } from 'next/navigation';

import dayjs from 'dayjs';

import { LNG_PRAMS } from '@constants/index';
import DateRangePicker from '@core/DateRangePicker';
import Editor from '@core/Editor';
import TextInput from '@core/TextInput';
import { CreateEventRequestDto } from '@dto/request/CreateEventRequestDto';
import { EventStep } from '@enum/eventStep';
import useToast from '@hooks/useToast';
import useUpdateQueryParams from '@hooks/useUpdateQueryParams';
import useCreateEventQuery from '@query/event/useCreateEvent';
import roundHalfTime from '@utils/setRoundHalfTime';

import * as S from './styles.css';

export default function Index() {
  const { lng, communityId }: { lng: string; communityId: string } =
    useParams();

  const pathname = usePathname();
  const isCreate = pathname.includes('event/create');
  const isUpdate = pathname.includes('event/update');

  const searchParams = useSearchParams();
  const eventId = searchParams.get('eventId') as string;

  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');

  // 이벤트 수정일 경우 api로 값 받아와서 처리하는 건 나중에 하자.
  const [startDate, setStartDate] = useState<Date | null>(roundHalfTime(lng));
  const [endDate, setEndDate] = useState<Date | null>(roundHalfTime(lng, 30));

  const { mutateAsync: createEvent } = useCreateEventQuery();
  const updateQueryAndNavigate = useUpdateQueryParams(
    lng,
    `admin/${communityId}/event/create`,
  );

  const toast = useToast();

  const handleTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const getParseData = async () => {
    const parseData: CreateEventRequestDto = {
      title,
      description,
      community_id: Number(communityId),
      end_at: dayjs(endDate)
        .add(lng === 'en' ? 9 : 0, 'hours')
        .toISOString(),
      lang: LNG_PRAMS[lng],
      start_at: dayjs(startDate)
        .add(lng === 'en' ? 9 : 0, 'hours')
        .toISOString(),
    };
    return parseData;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const parseData = await getParseData();
    if (isCreate) {
      // 이미 1단계 저장한 상태에서 또 저장할 경우, 이벤트 다시 만들면 안 됨.
      if (eventId) {
        console.log('나중에 하자');
      } else {
        const response = await createEvent(parseData);
        if ('event_id' in response && response.event_id) {
          toast.success('1단계 생성 성공');
          updateQueryAndNavigate({
            step: EventStep.QUEST,
            eventId: response.event_id.toString(),
          });
          // zustand에 저장해서 2단계에서 새로고침해도 1단계 남아있게 수정? or load할때마다 api 쏴서 받아오기?
        } else {
          toast.error('1단계 생성 실패');
        }
      }
    } else if (isUpdate) {
      console.log('나중에 하자');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextInput
        label="이벤트 제목"
        value={title}
        onChange={handleTitle}
        required
        maxLength={80}
        placeholder="이벤트 제목을 입력해주세요."
      />
      <br /> <br />
      <p>기간*</p>
      <DateRangePicker
        minDate={roundHalfTime(lng)}
        startDate={startDate}
        setStartDate={setStartDate}
        endDate={endDate}
        setEndDate={setEndDate}
        lng={lng}
        filterTime
      />
      <br /> <br />
      <p>설명*</p>
      <Editor
        communityId={149}
        value={description}
        onChange={setDescription}
        placeholder="이벤트 설명을 입력해주세요."
      />
      <br /> <br />
      <div className={S.buttonWrapper}>
        <button type="button">{isCreate ? '나가기' : '취소'}</button>
        <button type="submit" disabled={!title || !description}>
          저장
        </button>
      </div>
    </form>
  );
}
