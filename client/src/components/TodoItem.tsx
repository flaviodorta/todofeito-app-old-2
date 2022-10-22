import { useEffect, useRef, useState } from 'react';
import { IRenderableElements, ITodo } from '../helpers/types';
import { useUIStore, useUserStore } from '../zustand';
import {
  CalendarRegularIcon,
  GripVerticalSolidIcon,
  InboxSolidIcon,
} from './Icons';
import { motion } from 'framer-motion';
import { PenSolidIcon } from './Icons/Icons/PenSolidIcon';
import { DatePicker } from './DatePicker';
import { DraggableProvided, DraggableStateSnapshot } from 'react-beautiful-dnd';
import { useEventListener } from '../hooks/useEventListener';
import { getDayNumberInMonth, getMonthName } from '../helpers/functions';
import { language } from '../helpers/constants';
import { isToday } from 'date-fns';

type ITodoItem = {
  todo: ITodo;
  draggableProvided: DraggableProvided;
  draggableSnapshot: DraggableStateSnapshot;
};

export const TodoItem = ({
  todo,
  draggableProvided,
  draggableSnapshot,
}: ITodoItem) => {
  const { completeTodo, editTodo } = useUserStore();
  const { setEditingTodoId, editingTodoId } = useUIStore();

  const [checked, setChecked] = useState(todo.isCompleted);
  const [isHover, setIsHover] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date>(
    todo.date ? todo.date : new Date()
  );
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

  useEffect(() => {
    const editDate = () => {
      editTodo({ ...todo, date: selectedDate });
    };

    editDate();
  }, [selectedDate]);

  // const containerRef = useRef<HTMLDivElement>(null);

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

  useEventListener('blur', () => setRenderedSelect(null));

  const checkTodo = () => {
    setChecked(true);
    setTimeout(() => {
      completeTodo(todo);
    }, 200);
  };

  return (
    <div
      className={`relative w-full h-fit mb-5 ${
        todo.description.length > 0 && editingTodoId !== todo.id
          ? 'h-fit'
          : 'h-fit'
      } 
      ${editingTodoId === todo.id ? 'h-64' : ''}
      ${
        draggableSnapshot.isDragging
          ? 'shadow-dragging-item border-none'
          : 'border-b-gray-200 border-b-[1px]'
      }
      ${draggableSnapshot.isDropAnimating ? 'shadow-lg' : ''}
      p-2
      outline-none
      flex
      flex-col
      gap-2
      transition-shadow
      duration-75
      rounded-lg
      bg-white`}
      onMouseEnter={toggleHoverOn}
      onMouseLeave={toggleHoverOff}
    >
      <div className='flex relative w-full'>
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

      <div className='w-full gap-1 flex pt-2 justify-between items-center h-fit text-xs color-gray-400'>
        <div
          onClick={openDatePicker}
          className={`${
            renderedSelect === 'date-picker'
              ? 'bg-gray-200 cursor-default'
              : 'cursor-pointer'
          } relative flex-center gap-1 text-gray-800 tracking-wide`}
        >
          <CalendarRegularIcon
            width='11px'
            height='11px'
            className='fill-purple-700 -translate-y-[1px]'
          />

          <span className='text-xs capitalize'>
            {selectedDate && isToday(selectedDate)
              ? 'Today'
              : `${getMonthName(selectedDate)} ${getDayNumberInMonth(
                  selectedDate
                )}`}
          </span>

          {renderedSelect === 'date-picker' && (
            <DatePicker
              className='left-28 sm:left-8'
              closeSelect={closeSelect}
              selectedDate={selectedDate}
              setSelectedDate={setSelectedDate}
            />
          )}
        </div>

        <span className='h-fit w-fit flex-center gap-1'>
          <InboxSolidIcon className='fill-blue-600 w-3 h-3' />
          <span className='capitalize'>{todo.project.name}</span>
        </span>
      </div>

      <span
        {...draggableProvided.dragHandleProps}
        style={{ cursor: 'all-scroll' }}
        className={`${
          isHover ? 'opacity-100' : 'opacity-0'
        } hover:opacity-100 group cursor-crosshair w-6 h-7 rounded-md flex-center absolute -left-7 top-1.5 hover:bg-gray-200 duration-100`}
      >
        <GripVerticalSolidIcon className='fill-gray-400 group-hover:fill-gray-600 w-3 h-3.5' />
      </span>

      {isHover && (
        <div className='absolute  flex items-center gap-2 top-1 right-0'>
          <span
            onClick={() => setEditingTodoId(todo)}
            className='group mini-button-option cursor-pointer'
          >
            <PenSolidIcon className='fill-gray-400 group-hover:fill-gray-500' />
          </span>
        </div>
      )}
    </div>
  );
};
