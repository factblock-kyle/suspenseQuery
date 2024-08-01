'use client';

import { useSearchParams } from 'next/navigation';

import Info from '@components/admin/event/create/info';
import Participation from '@components/admin/event/create/participation';
import Quest from '@components/admin/event/create/quest';
import Reward from '@components/admin/event/create/reward';
import StepList from '@components/admin/event/create/step-list';
import { EventStep } from '@enum/eventStep';

function Content() {
  const searchParams = useSearchParams();
  const step = searchParams.get('step') as EventStep;

  switch (step) {
    case EventStep.INFO:
      return <Info />;
    case EventStep.QUEST:
      return <Quest />;
    case EventStep.REWARD:
      return <Reward />;
    case EventStep.PARTICIPATION:
      return <Participation />;
    default:
      return null;
  }
}

export default function Index() {
  return (
    <div>
      <StepList />
      <Content />
    </div>
  );
}
