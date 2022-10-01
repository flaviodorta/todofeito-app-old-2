import { getDaysInMonth } from 'date-fns';
import React, { forwardRef, useState } from 'react';
import {
  getDayNameInWeek,
  getDayNumberInMonth,
  getMonthName,
  getMonthNumber,
  getTotalLastDaysInMonth,
  getYearNumber,
  sortDaysByWeekOrder,
} from '../../helpers/functions';
import { IDay, IMonth, ISelectedDate } from '../../helpers/types';
import { useCalendarStore } from '../../zustand';
import { Backdrop } from '../Backdrop';
import { Month } from './Month';

interface IDatePickerProps {
  className?: string;
  left: number;
  top: number;
  parentRef?: React.RefObject<HTMLElement>;
  renderedElement: string;
  selectedDate: ISelectedDate;
  setSelectedDate: React.Dispatch<React.SetStateAction<ISelectedDate>>;
  handleCloseSelect: () => void;
}

export const DatePicker = forwardRef<HTMLDivElement, IDatePickerProps>(
  (props, ref): JSX.Element => {
    const { handleCloseSelect, selectedDate, setSelectedDate } = props;
    const {
      // weekDaysNamesSorted,
      // currentMonth,
      // currentYear,
      goToNextMonth,
      goToPreviousMonth,
      goToCurrentMonth,
    } = useCalendarStore();

    const lang = window.navigator.language || 'default';
    const today = new Date();
    const date = selectedDate.date ? selectedDate.date : today;

    // changes

    const currentYear = getYearNumber(date);

    const currentDay: IDay = {
      numberInMonth: getDayNumberInMonth(date),
      nameInWeek: getDayNameInWeek(date, lang),
    };

    const currentMonth: IMonth = {
      name: getMonthName(date, lang),
      number: getMonthNumber(date),
      totalDays: getDaysInMonth(date),
      totalOfLastDays: getTotalLastDaysInMonth(
        new Date(
          getYearNumber(date),
          getMonthNumber(date),
          getTotalLastDaysInMonth(date)
        )
      ),
    };

    const lastDateOfPreviousMonth = new Date(
      currentYear,
      currentMonth.number,
      0
    );

    const previousMonth: IMonth = {
      name: getMonthName(lastDateOfPreviousMonth, lang),
      number: getMonthNumber(lastDateOfPreviousMonth),
      totalDays: getDaysInMonth(lastDateOfPreviousMonth),
      totalOfLastDays: getTotalLastDaysInMonth(lastDateOfPreviousMonth),
    };

    const weekDays = Array.from({ length: 7 }).map(
      (_, i) => new Date(currentYear, currentYear, currentDay.numberInMonth + i)
    );

    const weekDaysNamesSorted = sortDaysByWeekOrder(weekDays).map((date) =>
      getDayNameInWeek(date, lang)
    );

    const weekDaysFirstLetterSorted = weekDaysNamesSorted.map((dayName) => (
      <span className='flex-center uppercase text-gray-400'>
        {dayName.substring(0, 1)}
      </span>
    ));

    const monthNameShort = currentMonth.name.substring(0, 3);

    interface ICalendar {
      currentDay: IDay;
      currentMonth: IMonth;
      currentYear: number;
      previousMonth: IMonth;
    }

    const [calendar, setCalendar] = useState<ICalendar>({
      currentDay,
      currentMonth,
      currentYear,
      previousMonth,
    });

    return (
      <>
        <Backdrop handleClose={handleCloseSelect} className='z-90' />
        <div
          ref={ref}
          style={{ left: props.left, top: props.top }}
          className={`${props.className} z-100 -translate-x-1/2 translate-y-2 date-picker-container shadow-3xl`}
        >
          <div className='p-3'>
            <div className='flex items-center justify-between'>
              <span className='font-bold capitalize'>
                {monthNameShort} {currentYear}
              </span>
              <div className='flex justify-between gap-3 mr-2'>
                {/* previous month */}
                <span
                  onClick={goToPreviousMonth}
                  className='group date-picker-icons-wrapper'
                >
                  <span className='group-hover:border-gray-700 translate-x-1/4 rotate-45 border-b-[1px] border-l-[1px] w-[6px] h-[6px] border-gray-400' />
                </span>

                {/* actual day */}
                <span
                  onClick={goToCurrentMonth}
                  className='group date-picker-icons-wrapper'
                >
                  <span className='group-hover:border-gray-700 border-[1px] border-gray-400 rounded-full w-[8px] h-[8px] rotate-90 bg-none' />
                </span>

                {/* next month */}
                <span
                  onClick={goToNextMonth}
                  className='group date-picker-icons-wrapper'
                >
                  <span className='group-hover:border-gray-700 -translate-x-1/4 -rotate-45 border-b-[1px] border-r-[1px] w-[6px] h-[6px] border-gray-400' />
                </span>
              </div>
            </div>

            <div className='w-full px-4 my-2 grid grid-cols-7 gap-1'>
              {weekDaysFirstLetterSorted}
            </div>
            <hr />

            {/* <div className='overflow-hidden'> */}
            <Month
              calendar={calendar}
              selectedDate={selectedDate}
              setSelectedDate={setSelectedDate}
            />
            {/* </div> */}
          </div>
        </div>
      </>
    );
  }
);
