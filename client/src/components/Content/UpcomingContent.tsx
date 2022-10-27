import { isEqual, isSameDay } from 'date-fns';
import { nanoid } from 'nanoid';
import {
  Fragment,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { IProject, ITodosByDate } from '../../helpers/types';
import { useUpdateState } from '../../hooks/useUpdateState';
import { useTodosStore, useUIStore } from '../../zustand';
import { HorizontalCalendar } from '../HorizontalCalendar';
import { UpcomingTodosSection } from '../Sections/UpcomingTodosSection';
import { ContentContainer } from './ContentContainer';

export const UpcomingContent = () => {
  const { dates, addTodo, completeTodo, editTodo, setTodosByDate } =
    useTodosStore();
  // const { todoInputOpenById, setTodoInputOpenById } = useUIStore();

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

  // const [sections, setSections] = useUpdateState<ITodosByDate[]>(dates, [
  //   dates,
  // ]);

  // const sections = useMemo(() => , [dates])

  return (
    <ContentContainer
      heading={<HorizontalCalendar inputedDate={date} setDate={setDate} />}
    >
      {/* pra resolver o problema tem manter o mesmo array, apenas descolar o scroll */}
      <div className='flex flex-col gap-8 px-8 md:px-0'>
        {Array.from({ length: 365 }).map((_, index) => (
          <UpcomingTodosSection
            // ref={(el) => (observedies.current[index] = el)}
            // dates={dates}
            setTodosByDate={setTodosByDate}
            setObserved={setObserved}
            index={index}
            section={dates[index]}
            addTodo={addTodo}
            completeTodo={completeTodo}
            editTodo={editTodo}
            // todoInputOpenById={todoInputOpenById}
            // setTodoInputOpenById={setTodoInputOpenById}
          />
        ))}
      </div>
    </ContentContainer>
  );
};
