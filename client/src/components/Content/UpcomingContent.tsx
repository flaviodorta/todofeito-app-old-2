import { isSameDay, isToday, isTomorrow } from 'date-fns';
import { nanoid } from 'nanoid';
import { useCallback, useMemo, useRef, useState } from 'react';
import {
  capitalizeFirstLetter,
  getDayNameInWeek,
  getMonthName,
} from '../../helpers/functions';
import { useIndexByScrollRatio } from '../../hooks/useIndexByScrollRatio';
import { useIsomorphicLayoutEffect } from '../../hooks/useIsomorphicLayoutEffect';
import { useTodosStore, useUIStore } from '../../zustand';
import { HorizontalCalendar } from '../HorizontalCalendar';
import { UpcomingTodosSection } from '../Sections/UpcomingTodosSection';
import { ContentContainer } from './ContentContainer';

export const UpcomingContent = () => {
  const {
    addTodo,
    completeTodo,
    editTodo,
    setTodos,
    toggleUpcomingDateList,
    todos,
    dates,
  } = useTodosStore();
  const { addObservedHeight, setObservedHeight, observediesHeights, ref } =
    useUIStore();

  const today = new Date();

  const [date, setDate] = useState(today);

  const containerRef = useRef<HTMLDivElement>(null);

  console.log(todos);

  const [scrollIndex, scrollToIndex] = useIndexByScrollRatio({
    ref: ref!,
    observediesHeights,
    gap: 32,
  });

  const dateIndex = useMemo(
    () => dates.findIndex((thisDate) => isSameDay(thisDate.date, date)),
    [date]
  );
  console.log(scrollIndex, ' ', observediesHeights);

  const selectDate = useCallback(
    (date: Date) => {
      scrollToIndex(
        dates.findIndex((thisDate) => isSameDay(thisDate.date, date))
      );
    },
    [dates, scrollIndex]
  );

  useIsomorphicLayoutEffect(() => {
    if (!ref) return;

    ref.addEventListener('scroll', () => {
      if (scrollIndex !== dateIndex && dates[scrollIndex].date) {
        setDate(dates[scrollIndex].date);
      }
    });

    return ref.removeEventListener('scroll', () => {
      if (scrollIndex !== dateIndex && dates[scrollIndex].date) {
        setDate(dates[scrollIndex].date);
      }
    });
  }, [scrollIndex]);

  return (
    <ContentContainer
      heading={<HorizontalCalendar inputedDate={date} setDate={selectDate} />}
    >
      <div className='flex flex-col gap-8 px-11 md:px-0'>
        {dates.map((section, index) => (
          <UpcomingTodosSection
            key={section.id}
            todos={todos.filter((todo) => isSameDay(todo.date, section.date))}
            section={section}
            index={index}
            toggleUpcomingDateList={toggleUpcomingDateList}
            setTodos={setTodos}
            addObservedHeight={addObservedHeight}
            setObservedHeight={setObservedHeight}
            addTodo={addTodo}
            completeTodo={completeTodo}
            editTodo={editTodo}
          />
        ))}
      </div>
    </ContentContainer>
  );
};
