import { useCallback, useMemo, useRef } from 'react';

import { v4 as uuidv4 } from 'uuid';

import { useModalStore } from '@store/core/modal';

export const useModal = (providedModalName?: string) => {
  const modalNameRef = useRef<string>(providedModalName || uuidv4());
  const modalName = modalNameRef.current;

  const { activeModal, openModal, closeModal } = useModalStore();

  const open = useMemo(
    () => activeModal === modalName,
    [modalName, activeModal],
  );

  const handleCloseModal = useCallback(() => closeModal(), [closeModal]);
  const handleOpenModal = useCallback(
    () => openModal(modalName),
    [modalName, openModal],
  );
  const handleToggle = useCallback(() => {
    if (open) {
      handleCloseModal();
    } else {
      handleOpenModal();
    }
  }, [open, handleOpenModal, handleCloseModal]);

  return {
    open,
    closeModal: handleCloseModal,
    openModal: handleOpenModal,
    toggle: handleToggle,
  };
};
