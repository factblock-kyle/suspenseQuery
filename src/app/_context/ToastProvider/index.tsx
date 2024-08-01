'use client';

import * as RToast from '@radix-ui/react-toast';

import Toast from '@core/Toast';
import { useToastStore } from '@store/core/toastStore';

import * as S from './styles.css';

export default function Index() {
  const { toastList } = useToastStore();

  return (
    <div className={S.mediaLayout}>
      <RToast.Provider>
        <div aria-live="polite" aria-atomic="true">
          {toastList.map((toast) => (
            <Toast key={toast.id} {...toast} />
          ))}
        </div>
        <RToast.Viewport className={S.toastViewport} />
      </RToast.Provider>
    </div>
  );
}
