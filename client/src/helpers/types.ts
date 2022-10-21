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

export interface IProject {
  id: string;
  name: string;
  color: {
    name: string;
    class: string;
  };
}

export interface ILabel {
  id: string;
  name: string;
  todos: ITodo[];
}

export interface ISection {
  id: string;
  name: string;
  projectId: string;
  todos: ITodo[];
}

export interface ITodo {
  id: string;
  title: string;
  description: string;
  date: Date | null;
  project: Pick<IProject, 'id' | 'name'>;
  sectionId?: string;
  labelsIds: string[];
  priority: number;
  checkedLabels: string[];
  isCompleted: boolean;
}

export interface IUserStore {
  fullName: string;
  email: string;
  todos: ITodo[];
  projects: IProject[];
  labels: ILabel[];
  sections: ISection[];
  editSection: (section: ISection) => void;
  createSection: (section: ISection, index: number) => void;
  deleteSection: (id: string) => void;
  addTodo: (todo: ITodo) => void;
  deleteTodo: (todo: ITodo) => void;
  editTodo: (todo: ITodo) => void;
  completeTodo: (todo: ITodo) => void;
  createProject: (project: IProject) => void;
  deleteProject: (id: string) => void;
  createLabel: (label: ILabel) => void;
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

export interface ICalendarStore {
  lang: string;
  today: Date;
  lastDateOfPreviousMonth: Date;
  selectedDayRef: {
    current: HTMLElement | null;
  };
  selectedDay: Date | null;
  currentDay: IDay;
  currentMonth: IMonth;
  currentYear: number;
  previousMonth: IPreviousMonth;
  weekDaysNamesSorted: string[];
  setSelectedDay: (date: Date) => void;
  goToCurrentMonth: () => void;
  setSelectedDayRef: (
    ref: React.RefObject<HTMLSpanElement>,
    date: Date
  ) => void;
  goToNextMonth: () => void;
  goToPreviousMonth: () => void;
}

export type IPriorityLabelColors =
  | 'fill-red-600'
  | 'fill-orange-600'
  | 'fill-yellow-600'
  | 'fill-blue-600'
  | null;

export interface IAddTodoInputs {
  title: string;
  description: string;
  project: string;
  labels: string[];
  priority: number | null;
  priorityLabelColor: IPriorityLabelColors;
}

export type ISelectedDate = {
  ref: {
    current: HTMLElement | null;
  };
  date: Date | null;
};

export interface ICalendar {
  currentDay: IDay;
  currentMonth: IMonth;
  currentYear: number;
  previousMonth: IMonth;
}

export interface IAddTodoInputs {
  title: string;
  description: string;
  project: string;
  labels: string[];
  priority: number | null;
  priorityLabelColor: IPriorityLabelColors;
}
