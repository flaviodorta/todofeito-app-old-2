import create from 'zustand';
import { isDesktop } from 'react-device-detect';
import { IUser, UIState } from '../helpers/types';
import {
  getDayNameInWeek,
  getDayNumberInMonth,
  getDayNumberInWeek,
  getMonthName,
  getMonthNumber,
  getTotalLastDaysInMonth,
  getYearNumber,
  isLeapYear,
  sortDaysByWeekOrder,
} from '../helpers/functions';
import { getDaysInMonth } from 'date-fns';

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
}

export interface IPreviousMonth {
  totalDays: number;
  totalOfLastDays: number;
}

export interface ICalendar {
  lang: string;
  today: Date;
  lastDateOfPreviousMonth: Date;
  selectedDayRef: React.RefObject<HTMLSpanElement> | null;
  currentDayRef: React.RefObject<HTMLSpanElement> | null;
  currentDay: IDay;
  currentMonth: IMonth;
  currentYear: number;
  previousMonth: IPreviousMonth;
  weekDaysNamesSorted: string[];
}

export const calendarStore = create<ICalendar>(() => {
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
  };

  const lastDateOfPreviousMonth = new Date(currentYear, currentMonth.number, 0);

  const previousMonth: IPreviousMonth = {
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
    selectedDayRef: null,
    currentDayRef: null,
    currentDay: currentDay,
    currentMonth: currentMonth,
    currentYear: currentYear,
    previousMonth: previousMonth,
    weekDaysNamesSorted: weekDaysNamesSorted,
  };
});

// export const datePickerStore = create<IDatePickerStore>((set, get) => {
//   const lang = window.navigator.language || 'default';
//   const today = new Day(null, lang);
//   const yearNumber = today.yearNumber;
//   const month = new Month(new Date(yearNumber, today. monthNumber - 1), lang);

//   return {
//     lang: lang,
//     format: 'MMM DD, YYYY',
//     selectedDay: null,
//     calendar: {
//       today: today,
//       month: month,
//       yearNumber: yearNumber,
//       weekDays: weekDays,
//       weekDaysNamesSorted: weekDaysNamesSorted,
//       isLeapYear: isLeapYear(yearNumber),
//       getMonth: (monthNumber: number) =>
//         new Month(
//           new Date(get().calendar.yearNumber, monthNumber - 1),
//           get().lang
//         ),
//       getPreviousMonth: () => {
//         if (get().calendar.month.number === 1) {
//           return new Month(
//             new Date(get().calendar.yearNumber - 1, 11),
//             get().lang
//           );
//         }

//         return new Month(
//           new Date(
//             get().calendar.yearNumber,
//             get().calendar.month.number - 1 - 1
//           ),
//           get().lang
//         );
//       },
//       getNextMonth: (month?: Month) => {
//         if ((month?.number || get().calendar.month.number) === 12) {
//           return new Month(
//             new Date(get().calendar.yearNumber + 1, 0),
//             get().lang
//           );
//         }

//         return new Month(
//           new Date(
//             month?.year || get().calendar.yearNumber,
//             (month?.number || get().calendar.month.number) + 1 + 1
//           ),
//           get().lang
//         );
//       },
//       goToDate: (monthNumber: number, yearNumber: number) =>
//         set((state) => ({
//           ...state,
//           calendar: {
//             ...state.calendar,
//             month: new Month(new Date(yearNumber, monthNumber - 1), get().lang),
//             yearNumber: yearNumber,
//           },
//         })),
//       goToNextYear: () =>
//         set((state) => ({
//           ...state,
//           calendar: {
//             ...state.calendar,
//             yearNumber: get().calendar.yearNumber + 1,
//             month: new Month(
//               new Date(get().calendar.yearNumber + 1, 0),
//               get().lang
//             ),
//           },
//         })),
//       goToPreviousYear: () =>
//         set((state) => ({
//           ...state,
//           calendar: {
//             ...state.calendar,
//             yearNumber: get().calendar.yearNumber - 1,
//             month: new Month(
//               new Date(get().calendar.yearNumber - 1, 11),
//               get().lang
//             ),
//           },
//         })),
//       goToNextMonth: () => {
//         if (get().calendar.month.number === 12) {
//           return get().calendar.goToNextYear();
//         }

//         set((state) => ({
//           ...state,
//           calendar: {
//             ...state.calendar,
//             month: new Month(
//               new Date(
//                 get().calendar.yearNumber,
//                 get().calendar.month.number + 1 - 1
//               ),
//               get().lang
//             ),
//           },
//         }));
//       },
//       goToPreviousMonth: () => {
//         if (get().calendar.month.number === 1) {
//           return get().calendar.goToPreviousYear();
//         }

//         set((state) => ({
//           ...state,
//           calendar: {
//             ...state.calendar,
//             month: new Month(
//               new Date(
//                 get().calendar.yearNumber,
//                 get().calendar.month.number - 1 - 1
//               ),
//               get().lang
//             ),
//           },
//         }));
//       },
//     },
//   };
// });
