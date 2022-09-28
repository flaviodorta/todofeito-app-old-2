import create from 'zustand';
import { isDesktop } from 'react-device-detect';
import { IUser, UIState } from '../helpers/types';
import {
  getDayNameInWeek,
  getDayNumberInMonth,
  getMonthName,
  getMonthNumber,
  getTotalLastDaysInMonth,
  getYearNumber,
  sortDaysByWeekOrder,
} from '../helpers/functions';
import { getDaysInMonth } from 'date-fns';
import { RefObject } from 'react';

export const UIStore = create<UIState>((set) => ({
  isMenuOpen: isDesktop ? true : false,
  toggleMenu: () => set((state) => ({ isMenuOpen: !state.isMenuOpen })),
}));

export const userStore = create<IUser>((set) => ({
  fullName: 'Flávio Dorta',
  email: 'dorta.dev@gmail.com',
}));

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

export interface ICalendar {
  lang: string;
  today: Date;
  lastDateOfPreviousMonth: Date;
  selectedDayRef: {
    current: HTMLElement | null;
    date: { day: number; month: number; year: number } | null;
  };
  currentDay: IDay;
  currentMonth: IMonth;
  currentYear: number;
  previousMonth: IPreviousMonth;
  weekDaysNamesSorted: string[];
  setSelectedDayRef: (ref: RefObject<HTMLSpanElement>, date: Date) => void;
  goToNextMonth: () => void;
  goToPreviousMonth: () => void;
}

export const calendarStore = create<ICalendar>((set, get) => {
  const lang = window.navigator.language || 'default';
  const today = new Date();

  const currentYear = getYearNumber(today);

  const currentDay: IDay = {
    numberInMonth: getDayNumberInMonth(today),
    nameInWeek: getDayNameInWeek(today, lang),
  };

  const currentMonth: IMonth = {
    name: getMonthName(today, lang),
    number: getMonthNumber(today),
    totalDays: getDaysInMonth(today),
    totalOfLastDays: getTotalLastDaysInMonth(
      new Date(
        getYearNumber(today),
        getMonthNumber(today),
        getTotalLastDaysInMonth(today)
      )
    ),
  };

  const lastDateOfPreviousMonth = new Date(currentYear, currentMonth.number, 0);

  const previousMonth: IMonth = {
    name: getMonthName(lastDateOfPreviousMonth, lang),
    number: getMonthNumber(lastDateOfPreviousMonth),
    totalDays: getDaysInMonth(lastDateOfPreviousMonth),
    totalOfLastDays: getTotalLastDaysInMonth(lastDateOfPreviousMonth),
  };

  const weekDays = Array.from({ length: 7 }).map(
    (_, i) => new Date(currentYear, currentYear, currentDay.numberInMonth + i)
  );
  const weekDaysNamesSorted = sortDaysByWeekOrder(weekDays).map((date) =>
    getDayNameInWeek(date, lang)
  );

  return {
    lang: lang,
    today: today,
    lastDateOfPreviousMonth: lastDateOfPreviousMonth,
    selectedDayRef: { current: null, date: null },
    currentDay: currentDay,
    currentMonth: currentMonth,
    currentYear: currentYear,
    previousMonth: previousMonth,
    weekDaysNamesSorted: weekDaysNamesSorted,
    setSelectedDayRef: (ref: RefObject<HTMLElement>, date: Date) =>
      set((state) => ({
        ...state,
        selectedDayRef: {
          current: ref.current,
          date: {
            day: getDayNumberInMonth(date),
            month: getMonthNumber(date),
            year: getYearNumber(date),
          },
        },
      })),
    goToNextMonth: () => {
      if (get().currentMonth.number === 11) {
        const newCurrentDate = new Date(get().currentYear + 1, 0, 1);
        set((state) => ({
          ...state,
          currentYear: get().currentYear + 1,
          currentMonth: {
            number: getMonthNumber(newCurrentDate),
            name: getMonthName(newCurrentDate, get().lang),
            totalDays: getDaysInMonth(newCurrentDate),
            totalOfLastDays: getTotalLastDaysInMonth(newCurrentDate),
          },
          previousMonth: get().currentMonth,
        }));
      }
      const newCurrentDate = new Date(
        get().currentYear,
        get().currentMonth.number + 1,
        1
      );
      set((state) => ({
        ...state,
        currentMonth: {
          number: getMonthNumber(newCurrentDate),
          name: getMonthName(newCurrentDate, get().lang),
          totalDays: getDaysInMonth(newCurrentDate),
          totalOfLastDays: getTotalLastDaysInMonth(newCurrentDate),
        },
        previousMonth: get().currentMonth,
      }));
    },
    goToPreviousMonth: () => {
      if (get().currentMonth.number === 0) {
        const newCurrentDate = new Date(get().currentYear - 1, 11, 1);
        const newPreviousDate = new Date(get().currentYear - 1, 10, 1);
        set((state) => ({
          ...state,
          currentYear: get().currentYear - 1,
          currentMonth: {
            number: getMonthNumber(newCurrentDate),
            name: getMonthName(newCurrentDate, get().lang),
            totalDays: getDaysInMonth(newCurrentDate),
            totalOfLastDays: getTotalLastDaysInMonth(newCurrentDate),
          },
          previousMonth: {
            number: getMonthNumber(newPreviousDate),
            name: getMonthName(newPreviousDate, get().lang),
            totalDays: getDaysInMonth(newPreviousDate),
            totalOfLastDays: getTotalLastDaysInMonth(newPreviousDate),
          },
        }));
      }
      const newCurrentDate = new Date(
        get().currentYear,
        get().currentMonth.number - 1,
        1
      );
      const newPreviousDate = new Date(
        get().currentYear,
        get().currentMonth.number - 2,
        1
      );
      set((state) => ({
        ...state,
        currentMonth: {
          number: getMonthNumber(newCurrentDate),
          name: getMonthName(newCurrentDate, get().lang),
          totalDays: getDaysInMonth(newCurrentDate),
          totalOfLastDays: getTotalLastDaysInMonth(newCurrentDate),
        },
        previousMonth: {
          number: getMonthNumber(newPreviousDate),
          name: getMonthName(newPreviousDate, get().lang),
          totalDays: getDaysInMonth(newPreviousDate),
          totalOfLastDays: getTotalLastDaysInMonth(newPreviousDate),
        },
      }));
    },
  };
});
