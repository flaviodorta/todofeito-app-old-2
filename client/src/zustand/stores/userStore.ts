import create from 'zustand';
import { reorder } from '../../helpers/functions';
import { ITodo, IUserStore } from '../../helpers/types';

export const userStore = create<IUserStore>((set, get) => ({
  fullName: 'Flávio Dorta',
  email: 'dorta.dev@gmail.com',
  todos: {
    completed: [],
    inbox: [],
    today: [],
    upcoming: [],
    labels: [],
    projects: {},
  },
  editTodo: (todo: ITodo) => {
    const project = todo.project;

    return set((state) => {
      if (
        project !== 'inbox' &&
        project !== 'today' &&
        project !== 'upcoming' &&
        project !== 'labels'
      ) {
        return {
          ...state,
          todos: {
            ...state.todos,
            projects: {
              [`${project}`]: {
                color: state.todos.projects[`${project}`].color,
                todos: state.todos.projects[`${project}`].todos.map((t) => {
                  return t.id === todo.id ? todo : t;
                }),
              },
            },
          },
        };
      }

      return {
        ...state,
        todos: {
          ...state.todos,
          [`${project}`]: state.todos[`${project}`].map((t) => {
            return t.id === todo.id ? todo : t;
          }),
        },
      };
    });
  },

  reorderTodos: (todos: ITodo[], startIndex: number, endIndex: number) => {
    const project = todos[0].project;

    return set((state) => {
      if (
        project !== 'inbox' &&
        project !== 'today' &&
        project !== 'upcoming' &&
        project !== 'labels'
      ) {
        return {
          ...state,
          todos: {
            ...state.todos,
            projects: {
              [`${project}`]: {
                color: {
                  name: state.todos.projects[`${project}`].color.name,
                  class: state.todos.projects[`${project}`].color.class,
                },
                todos: reorder(todos, startIndex, endIndex),
              },
            },
          },
        };
      }

      return {
        ...state,
        todos: {
          ...state.todos,
          [`${project}`]: reorder(todos, startIndex, endIndex),
        },
      };
    });
  },

  addTodo: (todo: ITodo) => {
    const project = todo.project.toLowerCase();

    return set((state) => {
      if (
        project !== 'inbox' &&
        project !== 'today' &&
        project !== 'upcoming' &&
        project !== 'labels'
      ) {
        return {
          ...state,
          todos: {
            ...state.todos,
            projects: {
              [`${project}`]: {
                color: {
                  name: state.todos.projects[`${project}`].color.name,
                  class: state.todos.projects[`${project}`].color.class,
                },
                todos: state.todos.projects[`${project}`].todos.map((t) => {
                  return t.id === todo.id ? todo : t;
                }),
              },
            },
          },
        };
      }

      return {
        ...state,
        todos: {
          ...state.todos,
          [`${project}`]: [...state.todos[`${project}`], todo],
        },
      };
    });
  },

  completeTodo: (todo: ITodo) =>
    set((state) => {
      const project = todo.project.toLowerCase();

      if (
        project !== 'inbox' &&
        project !== 'today' &&
        project !== 'upcoming' &&
        project !== 'labels'
      ) {
        return {
          ...state,
          todos: {
            ...state.todos,
            completed: [...state.todos.completed, todo],
            projects: {
              ...state.todos.projects,
              [`${project}`]: {
                color: {
                  name: state.todos.projects[`${project}`].color.name,
                  class: state.todos.projects[`${project}`].color.class,
                },
                todos: state.todos.projects[`${project}`].todos.filter(
                  (t) => t.id !== todo.id
                ),
              },
            },
          },
        };
      }

      return {
        ...state,
        todos: {
          ...state.todos,
          [`${project}`]: state.todos[`${project}`].filter(
            (t) => t.id !== todo.id
          ),
        },
      };
    }),

  createProject: (name: string, color: { name: string; class: string }) =>
    set((state) => ({
      ...state,
      todos: {
        ...state.todos,
        projects: {
          ...state.todos.projects,
          [`${name}`]: {
            color: {
              name: color.name,
              class: color.class,
            },
            todos: [],
          },
        },
      },
    })),
}));
