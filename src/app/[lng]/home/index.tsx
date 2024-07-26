'use client';

import { useParams } from 'next/navigation';

import All from '@components/home/All';
import HomeBox from '@components/home/HomeBox';
import { useTranslation } from '@i18n/client';

export default function Index() {
  const { lng }: { lng: string } = useParams();
  const { t } = useTranslation(lng, 'home');

  return (
    <div>
      {t('home-trending-event')}
      <HomeBox />
      <All />
    </div>
  );
}
