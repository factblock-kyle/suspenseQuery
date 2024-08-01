import { redirect } from 'next/navigation';

import { EventStep } from '@enum/eventStep'; // Ensure correct import

import Create from '.';

export default async function Page({
  params,
  searchParams,
}: {
  params: { locale: string; communityId: string };
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const isValidStep = (step: string): boolean =>
    Object.values(EventStep).includes(step as EventStep);

  if (!searchParams?.step || !isValidStep(searchParams?.step as string)) {
    return redirect(`/admin/${params.communityId}/event`);
  }
  return <Create />;
}
