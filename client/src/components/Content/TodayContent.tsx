import { useUserStore } from '../../zustand';
import { ContentContainer } from './ContentContainer';

export const TodayContent = () => {
  const { todos } = useUserStore();

  const date = new Date();
  const month = date.toLocaleString('en', { month: 'short' });
  const dayOfWeek = date.toLocaleString('en', {
    weekday: 'short',
  });
  const dayOfMonth = date.getDate();

  return (
    <ContentContainer todos={todos.inbox}>
      <div className='mb-6 flex items-center gap-2'>
        <h2 className='font-bold text-xl'>Today</h2>
        <p className='text-gray-700 text-xs relative top-[3px]'>
          {dayOfWeek} {month} {dayOfMonth}
        </p>
      </div>
    </ContentContainer>
  );
};
