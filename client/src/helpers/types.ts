export type IRenderableElements =
  | 'sidebar'
  | 'add-todo-modal'
  | 'add-todo-item'
  | 'date-picker'
  | 'project-select'
  | 'label-select'
  | 'priority-select'
  | null;

export interface IUIStore {
  dropdownPosition: { x: number; y: number };
  renderedElements: IRenderableElements[];
  setDropdownPosition: (x: number, y: number) => void;
  isElementRendered: (selectType: IRenderableElements) => boolean;
  setRenderedElements: (selectType: IRenderableElements, show: boolean) => void;
}

export interface Country {
  name: {
    common: string;
  };
}

export interface IUserStore {
  fullName: string;
  email: string;
}

export interface ICalendarState {
  currentDay: IDay;
  currentMonth: IMonth;
  currentYear: number;
  previousMonth: IMonth;
}

export interface IDay {
  date: Date;
  nameInWeek: string;
  numberInMonth: number;
}

export interface IMonth {
  name: string;
  number: number;
  totalDays: number;
  totalOfLastDays: number;
}

export interface IPreviousMonth {
  totalDays: number;
  totalOfLastDays: number;
}

export type IPriorityLabelColors =
  | 'fill-red-600'
  | 'fill-orange-600'
  | 'fill-yellow-600'
  | 'fill-blue-600'
  | null;

export interface ITodo {
  id: string;
  title: string;
  description: string;

  date: Date;
  priority: number;
  project: IProject;
  section: ISection | null;
  labels: ILabel[];

  isCompleted: boolean;
}

export interface ITodosByDate {
  id: string;
  name: string;
  date: Date;
  todos: ITodo[];
}

export interface ITodosByPriority {
  priority: number;
  todos: ITodo[];
}

export interface ILabel {
  id: string;
  name: string;
}

export interface ITodosByLabel extends ILabel {
  todos: ITodo[];
}

export interface IProject {
  id: string;
  name: string;
  color: {
    name: string;
    class: string;
  };
}

export interface ITodosByProject {
  id: string;
  name: string;
  color: {
    name: string;
    class: string;
  };
  todos: ITodo[];
}

export interface ISection {
  id: string;
  index: number;
  name: string;
  project: IProject;
}

export interface ITodosBySection extends ISection {
  todos: ITodo[];
}

export interface ITodosStore {
  dates: ITodosByDate[];

  priorities: ITodosByPriority[];

  labels: ITodosByLabel[];

  projects: ITodosByProject[];

  sections: ITodosBySection[];

  getLabels: () => ILabel[];
  getProjects: () => IProject[];
  getSections: () => ISection[];

  addTodo: (todo: ITodo) => void;
  editTodo: (todo: ITodo) => void;
  completeTodo: (todo: ITodo) => void;

  createProject: (project: IProject) => void;
  editProject: (project: IProject) => void;
  deleteProject: (projectId: string) => void;

  createSection: (section: ISection) => void;
  editSection: (section: ISection) => void;
  deleteSection: (sectionId: string) => void;

  createLabel: (label: ILabel) => void;
  editLabel: (label: ILabel) => void;
  deleteLabel: (plabelsd: string) => void;
}
