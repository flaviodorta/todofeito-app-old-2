import { compareDesc, isEqual } from 'date-fns';
import { useState } from 'react';
import { useIsomorphicLayoutEffect } from '../../hooks/useIsomorphicLayoutEffect';
import { useUserStore } from '../../zustand';
import { HorizontalCalendar } from '../HorizontalCalendar';
import { ContentContainer } from './ContentContainer';

export const UpcomingContent = () => {
  const { todos: allTodos } = useUserStore();

  const allTodosNotCompleted = allTodos.filter(
    (todo) =>
      (compareDesc(todo.date as Date, new Date()) === -1 ||
        isEqual(todo.date as Date, new Date())) &&
      !todo.isCompleted
  );

  const [todos, setTodos] = useState(allTodosNotCompleted);

  useIsomorphicLayoutEffect(() => {
    setTodos(allTodosNotCompleted);
  }, [allTodos]);

  return (
    <ContentContainer
      heading={<HorizontalCalendar />}
      todos={todos}
      setTodos={setTodos}
      project={{ id: 'inbox', name: 'Inbox' }}
    ></ContentContainer>
  );
};
