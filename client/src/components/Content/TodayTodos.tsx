import { Fragment, useState } from 'react';
import { IRenderableElements } from '../../helpers/types';
import { useToggle } from '../../hooks/useToggle';
import { useUserStore } from '../../zustand';
import { AddTodoItem } from '../AddTodoItem';
import { PlusSolidIcon } from '../Icons';
import { TodoItem } from '../TodoItem';

export const TodayTodos = () => {
  const { todos } = useUserStore();

  const date = new Date();
  const month = date.toLocaleString('en', { month: 'short' });
  const dayOfWeek = date.toLocaleString('en', {
    weekday: 'short',
  });
  const dayOfMonth = date.getDate();

  const [isAddTodoItemOpen, toggleAddTodoItem] = useToggle(false);
  return (
    <div className='h-full flex justify-center bg-white'>
      <div className='max-w-[44rem] w-[44rem] align-bottom px-4 py-6 flex flex-col bg-white'>
        <div className='mb-6 flex items-center gap-2'>
          <h2 className='font-bold text-xl'>Today</h2>
          <p className='text-gray-700 text-xs relative top-[3px]'>
            {dayOfWeek} {month} {dayOfMonth}
          </p>
        </div>

        <div>
          {todos.notCompleted.map((todo, i) => (
            <Fragment key={todo.id}>
              <TodoItem todo={todo} />
            </Fragment>
          ))}
        </div>

        {/* <div onClick={openAddTodoItem} className='flex-center'> */}
        {isAddTodoItemOpen ? (
          <AddTodoItem close={toggleAddTodoItem} />
        ) : (
          <div
            onClick={toggleAddTodoItem}
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
        {/* </div> */}
      </div>
    </div>
  );
};

export const Test = ({ click }: { click: () => void }) => {
  return <div onClick={click}>Test</div>;
};
