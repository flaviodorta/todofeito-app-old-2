import { Fragment } from 'react';
import { useCalendarStore } from '../../zustand';
import { Day } from './Day';

export const Month = () => {
  const { currentMonth, previousMonth, currentYear, weekDaysNamesSorted } =
    useCalendarStore();
  const totalDaysInGrid =
    currentMonth.totalDays + previousMonth.totalOfLastDays;

  console.log(weekDaysNamesSorted);

  return (
    <div className='px-4 my-2 grid grid-cols-7 gap-3 h-32 '>
      {Array.from({ length: totalDaysInGrid }).map((_, i) => {
        if (i < previousMonth.totalOfLastDays) {
          const dateLastMonth = new Date(
            currentYear,
            currentMonth.number - 1,
            previousMonth.totalDays - previousMonth.totalOfLastDays + i + 1
          );

          return (
            <Fragment key={i}>
              <Day date={dateLastMonth} className='text-gray-400' />
            </Fragment>
          );
        }
        const dateCurrentMonth = new Date(
          currentYear,
          currentMonth.number,
          i - previousMonth.totalOfLastDays + 1
        );
        return (
          <Fragment key={i}>
            <Day date={dateCurrentMonth} />
          </Fragment>
        );
      })}
    </div>
  );
};
