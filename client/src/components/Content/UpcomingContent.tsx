import { isSameDay } from 'date-fns';
import { useCallback, useMemo, useRef, useState } from 'react';
import { useIndexByScrollRatio } from '../../hooks/useIndexByScrollRatio';
import { useIsomorphicLayoutEffect } from '../../hooks/useIsomorphicLayoutEffect';
import { useTodosStore, useUIStore } from '../../zustand';
import { HorizontalCalendar } from '../HorizontalCalendar';
import { UpcomingTodosSection } from '../Sections/UpcomingTodosSection';
import { ContentContainer } from './ContentContainer';

export const UpcomingContent = () => {
  const { dates, addTodo, completeTodo, editTodo, setTodosByDate } =
    useTodosStore();
  const { addObservedHeight, setObservedHeight, observediesHeights } =
    useUIStore();

  const today = new Date();
  const [date, setDate] = useState(today);

  const containerRef = useRef<HTMLDivElement>(null);

  const [scrollIndex, scrollToIndex] = useIndexByScrollRatio({
    containerRef,
    observediesHeights,
    gap: 32,
  });

  const dateIndex = useMemo(
    () => dates.findIndex((thisDate) => isSameDay(thisDate.date, date)),
    [date, dates]
  );

  // console.log('scroll index: ', scrollIndex);

  const selectDate = useCallback(
    (date: Date) => {
      scrollToIndex(
        dates.findIndex((thisDate) => isSameDay(thisDate.date, date))
      );
    },
    [dates, scrollToIndex]
  );

  useIsomorphicLayoutEffect(() => {
    if (!containerRef.current) return;

    containerRef.current.addEventListener('scroll', () => {
      if (scrollIndex !== dateIndex) {
        setDate(dates[scrollIndex].date);
      }
    });

    return containerRef.current.removeEventListener('scroll', () => {
      if (scrollIndex !== dateIndex) {
        setDate(dates[scrollIndex].date);
      }
    });
  }, [scrollIndex]);

  return (
    <ContentContainer
      ref={containerRef}
      heading={<HorizontalCalendar inputedDate={date} setDate={selectDate} />}
    >
      <div className='flex flex-col gap-8 px-11 md:px-0'>
        {Array.from({ length: 365 }).map((_, index) => (
          <UpcomingTodosSection
            key={dates[index].id}
            setTodosByDate={setTodosByDate}
            addObservedHeight={addObservedHeight}
            setObservedHeight={setObservedHeight}
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
