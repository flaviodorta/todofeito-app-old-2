import { useIsomorphicLayoutEffect } from 'framer-motion';
import { useState } from 'react';
import { IProject } from '../../helpers/types';
import { useToggle } from '../../hooks/useToggle';
import { useTodosStore, useUIStore } from '../../zustand';
import { ContentContainer } from './ContentContainer';

export const TodayContent = () => {
  const { dates } = useTodosStore();

  const today = new Date();
  const month = today.toLocaleString('en', { month: 'short' });
  const dayOfWeek = today.toLocaleString('en', {
    weekday: 'short',
  });
  const dayOfMonth = today.getDate();

  const todosNotCompleted = dates[0].todos.filter((todo) => !todo.isCompleted);

  const [todayTodos, setTodos] = useState(todosNotCompleted);

  useIsomorphicLayoutEffect(() => {
    setTodos(todosNotCompleted);
  }, [dates]);

  const Heading = () => (
    <div className='flex items-center gap-2  md:w-[768px] md:max-w-[768px] md:min-w-[768px]'>
      <h2 className='font-bold text-xl'>Today</h2>
      <p className='text-gray-700 text-xs relative top-[3px] break-words whitespace-nowrap'>
        {dayOfWeek} {month} {dayOfMonth}
      </p>
    </div>
  );

  const todayProject: IProject = {
    id: 'today',
    name: 'Today',
    color: {
      name: 'Blue',
      class: 'fill-blue-600',
    },
  };

  return (
    <ContentContainer
      heading={<Heading />}
      todos={todayTodos}
      setTodos={setTodos}
      project={todayProject}
    ></ContentContainer>
  );
};
