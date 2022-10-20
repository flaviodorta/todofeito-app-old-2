import { compareDesc, isEqual } from 'date-fns';
import { useIsomorphicLayoutEffect } from '../../hooks/useIsomorphicLayoutEffect';
import { useUIStore, useUserStore } from '../../zustand';
import { HorizontalCalendar } from '../HorizontalCalendar';
import { ContentContainer } from './ContentContainer';

export const UpcomingContent = () => {
  const { todos } = useUserStore();
  const { setTodosOnScreen, todosOnScreen } = useUIStore();

  const date = new Date();
  const month = date.toLocaleString('en', { month: 'short' });
  const dayOfWeek = date.toLocaleString('en', {
    weekday: 'short',
  });
  const dayOfMonth = date.getDate();

  const upcomingTodos = todos.filter(
    (todo) =>
      (compareDesc(todo.date as Date, new Date()) === -1 ||
        isEqual(todo.date as Date, new Date())) &&
      !todo.isCompleted
  );

  useIsomorphicLayoutEffect(() => {
    setTodosOnScreen(upcomingTodos);

    return () => setTodosOnScreen([]);
  }, [todos]);

  console.log(todosOnScreen);

  return (
    <ContentContainer project={{ id: 'inbox', name: 'Inbox' }}>
      <HorizontalCalendar />
    </ContentContainer>
  );
};
