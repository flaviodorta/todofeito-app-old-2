import { getMonth, getYear, isToday } from 'date-fns';
import { useRef } from 'react';
import { getDayNumberInMonth } from '../../helpers/functions';
import { useCalendarStore } from '../../zustand';
import { motion } from 'framer-motion';

interface Props {
  className?: string;
  date: Date;
}

export const Day = (props: Props) => {
  const { className, date } = props;
  const { selectedDayRef, selectedDay, setSelectedDayRef, setSelectedDay } =
    useCalendarStore();

  const ref = useRef<HTMLSpanElement>(null);

  let isSelected =
    ref.current === selectedDayRef.current &&
    selectedDay &&
    getDayNumberInMonth(selectedDay) === getDayNumberInMonth(date) &&
    getMonth(selectedDay) === getMonth(date) &&
    getYear(selectedDay) === getYear(date);

  const onClickDay = () => {
    setSelectedDay(date);
    setSelectedDayRef(ref, date);
  };

  return (
    <span
      ref={ref}
      onClick={onClickDay}
      className={`${className} group ${
        isSelected && 'font-bold bg-blue-600/90'
      } w-7 h-7 cursor-pointer select-none text-center rounded-full relative flex items-center justify-center transition-[background] duration-150`}
    >
      {getDayNumberInMonth(date)}
      {isToday(date) && (
        <motion.span
          className={` ${
            isSelected ? 'bg-white' : 'bg-blue-600/90'
          } absolute top-5 w-1 h-1 rounded-full duration-150`}
        ></motion.span>
      )}
    </span>
  );
};
