import { Fragment, useEffect, useRef } from 'react';
import { IDay, IMonth } from '../../helpers/types';
import { Day } from './Day';

type ISelectedDate = {
  ref: {
    current: HTMLElement | null;
  };
  date: Date | null;
};

interface ICalendar {
  currentDay: IDay;
  currentMonth: IMonth;
  currentYear: number;
  previousMonth: IMonth;
}

interface IMonthProps {
  calendar: ICalendar;
  selectedDate: ISelectedDate;
  setSelectedDate: React.Dispatch<React.SetStateAction<ISelectedDate>>;
}

export const Month = ({
  calendar,
  selectedDate,
  setSelectedDate,
}: IMonthProps) => {
  const ref = useRef<HTMLDivElement>(null);

  // prevent select all days in grid
  useEffect(
    () =>
      setSelectedDate((state) => ({
        ref: ref,
        date: new Date(),
      })),
    []
  );

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
