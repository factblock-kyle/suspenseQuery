import { useParams } from 'next/navigation';

import { useTranslation } from '@i18n/client';

import * as S from './styles.css';

export default function Index() {
  const { lng }: { lng: string } = useParams();
  const { t } = useTranslation(lng, 'home');

  return (
    <div className={S.container}>Im Box: {t('home-trending-community')}</div>
  );
}
