import { useParams } from 'next/navigation';

import { useTranslation } from '@i18n/client';

export default function Index() {
  const { lng }: { lng: string } = useParams();
  const { t } = useTranslation(lng, 'home');

  return <div>Im Box: {t('home-trending-community')}</div>;
}
