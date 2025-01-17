import { Suspense } from 'react';

import { Banner } from '@components/home/Banner';
import Community from '@components/home/Community';

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Banner />
      <Community />
    </Suspense>
  );
}
