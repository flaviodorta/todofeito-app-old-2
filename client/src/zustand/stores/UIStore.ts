import create from 'zustand';

interface IUIStore {
  isEditingTodo: boolean;
  toggleEditingTodo: () => void;
}

export const UIStore = create<IUIStore>((set, get) => ({
  isEditingTodo: false,
  toggleEditingTodo: () =>
    set((state) => ({
      isEditingTodo: !state.isEditingTodo,
    })),
}));
