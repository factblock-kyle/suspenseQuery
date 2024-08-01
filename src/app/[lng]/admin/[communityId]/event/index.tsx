'use client';

import { useParams } from 'next/navigation';

import { EventStep } from '@enum/eventStep';
import useUpdateQueryParams from '@hooks/useUpdateQueryParams';

export default function Index() {
  const { lng, communityId }: { lng: string; communityId: string } =
    useParams();
  const updateQueryAndNavigate = useUpdateQueryParams(
    lng,
    `admin/${communityId}/event/create`,
  );

  const handleCreateEvent = () => {
    updateQueryAndNavigate({ step: EventStep.INFO });
  };

  return (
    <div>
      <button type="button" onClick={handleCreateEvent}>
        + 이벤트 만들기
      </button>
      <p>Event list</p>
    </div>
  );
}
