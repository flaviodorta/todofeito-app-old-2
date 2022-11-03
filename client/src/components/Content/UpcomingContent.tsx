import { getDaysInMonth, isSameDay } from 'date-fns';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { DropResult } from 'react-beautiful-dnd';
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

  const today = new Date();

  const [date, setDate] = useState(today);
  const dayInNextMonth = new Date(
    today.getFullYear(),
    today.getMonth() + 1,
    today.getDate()
  );
  const daysInMonth = getDaysInMonth(date);
  const daysInNextMonth = getDaysInMonth(dayInNextMonth);
  const [days, setDays] = useState(daysInMonth);

  const lastIndex = useRef(0);

  const limitedDates = useMemo(
    () => dates.slice(days - daysInMonth, days + daysInNextMonth),
    [days]
  );

  const [scrollIndex, scrollToIndex, lastScrollIndex] = useIndexByScrollRatio({
    ref: ref!,
    observediesHeights,
    gap: 32,
  });

  console.log('days ', days);
  console.log('scroll index', scrollIndex);
  console.log('last index', lastScrollIndex);

  // lastIndex.current = scrollIndex - 1;

  useEffect(() => {
    if (scrollIndex === days) {
      if (scrollIndex > lastIndex.current) {
        setDays((days) => days + daysInNextMonth);
        setDate(
          new Date(
            today.getFullYear(),
            today.getMonth(),
            today.getDate() + lastIndex.current
          )
        );
        lastIndex.current = scrollIndex;
      }
      if (scrollIndex < lastIndex.current) {
        setDays((days) => days - daysInNextMonth);
        setDate(
          new Date(
            today.getFullYear(),
            today.getMonth(),
            today.getDate() + lastIndex.current
          )
        );
        lastIndex.current = scrollIndex;
      }
    }
  }, [scrollIndex]);

  useEffect(() => {
    // console.log(scrollIndex);
    // console.log(lastIndex.current);
    return () => {
      lastIndex.current = scrollIndex;
    };
  }, [scrollIndex]);

  useEffect(() => {
    console.log('days - daysInMonth ', days - daysInMonth);
    console.log('days + daysInNextMonth ', days + daysInNextMonth);
  }, [days]);

  // useEffect(() => {
  //   if (scrollIndex > lastIndex.current) {
  //     if (scrollIndex > days - 5 && scrollIndex < days + 5) {
  //       setDays((days) => days + 30);
  // setDate(
  //   new Date(
  //     today.getFullYear(),
  //     today.getMonth(),
  //     today.getDate() + lastIndex.current
  //   )
  // );
  //       lastIndex.current = scrollIndex;
  //       console.log('up ', scrollIndex, ' lastIndex ', lastIndex.current);
  //     }
  //   }
  //   if (scrollIndex < lastIndex.current) {
  //     if (scrollIndex > days / 2 - 5 && scrollIndex < days / 2 + 5) {
  //       setDays((days) => days - 30);
  //       lastIndex.current = scrollIndex;
  //       console.log('down ', scrollIndex, ' lastIndex ', lastIndex.current);
  //     }
  //   }
  //   console.log(
  //     'scrol ',
  //     scrollIndex,
  //     ' lastIndex ',
  //     lastIndex.current,
  //     ' days ',
  //     days
  //   );
  // }, [scrollIndex]);

  // console.log(limitedDates);

  // useEffect(() => {
  //   if (scrollIndex >= days[1] / 2 && scrollIndex === lastDay.current) {
  //     lastDay.current = lastDay.current + 30;
  //     setDays([days[0] + 30 / 2, days[1] + 30]);
  //   }
  //   if (scrollIndex < days[1] / 2 && scrollIndex === lastDay.current) {
  //     lastDay.current = lastDay.current - 30;
  //     setDays([days[0] - 30 / 2, days[1] - 30]);
  //   }
  // }, [scrollIndex]);

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

  return (
    <ContentContainer
      heading={<HorizontalCalendar inputedDate={date} setDate={selectDate} />}
      onDragEndPage={onDragEnd}
    >
      <div className='flex flex-col gap-8 px-11 md:px-0'>
        {limitedDates.map((section, index) => (
          <UpcomingTodosSection
            key={section.id}
            todos={todos.filter((todo) => isSameDay(todo.date, section.date))}
            section={section}
            index={index}
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
