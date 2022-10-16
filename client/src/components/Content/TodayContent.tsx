import { IProject } from '../../helpers/types';
import { useUserStore } from '../../zustand';
import { ContentContainer } from './ContentContainer';

export const TodayContent = () => {
  const { projects } = useUserStore();

  const date = new Date();
  const month = date.toLocaleString('en', { month: 'short' });
  const dayOfWeek = date.toLocaleString('en', {
    weekday: 'short',
  });
  const dayOfMonth = date.getDate();

  const todayTodos = projects.filter((project) => project.id === 'today')[0]
    .todos.toComplete;

  return (
    <ContentContainer todos={todayTodos}>
      <div className='flex items-center gap-2'>
        <h2 className='font-bold text-xl'>Today</h2>
        <p className='text-gray-700 text-xs relative top-[3px]'>
          {dayOfWeek} {month} {dayOfMonth}
        </p>
      </div>
    </ContentContainer>
  );
};
