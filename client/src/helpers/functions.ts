import {
  isSunday,
  isMonday,
  isTuesday,
  isWednesday,
  isThursday,
  isFriday,
  isSaturday,
  lastDayOfMonth,
} from 'date-fns';

export const getWeekNumber = (day: Date) => {
  const firstDayOfTheYear = new Date(day.getFullYear(), 0, 1);
  const pastDaysOfYear =
    (day.getTime() - firstDayOfTheYear.getTime()) / (24 * 60 * 60 * 1000);

  return Math.ceil((pastDaysOfYear + firstDayOfTheYear.getDay() + 1) / 7);
};

export const isLeapYear = (year: number) =>
  year % 100 === 0 ? year % 400 === 0 : year % 4 === 0;

export const sortDaysByWeekOrder = (arr: Date[]): Date[] => {
  const aux: Date[] = [];
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length; j++) {
      if (isSunday(arr[j])) aux[0] = arr[j];
      if (isMonday(arr[j])) aux[1] = arr[j];
      if (isTuesday(arr[j])) aux[2] = arr[j];
      if (isWednesday(arr[j])) aux[3] = arr[j];
      if (isThursday(arr[j])) aux[4] = arr[j];
      if (isFriday(arr[j])) aux[5] = arr[j];
      if (isSaturday(arr[j])) aux[6] = arr[j];
    }
  }
  return aux;
};

export const getDayNumberInMonth = (date: Date | null) =>
  (date ? date : new Date()).getDate();
export const getDayNumberInWeek = (date: Date | null) =>
  (date ? date : new Date()).getDay();
export const getDayNameInWeek = (date: Date | null, lang: string) =>
  (date ? date : new Date()).toLocaleString(lang, { weekday: 'long' });
export const getMonthNumber = (date: Date | null) =>
  (date ? date : new Date()).getMonth();
export const getYearNumber = (date: Date | null) =>
  (date ? date : new Date()).getFullYear();
export const getMonthName = (date: Date | null, lang: string) =>
  (date ? date : new Date()).toLocaleString(lang, { month: 'long' });
export const getTotalLastDaysInMonth = (date: Date) => {
  const lastDate = lastDayOfMonth(date);
  return getDayNumberInWeek(lastDate) + 1;
};

export const sortAlphabetic = (arr: string[]) =>
  arr.sort((a, b) => a.localeCompare(b));
