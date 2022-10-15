import { isDesktop } from 'react-device-detect';
import create from 'zustand';
import { ITodo } from '../../helpers/types';

interface IUIStore {
  isSidebarOpen: boolean;
  isSidebarProjectsOpen: boolean;
  editingTodoId: string | null;
  isAddTodoItemOpen: boolean;
  isMinorThanLargeScreen: boolean;
  setIsMinorThanLargeScreen: (value: boolean) => void;
  closeIsAddTodoItemOpen: () => void;
  openIsAddTodoItemOpen: () => void;
  toggleSidebar: () => void;
  toggleSidebarProjects: () => void;
  setEditingTodoId: (todo: ITodo | null) => void;
}

export const UIStore = create<IUIStore>((set, get) => ({
  isSidebarOpen: isDesktop ? true : false,
  isSidebarProjectsOpen: false,
  editingTodoId: null,
  isAddTodoItemOpen: false,
  isMinorThanLargeScreen: false,
  setIsMinorThanLargeScreen: (value: boolean) =>
    set((state) => ({ ...state, isMinorThanLargeScreen: value })),
  closeIsAddTodoItemOpen: () =>
    set((state) => ({ ...state, isAddTodoItemOpen: false })),
  openIsAddTodoItemOpen: () =>
    set((state) => ({ ...state, isAddTodoItemOpen: true })),
  toggleSidebar: () =>
    set((state) => ({
      isSidebarOpen: !state.isSidebarOpen,
    })),
  toggleSidebarProjects: () =>
    set((state) => ({
      isSidebarProjectsOpen: !state.isSidebarProjectsOpen,
    })),
  setEditingTodoId: (todo: ITodo | null) =>
    set((state) => ({
      ...state,
      editingTodoId: todo ? todo.id : null,
    })),
}));
