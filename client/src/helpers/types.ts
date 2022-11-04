export type IRenderableElements =
  | 'sidebar'
  | 'add-todo-modal'
  | 'add-todo-item'
  | 'date-picker'
  | 'project-select'
  | 'label-select'
  | 'priority-select'
  | null;

export type IDataTypes = 'project' | 'section' | 'label' | 'todo';

export interface IUIStore {
  dropdownPosition: { x: number; y: number };
  renderedElements: IRenderableElements[];
  setDropdownPosition: (x: number, y: number) => void;
  isElementRendered: (selectType: IRenderableElements) => boolean;
  setRenderedElements: (selectType: IRenderableElements, show: boolean) => void;
}

export interface ISearchedInputs {
  recentSearches: string[];
  recentylViewed: (IProject | ISection | ILabel | ITodo)[];
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

export interface ITodosStore {
  todos: ITodo[];
  projects: IProject[];
  labels: ILabel[];
  sections: ISection[];
  dates: IUpcomingSection[];

  toggleUpcomingDateList: (upcomingDateId: string) => void;

  setTodos: (todos: ITodo[]) => void;
  addTodo: (todo: ITodo) => void;
  editTodo: (todo: ITodo) => void;
  completeTodo: (todo: ITodo) => void;

  addProject: (project: IProject) => void;
  deleteProject: (project: IProject) => void;
  editProject: (project: IProject) => void;

  setSections: (sections: ISection[]) => void;
  addSection: (section: ISection) => void;
  deleteSection: (section: ISection) => void;
  editSection: (section: ISection) => void;

  addLabel: (label: ILabel) => void;
  deleteLabel: (label: ILabel) => void;
  editLabel: (label: ILabel) => void;
}

export interface IUpcomingSection {
  id: string;
  title: string;
  date: Date;
  isListOpen: boolean;
}

export interface ISection {
  readonly id: string;
  index?: number;
  type: IDataTypes;
  title: string;
  readonly date: Date;
  project: IProject;
}

export interface ITodo {
  id: string;
  type: IDataTypes;
  title: string;
  description: string;

  date: Date;
  priority: number;
  project: IProject;
  section?: ISection;
  labels: ILabel[];

  isCompleted: boolean;
}

export interface ILabel {
  id: string;
  type: IDataTypes;
  title: string;
  color: {
    name: string;
    class: string;
  };
}

export interface IProject {
  id: string;
  type: IDataTypes;
  title: string;
  color: {
    name: string;
    class: string;
  };
}

export interface IDimensions extends DOMRectReadOnly {
  x: number;
  y: number;
  width: number;
  height: number;
  top: number;
  right: number;
  bottom: number;
  left: number;
}
