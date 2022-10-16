import { nanoid } from 'nanoid';
import create from 'zustand';
import { reorder } from '../../helpers/functions';
import { IProject, ITodo, IUserStore } from '../../helpers/types';

const mainProjects: IProject[] = [
  {
    id: 'inbox',
    name: 'Inbox',
    type: 'inbox',
    color: {
      name: 'Blue',
      class: 'fill-blue-600',
    },
    todos: {
      completed: [],
      toComplete: [],
    },
  },
  {
    id: 'today',
    name: 'Today',
    type: 'today',
    color: {
      name: 'Emerald',
      class: 'fill-emerald-500',
    },
    todos: {
      completed: [],
      toComplete: [],
    },
  },
  {
    id: 'upcoming',
    name: 'Upcoming',
    type: 'upcoming',
    color: {
      name: 'Orange',
      class: 'fill-orange-600',
    },
    todos: {
      completed: [],
      toComplete: [],
    },
  },
  {
    id: 'labels',
    name: 'Labels',
    type: 'labels',
    color: {
      name: 'Violet',
      class: 'fill-violet-700',
    },
    todos: {
      completed: [],
      toComplete: [],
    },
  },
];

export const userStore = create<IUserStore>((set, get) => ({
  fullName: 'Flávio Dorta',
  email: 'dorta.dev@gmail.com',
  projects: [...mainProjects],
  editTodo: (todo: ITodo) =>
    set((state) => ({
      ...state,
      projects: state.projects.map((project) =>
        project.id === todo.project.id
          ? {
              ...project,
              todos: {
                ...project.todos,
                toComplete: project.todos.toComplete.map((oldTodo) =>
                  oldTodo.id === todo.id ? todo : oldTodo
                ),
              },
            }
          : project
      ),
    })),

  reorderTodos: (todos: ITodo[], startIndex: number, endIndex: number) =>
    set((state) => ({
      ...state,
      projects: state.projects.map((project) =>
        project.id === todos[0].project.id
          ? {
              ...project,
              todos: {
                ...project.todos,
                toComplete: reorder(todos, startIndex, endIndex),
              },
            }
          : project
      ),
    })),

  addTodo: (todo: ITodo) =>
    set((state) => ({
      ...state,
      projects: state.projects.map((project) =>
        project.id === todo.project.id
          ? {
              ...project,
              todos: {
                ...project.todos,
                toComplete: [...project.todos.toComplete, todo],
              },
            }
          : project
      ),
    })),

  completeTodo: (todo: ITodo) => {
    const completedTodo = get()
      .projects.filter((project) => project.id === todo.project.id)[0]
      .todos.toComplete.filter(
        (completedTodo) => completedTodo.id === todo.id
      )[0];

    return set((state) => ({
      ...state,
      projects: state.projects.map((project) =>
        project.id === todo.project.id
          ? {
              ...project,
              todos: {
                completed: [...project.todos.completed, completedTodo],
                toComplete: project.todos.toComplete.filter(
                  (notCompletedTodo) => notCompletedTodo.id !== todo.id
                ),
              },
            }
          : project
      ),
    }));
  },

  createLabel: (name: string, color: { name: string; class: string }) =>
    set((state) => ({
      ...state,
      projects: [
        ...state.projects,
        {
          id: nanoid(),
          name,
          color,
          type: 'labels',
          todos: {
            completed: [],
            toComplete: [],
          },
        },
      ],
    })),

  createProject: (name: string, color: { name: string; class: string }) =>
    set((state) => ({
      ...state,
      projects: [
        ...state.projects,
        {
          id: nanoid(),
          name,
          color,
          type: 'projects',
          todos: {
            completed: [],
            toComplete: [],
          },
        },
      ],
    })),
}));
