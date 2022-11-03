import { isSameDay } from 'date-fns';
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

  console.log(draggingOverElementId);
  // console.log(todos);

  const today = new Date();

  const [date, setDate] = useState(today);

  const [days, setDays] = useState([0, 60]);
  const lastDay = useRef(days[0] / 2);

  const limitedDates = useMemo(() => dates.slice(days[0], days[1]), [days]);

  const [scrollIndex, scrollToIndex] = useIndexByScrollRatio({
    ref: ref!,
    observediesHeights,
    gap: 32,
  });

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

    const sourceIndex = source.index;
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

    // console.log('destinationDate.date ', destinationDate.date);
    // console.log('destinationDroppableId ', destinationDroppableId);
    // console.log('sourceDroppableId ', sourceDroppableId);
    // console.log('editedTodo ', editedTodo);

    if (destinationDroppableId === sourceDroppableId) {
      // console.log('destinationDateIndex ', destinationDateIndex);
      // console.log('destinationDate ', destinationDate);
      // console.log('sourceIndex ', sourceIndex);
      // console.log('destinationIndex ', destinationIndex);
      // console.log(
      //   'destinationTodosList[destinationIndex] ',
      //   destinationTodosList[destinationIndex]
      // );
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

      console.log(
        'destinationTodosList[destinationIndex].id ',
        destinationTodosList[destinationIndex].id
      );
      console.log(
        'destinationIndexInTodosArray ',
        destinationIndexInTodosArray
      );

      console.log('todos before', todos);
      todos.splice(sourceIndexInTodosArray, 1);
      todos.splice(destinationIndexInTodosArray, 0, editedTodo);
      console.log('todos after', todos);

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
