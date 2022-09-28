import { Fragment, useEffect, useRef } from 'react';
import { useCalendarStore } from '../../zustand';
import { Day } from './Day';

export const Month = () => {
  const { currentMonth, previousMonth, currentYear, setSelectedDayRef } =
    useCalendarStore();

  const ref = useRef<HTMLDivElement>(null);

  // prevent select all days in grid
  useEffect(() => setSelectedDayRef(ref, new Date()), []);

  const daysGrid = () => {
    if (previousMonth.totalOfLastDays < 7) {
      const totalDaysInGrid =
        currentMonth.totalDays + previousMonth.totalOfLastDays;

      return Array.from({ length: totalDaysInGrid }).map((_, i) => {
        if (
          i < previousMonth.totalOfLastDays &&
          previousMonth.totalOfLastDays < 7
        ) {
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
      });
    }

    const totalDaysInGrid = currentMonth.totalDays;

    return Array.from({ length: totalDaysInGrid }).map((_, i) => {
      const dateCurrentMonth = new Date(
        currentYear,
        currentMonth.number,
        i + 1
      );
      return (
        <Fragment key={i}>
          <Day date={dateCurrentMonth} />
        </Fragment>
      );
    });
  };

  return (
    <div ref={ref} className='px-4 my-2 grid grid-cols-7 gap-1 w-fit h-fit '>
      {daysGrid()}
    </div>
  );
};
