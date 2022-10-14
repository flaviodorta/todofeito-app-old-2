import create from 'zustand';
import { ITodo } from '../../helpers/types';

interface IUIStore {
  isSidebarOpen: boolean;
  isSidebarProjectsOpen: boolean;
  editingTodoId: string | null;
  isAddTodoItemOpen: boolean;
  closeIsAddTodoItemOpen: () => void;
  openIsAddTodoItemOpen: () => void;
  toggleSidebar: () => void;
  toggleSidebarProjects: () => void;
  setEditingTodoId: (todo: ITodo | null) => void;
}

export const UIStore = create<IUIStore>((set, get) => ({
  isSidebarOpen: true,
  isSidebarProjectsOpen: false,
  editingTodoId: null,
  isAddTodoItemOpen: false,
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
