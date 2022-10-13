import create from 'zustand';

interface IUIStore {
  isEditingTodo: boolean;
  isSidebarOpen: boolean;
  toggleEditingTodo: () => void;
  toggleSidebar: () => void;
}

export const UIStore = create<IUIStore>((set, get) => ({
  isEditingTodo: false,
  isSidebarOpen: true,
  toggleEditingTodo: () =>
    set((state) => ({
      isEditingTodo: !state.isEditingTodo,
    })),
  toggleSidebar: () =>
    set((state) => ({
      isSidebarOpen: !state.isSidebarOpen,
    })),
}));
