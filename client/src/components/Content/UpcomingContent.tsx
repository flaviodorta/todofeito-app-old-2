import { compareDesc, isEqual } from 'date-fns';
import { useIsomorphicLayoutEffect } from '../../hooks/useIsomorphicLayoutEffect';
import { useUIStore, useUserStore } from '../../zustand';
import { HorizontalCalendar } from '../HorizontalCalendar';
import { ContentContainer } from './ContentContainer';

export const UpcomingContent = () => {
  const { todos } = useUserStore();
  const { setTodosOnScreen } = useUIStore();

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

  return (
    <ContentContainer
      heading={<HorizontalCalendar />}
      project={{ id: 'inbox', name: 'Inbox' }}
    ></ContentContainer>
  );
};
