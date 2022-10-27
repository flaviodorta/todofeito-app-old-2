import { isEqual } from 'lodash';
import { nanoid } from 'nanoid';
import { memo, useEffect, useRef, useState } from 'react';
import { ITodosByDate, ITodo } from '../../helpers/types';
import { useToggle } from '../../hooks/useToggle';
import { AddTodo } from '../AddTodo';
import { ChevronIcon, PlusSolidIcon } from '../Icons';
import { TodosList } from '../Lists/TodosList';

interface IUpcomingTodosSection {
  section: ITodosByDate;
  setTodosByDate: (date: ITodosByDate) => void;
  addTodo: (todo: ITodo) => void;
  completeTodo: (todo: ITodo) => void;
  editTodo: (todo: ITodo) => void;
  setObserved: (el: HTMLDivElement | null, index: number) => void;
  index: number;
}

export const UpcomingTodosSectionMemoized = (props: IUpcomingTodosSection) => {
  const {
    section,
    setTodosByDate,
    addTodo,
    completeTodo,
    editTodo,
    setObserved,
    index,
  } = props;

  const [isTodoListOpen, toggleTodoListOpen] = useToggle(false);

  const [todoInputOpenById, setTodoInputOpenById] = useState<string | null>(
    null
  );

  const todoInputId = useRef(nanoid());

  const openAddTodo = () => setTodoInputOpenById(todoInputId.current);
  const closeAddTodo = () => setTodoInputOpenById(null);

  const toggleTodoList = () => {
    if (isTodoListOpen) closeAddTodo();
    toggleTodoListOpen();
  };

  const setThisTodosDate = (todos: ITodo[]) => {
    const thisTodosDate: ITodosByDate = {
      ...section,
      todos,
    };

    setTodosByDate(thisTodosDate);
  };
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setObserved(ref.current, index);
  }, []);

  console.log(section);

  return (
    <div ref={ref} key={section.id} className='flex flex-col h-fit w-full'>
      <div className='sticky top-[151px] z-[2]'>
        <div className='relative flex justify-between items-center w-full text-sm  bg-white font-bold h-fit py-1 border-b-[1px] border-gray-300'>
          <span className='text-gray-500'>{section.name}</span>

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
          {section.todos.length > 0 ? (
            <TodosList
              todos={section.todos.filter((t) => !t.isCompleted)}
              setTodos={setThisTodosDate}
              editTodo={editTodo}
              completeTodo={completeTodo}
              todoInputOpenById={todoInputOpenById}
              setTodoInputOpenById={setTodoInputOpenById}
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
) => isEqual(prevProps.section, nextProps.section);

export const UpcomingTodosSection = memo(
  UpcomingTodosSectionMemoized,
  sectionPropsAreEqual
);
