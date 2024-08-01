'use client';

import { useSearchParams, usePathname, useParams } from 'next/navigation';

import { EventStep } from '@enum/eventStep';
import useUpdateQueryParams from '@hooks/useUpdateQueryParams';

import * as S from './styles.css';

export default function Index() {
  const searchParams = useSearchParams();
  const step = searchParams.get('step') as EventStep;
  const eventId = searchParams.get('eventId') as string;

  const pathname = usePathname();
  const isCreate = pathname.includes('event/create');
  const isUpdate = pathname.includes('event/update');

  const { lng, communityId }: { lng: string; communityId: string } =
    useParams();

  const updateQueryAndNavigate = useUpdateQueryParams(
    lng,
    `admin/${communityId}/event/create`,
  );

  const navigateToAnotherStep = (targetStep: EventStep) => {
    if (eventId) {
      updateQueryAndNavigate({ step: targetStep, eventId });
    } else {
      updateQueryAndNavigate({ step: targetStep });
    }
  };

  const handleClickStep1 = () => {
    navigateToAnotherStep(EventStep.INFO);
  };
  const handleClickStep2 = () => {
    if (isCreate) {
      console.log('create step2');
    } else if (isUpdate) {
      console.log('update step2');
    }
  };
  const handleClickStep3 = () => {};
  const handleClickStep4 = () => {};

  return (
    <div className={S.layout}>
      <button
        type="button"
        onClick={handleClickStep1}
        className={S.clicked({ clicked: step === EventStep.INFO })}
      >
        기본 정보 입력
      </button>
      <button
        type="button"
        onClick={handleClickStep2}
        className={S.clicked({ clicked: step === EventStep.QUEST })}
      >
        퀘스트 템플릿 선택
      </button>
      <button
        type="button"
        onClick={handleClickStep3}
        className={S.clicked({ clicked: step === EventStep.REWARD })}
      >
        보상 설정
      </button>
      <button
        type="button"
        onClick={handleClickStep4}
        className={S.clicked({ clicked: step === EventStep.PARTICIPATION })}
      >
        참가 권한 선택
      </button>
    </div>
  );
}
