import { useCallback, useRef, useState } from 'react';
import { useTodosStore } from '../../zustand';
import { HorizontalCalendar } from '../HorizontalCalendar';
import { UpcomingTodosSection } from '../Sections/UpcomingTodosSection';
import { ContentContainer } from './ContentContainer';

export const UpcomingContent = () => {
  const { dates, addTodo, completeTodo, editTodo, setTodosByDate } =
    useTodosStore();

  const today = new Date();
  const [date, setDate] = useState(today);

  const observedies = useRef<(HTMLDivElement | null)[]>([]);

  // useRatio pra deslocar o scroll

  const setObserved = useCallback(
    (el: HTMLDivElement | null, index: number) => {
      observedies.current[index] = el;
    },
    []
  );

  return (
    <ContentContainer
      heading={<HorizontalCalendar inputedDate={date} setDate={setDate} />}
    >
      <div className='flex flex-col gap-8 px-11 md:px-0'>
        {Array.from({ length: 365 }).map((_, index) => (
          <UpcomingTodosSection
            setTodosByDate={setTodosByDate}
            setObserved={setObserved}
            index={index}
            section={dates[index]}
            addTodo={addTodo}
            completeTodo={completeTodo}
            editTodo={editTodo}
          />
        ))}
      </div>
    </ContentContainer>
  );
};
