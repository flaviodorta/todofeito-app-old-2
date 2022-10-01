import { ICalendarStore, IDay, IMonth } from '../../helpers/types';
import create from 'zustand';
import {
  getDayNameInWeek,
  getDayNumberInMonth,
  getMonthName,
  getMonthNumber,
  getTotalLastDaysInMonth,
  getYearNumber,
  sortDaysByWeekOrder,
} from '../../helpers/functions';
import { getDaysInMonth, getYear } from 'date-fns';

export const calendarStore = create<ICalendarStore>((set, get) => {
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
    selectedDayRef: { current: null },
    selectedDay: null,
    currentDay: currentDay,
    currentMonth: currentMonth,
    currentYear: currentYear,
    previousMonth: previousMonth,
    weekDaysNamesSorted: weekDaysNamesSorted,
    setSelectedDay: (date: Date) =>
      set((state) => ({
        ...state,
        selectedDay: date,
      })),
    setSelectedDayRef: (ref: React.RefObject<HTMLElement>, date: Date) =>
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
    goToCurrentMonth: () => {
      set((state) => ({
        ...state,
        currentYear: getYear(today),
        currentMonth: {
          number: getMonthNumber(today),
          name: getMonthName(today, get().lang),
          totalDays: getDaysInMonth(today),
          totalOfLastDays: getTotalLastDaysInMonth(today),
        },
        previousMonth: get().currentMonth,
      }));
    },
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
