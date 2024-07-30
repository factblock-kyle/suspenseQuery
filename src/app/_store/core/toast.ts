import { create } from 'zustand';

export type ToastType = 'success' | 'error' | 'info' | 'warning';

export interface IToast {
  type: ToastType;
  message: React.ReactNode;
  duration?: number;
  id: string;
  isInitialOpen: boolean;
}

interface ToastListState {
  toastList: IToast[];
  addToast: (toast: IToast) => void;
  reset: () => void;
  removeToast: (id: string) => void;
  setIsInitialOpen: (id: string, isInitialOpen: boolean) => void;
}

export const useToastStore = create<ToastListState>((set) => ({
  toastList: [],
  addToast: (toast: IToast) =>
    set((state) => ({ toastList: [...state.toastList, toast] })),
  removeToast: (id) =>
    set((state) => ({
      toastList: state.toastList.filter((t) => t.id !== id),
    })),
  reset: () => set({ toastList: [] }),
  setIsInitialOpen: (id, isInitialOpen) =>
    set((state) => ({
      toastList: state.toastList.map((toast) =>
        toast.id === id ? { ...toast, isInitialOpen } : toast,
      ),
    })),
}));
