import { useCalendarStore } from '../../zustand';
import { Month } from './Month';

export const DatePicker = (): JSX.Element => {
  const {
    weekDaysNamesSorted,
    currentMonth,
    currentYear,
    goToNextMonth,
    goToPreviousMonth,
  } = useCalendarStore();

  const weekDaysFirstLetterSorted = weekDaysNamesSorted.map((dayName) => (
    <span className='uppercase text-gray-400'>{dayName.substring(0, 1)}</span>
  ));
  const monthNameShort = currentMonth.name.substring(0, 3);
  return (
    <div className='date-picker-container'>
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
            <span className='group date-picker-icons-wrapper'>
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

        <div className='flex px-4 pb-2 mt-3 gap-3 items-center justify-around'>
          {weekDaysFirstLetterSorted}
        </div>
        <hr />

        <div className='overflow-hidden'>
          <Month />
        </div>
      </div>
    </div>
  );
};
