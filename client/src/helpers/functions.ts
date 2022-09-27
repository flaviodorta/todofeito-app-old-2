export const getWeekNumber = (day: Date) => {
  const firstDayOfTheYear = new Date(day.getFullYear(), 0, 1);
  const pastDaysOfYear =
    (day.getTime() - firstDayOfTheYear.getTime()) / (24 * 60 * 60 * 1000);

  return Math.ceil((pastDaysOfYear + firstDayOfTheYear.getDay() + 1) / 7);
};

export const isLeapYear = (year: number) =>
  year % 100 === 0 ? year % 400 === 0 : year % 4 === 0;
