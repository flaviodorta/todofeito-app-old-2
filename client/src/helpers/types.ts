export type ISelectDropdownTypes =
  | 'sidebar'
  | 'add-todo'
  | 'date-picker'
  | 'project'
  | 'label'
  | 'priority';

export interface UIState {
  dropdownPosition: { x: number; y: number };
  renderedElements: ISelectDropdownTypes[];
  setDropdownPosition: (x: number, y: number) => void;
  isElementRendered: (selectType: ISelectDropdownTypes) => boolean;
  setRenderedElements: (
    selectType: ISelectDropdownTypes,
    show: boolean
  ) => void;
}

export interface IAddTodoStore {
  title: string;
  description: string;
  datePicker: Date;
  projects: string[];
  labels: string[];
  priority: number;
}

export interface Country {
  name: {
    common: string;
  };
}

export interface IUser {
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
