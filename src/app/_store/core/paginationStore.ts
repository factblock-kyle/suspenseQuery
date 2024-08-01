import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface PaginationState {
  page: number;
  pageSize: number;
  nextPage: () => void;
  prevPage: () => void;
  setPage: (page: number) => void;
}

interface PaginationFilterState extends PaginationState {
  query?: string;
  setQuery: (query: string) => void;
  orderBy: any;
  setOrderBy: (orderBy: any) => void;
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

const createPaginationFilterStore = <T extends PaginationFilterState>(
  initialState: Omit<
    T,
    'nextPage' | 'prevPage' | 'setPage' | 'setQuery' | 'setOrderBy'
  >,
) =>
  create<T>()(
    devtools((set) => ({
      ...initialState,
      nextPage: () => set((state) => ({ page: state.page + 1 })),
      prevPage: () => set((state) => ({ page: state.page - 1 })),
      setPage: (page: number) => set(() => ({ page })),
      setQuery: (query) => set(() => ({ query })),
      setOrderBy: (orderBy) => set(() => ({ orderBy })),
    })),
  );

// pagination store 생성 및 사용 예시
export const useEventListPagination = createPaginationStore({
  page: 1,
  pageSize: 25,
});

// orderby와 query가 있는 pagination store 생성 및 사용 예시
export const useEventListOrderPagination = createPaginationFilterStore({
  page: 1,
  pageSize: 20,
  orderBy: 'Asc',
  query: '',
});
