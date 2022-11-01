import { getDaysInMonth, getYear } from 'date-fns';
import { useState } from 'react';
import {
  getDayNameInWeek,
  getDayNumberInMonth,
  getMonthName,
  getMonthNumber,
  getTotalLastDaysInMonth,
  getYearNumber,
  sortDaysByWeekOrder,
} from '../../helpers/functions';
import { ICalendarState, IDay, IDimensions, IMonth } from '../../helpers/types';
import { useDimensions } from '../../hooks/useDimensions';
import useWindowSize from '../../hooks/useWindowSize';
import { Backdrop } from '../Backdrop';
import { Month } from './Month';

interface IDatePickerProps {
  className?: string;
  inputedDate: Date;
  sizes: IDimensions;
  setDate: (date: Date) => void;
  closeSelect: () => void;
}

export const DatePicker = ({
  inputedDate,
  sizes,
  closeSelect,
  setDate,
}: IDatePickerProps): JSX.Element => {
  const currentYear = getYearNumber(inputedDate);
  const currentDay: IDay = {
    date: inputedDate,
    numberInMonth: getDayNumberInMonth(inputedDate),
    nameInWeek: getDayNameInWeek(inputedDate),
  };
  const currentMonth: IMonth = {
    name: getMonthName(inputedDate),
    number: getMonthNumber(inputedDate),
    totalDays: getDaysInMonth(inputedDate),
    totalOfLastDays: getTotalLastDaysInMonth(
      new Date(
        getYearNumber(inputedDate),
        getMonthNumber(inputedDate),
        getTotalLastDaysInMonth(inputedDate)
      )
    ),
  };
  const lastDateOfPreviousMonth = new Date(currentYear, currentMonth.number, 0);
  const previousMonth: IMonth = {
    name: getMonthName(lastDateOfPreviousMonth),
    number: getMonthNumber(lastDateOfPreviousMonth),
    totalDays: getDaysInMonth(lastDateOfPreviousMonth),
    totalOfLastDays: getTotalLastDaysInMonth(lastDateOfPreviousMonth),
  };
  const weekDays = Array.from({ length: 7 }).map(
    (_, i) => new Date(currentYear, currentYear, currentDay.numberInMonth + i)
  );
  const weekDaysNamesSorted = sortDaysByWeekOrder(weekDays).map((date) =>
    getDayNameInWeek(date)
  );
  const weekDaysFirstLetterSorted = weekDaysNamesSorted.map((dayName) => (
    <span key={dayName} className='flex-center w-7 h-7 uppercase text-gray-400'>
      {dayName.substring(0, 1)}
    </span>
  ));

  // terminar
  const [calendar, setCalendar] = useState<ICalendarState>({
    currentDay,
    currentMonth,
    currentYear,
    previousMonth,
  });

  const monthNameShort = calendar.currentMonth.name.substring(0, 3);

  const goToCurrentMonth = () =>
    setCalendar({
      currentDay,
      currentMonth,
      currentYear,
      previousMonth,
    });

  const goToNextMonth = () =>
    setCalendar((state) => {
      if (state.currentMonth.number === 11) {
        const newCurrentDate = new Date(state.currentYear + 1, 0, 1);
        return {
          ...state,
          currentYear: getYear(newCurrentDate),
          currentMonth: {
            number: getMonthNumber(newCurrentDate),
            name: getMonthName(newCurrentDate),
            totalDays: getDaysInMonth(newCurrentDate),
            totalOfLastDays: getTotalLastDaysInMonth(newCurrentDate),
          },
          previousMonth: state.currentMonth,
        };
      }

      const newCurrentDate = new Date(
        state.currentYear,
        state.currentMonth.number + 1,
        1
      );
      return {
        ...state,
        currentMonth: {
          number: getMonthNumber(newCurrentDate),
          name: getMonthName(newCurrentDate),
          totalDays: getDaysInMonth(newCurrentDate),
          totalOfLastDays: getTotalLastDaysInMonth(newCurrentDate),
        },
        previousMonth: state.currentMonth,
      };
    });

  const goToPreviousMonth = () =>
    setCalendar((state) => {
      if (state.currentMonth.number === 0) {
        const newCurrentDate = new Date(state.currentYear - 1, 11, 1);
        const newPreviousDate = new Date(state.currentYear - 1, 10, 1);
        return {
          ...state,
          currentYear: getYear(newCurrentDate),
          currentMonth: {
            number: getMonthNumber(newCurrentDate),
            name: getMonthName(newCurrentDate),
            totalDays: getDaysInMonth(newCurrentDate),
            totalOfLastDays: getTotalLastDaysInMonth(newCurrentDate),
          },
          previousMonth: {
            number: getMonthNumber(newPreviousDate),
            name: getMonthName(newPreviousDate),
            totalDays: getDaysInMonth(newPreviousDate),
            totalOfLastDays: getTotalLastDaysInMonth(newPreviousDate),
          },
        };
      }

      const newCurrentDate = new Date(
        state.currentYear,
        state.currentMonth.number - 1,
        1
      );
      const newPreviousDate = new Date(
        state.currentYear,
        state.currentMonth.number - 2,
        1
      );
      return {
        ...state,
        currentMonth: {
          number: getMonthNumber(newCurrentDate),
          name: getMonthName(newCurrentDate),
          totalDays: getDaysInMonth(newCurrentDate),
          totalOfLastDays: getTotalLastDaysInMonth(newCurrentDate),
        },
        previousMonth: {
          number: getMonthNumber(newPreviousDate),
          name: getMonthName(newPreviousDate),
          totalDays: getDaysInMonth(newPreviousDate),
          totalOfLastDays: getTotalLastDaysInMonth(newPreviousDate),
        },
      };
    });

  const [containerSizes, containerRef] = useDimensions();

  const { width, height } = useWindowSize();

  const resizeRight = containerSizes.width / 2 - (width - sizes.left);

  const resizeLeft = containerSizes.left;

  const resizeX =
    resizeRight > 0 ? resizeRight + 10 : resizeLeft < 0 ? -resizeLeft + 10 : 0;

  const resizeY =
    containerSizes.height > height - sizes.bottom
      ? sizes.top - containerSizes.height
      : sizes.top + sizes.height;

  console.log(resizeY);

  return (
    <Backdrop close={closeSelect} className='z-[2000]'>
      <div
        ref={containerRef}
        style={{
          left: sizes.left + sizes.width / 2 + resizeX,
          top: resizeY,
        }}
        className='fixed z-[2001] -translate-x-1/2 w-60 h-fit text-xs bg-white border-[1px] border-gray-100 shadow-3xl'
      >
        <div className='p-3'>
          <div className='flex items-center justify-between'>
            <span className='font-bold capitalize'>
              {monthNameShort} {calendar.currentYear}
            </span>
            <div className='flex justify-between gap-3 mr-2'>
              {/* previous month */}
              <span
                onClick={goToPreviousMonth}
                className='group date-picker-icons-wrapper cursor-pointer'
              >
                <span className='group-hover:border-gray-700 translate-x-1/4 rotate-45 border-b-[1px] border-l-[1px] w-[6px] h-[6px] border-gray-400' />
              </span>

              {/* actual day */}
              <span
                onClick={goToCurrentMonth}
                className='group date-picker-icons-wrapper cursor-pointer'
              >
                <span className='group-hover:border-gray-700 border-[1px] border-gray-400 rounded-full w-[8px] h-[8px] rotate-90 bg-none' />
              </span>

              {/* next month */}
              <span
                onClick={goToNextMonth}
                className='group date-picker-icons-wrapper cursor-pointer'
              >
                <span className='group-hover:border-gray-700 -translate-x-1/4 -rotate-45 border-b-[1px] border-r-[1px] w-[6px] h-[6px] border-gray-400' />
              </span>
            </div>
          </div>

          <div className='w-full px-4 my-2 grid grid-cols-7 gap-1'>
            {weekDaysFirstLetterSorted}
          </div>
          <hr />

          <Month
            calendar={calendar}
            inputedDate={inputedDate}
            setDate={setDate}
            closeSelect={closeSelect}
          />
        </div>
      </div>
    </Backdrop>
  );
};
