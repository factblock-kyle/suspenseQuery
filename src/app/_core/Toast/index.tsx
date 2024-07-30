import { useEffect, useState } from 'react';

import * as RToast from '@radix-ui/react-toast';
import { createPortal } from 'react-dom';

import { ToastType, useToastStore } from '@store/core/toast';

import * as S from './styles.css';

interface ToastProps {
  message: React.ReactNode;
  id: string;
  duration?: number;
  type: ToastType;
  isInitialOpen: boolean;
}

const Toast = ({
  message,
  duration = 3000,
  type = 'success',
  id,
  isInitialOpen,
}: ToastProps) => {
  const { removeToast, setIsInitialOpen } = useToastStore();
  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    const forAnimationTimeDiff = 300;

    const setInitialOpenTimer = setTimeout(() => {
      setIsInitialOpen(id, false);
    }, forAnimationTimeDiff);

    const durationTimer = setTimeout(() => {
      setIsOpen(false);
    }, duration);

    const removeToastStoreTimer = setTimeout(() => {
      removeToast(id);
    }, duration + forAnimationTimeDiff);

    return () => {
      clearTimeout(durationTimer);
      clearTimeout(removeToastStoreTimer);
      clearTimeout(setInitialOpenTimer);
    };
  }, [id, duration, removeToast, setIsInitialOpen]);

  return createPortal(
    <RToast.Root
      className={S.toastVariants({ type, isInitialOpen })}
      key={id}
      duration={duration}
      // eslint-disable-next-line no-nested-ternary
      data-state={isOpen ? (isInitialOpen ? 'open' : 'fixed') : 'closed'}
    >
      <RToast.Title className={S.toastTitle}>
        {/* <ToastIcon type={type} /> */}
        {message}
      </RToast.Title>
    </RToast.Root>,
    document.getElementById('toast-portal') || document.body,
  );
};

export default Toast;

// // 아이콘의 경우 디자인 확정 아니니 도입 x
// const ToastIcon = ({ type }: { type?: ToastType }) => {
//   return (
//     <div className={S.icon}>
//       {type &&
//         match<ToastType, React.ReactNode>(type)
//           .with('success', () => <IcSuccess />)
//           .with('error', () => <IcError />)
//           .with('info', () => <IcInfo />)
//           .with('warning', () => <IcWarning />)
//           .exhaustive()}
//     </div>
//   );
// };
