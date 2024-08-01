import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface PaginationState {
  page: number;
  pageSize: number;
  nextPage: () => void;
  prevPage: () => void;
  setPage: (page: number) => void;
}

const createPaginationStore = <T extends PaginationState>(
  initialState: Omit<T, 'nextPage' | 'prevPage' | 'setPage'>,
) =>
  create<T>()(
    devtools((set) => ({
      ...initialState,
      nextPage: () => set((state) => ({ page: state.page + 1 })),
      prevPage: () => set((state) => ({ page: state.page - 1 })),
      setPage: (page: number) => set(() => ({ page })),
    })),
  );

// pagination store 생성 및 사용 예시
export const useEventListPagination = createPaginationStore({
  page: 1,
  pageSize: 25,
});
