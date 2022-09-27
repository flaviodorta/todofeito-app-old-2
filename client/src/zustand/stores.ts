import create from 'zustand';
import { isDesktop } from 'react-device-detect';
import { IDatePickerStore, IUser, UIState } from '../helpers/types';
import { Day, Month } from '../components/DatePicker';
import { isLeapYear } from '../helpers/functions';

export const useUIStore = create<UIState>((set) => ({
  isMenuOpen: isDesktop ? true : false,
  toggleMenu: () => set((state) => ({ isMenuOpen: !state.isMenuOpen })),
}));

export const userUserStore = create<IUser>((set) => ({
  fullName: 'Flávio Dorta',
  email: 'dorta.dev@gmail.com',
}));

export const useDatePickerStore = create<IDatePickerStore>((set, get) => {
  const lang = window.navigator.language || 'default';
  const today = new Day(null, lang);
  const yearNumber = today.yearNumber;
  const month = new Month(new Date(yearNumber, today.monthNumber - 1), lang);
  const weekDaysName = Array.from({ length: 7 }).map(
    (_, i) => month.getDay(i).dayNameOfWeek
  );

  return {
    lang: lang,
    format: 'MMM DD, YYYY',
    selectedDay: null,
    calendar: {
      today: today,
      month: month,
      yearNumber: yearNumber,
      weekDaysNames: weekDaysName,
      isLeapYear: isLeapYear(yearNumber),
      getMonth: (monthNumber?: number) =>
        new Month(
          new Date(
            get().calendar.yearNumber,
            (monthNumber || get().calendar.today.monthNumber) - 1
          ),
          get().lang
        ),
      getPreviousMonth: () => {
        if (get().calendar.month.number === 1) {
          return new Month(new Date(get().calendar.yearNumber, 11), get().lang);
        }

        return new Month(
          new Date(
            get().calendar.yearNumber,
            get().calendar.month.number - 1 - 1
          ),
          get().lang
        );
      },
      getNextMonth: () => {
        if (get().calendar.month.number === 12) {
          return new Month(
            new Date(get().calendar.yearNumber + 1, 11),
            get().lang
          );
        }

        return new Month(
          new Date(
            get().calendar.yearNumber,
            get().calendar.month.number - 1 - 1
          ),
          get().lang
        );
      },
      goToDate: (monthNumber: number, yearNumber: number) =>
        set((state) => ({
          ...state,
          calendar: {
            ...state.calendar,
            month: new Month(new Date(yearNumber, monthNumber - 1), get().lang),
            yearNumber: yearNumber,
          },
        })),
      goToNextYear: () =>
        set((state) => ({
          ...state,
          calendar: {
            ...state.calendar,
            yearNumber: get().calendar.yearNumber + 1,
            month: new Month(
              new Date(get().calendar.yearNumber + 1, 0),
              get().lang
            ),
          },
        })),
      goToPreviousYear: () =>
        set((state) => ({
          ...state,
          calendar: {
            ...state.calendar,
            yearNumber: get().calendar.yearNumber + 1,
            month: new Month(
              new Date(get().calendar.yearNumber + 1, 0),
              get().lang
            ),
          },
        })),
      goToNextMonth: () => {
        if (get().calendar.month.number === 12) {
          return get().calendar.goToNextYear();
        }

        set((state) => ({
          ...state,
          calendar: {
            ...state.calendar,
            month: new Month(
              new Date(
                get().calendar.yearNumber,
                get().calendar.month.number + 1 - 1
              )
            ),
          },
        }));
      },
      goToPreviousMonth: () => {
        if (get().calendar.month.number === 12) {
          console.log('cu');
          return get().calendar.goToNextYear();
        }

        set((state) => ({
          ...state,
          calendar: {
            ...state.calendar,
            month: new Month(
              new Date(
                get().calendar.yearNumber,
                get().calendar.month.number - 1 - 1
              )
            ),
          },
        }));
      },
    },
  };
});
