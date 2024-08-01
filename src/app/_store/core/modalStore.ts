import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface ModalState {
  activeModal: string | null;
  openModal: (modalName: string) => void;
  closeModal: () => void;
}

export const useModalStore = create<ModalState>()(
  devtools((set) => ({
    activeModal: null,
    openModal: (modalName: string) => set({ activeModal: modalName }),
    closeModal: () => set({ activeModal: null }),
  })),
);
