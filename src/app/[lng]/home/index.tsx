'use client';

import { useState } from 'react';

import { useParams } from 'next/navigation';

import All from '@components/home/All';
import HomeBox from '@components/home/HomeBox';
import TestModal from '@components/home/TestModal';
import Editor from '@core/Editor';
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

  const [value, setValue] = useState('');

  return (
    <div>
      {value}
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
      <br /> <br /> <br />
      <button onClick={openTestModal} type="button">
        test Modal
      </button>
      <br /> <br /> <br />
      {value}
      <Editor value={value} onChange={setValue} communityId={149} />
      <div style={{ height: '3000px' }} />
      <TestModal open={isOpenTestModal} closeModal={closeTestModal} />
    </div>
  );
}
