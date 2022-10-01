export type IRenderableElements =
  | 'sidebar'
  | 'add-todo-modal'
  | 'add-todo-item'
  | 'date-picker-select'
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

export interface IDay {
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

export interface IAddTodoStore {
  title: string;
  description: string;
  project: string;
  labels: string[];
  priority: number;
  priorityLabelColor: IPriorityLabelColors;
  setTitle: (title: string) => void;
  setDescription: (description: string) => void;
  setProject: (project: string) => void;
  addLabel: (label: string) => void;
  removeLabel: (label: string) => void;
  setPriority: (priority: number) => void;
  setPriorityLabelColor: (priorityLabelColor: IPriorityLabelColors) => void;
}
