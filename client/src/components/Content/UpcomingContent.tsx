import { getDaysInMonth, isSameDay } from 'date-fns';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { DropResult } from 'react-beautiful-dnd';
import { getDayNumberInMonth } from '../../helpers/functions';
import { ITodo } from '../../helpers/types';
import { useIndexByScrollRatio } from '../../hooks/useIndexByScrollRatio';
import { useIsomorphicLayoutEffect } from '../../hooks/useIsomorphicLayoutEffect';
import { useTodosStore, useUIStore } from '../../zustand';
import { HorizontalCalendar } from '../HorizontalCalendar';
import { UpcomingTodosSection } from '../Sections/UpcomingTodosSection';
import { ContentContainer } from './ContentContainer';

export const UpcomingContent = () => {
  const {
    todos,
    dates,
    sections,
    addTodo,
    completeTodo,
    editTodo,
    setTodos,
    toggleUpcomingDateList,
  } = useTodosStore();
  const {
    addObservedHeight,
    setObservedHeight,
    observediesHeights,
    ref,
    draggingElementId,
    placeholderProps,
    draggingOverElementId,
  } = useUIStore();

  // console.log(draggingOverElementId);
  // console.log(todos);

  // date-fns: addDays, isLastDayOfMonth

  const today = new Date();

  const [date, setDate] = useState(today);
  // const dayInNextMonth = useMemo(
  //   () => new Date(date.getFullYear(), date.getMonth() + 1, date.getDate()),
  //   [date]
  // );
  // const daysInMonth = useMemo(() => getDaysInMonth(date), [date]);
  // const daysInNextMonth = useMemo(
  //   () => getDaysInMonth(dayInNextMonth),
  //   [dayInNextMonth]
  // );

  // const [days, setDays] = useState(daysInMonth);

  // const lastIndex = useRef(0);

  // const limitedDates = useMemo(() => dates.slice(0, days), [days, dates]);
  // const [limit, setLimit] = useState([0, daysInMonth]);

  const [scrollIndex, scrollToIndex, lastScrollIndex] = useIndexByScrollRatio({
    ref: ref!,
    observediesHeights,
    gap: 32,
  });

  // console.log('days ', days);
  // console.log('scroll index', scrollIndex);
  // console.log('last index', lastScrollIndex);

  // useEffect(() => {
  //   if (scrollIndex === days && scrollIndex > lastIndex.current) {
  //     setDays((days) => days + daysInNextMonth);
  //     setDate(
  //       new Date(
  //         today.getFullYear(),
  //         today.getMonth(),
  //         today.getDate() + lastScrollIndex
  //       )
  //     );
  //   }

  //   if (
  //     scrollIndex === days - daysInMonth - 1 &&
  //     scrollIndex < lastIndex.current &&
  //     scrollIndex !== 0
  //   ) {
  //     setDays((days) => days - daysInNextMonth + 1);
  //     setDate(
  //       new Date(
  //         today.getFullYear(),
  //         today.getMonth(),
  //         today.getDate() + lastScrollIndex - 1
  //       )
  //     );
  //   }
  // }, [scrollIndex]);

  // useEffect(() => {
  //   // console.log(scrollIndex);
  //   // console.log(lastIndex.current);
  //   // console.log(limitedDates);
  //   return () => {
  //     lastIndex.current = scrollIndex;
  //   };
  // }, [scrollIndex]);

  // useEffect(() => {
  //   console.log('days - daysInMonth ', days - daysInMonth);
  //   console.log('days + daysInNextMonth ', days + daysInNextMonth);
  //   scrollToIndex(scrollIndex);
  // }, [days]);

  const dateIndex = useMemo(
    () => dates.findIndex((thisDate) => isSameDay(thisDate.date, date)),
    [date]
  );

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
      // need && dates[scrollIndex].date condition setDate can be called beacuse of imprecision ratios
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

  const infinityListRef = useRef<HTMLDivElement>(null!);

  return (
    <ContentContainer
      page='upcoming'
      heading={<HorizontalCalendar inputedDate={date} setDate={selectDate} />}
    >
      <div ref={infinityListRef} className='flex flex-col gap-8 px-11 md:px-0'>
        {dates.map((date, i) => (
          <UpcomingTodosSection
            key={date.id}
            todos={todos.filter((todo) => isSameDay(todo.date, date.date))}
            section={date}
            index={i}
            placeholderProps={placeholderProps}
            draggingOverElementId={draggingOverElementId}
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
