import { useIsomorphicLayoutEffect } from '../../hooks/useIsomorphicLayoutEffect';
import { useToggle } from '../../hooks/useToggle';
import { useUIStore, useUserStore } from '../../zustand';
import { AddSection } from '../AddSection';
import { TodosSection } from '../Sections/TodosSection';
import { ContentContainer } from './ContentContainer';

export const InboxContent = () => {
  const { todos, sections } = useUserStore();
  const { setTodosOnScreen, isAddTodoItemOpen } = useUIStore();

  const inboxTodos = todos.filter(
    (todo) => todo.project.id === 'inbox' && !todo.isCompleted
  );

  const inboxSections = sections.filter(
    (section) => section.projectId === 'inbox'
  );

  const [hasAddSectionOpen, toggleHasAddSectionOpen] = useToggle(false);
  const [isAddSectionOpen, toggleIsAddSectionOpen] = useToggle(false);

  const toggleAddSection = () => {
    toggleIsAddSectionOpen();
    toggleHasAddSectionOpen();
  };

  useIsomorphicLayoutEffect(() => {
    setTodosOnScreen(inboxTodos);

    return () => setTodosOnScreen([]);
  }, [todos]);

  const Heading = () => (
    <div className='flex items-center gap-2'>
      <h2 className='font-bold text-xl'>Inbox</h2>
    </div>
  );

  return (
    <ContentContainer
      heading={<Heading />}
      project={{ id: 'inbox', name: 'Inbox' }}
    >
      <div className='flex flex-col gap-6'>
        {inboxSections.map((section) => (
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
          {inboxSections.length === 0 && isAddSectionOpen ? (
            <AddSection
              index={0}
              projectId={'inbox'}
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
