import create from 'zustand';
import { ITodo } from '../../helpers/types';

interface IUIStore {
  isSidebarOpen: boolean;
  editingTodoId: string | null;
  isAddTodoItemOpen: boolean;
  closeIsAddTodoItemOpen: () => void;
  openIsAddTodoItemOpen: () => void;
  toggleSidebar: () => void;
  setEditingTodoId: (todo: ITodo | null) => void;
}

export const UIStore = create<IUIStore>((set, get) => ({
  isSidebarOpen: true,
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
  setEditingTodoId: (todo: ITodo | null) =>
    set((state) => ({
      ...state,
      editingTodoId: todo ? todo.id : null,
    })),
}));
