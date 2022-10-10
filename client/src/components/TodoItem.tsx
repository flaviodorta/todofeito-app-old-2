import { useEffect, useRef, useState } from 'react';
import { IRenderableElements, ITodo } from '../helpers/types';
import { useToggle } from '../hooks/useToggle';
import { useUserStore } from '../zustand';
import { CalendarRegularIcon, InboxSolidIcon } from './Icons';
import { motion } from 'framer-motion';
import { PenSolidIcon } from './Icons/Icons/PenSolidIcon';
import { DatePicker } from './DatePicker';

type ITodoItem = {
  todo: ITodo;
};

export const TodoItem = ({ todo }: ITodoItem) => {
  const { completeTodo } = useUserStore();
  const [checked, setChecked] = useState(todo.completed);
  const [isHover, setIsHover] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [renderedSelect, setRenderedSelect] =
    useState<IRenderableElements>(null);

  const dueDateRef = useRef<HTMLSpanElement>(null);

  const openDatePicker = () => {
    if (!renderedSelect) setRenderedSelect('date-picker');
  };

  const toggleHoverOn = () => {
    if (!renderedSelect) setIsHover(true);
  };

  const toggleHoverOff = () => {
    setIsHover(false);
  };

  const containerRef = useRef<HTMLDivElement>(null);

  const closeSelect = () => {
    setRenderedSelect(null);
    toggleHoverOff();
  };

  useEffect(() => {
    closeSelect();
  }, [selectedDate]);

  useEffect(() => {
    toggleHoverOff();
  }, [selectedDate]);

  const checkTodo = () => {
    setChecked(true);
    setTimeout(() => {
      completeTodo(todo.id);
    }, 200);
  };

  return (
    <>
      <div
        className='relative w-full h-fit p-2 bg-white rounded-md'
        onMouseEnter={toggleHoverOn}
        onMouseLeave={toggleHoverOff}
      >
        <div className='flex items-start w-full'>
          <motion.input
            animate={checked ? { scale: [1, 1.3, 1] } : {}}
            transition={{ duration: 0.2 }}
            key={todo.id}
            checked={checked}
            onChange={checkTodo}
            type='checkbox'
            className='w-4 h-4 translate-y-1 mr-2 outline-none'
          />
          <div className='flex flex-col'>
            <span className='text-sm w-full'>
              {todo.title.substring(0, 70)}
              {todo.title.length > 70 ? '...' : ''}
            </span>
            <span className='w-full text-xs text-gray-600'>
              {todo.description.substring(0, 50)}
              {todo.description.length > 50 ? '...' : ''}
            </span>
          </div>
        </div>
        <div className='w-full gap-1 flex pt-2 justify-end items-center h-fit text-xs color-gray-400'>
          <span className='capitalize'>{todo.project}</span>
          <InboxSolidIcon className='fill-blue-600 w-3 h-3' />
        </div>

        {isHover && (
          <div className='absolute flex items-center gap-2 top-1 right-0'>
            <span className='group mini-button-option cursor-pointer'>
              <PenSolidIcon className='fill-gray-400 group-hover:fill-gray-500' />
            </span>
            <span
              className={`${
                renderedSelect ? 'cursor-default' : 'cursor-pointer'
              } group relative mini-button-option group-hover:opacity-100`}
              onClick={openDatePicker}
            >
              <CalendarRegularIcon className='fill-gray-400 group-hover:fill-gray-500' />

              {renderedSelect === 'date-picker' && (
                <DatePicker
                  closeSelect={closeSelect}
                  selectedDate={selectedDate}
                  setSelectedDate={setSelectedDate}
                  parentRef={dueDateRef}
                  className='left-2'
                />
              )}
            </span>
          </div>
        )}
      </div>
    </>
  );
};
