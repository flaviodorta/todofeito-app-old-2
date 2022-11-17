import { isToday, isTomorrow } from 'date-fns';
import { nanoid } from 'nanoid';
import create from 'zustand';
import {
  capitalizeFirstLetter,
  getDayNameInWeek,
  getMonthName,
} from '../../helpers/functions';
import {
  ILabel,
  IProject,
  ISection,
  ITodo,
  IUpcomingSection,
  ITodosStore,
} from '../../helpers/types';
import { t } from 'i18next';
import '../../i18n';

export const todosStore = create<ITodosStore>((set, get) => {
  const projects: IProject[] = [
    {
      id: 'inbox',
      type: 'project',
      title: t('InboxContent.inbox'),
      color: {
        name: 'Blue',
        class: 'fill-blue-600',
      },
    },
  ];
  const today = new Date();
  const dates: IUpcomingSection[] = (() => {
    const arr = [];

    for (let i = 0; i < 60; i++) {
      const date = new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate() + i
      );

      arr.push({
        id: nanoid(),
        date: date,
        title: `${capitalizeFirstLetter(
          getMonthName(date).substring(0, 3)
        )}  ${date.getDate()} ${
          isToday(date)
            ? `‧ ${t('dates.today')}`
            : isTomorrow(date)
            ? `‧ ${t('dates.tomorrow')}`
            : ''
        } ‧ ${capitalizeFirstLetter(getDayNameInWeek(date))} `,
        isListOpen: false,
      });
    }

    return arr;
  })();

  return {
    todos: [],
    projects: projects,
    sections: [],
    labels: [],
    dates,
    toggleUpcomingDateList: (upcomingDateId: string) =>
      set((state) => ({
        ...state,
        dates: dates.map((date) =>
          date.id === upcomingDateId
            ? { ...date, isListOpen: date.isListOpen ? false : true }
            : date
        ),
      })),
    setSections: (sections: ISection[]) =>
      set((state) => {
        const arr = state.sections.filter(
          (section) => !sections.find((s) => s.id === section.id)
        );

        return {
          ...state,
          sections: [...arr, ...sections],
        };
      }),
    setTodos: (todos: ITodo[]) =>
      set((state) => ({
        ...state,
        todos: todos,
      })),

    addTodo: (todo: ITodo) =>
      set((state) => ({
        ...state,
        todos: [...state.todos, todo],
      })),
    editTodo: (todo: ITodo) =>
      set((state) => ({
        ...state,
        todos: state.todos.map((t) => (t.id === todo.id ? todo : t)),
      })),
    completeTodo: (todo: ITodo) =>
      set((state) => ({
        ...state,
        todos: state.todos.map((t) =>
          t.id === todo.id ? { ...todo, isCompleted: true } : t
        ),
      })),

    addProject: (project: IProject) =>
      set((state) => ({
        ...state,
        projects: [...state.projects, project],
      })),
    deleteProject: (project: IProject) =>
      set((state) => ({
        ...state,
        projects: state.projects.filter((p) => p.id !== project.id),
      })),
    editProject: (project: IProject) =>
      set((state) => ({
        ...state,
        projects: state.projects.map((p) =>
          p.id === project.id ? project : p
        ),
      })),

    addSection: (section: ISection) =>
      set((state) => ({
        ...state,
        sections: [...state.sections, section],
      })),
    deleteSection: (section: ISection) =>
      set((state) => ({
        ...state,
        sections: state.sections.filter((s) => s.id !== section.id),
      })),
    editSection: (section: ISection) =>
      set((state) => ({
        ...state,
        sections: state.sections.map((s) =>
          s.id === section.id ? section : s
        ),
      })),

    addLabel: (label: ILabel) =>
      set((state) => ({
        ...state,
        labels: [...state.labels, label],
      })),
    deleteLabel: (label: ILabel) =>
      set((state) => ({
        ...state,
        labels: state.labels.filter((l) => l.id !== label.id),
      })),
    editLabel: (label: ILabel) =>
      set((state) => ({
        ...state,
        labels: state.labels.map((l) => (l.id === label.id ? label : l)),
      })),
  };
});

// export const todosStore = create<ITodosStore>((set, get) => {
//   const today = new Date();

//   const priorities = Array.from({ length: 4 }).map(
//     (_, i) =>
//       ({
//         priority: i,
//         todos: [],
//       } as ITodosByPriority)
//   );

// const dates = (() => {
//   const arr = [];

//   for (let i = 0; i < 365; i++) {
//     const date = new Date(
//       today.getFullYear(),
//       today.getMonth(),
//       today.getDate() + i
//     );

//     arr.push({
//       id: nanoid(),
//       date: date,
//       name: `${capitalizeFirstLetter(
//         getMonthName(date).substring(0, 3)
//       )}  ${date.getDate()} ${
//         isToday(date) ? '‧ Today' : isTomorrow(date) ? '‧ Tomorrow' : ''
//       } ‧ ${capitalizeFirstLetter(getDayNameInWeek(date))} `,
//       todos: [],
//     } as ITodosByDate);
//   }

//   return arr;
// })();

//   const projects: ITodosByProject[] = [
//     {
//       id: 'inbox',
//       name: 'Inbox',
//       color: {
//         name: 'Blue',
//         class: 'fill-blue-600',
//       },
//       todos: [],
//     },
//   ];

//   return {
//     dates: dates,
//     priorities: priorities,
//     projects: projects,
//     sections: [],
//     labels: [],

//     // setSections: (sections: ),

//     setTodosBySection: (section: ITodosBySection) => set((state) => ({})),

//     setTodosByProject: (project: ITodosByProject) =>
//       set((state) => ({
//         ...state,
//         projects: state.projects.map((p) =>
//           p.id === project.id ? project : p
//         ),
//       })),

//     setTodosByDate: (date: ITodosByDate) =>
//       set((state) => ({
//         ...state,
//         dates: state.dates.map((d) => (d.id === date.id ? date : d)),
//       })),

//     getLabels: () =>
//       get().labels.map(
//         ({ id, name }) =>
//           ({
//             id,
//             name,
//           } as ILabel)
//       ),

//     getProjects: () =>
//       get().projects.map(
//         ({ id, name, color }) =>
//           ({
//             id,
//             name,
//             color,
//           } as IProject)
//       ),

//     getSections: () =>
//       get().sections.map(
//         ({ id, index, name, project }) =>
//           ({
//             id,
//             index,
//             name,
//             project,
//           } as IInboxSection)
//       ),

//     addTodo: (todo: ITodo) =>
//       set((state) => ({
//         ...state,
//         dates: state.dates.map((date) =>
//           isSameDay(date.date, todo.date)
//             ? { ...date, todos: [...date.todos, todo] }
//             : date
//         ),
//         priorities: state.priorities.map((priority) =>
//           priority.priority === todo.priority
//             ? { ...priority, todos: [...priority.todos, todo] }
//             : priority
//         ),
//         projects: state.projects.map((project) =>
//           project.id === todo.project.id
//             ? { ...project, todos: [...project.todos, todo] }
//             : project
//         ),
//         sections: state.sections.map((section) =>
//           section.id === todo.section?.id
//             ? { ...section, todos: [...section.todos, todo] }
//             : section
//         ),
//         labels: state.labels.map((label) =>
//           todo.labels.some((l) => l.id === label.id)
//             ? { ...label, todos: [...label.todos, todo] }
//             : label
//         ),
//       })),

//     completeTodo: (todo: ITodo) =>
//       set((state) => ({
//         dates: state.dates.map((date) =>
//           isSameDay(date.date, todo.date)
//             ? {
//                 ...date,
//                 todos: date.todos.map((t) =>
//                   t.id === todo.id ? { ...todo, isCompleted: true } : t
//                 ),
//               }
//             : date
//         ),
//         priorities: state.priorities.map((priority) =>
//           priority.priority === todo.priority
//             ? {
//                 ...priority,
//                 todos: priority.todos.map((t) =>
//                   t.id === todo.id ? { ...todo, isCompleted: true } : t
//                 ),
//               }
//             : priority
//         ),
//         projects: state.projects.map((project) =>
//           project.id === todo.project.id
//             ? {
//                 ...project,
//                 todos: project.todos.map((t) =>
//                   t.id === todo.id ? { ...todo, isCompleted: true } : t
//                 ),
//               }
//             : project
//         ),
//         sections: state.sections.map((section) =>
//           section.id === todo.section?.id
//             ? {
//                 ...section,
//                 todos: section.todos.map((t) =>
//                   t.id === todo.id ? { ...todo, isCompleted: true } : t
//                 ),
//               }
//             : section
//         ),
//         labels: state.labels.map((label) =>
//           todo.labels.some((l) => l.id === label.id)
//             ? {
//                 ...label,
//                 todos: label.todos.map((t) =>
//                   t.id === todo.id ? { ...todo, isCompleted: true } : t
//                 ),
//               }
//             : label
//         ),
//       })),

//     editTodo: (todo: ITodo) =>
//       set((state) => ({
//         dates: state.dates.map((date) => ({
//           ...date,
//           todo: date.todos.map((oldTodo) =>
//             oldTodo.id === todo.id ? todo : oldTodo
//           ),
//         })),
//         priorities: state.priorities.map((priority) => ({
//           ...priority,
//           todo: priority.todos.map((oldTodo) =>
//             oldTodo.id === todo.id ? todo : oldTodo
//           ),
//         })),
//         projects: state.projects.map((project) => ({
//           ...project,
//           todo: project.todos.map((oldTodo) =>
//             oldTodo.id === todo.id ? todo : oldTodo
//           ),
//         })),
//         sections: state.sections.map((section) => ({
//           ...section,
//           todo: section.todos.map((oldTodo) =>
//             oldTodo.id === todo.id ? todo : oldTodo
//           ),
//         })),
//         labels: state.labels.map((label) => ({
//           ...label,
//           todo: label.todos.map((oldTodo) =>
//             oldTodo.id === todo.id ? todo : oldTodo
//           ),
//         })),
//       })),

//     createProject: (project: IProject) =>
//       set((state) => {
//         const newTodosByProject = { ...project, todos: [] } as ITodosByProject;

//         return {
//           ...state,
//           projects: [...state.projects, newTodosByProject],
//         };
//       }),

//     editProject: (project: IProject) =>
//       set((state) => ({
//         ...state,
//         projects: state.projects.map((oldProject) =>
//           oldProject.id === project.id
//             ? ({ ...oldProject, ...project } as ITodosByProject)
//             : oldProject
//         ),
//       })),

//     deleteProject: (projectId: string) =>
//       set((state) => ({
//         ...state,
//         projects: state.projects.filter((project) => project.id !== projectId),
//       })),

//     createSection: (section: IInboxSection) =>
//       set((state) => {
//         const sections = Array.from(state.sections);
//         const newTodosBySection = { ...section, todos: [] } as ITodosBySection;
//         sections.splice(section.index, 0, newTodosBySection);

//         return {
//           ...state,
//           sections,
//         };
//       }),

//     editSection: (section: IInboxSection) =>
//       set((state) => ({
//         ...state,
//         sections: state.sections.map((oldSection) =>
//           oldSection.id === section.id
//             ? ({ ...oldSection, ...section } as ITodosBySection)
//             : oldSection
//         ),
//       })),

//     deleteSection: (sectionId: string) =>
//       set((state) => ({
//         ...state,
//         sections: state.sections.filter((section) => section.id !== sectionId),
//       })),

//     createLabel: (label: ILabel) =>
//       set((state) => ({
//         ...state,
//         labels: [...state.labels, { ...label, todos: [] } as ITodosByLabel],
//       })),

//     editLabel: (label: ILabel) =>
//       set((state) => ({
//         ...state,
//         labels: state.labels.map((oldLabel) =>
//           oldLabel.id === label.id
//             ? ({ ...oldLabel, ...label } as ITodosByLabel)
//             : oldLabel
//         ),
//       })),

//     deleteLabel: (labelId: string) =>
//       set((state) => ({
//         ...state,
//         labels: state.labels.filter((label) => label.id !== labelId),
//       })),
//   };
// });
