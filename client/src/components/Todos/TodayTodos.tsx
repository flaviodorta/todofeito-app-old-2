import { useUIStore } from '../../zustand';
import { AddTodoModal } from '../AddTodoModal';
import { DatePicker } from '../DatePicker';

export const TodayTodos = () => {
  const { isAddTodoModalOpen } = useUIStore();
  const date = new Date();
  const month = date.toLocaleString('en', { month: 'short' });
  const dayOfWeek = date.toLocaleString('en', {
    weekday: 'short',
  });
  const dayOfMonth = date.getDate();

  return (
    <div className='h-full flex justify-center bg-red-600'>
      <div className='max-w-[48rem] w-[48rem] align-bottom px-4 py-6 flex flex-col bg-green-600'>
        <div className='flex items-center gap-2'>
          <h2 className='font-bold text-xl'>Today</h2>
          <p className='text-gray-700 text-xs relative top-[3px]'>
            {dayOfWeek} {month} {dayOfMonth}
          </p>
        </div>

        {isAddTodoModalOpen && <AddTodoModal />}
      </div>
    </div>
  );
};
