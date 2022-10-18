import create from 'zustand';
import { ILabel, IProject, ITodo, IUserStore } from '../../helpers/types';

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
    })),

  addTodo: (todo: ITodo) =>
    set((state) => ({
      ...state,
      todos: [...state.todos, todo],
    })),

  completeTodo: (todo: ITodo) =>
    set((state) => ({
      ...state,
      todos: state.todos.map((t) =>
        t.id === todo.id ? { ...t, isCompleted: true } : t
      ),
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

// export const userStore = create<IUserStore>((set, get) => ({
//   fullName: 'Flávio Dorta',
//   email: 'dorta.dev@gmail.com',
//   projects: [...mainProjects],
//   editTodo: (todo: ITodo) =>
//     set((state) => ({
//       ...state,
//       projects: state.projects.map((project) =>
//         project.id === todo.project.id
//           ? {
//               ...project,
//               todos: {
//                 ...project.todos,
//                 toComplete: project.todos.toComplete.map((oldTodo) =>
//                   oldTodo.id === todo.id ? todo : oldTodo
//                 ),
//               },
//             }
//           : project
//       ),
//     })),

//   reorderTodos: (todos: ITodo[], startIndex: number, endIndex: number) =>
//     set((state) => ({
//       ...state,
//       projects: state.projects.map((project) =>
//         project.id === todos[0].project.id
//           ? {
//               ...project,
//               todos: {
//                 ...project.todos,
//                 toComplete: reorder(todos, startIndex, endIndex),
//               },
//             }
//           : project
//       ),
//     })),

//   addTodo: (todo: ITodo) =>
//     set((state) => ({
//       ...state,
//       projects: state.projects.map((project) =>
//         project.id === todo.project.id
//           ? {
//               ...project,
//               todos: {
//                 ...project.todos,
//                 toComplete: [...project.todos.toComplete, todo],
//               },
//             }
//           : project
//       ),
//     })),

//   completeTodo: (todo: ITodo) => {
//     const completedTodo = get()
//       .projects.filter((project) => project.id === todo.project.id)[0]
//       .todos.toComplete.filter(
//         (completedTodo) => completedTodo.id === todo.id
//       )[0];

//     return set((state) => ({
//       ...state,
//       projects: state.projects.map((project) =>
//         project.id === todo.project.id
//           ? {
//               ...project,
//               todos: {
//                 completed: [...project.todos.completed, completedTodo],
//                 toComplete: project.todos.toComplete.filter(
//                   (notCompletedTodo) => notCompletedTodo.id !== todo.id
//                 ),
//               },
//             }
//           : project
//       ),
//     }));
//   },

//   createLabel: (name: string, color: { name: string; class: string }) =>
//     set((state) => ({
//       ...state,
//       projects: [
//         ...state.projects,
//         {
//           id: nanoid(),
//           name,
//           color,
//           type: 'labels',
//           todos: {
//             completed: [],
//             toComplete: [],
//           },
//         },
//       ],
//     })),

//   createProject: (name: string, color: { name: string; class: string }) =>
//     set((state) => ({
//       ...state,
//       projects: [
//         ...state.projects,
//         {
//           id: nanoid(),
//           name,
//           color,
//           type: 'projects',
//           todos: {
//             completed: [],
//             toComplete: [],
//           },
//         },
//       ],
//     })),
// }));
