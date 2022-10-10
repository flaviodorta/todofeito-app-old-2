import create from 'zustand';
import { ITodo, IUserStore } from '../../helpers/types';

export const userStore = create<IUserStore>((set, get) => ({
  fullName: 'Flávio Dorta',
  email: 'dorta.dev@gmail.com',
  todos: {
    completed: [],
    notCompleted: [],
  },
  addTodo: (todo: ITodo) =>
    set((state) => ({
      ...state,
      todos: {
        completed: state.todos.completed,
        notCompleted: [...state.todos.notCompleted, todo],
      },
    })),
  completeTodo: (id: string) => {
    const completedTodo = get().todos.notCompleted.filter(
      (todo) => todo.id === id
    )[0];

    set((state) => ({
      ...state,
      todos: {
        completed: [...state.todos.completed, completedTodo],
        notCompleted: state.todos.notCompleted.filter((todo) => todo.id !== id),
      },
    }));
  },
  setTodos: (todos: ITodo[]) =>
    set((state) => ({
      ...state,
      todos: {
        completed: state.todos.completed,
        notCompleted: todos,
      },
    })),
}));
