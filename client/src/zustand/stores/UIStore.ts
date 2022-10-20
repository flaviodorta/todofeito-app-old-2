import { isDesktop } from 'react-device-detect';
import create from 'zustand';
import { reorder } from '../../helpers/functions';
import { ITodo } from '../../helpers/types';

interface IUIStore {
  isSidebarOpen: boolean;
  isSidebarProjectsOpen: boolean;
  editingTodoId: string | null;
  isAddTodoInSection: string | null;
  isAddTodoItemOpen: boolean;
  isMinorThanLargeScreen: boolean;
  todosOnScreen: ITodo[];
  setIsAddTodoInSection: (sectionId: string | null) => void;
  setTodosOnScreen: (todos: ITodo[]) => void;
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
  todosOnScreen: [],
  isAddTodoInSection: null,
  setIsAddTodoInSection: (sectionId: string | null) =>
    set((state) => ({
      ...state,
      isAddTodoInSection: sectionId,
    })),
  setTodosOnScreen: (todos: ITodo[]) =>
    set((state) => ({
      ...state,
      todosOnScreen: todos,
    })),
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
