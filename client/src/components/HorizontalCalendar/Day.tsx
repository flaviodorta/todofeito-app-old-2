import {
  getMonth,
  getYear,
  isToday,
  isEqual as isDateEqual,
  compareAsc,
} from 'date-fns';
import { useRef } from 'react';
import { getDayNameInWeek, getDayNumberInMonth } from '../../helpers/functions';
import { motion } from 'framer-motion';
import { useUserStore } from '../../zustand';
import { language } from '../../helpers/constants';

interface IDayProps {
  className?: string;
  date: Date;
  selectedDate: Date;
  setSelectedDate: (date: Date) => void;
}

export const Day = ({
  className,
  date,
  selectedDate,
  setSelectedDate,
}: IDayProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const { todos } = useUserStore();

  let isSelected =
    selectedDate &&
    getDayNumberInMonth(selectedDate) === getDayNumberInMonth(date) &&
    getMonth(selectedDate) === getMonth(date) &&
    getYear(selectedDate) === getYear(date);

  const isUpcoming = compareAsc(date, new Date()) === 1 || isToday(date);

  const selectDay = () => {
    if (isUpcoming) setSelectedDate(date);
  };

  const existsTodo = todos.some((todo) => isDateEqual(todo.date as Date, date));

  return (
    <motion.div
      ref={ref}
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
        {getDayNameInWeek(date, language).substring(0, 3)}
      </span>

      <span
        className={`${isSelected && isUpcoming ? 'font-bold' : ''}
        ${isToday(date) ? 'font-bold text-blue-600' : ''}
        ${!isUpcoming ? 'text-gray-300' : ''}
         relative w-fit h-fit py-2 duration-150 transition-colors`}
      >
        {getDayNumberInMonth(date)}
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
