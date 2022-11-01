import { isToday } from 'date-fns';
import { nanoid } from 'nanoid';
import { useCallback, useMemo, useRef, useState } from 'react';
import { ITodo } from '../../helpers/types';
import { useTodosStore } from '../../zustand';
import { AddTodo } from '../AddTodo';
import { PlusSolidIcon } from '../Icons';
import { TodosList } from '../Lists/TodosList';
import { ContentContainer } from './ContentContainer';

export const TodayContent = () => {
  const { projects, todos, setTodos, completeTodo, editTodo, addTodo } =
    useTodosStore();

  const today = new Date();
  const month = today.toLocaleString('en', { month: 'short' });
  const dayOfWeek = today.toLocaleString('en', {
    weekday: 'short',
  });
  const dayOfMonth = today.getDate();

  const [todoInputOpenById, setTodoInputOpenById] = useState<string | null>(
    null
  );

  const todoInputId = useRef(nanoid());

  const openAddTodo = () => setTodoInputOpenById(todoInputId.current);

  const todayTodos = useMemo(
    () => todos.filter((todo) => !todo.isCompleted && isToday(todo.date)),
    [todos]
  );

  const Heading = () => (
    <div className='flex items-center gap-2  md:w-[768px] md:max-w-[768px] md:min-w-[768px]'>
      <h2 className='font-bold text-xl'>Today</h2>
      <p className='text-gray-700 text-xs relative top-[3px] break-words whitespace-nowrap'>
        {dayOfWeek} {month} {dayOfMonth}
      </p>
    </div>
  );

  return (
    <ContentContainer heading={<Heading />}>
      <div className='w-full px-9 md:px-0'>
        <TodosList
          droppableId='today'
          todos={todayTodos}
          completeTodo={completeTodo}
          editTodo={editTodo}
          setTodoInputOpenById={setTodoInputOpenById}
          todoInputOpenById={todoInputOpenById}
        />

        <div className='mb-6'>
          {todoInputOpenById === todoInputId.current ? (
            <AddTodo
              date={today}
              setTodoInputOpenById={setTodoInputOpenById}
              addTodo={addTodo}
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
    </ContentContainer>
  );
};
