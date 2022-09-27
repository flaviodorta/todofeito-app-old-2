import { Day, Month } from '../components/DatePicker';

export interface UIState {
  isMenuOpen: boolean;
  toggleMenu: () => void;
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

export interface ICalendar {
  today: Day;
  month: Month;
  yearNumber: number;
  weekDaysNames: string[];
  isLeapYear: boolean;
  getMonth: (monthNumber?: number) => Month;
  getPreviousMonth: () => Month;
  getNextMonth: () => Month;
  goToDate: (monthNumber: number, yearNumber: number) => void;
  goToNextYear: () => void;
  goToPreviousYear: () => void;
  goToNextMonth: () => void;
  goToPreviousMonth: () => void;
}

export interface IDatePickerStore {
  lang: string;
  format: string;
  selectedDay: Day | null;
  calendar: ICalendar;
}
