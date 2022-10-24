import { isEqual } from 'date-fns';
import { useMemo, useState } from 'react';
import { IProject } from '../../helpers/types';
import { useTodosStore } from '../../zustand';
import { HorizontalCalendar } from '../HorizontalCalendar';
import { UpcomingTodosSection } from '../Sections/UpcomingTodosSection';
import { ContentContainer } from './ContentContainer';

export const UpcomingContent = () => {
  const { dates } = useTodosStore();

  const today = new Date();
  const [date, setDate] = useState(today);

  const dateIndex = useMemo(() => {
    const index = dates.findIndex((d) => isEqual(d.date, date));
    return index === -1 ? 0 : index;
  }, [date]);

  const [upcomingTodos, setTodos] = useState(
    dates
      .map((date) => date.todos)
      .slice(dateIndex)
      .reduce(
        (acc, todos) => [...acc, ...todos.filter((todo) => !todo.isCompleted)],
        []
      )
  );

  const upcomingProject: IProject = {
    id: 'upcoming',
    name: 'Upcoming',
    color: {
      name: 'Blue',
      class: 'fill-blue-600',
    },
  };

  return (
    <ContentContainer
      heading={<HorizontalCalendar inputedDate={date} setDate={setDate} />}
      todos={upcomingTodos}
      setTodos={setTodos}
      project={upcomingProject}
    >
      <div className='flex flex-col gap-8'>
        {dates.slice(dateIndex).map(({ id, name, date, todos }) => (
          <UpcomingTodosSection section={{ id, name, date, todos }} />
        ))}
      </div>
    </ContentContainer>
  );
};
