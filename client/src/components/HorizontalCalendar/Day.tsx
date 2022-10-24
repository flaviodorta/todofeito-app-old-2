import { getMonth, getYear, isToday, compareAsc } from 'date-fns';
import { getDayNameInWeek, getDayNumberInMonth } from '../../helpers/functions';
import { motion } from 'framer-motion';

interface IDayProps {
  className?: string;
  thisDate: Date;
  inputedDate: Date;
  setDate: (date: Date) => void;
}

export const Day = ({ thisDate, inputedDate, setDate }: IDayProps) => {
  let isSelected =
    inputedDate &&
    getDayNumberInMonth(inputedDate) === getDayNumberInMonth(thisDate) &&
    getMonth(inputedDate) === getMonth(thisDate) &&
    getYear(inputedDate) === getYear(thisDate);

  const isUpcoming =
    compareAsc(thisDate, new Date()) === 1 || isToday(thisDate);

  const selectDay = () => {
    if (isUpcoming) setDate(thisDate);
  };

  const existsTodo = false;

  return (
    <motion.div
      onClick={selectDay}
      whileHover={
        isUpcoming ? { backgroundColor: 'rgb(209 213 219 / 0.3)' } : {}
      }
      transition={isUpcoming ? { duration: 0.15 } : {}}
      className={`${
        isUpcoming ? 'cursor-pointer' : 'cursor-default'
      } border-b-[1px] h-full w-full bg-none  border-gray-200 relative flex-center flex-col`}
    >
      <span className='capitalize text-xs text-gray-500 pt-2.5'>
        {getDayNameInWeek(thisDate).substring(0, 3)}
      </span>

      <span
        className={`${isSelected && isUpcoming ? 'font-bold' : ''}
        ${isToday(thisDate) ? 'font-bold text-blue-600' : ''}
        ${!isUpcoming ? 'text-gray-300' : ''}
         relative w-fit h-fit py-2 duration-150 transition-colors`}
      >
        {getDayNumberInMonth(thisDate)}
        <span
          className={`${
            isSelected && isUpcoming ? 'bg-blue-600' : 'bg-gray-400'
          } 
          ${existsTodo ? 'block' : 'hidden'}
          absolute bottom-1.5 left-1/2 -translate-x-1/2  z-10  w-[3px] h-[3px] rounded-full`}
        />
      </span>

      <motion.span
        initial={false}
        animate={
          isSelected && isUpcoming
            ? { backgroundColor: 'rgb(37 99 235)' }
            : { backgroundColor: 'rgb(37 99 235 / 0)' }
        }
        transition={{ duration: 0.15 }}
        className='absolute bottom-0 left-0 h-[3px] w-full'
      />
    </motion.div>
  );
};
