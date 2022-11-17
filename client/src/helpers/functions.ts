import {
  isSunday,
  isMonday,
  isTuesday,
  isWednesday,
  isThursday,
  isFriday,
  isSaturday,
  lastDayOfMonth,
  getMonth,
} from 'date-fns';
import React from 'react';
import i18next from 'i18next';
import '../i18n';

const lang = i18next.language;

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
export const getDayNameInWeek = (date: Date | null) =>
  (date ? date : new Date()).toLocaleString(lang, { weekday: 'long' });
export const getMonthNumber = (date: Date | null) =>
  (date ? date : new Date()).getMonth();
export const getYearNumber = (date: Date | null) =>
  (date ? date : new Date()).getFullYear();
export const getMonthName = (date: Date | null) =>
  (date ? date : new Date()).toLocaleString(lang, { month: 'long' });
export const getTotalLastDaysInMonth = (date: Date) => {
  const lastDate = lastDayOfMonth(date);
  return getDayNumberInWeek(lastDate) + 1;
};

export const sortAlphabetic = (arr: string[]) =>
  arr.sort((a, b) => a.localeCompare(b));

export const reorder = <T>(list: T[], startIndex: number, endIndex: number) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

export const onKeyUpEnter =
  <T extends () => void, E extends HTMLElement = HTMLElement>(
    cb: T,
    ref: React.RefObject<E>
  ) =>
  (event: React.KeyboardEvent<E>) => {
    if (event.key === 'Enter' && document.activeElement === ref.current) cb();
  };

export const getWeekDays = (date: Date) => {
  const arr: Date[] = [];

  const year = getYearNumber(date);
  const month = getMonth(date);
  const day = getDayNumberInMonth(date);

  const weekDays = Array.from({ length: 7 }).map(
    (_, i) => new Date(year, month, day + i)
  );

  const weekDaysNamesSorted = sortDaysByWeekOrder(weekDays).map((date) =>
    getDayNameInWeek(date)
  );

  const numberInWeek = weekDaysNamesSorted.findIndex(
    (day) => day === getDayNameInWeek(date)
  );

  arr.push(date);

  Array.from({ length: numberInWeek }).forEach((_, idx) => {
    const date = new Date(year, month, day - idx - 1);
    arr.unshift(date);
  });

  Array.from({ length: 7 - numberInWeek - 1 }).forEach((_, idx) => {
    const date = new Date(year, month, day + idx + 1);
    arr.push(date);
  });

  return arr;
};

export const capitalizeFirstLetter = (string: string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

export function getDatasByIds<T extends { id: string }>(
  array: T[],
  arrayIds: string[]
): T[] {
  return array.filter((el) => arrayIds.some((id) => id === el.id));
}
