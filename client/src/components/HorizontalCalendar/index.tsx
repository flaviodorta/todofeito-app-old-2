import { Fragment, useEffect, useState } from 'react';
import {
  getMonthName,
  getWeekDays,
  getYearNumber,
} from '../../helpers/functions';
import { IRenderableElements } from '../../helpers/types';
import { Day } from './Day';
import { addDays, isEqual } from 'date-fns';
import { ChevronIcon } from '../Icons';
import { DatePicker } from '../DatePicker';
import { useDimensions } from '../../hooks/useDimensions';

export const HorizontalCalendar = ({
  inputedDate,
  setDate,
}: {
  inputedDate: Date;
  setDate: (date: Date) => void;
}) => {
  const today = new Date();

  const [renderedSelect, setRenderedSelect] =
    useState<IRenderableElements>(null);

  const [dueDateSizes, dueDateRef] = useDimensions();

  const [weekDays, setWeekDays] = useState<Date[]>(getWeekDays(inputedDate));

  const closeSelect = () => setRenderedSelect(null);

  const openDatePicker = () =>
    !renderedSelect ? setRenderedSelect('date-picker') : undefined;

  const goToToday = () => {
    setDate(today);
    setWeekDays(getWeekDays(today));
  };

  const goToNextWeek = () => {
    const firstDayOfNextWeek = addDays(weekDays[weekDays.length - 1], 1);

    setWeekDays(getWeekDays(firstDayOfNextWeek));
  };

  const goToPreviousWeek = () => {
    const lastDayOfPreviousWeek = addDays(weekDays[0], -1);

    setWeekDays(getWeekDays(lastDayOfPreviousWeek));
  };

  useEffect(() => {
    if (!weekDays.some((date) => isEqual(date, inputedDate)))
      setWeekDays(getWeekDays(inputedDate));
  }, [inputedDate]);

  return (
    <div className='w-full h-fit flex flex-col gap-2'>
      <div className='w-full flex items-center justify-between'>
        <div
          ref={dueDateRef}
          onClick={openDatePicker}
          className={`${
            renderedSelect ? 'cursor-default' : 'cursor-pointer'
          } relative flex gap-2 items-center`}
        >
          <span className='font-bold text-lg capitalize'>
            {getMonthName(inputedDate)} {getYearNumber(inputedDate)}
          </span>

          <ChevronIcon className='stroke-gray-400 h-3.5 w-3.5' />

          {renderedSelect === 'date-picker' && (
            <DatePicker
              inputedDate={inputedDate}
              setDate={setDate}
              closeSelect={closeSelect}
              sizes={dueDateSizes}
            />
          )}
        </div>

        <div className='flex justify-between'>
          {/* previous week */}
          <span
            onClick={goToPreviousWeek}
            className='group date-picker-icons-wrapper cursor-pointer border-[1px] border-r-0 border-gray-300 rounded-[3px_0_0_3px]'
          >
            <span className='group-hover:border-gray-700 translate-x-1/4 rotate-45 border-b-[1px] border-l-[1px] w-[6px] h-[6px] border-gray-400' />
          </span>

          {/* actual day */}
          <span
            onClick={goToToday}
            className='group date-picker-icons-wrapper cursor-pointer rounded-none border-[1px] border-r-gray-200 border-l-gray-200 border-gray-300'
          >
            <span className='group-hover:border-gray-700 border-[1px] border-gray-400 rounded-full w-[8px] h-[8px] rotate-90 bg-none' />
          </span>

          {/* next week */}
          <span
            onClick={goToNextWeek}
            className='group date-picker-icons-wrapper cursor-pointer border-[1px] border-l-0 border-gray-300 rounded-[0_3px_3px_0]'
          >
            <span className='group-hover:border-gray-700 -translate-x-1/4 -rotate-45 border-b-[1px] border-r-[1px] w-[6px] h-[6px] border-gray-400' />
          </span>
        </div>
      </div>

      <div className='grid grid-cols-7 w-full  auto-cols-max'>
        {weekDays.map((date) => (
          <Fragment key={`${date}`}>
            <Day thisDate={date} inputedDate={inputedDate} setDate={setDate} />
          </Fragment>
        ))}
      </div>
    </div>
  );
};
