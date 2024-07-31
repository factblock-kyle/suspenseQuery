import { useCallback, useMemo } from 'react';

import { v4 as uuidv4 } from 'uuid';

import { ToastType, useToastStore } from '@store/core/toastStore';

const useToast = () => {
  const { addToast } = useToastStore();
  const openToast = useCallback(
    (type: ToastType) =>
      (message: React.ReactNode, options?: { duration: number }) => {
        const newToast = {
          type,
          message,
          duration: options?.duration,
          id: uuidv4(),
          isInitialOpen: true,
        };
        addToast(newToast);
      },
    [addToast],
  );

  const toast = useMemo(
    () => ({
      success: openToast('success'),
      error: openToast('error'),
      info: openToast('info'),
      warning: openToast('warning'),
    }),
    [openToast],
  );

  return toast;
};

export default useToast;
