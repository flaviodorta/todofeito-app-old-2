import { isToday } from 'date-fns';
import { useIsomorphicLayoutEffect } from 'framer-motion';
import { useMemo } from 'react';
import { useToggle } from '../../hooks/useToggle';
import { useUIStore, useUserStore } from '../../zustand';
import { AddSection } from '../AddSection';
import { TodosSection } from '../Sections/TodosSection';
import { ContentContainer } from './ContentContainer';

export const TodayContent = () => {
  const { todos, sections } = useUserStore();
  const { setTodosOnScreen, isAddTodoItemOpen } = useUIStore();

  const date = new Date();
  const month = date.toLocaleString('en', { month: 'short' });
  const dayOfWeek = date.toLocaleString('en', {
    weekday: 'short',
  });
  const dayOfMonth = date.getDate();

  const todayTodos = todos.filter(
    (todo) => isToday(todo.date as Date) && !todo.isCompleted
  );

  const todaySections = sections.filter(
    (section) => section.projectId === 'today'
  );

  const [hasAddSectionOpen, toggleHasAddSectionOpen] = useToggle(false);
  const [isAddSectionOpen, toggleIsAddSectionOpen] = useToggle(false);

  const toggleAddSection = () => {
    toggleIsAddSectionOpen();
    toggleHasAddSectionOpen();
  };

  useIsomorphicLayoutEffect(() => {
    setTodosOnScreen(todayTodos);

    return () => setTodosOnScreen([]);
  }, [todos]);

  useIsomorphicLayoutEffect(() => {
    if (!isAddTodoItemOpen && isAddSectionOpen) toggleAddSection();
  }, [isAddTodoItemOpen]);

  const Heading = () => (
    <div className='flex items-center gap-2  md:w-[768px] md:max-w-[768px] md:min-w-[768px]'>
      <h2 className='font-bold text-xl'>Today</h2>
      <p className='text-gray-700 text-xs relative top-[3px] break-words whitespace-nowrap'>
        {dayOfWeek} {month} {dayOfMonth}
      </p>
    </div>
  );

  return (
    <ContentContainer
      heading={<Heading />}
      project={{ id: 'inbox', name: 'Inbox' }}
    >
      <div className='flex flex-col gap-6'>
        {todaySections.map((section) => (
          <TodosSection
            section={section}
            hasAddSectionOpen={hasAddSectionOpen}
            toggleHasAddSectionOpen={toggleHasAddSectionOpen}
          >
            {section.title}
          </TodosSection>
        ))}
      </div>

      {!isAddTodoItemOpen && (
        <div>
          {todaySections.length === 0 && isAddSectionOpen ? (
            <AddSection
              index={0}
              projectId={'today'}
              close={toggleAddSection}
            />
          ) : (
            <div
              onClick={toggleAddSection}
              className='group opacity-0 hover:opacity-100 relative w-full flex items-center justify-center gap-2.5 h-fit cursor-pointer duration-300 ease-in transition-opacity'
            >
              <span
                className={`${
                  hasAddSectionOpen ? 'hidden' : 'block'
                } font-medium text-md text-blue-600 z-10 px-2 bg-white`}
              >
                Add section
              </span>
              <span className='group absolute h-[1px] w-full top-1/2 left-0 rounded-full bg-blue-600' />
            </div>
          )}
        </div>
      )}
    </ContentContainer>
  );
};
