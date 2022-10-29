import { Fragment } from 'react';
import { ICalendarState } from '../../helpers/types';
import { Day } from './Day';

interface IMonthProps {
  calendar: ICalendarState;
  inputedDate: Date;
  setDate: (date: Date) => void;
  closeSelect: () => void;
}

export const Month = ({
  calendar,
  inputedDate,
  setDate,
  closeSelect,
}: IMonthProps) => {
  const daysGrid = () => {
    if (calendar.previousMonth.totalOfLastDays < 7) {
      const totalDaysInGrid =
        calendar.currentMonth.totalDays +
        calendar.previousMonth.totalOfLastDays;

      // if first day don't start in sunday
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
            <Fragment key={`${dateLastMonth}`}>
              <Day
                closeSelect={closeSelect}
                thisDate={dateLastMonth}
                inputedDate={inputedDate}
                setDate={setDate}
                className='opacity-0'
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
          <Fragment key={`${dateCurrentMonth}`}>
            <Day
              closeSelect={closeSelect}
              thisDate={dateCurrentMonth}
              inputedDate={inputedDate}
              setDate={setDate}
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
        <Fragment key={`${dateCurrentMonth}`}>
          <Day
            closeSelect={closeSelect}
            thisDate={dateCurrentMonth}
            inputedDate={inputedDate}
            setDate={setDate}
          />
        </Fragment>
      );
    });
  };

  return (
    <div className='w-full px-4 my-2 grid grid-cols-7 gap-1'>{daysGrid()}</div>
  );
};
