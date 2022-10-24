import { isDesktop } from 'react-device-detect';
import create from 'zustand';
import { ITodo } from '../../helpers/types';

interface IUIStore {
  isSidebarOpen: boolean;
  todoInputOpenById: string | null;
  sectionInputOpenById: string | null;
  toggleSidebar: () => void;
  setTodoInputOpenById: (id: string | null) => void;
  setSectionInputOpenById: (id: string | null) => void;
}

const isMinorThanLargeScreen = window.innerWidth <= 1024;

export const UIStore = create<IUIStore>((set, get) => ({
  isSidebarOpen: !isDesktop ? false : isMinorThanLargeScreen ? false : true,
  todoInputOpenById: null,
  sectionInputOpenById: null,
  toggleSidebar: () =>
    set((state) => ({
      isSidebarOpen: !state.isSidebarOpen,
    })),
  setTodoInputOpenById: (id: string | null) =>
    set((state) => ({ ...state, todoInputOpenById: id })),
  setSectionInputOpenById: (id: string | null) =>
    set((state) => ({ ...state, sectionInputOpenById: id })),
}));
