'use client';

import { useParams } from 'next/navigation';

import All from '@components/home/All';
import HomeBox from '@components/home/HomeBox';
import TestModal from '@components/home/TestModal';
import { useModal } from '@hooks/useModal';
import useToast from '@hooks/useToast';
import { useTranslation } from '@i18n/client';

export default function Index() {
  const { lng }: { lng: string } = useParams();
  const { t } = useTranslation(lng, 'home');

  const {
    open: isOpenTestModal,
    closeModal: closeTestModal,
    openModal: openTestModal,
  } = useModal();
  const toast = useToast();

  return (
    <div>
      {t('home-trending-event')}
      <HomeBox />
      <All />
      <button
        type="button"
        onClick={() => {
          toast.error('toast test');
        }}
      >
        test Toast
      </button>
      <br /> <br />
      <br />
      <button onClick={openTestModal} type="button">
        test Modal
      </button>
      <div style={{ height: '3000px' }} />
      <TestModal open={isOpenTestModal} closeModal={closeTestModal} />
    </div>
  );
}
