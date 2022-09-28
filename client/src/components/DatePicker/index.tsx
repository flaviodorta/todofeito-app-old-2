import { Month } from './Month';

export const DatePicker = (): JSX.Element => {
  return (
    <div className='date-picker-container'>
      <div className='p-3'>
        <div className='flex items-center justify-between'>
          <span className='font-bold capitalize'>
            {/* month name and year */}
          </span>
          <div className='flex justify-between gap-3 mr-2'>
            {/* previous month */}
            <span className='group date-picker-icons-wrapper'>
              <span className='group-hover:border-gray-700 translate-x-1/4 rotate-45 border-b-[1px] border-l-[1px] w-[6px] h-[6px] border-gray-400' />
            </span>

            {/* actual day */}
            <span className='group date-picker-icons-wrapper'>
              <span className='group-hover:border-gray-700 border-[1px] border-gray-400 rounded-full w-[8px] h-[8px] rotate-90 bg-none' />
            </span>

            {/* next month */}
            <span className='group date-picker-icons-wrapper'>
              <span className='group-hover:border-gray-700 -translate-x-1/4 -rotate-45 border-b-[1px] border-r-[1px] w-[6px] h-[6px] border-gray-400' />
            </span>
          </div>
        </div>

        <div className='flex px-4 pb-2 mt-3 gap-3 items-center justify-around'>
          {/* week days first letters */}
        </div>
        <hr />

        <div className='overflow-hidden'>
          <Month />
        </div>
      </div>
    </div>
  );
};
