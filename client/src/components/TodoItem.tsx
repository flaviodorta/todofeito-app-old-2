import { memo, useEffect, useRef, useState } from 'react';
import { IRenderableElements, ITodo } from '../helpers/types';
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
import { isToday } from 'date-fns';
import { useDimensions } from '../hooks/useDimensions';
import { isEqual } from 'lodash';
import { EditTodo } from './EditTodo';
import { useUIStore } from '../zustand';

type ITodoItem = {
  todo: ITodo;
  draggableProvided: DraggableProvided;
  draggableSnapshot: DraggableStateSnapshot;
  // todoInputOpenById: string | null;
  setDraggingOverElementId: (id: string | null) => void;
  setDraggingElementId: (id: string | null) => void;
  setTodoInputOpenById: (id: string | null) => void;
  completeTodo: (todo: ITodo) => void;
  editTodo: (todo: ITodo) => void;
};

export const TodoItemMemoized = ({
  todo,
  // todoInputOpenById,
  draggableProvided,
  draggableSnapshot,
  setDraggingOverElementId,
  setDraggingElementId,
  completeTodo,
  editTodo,
  setTodoInputOpenById,
}: ITodoItem) => {
  const [checked, setChecked] = useState(todo.isCompleted);
  const [isHover, setIsHover] = useState(false);
  const [date, setDate] = useState(todo.date);

  const [renderedSelect, setRenderedSelect] =
    useState<IRenderableElements>(null);

  const containerRef = useRef<HTMLDivElement>(null!);

  const [dueDateSizes, dueDateRef, calcDueDate] = useDimensions({
    parentRef: containerRef.current,
  });
  // const [projectsSizes, projectsRef] = useDimensions();

  const openDatePicker = () =>
    !renderedSelect ? setRenderedSelect('date-picker') : undefined;

  const toggleHoverOn = () => (!renderedSelect ? setIsHover(true) : undefined);

  const toggleHoverOff = () => setIsHover(false);

  useEffect(() => {
    const editDate = () => {
      editTodo({ ...todo, date });
    };

    editDate();
  }, [date]);

  const closeSelect = () => {
    setRenderedSelect(null);
    toggleHoverOff();
  };

  useEffect(() => {
    closeSelect();
  }, [date]);

  useEffect(() => {
    toggleHoverOff();
  }, [date]);

  useEventListener('blur', () => setRenderedSelect(null));

  const checkTodo = () => {
    setChecked(true);
    setTimeout(() => {
      completeTodo(todo);
    }, 200);
  };

  useEffect(() => {
    draggableSnapshot.isDragging
      ? setDraggingElementId(todo.id)
      : setDraggingElementId(null);
  }, [draggableSnapshot.isDragging]);

  useEffect(() => {
    calcDueDate();
  }, [draggableSnapshot.isDragging]);

  useEffect(() => {
    draggableSnapshot.draggingOver
      ? setDraggingOverElementId(draggableSnapshot.draggingOver)
      : setDraggingOverElementId(null);
  }, [draggableSnapshot.draggingOver]);

  // if (todoInputOpenById === todo.id)
  //   <div className='w-full h-60'>
  //     <EditTodo todo={todo} setTodoInputOpenById={setTodoInputOpenById} />
  //   </div>;

  return (
    // <div className='pb-5 bg-white'>
    <div
      ref={containerRef}
      className={`relative w-full h-full mb-2
      ${
        draggableSnapshot.isDragging
          ? 'shadow-dragging-item border-none'
          : 'border-b-gray-200 border-b-[1px]'
      }
      ${draggableSnapshot.isDropAnimating ? 'shadow-none' : ''}
      z-[1]
      p-2
      outline-none
      flex
      flex-col
      gap-2
      transition-shadow
      duration-150
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
          ref={dueDateRef}
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
            {date && isToday(date)
              ? 'Today'
              : `${getMonthName(date)} ${getDayNumberInMonth(date)}`}
          </span>

          {renderedSelect === 'date-picker' && (
            <DatePicker
              className='left-28 sm:left-8'
              closeSelect={closeSelect}
              inputedDate={date}
              setDate={setDate}
              sizes={dueDateSizes}
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
            onClick={() => {
              setTodoInputOpenById(todo.id);
              console.log('click ', todo.id);
            }}
            className='group mini-button-option cursor-pointer'
          >
            <PenSolidIcon className='fill-gray-400 group-hover:fill-gray-500' />
          </span>
        </div>
      )}
    </div>
    // </div>
  );
};

const todosItemPropsAreEqual = (
  prevProps: Readonly<ITodoItem>,
  nextProps: Readonly<ITodoItem>
) =>
  isEqual(prevProps.todo, nextProps.todo) &&
  isEqual(prevProps.draggableProvided, nextProps.draggableProvided) &&
  isEqual(prevProps.draggableSnapshot, prevProps.draggableSnapshot);

export const TodoItem = memo(TodoItemMemoized, todosItemPropsAreEqual);
