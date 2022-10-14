import { getMonth, getYear, isToday } from 'date-fns';
import { useRef } from 'react';
import { getDayNumberInMonth } from '../../helpers/functions';
import { motion } from 'framer-motion';

interface IDayProps {
  className?: string;
  date: Date;
  selectedDate: Date | null;
  setSelectedDate: (date: Date) => void;
}

export const Day = (props: IDayProps) => {
  const { className, date, selectedDate, setSelectedDate } = props;

  const ref = useRef<HTMLSpanElement>(null);

  let isSelected =
    selectedDate &&
    getDayNumberInMonth(selectedDate) === getDayNumberInMonth(date) &&
    getMonth(selectedDate) === getMonth(date) &&
    getYear(selectedDate) === getYear(date);

  const onClickDay = () => setSelectedDate(date);

  return (
    <span
      ref={ref}
      onClick={onClickDay}
      className={`${className} group ${
        isSelected && 'font-bold bg-blue-600/90'
      } h-7 w-7 cursor-pointer select-none text-center rounded-full relative flex-center transition-[background] duration-150`}
    >
      {getDayNumberInMonth(date)}
      {isToday(date) && (
        <motion.span
          className={` ${
            isSelected ? 'bg-white' : 'bg-blue-600/90'
          } absolute translate-x-[0.5px] top-5 w-1 h-1 rounded-full duration-150`}
        ></motion.span>
      )}
    </span>
  );
};
