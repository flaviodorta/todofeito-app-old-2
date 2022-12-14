import { compareAsc, getMonth, getYear, isToday } from 'date-fns';
import { useRef } from 'react';
import { getDayNumberInMonth } from '../../helpers/functions';
import { motion } from 'framer-motion';

interface IDayProps {
  className?: string;
  thisDate: Date;
  inputedDate: Date;
  setDate: (date: Date) => void;
  closeSelect: () => void;
}

export const Day = (props: IDayProps) => {
  const { className, thisDate, inputedDate, setDate, closeSelect } = props;

  const ref = useRef<HTMLSpanElement>(null);

  let isSelected =
    inputedDate &&
    getDayNumberInMonth(inputedDate) === getDayNumberInMonth(thisDate) &&
    getMonth(inputedDate) === getMonth(thisDate) &&
    getYear(inputedDate) === getYear(thisDate);

  const isUpcoming =
    compareAsc(thisDate, new Date()) === 1 || isToday(thisDate);

  const selectDay = () => {
    if (isUpcoming) {
      setDate(thisDate);
      closeSelect();
    }
  };

  return (
    <span
      ref={ref}
      onClick={selectDay}
      className={`${className ? className : ''} group ${
        isSelected ? 'font-bold bg-blue-600/90' : ''
      }
      ${isUpcoming ? 'cursor-pointer' : 'cursor-default text-gray-400'}
      h-7 w-7 select-none text-center rounded-full relative flex-center transition-[background] duration-150`}
    >
      {getDayNumberInMonth(thisDate)}
      {isToday(thisDate) && (
        <motion.span
          className={` ${
            isSelected ? 'bg-white' : 'bg-blue-600/90'
          } absolute translate-x-[0.5px] top-5 w-1 h-1 rounded-full duration-150`}
        ></motion.span>
      )}
    </span>
  );
};
