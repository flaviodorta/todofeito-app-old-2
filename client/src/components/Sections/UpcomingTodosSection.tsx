import useResizeObserver from '@react-hook/resize-observer';
import { isSameDay } from 'date-fns/esm';
import { isEqual } from 'lodash';
import { nanoid } from 'nanoid';
import { memo, useMemo, useRef, useState } from 'react';
import { ITodo, ISection } from '../../helpers/types';
import { useIsomorphicLayoutEffect } from '../../hooks/useIsomorphicLayoutEffect';
import { useToggle } from '../../hooks/useToggle';
import { AddTodo } from '../AddTodo';
import { ChevronIcon, PlusSolidIcon } from '../Icons';
import { TodosList } from '../Lists/TodosList';

interface IUpcomingTodosSection {
  section: Omit<ISection, 'project'>;
  index: number;
  todos: ITodo[];
  draggingElementId: string | null;
  setTodos: (todos: ITodo[]) => void;
  addTodo: (todo: ITodo) => void;
  completeTodo: (todo: ITodo) => void;
  editTodo: (todo: ITodo) => void;
  addObservedHeight: (height: number) => void;
  setObservedHeight: (height: number, index: number) => void;
}

export const UpcomingTodosSectionMemoized = (props: IUpcomingTodosSection) => {
  const {
    section,
    todos,
    draggingElementId,
    setTodos,
    addTodo,
    completeTodo,
    editTodo,
    setObservedHeight,
    addObservedHeight,
    index,
  } = props;

  const [isTodoListOpen, toggleTodoListOpen] = useToggle(false);

  const [todoInputOpenById, setTodoInputOpenById] = useState<string | null>(
    null
  );

  const thisDateTodos = useMemo(
    () =>
      todos.filter(
        (todo) => !todo.isCompleted && isSameDay(todo.date, section.date)
      ),
    [todos]
  );

  const todoInputId = useRef(nanoid());

  const openAddTodo = () => setTodoInputOpenById(todoInputId.current);
  const closeAddTodo = () => setTodoInputOpenById(null);

  const toggleTodoList = () => {
    if (isTodoListOpen) closeAddTodo();
    toggleTodoListOpen();
  };
  const ref = useRef<HTMLDivElement>(null);

  useIsomorphicLayoutEffect(() => {
    if (!ref.current) return;

    addObservedHeight(ref.current.getBoundingClientRect().height);
  }, [ref]);

  useResizeObserver<HTMLDivElement>(ref, (entry) =>
    setObservedHeight(entry.contentRect.height, index)
  );

  return (
    <div ref={ref} key={section.id} className='flex flex-col h-fit w-full'>
      <div className='sticky top-[148px] z-[2]'>
        <div className='relative flex justify-between items-center w-full text-sm bg-white font-bold h-fit py-1 border-b-[1px] border-gray-300'>
          <span
            className={`${todos.length > 0 ? 'text-black' : 'text-gray-500'}`}
          >
            {section.name}
          </span>

          <span
            onClick={toggleTodoList}
            className='group absolute -left-7 top-[1.5px] cursor-pointer w-6 h-6 rounded-sm z-[2] bg-white hover:bg-gray-200 flex items-center justify-center'
          >
            <ChevronIcon
              className={`${
                isTodoListOpen ? '' : '-rotate-90'
              } w-[20px] h-[20px] stroke-gray-500 group-hover:stroke-gray-600 duration-150 transition-all`}
            />
          </span>
        </div>
      </div>

      {isTodoListOpen && (
        <div className='w-full h-fit'>
          {todos.length > 0 ? (
            <TodosList
              // draggingElementId={draggingElementId}
              droppableId={section.id}
              todos={thisDateTodos}
              editTodo={editTodo}
              completeTodo={completeTodo}
              setTodoInputOpenById={setTodoInputOpenById}
              todoInputOpenById={todoInputOpenById}
            />
          ) : (
            <span className='text-xs text-gray-400 pb-4'>
              No todos in this day yet.
            </span>
          )}
        </div>
      )}

      <div className='mt-3'>
        {todoInputOpenById === todoInputId.current ? (
          <AddTodo
            date={section.date}
            addTodo={addTodo}
            setTodoInputOpenById={setTodoInputOpenById}
          />
        ) : (
          <div
            onClick={openAddTodo}
            className='group w-full flex items-center gap-2.5 h-fit'
          >
            <span className='group p-0.5 rounded-full bg-white group-hover:bg-blue-600 flex-center'>
              <PlusSolidIcon className='stroke-[1px] fill-blue-600 group-hover:fill-white' />
            </span>
            <span className='font-light text-md text-gray-400 group-hover:text-blue-600'>
              Add task
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

const sectionPropsAreEqual = (
  prevProps: Readonly<IUpcomingTodosSection>,
  nextProps: Readonly<IUpcomingTodosSection>
) =>
  isEqual(prevProps.section, nextProps.section) &&
  isEqual(
    prevProps.todos.filter((todo) =>
      isSameDay(todo.date, prevProps.section.date)
    ),
    nextProps.todos.filter((todo) =>
      isSameDay(todo.date, nextProps.section.date)
    )
  );

export const UpcomingTodosSection = memo(
  UpcomingTodosSectionMemoized,
  sectionPropsAreEqual
);
