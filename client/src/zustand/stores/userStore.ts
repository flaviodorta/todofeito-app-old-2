import create from 'zustand';
import {
  ILabel,
  IProject,
  ISection,
  ITodo,
  IUserStore,
} from '../../helpers/types';
import { project } from '../../helpers/variants';

const mainProjects: IProject[] = [
  {
    id: 'inbox',
    name: 'Inbox',
    color: {
      name: 'Blue',
      class: 'fill-blue-600',
    },
  },
];

export const userStore = create<IUserStore>((set, get) => ({
  fullName: 'Flávio Dorta',
  email: 'dorta.dev@gmail.com',
  todos: [],
  projects: [...mainProjects],
  labels: [],
  sections: [],
  editTodo: (todo: ITodo) =>
    set((state) => ({
      ...state,
      todos: state.todos.map((oldTodo) =>
        oldTodo.id === todo.id ? todo : oldTodo
      ),
    })),

  removeTodo: (todo: ITodo) =>
    set((state) => ({
      ...state,
      todos: state.todos.filter((t) => t.id !== todo.id),
      sections: todo.sectionId
        ? state.sections.map((section) =>
            section.id === todo.sectionId
              ? { ...section, todos: [...section.todos, todo] }
              : section
          )
        : state.sections,
    })),

  addTodo: (todo: ITodo) =>
    set((state) => ({
      ...state,
      todos: todo.sectionId ? state.todos : [...state.todos, todo],
      sections: todo.sectionId
        ? state.sections.map((section) =>
            section.id === todo.sectionId
              ? {
                  ...section,
                  todos: [...section.todos, todo],
                }
              : section
          )
        : state.sections,
    })),

  completeTodo: (todo: ITodo) =>
    set((state) => ({
      ...state,
      todos: todo.sectionId
        ? state.todos
        : state.todos.map((t) =>
            t.id === todo.id ? { ...t, isCompleted: true } : t
          ),
      sections: todo.sectionId
        ? state.sections.map((section) =>
            section.id === todo.sectionId
              ? {
                  ...section,
                  todos: section.todos.map((t) =>
                    t.id === todo.id ? { ...t, isCompleted: true } : t
                  ),
                }
              : section
          )
        : state.sections,
    })),

  createSection: (section: ISection, index: number) => {
    const sections = Array.from(get().sections);
    sections.splice(index + 1, 0, section);
    set((state) => ({ ...state, sections: sections }));
  },

  deleteSection: (id: string) =>
    set((state) => ({
      ...state,
      sections: state.sections.filter((section) => section.id !== id),
    })),

  deleteProject: (id: string) =>
    set((state) => ({
      ...state,
      projects: state.projects.filter((project) => project.id !== id),
    })),

  createLabel: (label: ILabel) =>
    set((state) => ({
      ...state,
      labels: [...state.labels, label],
    })),

  createProject: (project: IProject) =>
    set((state) => ({
      ...state,
      projects: [...state.projects, project],
    })),
}));
