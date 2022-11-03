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

  const onDragEnd = (result: DropResult) => {
    const { destination, source } = result;

    if (!destination) return;

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    )
      return;

    const sourceDroppableId = source.droppableId;
    const destinationDroppableId = destination.droppableId;

    // const sourceIndex = source.index;
    const destinationIndex = destination.index;

    const destinationDateIndex = dates.findIndex(
      (s) => s.id === destinationDroppableId
    );
    const destinationDate = dates[destinationDateIndex];

    const draggingTodo: ITodo = todos.filter(
      (todo) => todo.id === draggingElementId
    )[0];

    const editedTodo: ITodo = {
      ...draggingTodo,
      date: destinationDate.date,
    };

    const destinationTodosList = todos.filter((todo) =>
      isSameDay(todo.date, destinationDate.date)
    );

    if (destinationDroppableId === sourceDroppableId) {
      const destinationIndexInTodosArray = todos.findIndex(
        (t) => t.id === destinationTodosList[destinationIndex].id
      );
      const sourceIndexInTodosArray = todos.findIndex(
        (t) => t.id === draggingElementId
      );

      todos.splice(sourceIndexInTodosArray, 1);
      todos.splice(destinationIndexInTodosArray, 0, editedTodo);

      setTodos(todos);
      return;
    }

    if (destinationDroppableId !== sourceDroppableId) {
      const hasTodoInDestinationDate =
        todos.filter((todo) => isSameDay(destinationDate.date, todo.date))
          .length > 0;
      const sourceIndexInTodosArray = todos.findIndex(
        (t) => t.id === draggingElementId
      );

      if (!hasTodoInDestinationDate) {
        todos[sourceIndexInTodosArray] = editedTodo;
        setTodos(todos);
        return;
      }
      const destinationIndexInTodosArray = todos.findIndex(
        (t) => t.id === destinationTodosList[destinationIndex].id
      );

      todos.splice(sourceIndexInTodosArray, 1);
      todos.splice(destinationIndexInTodosArray, 0, editedTodo);

      setTodos(todos);
      return;
    }
  };

  const infinityListRef = useRef<HTMLDivElement>(null!);

  // console.log(ref?.scrollHeight! - ref?.clientHeight!, ' ', ref?.scrollTop);

  // const loadMore = () => {
  //   if (!ref) return;

  //   if (
  //     Math.floor(ref.scrollHeight - ref.scrollTop) -
  //       Math.floor(ref.scrollTop) <=
  //     0
  //   )
  //     setLimit((l) => [l[0] + l[1], l[1] + 30]);
  // };

  return (
    <ContentContainer
      heading={<HorizontalCalendar inputedDate={date} setDate={selectDate} />}
      onDragEndPage={onDragEnd}
    >
      <div ref={infinityListRef} className='flex flex-col gap-8 px-11 md:px-0'>
        {dates.slice(0, 10).map((date, i) => (
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
