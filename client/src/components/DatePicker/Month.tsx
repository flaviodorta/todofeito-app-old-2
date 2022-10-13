import { Fragment, useRef } from 'react';
import { ICalendar } from '../../helpers/types';
import { Day } from './Day';

interface IMonthProps {
  calendar: ICalendar;
  selectedDate: Date | null;
  setSelectedDate: (date: Date) => void;
}

export const Month = ({
  calendar,
  selectedDate,
  setSelectedDate,
}: IMonthProps) => {
  const ref = useRef<HTMLDivElement>(null);

  // prevent select all days in grid
  // useEffect(
  //   () =>
  //     // setSelectedDate({
  //     //   ref: ref,
  //     //   date: null,
  //     // }),
  //   []
  // );

  const daysGrid = () => {
    if (calendar.previousMonth.totalOfLastDays < 7) {
      const totalDaysInGrid =
        calendar.currentMonth.totalDays +
        calendar.previousMonth.totalOfLastDays;

      return Array.from({ length: totalDaysInGrid }).map((_, i) => {
        if (
          i < calendar.previousMonth.totalOfLastDays &&
          calendar.previousMonth.totalOfLastDays < 7
        ) {
          const dateLastMonth = new Date(
            calendar.currentYear,
            calendar.currentMonth.number - 1,
            calendar.previousMonth.totalDays -
              calendar.previousMonth.totalOfLastDays +
              i +
              1
          );

          return (
            <Fragment key={i}>
              <Day
                date={dateLastMonth}
                selectedDate={selectedDate}
                setSelectedDate={setSelectedDate}
                className='text-gray-400'
              />
            </Fragment>
          );
        }
        const dateCurrentMonth = new Date(
          calendar.currentYear,
          calendar.currentMonth.number,
          i - calendar.previousMonth.totalOfLastDays + 1
        );
        return (
          <Fragment key={i}>
            <Day
              date={dateCurrentMonth}
              selectedDate={selectedDate}
              setSelectedDate={setSelectedDate}
            />
          </Fragment>
        );
      });
    }

    const totalDaysInGrid = calendar.currentMonth.totalDays;

    return Array.from({ length: totalDaysInGrid }).map((_, i) => {
      const dateCurrentMonth = new Date(
        calendar.currentYear,
        calendar.currentMonth.number,
        i + 1
      );
      return (
        <Fragment key={i}>
          <Day
            date={dateCurrentMonth}
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
          />
        </Fragment>
      );
    });
  };

  return (
    <div ref={ref} className='w-full px-4 my-2 grid grid-cols-7 gap-1'>
      {daysGrid()}
    </div>
  );
};
