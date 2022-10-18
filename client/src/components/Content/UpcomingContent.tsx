import { compareDesc } from 'date-fns';
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

  const todayTodos = todos.filter(
    (todo) =>
      compareDesc(todo.date as Date, new Date()) === -1 && !todo.isCompleted
  );

  useIsomorphicLayoutEffect(() => {
    setTodosOnScreen(todayTodos);

    return () => setTodosOnScreen([]);
  }, [todos]);

  console.log(todosOnScreen);

  return (
    <ContentContainer project={{ id: 'inbox', name: 'Inbox' }}>
      <div className='flex w-full items-center gap-2'>
        <h2 className='font-bold text-xl'>Upcoming</h2>
        <p className='text-gray-700 text-xs relative top-[3px] break-words whitespace-nowrap'>
          {dayOfWeek} {month} {dayOfMonth}
        </p>
      </div>
      <HorizontalCalendar />
    </ContentContainer>
  );
};
