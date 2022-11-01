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
  const { addTodo, completeTodo, editTodo, setTodos, todos } = useTodosStore();
  const { addObservedHeight, setObservedHeight, observediesHeights, ref } =
    useUIStore();

  const today = new Date();
  const dates = (() => {
    const arr = [];

    for (let i = 0; i < 365; i++) {
      const date = new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate() + i
      );

      arr.push({
        id: nanoid(),
        date: date,
        name: `${capitalizeFirstLetter(
          getMonthName(date).substring(0, 3)
        )}  ${date.getDate()} ${
          isToday(date) ? '‧ Today' : isTomorrow(date) ? '‧ Tomorrow' : ''
        } ‧ ${capitalizeFirstLetter(getDayNameInWeek(date))} `,
      });
    }

    return arr;
  })();

  const [date, setDate] = useState(today);

  const containerRef = useRef<HTMLDivElement>(null);

  const [scrollIndex, scrollToIndex] = useIndexByScrollRatio({
    containerRef,
    observediesHeights,
    gap: 32,
  });

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
    [dates, scrollToIndex]
  );

  useIsomorphicLayoutEffect(() => {
    if (!ref) return;

    ref.addEventListener('scroll', () => {
      if (scrollIndex !== dateIndex) {
        setDate(dates[scrollIndex].date);
      }
    });

    return ref.removeEventListener('scroll', () => {
      if (scrollIndex !== dateIndex) {
        setDate(dates[scrollIndex].date);
      }
    });
  }, [scrollIndex]);

  // const dates = (() => {
  //   const arr = [];

  //   for (let i = 0; i < 365; i++) {
  //     const date = new Date(
  //       today.getFullYear(),
  //       today.getMonth(),
  //       today.getDate() + i
  //     );

  //     arr.push({
  //       id: nanoid(),
  //       date: date,
  //       name: `${capitalizeFirstLetter(
  //         getMonthName(date).substring(0, 3)
  //       )}  ${date.getDate()} ${
  //         isToday(date) ? '‧ Today' : isTomorrow(date) ? '‧ Tomorrow' : ''
  //       } ‧ ${capitalizeFirstLetter(getDayNameInWeek(date))} `,
  //       todos: [],
  //     } as ITodosByDate);
  //   }

  //   return arr;
  // })();

  return (
    <ContentContainer
      // ref={containerRef}
      heading={<HorizontalCalendar inputedDate={date} setDate={selectDate} />}
    >
      {/* <div className='flex flex-col gap-8 px-11 md:px-0'>
        {Array.from({ length: 365 }).map((_, index) => (
          <UpcomingTodosSection
            key={dates[index].id}
            setTodos={setTodos}
            todos={todos}
            addObservedHeight={addObservedHeight}
            setObservedHeight={setObservedHeight}
            index={index}
            section={dates[index]}
            addTodo={addTodo}
            completeTodo={completeTodo}
            editTodo={editTodo}
          />
        ))}
      </div> */}
    </ContentContainer>
  );
};
