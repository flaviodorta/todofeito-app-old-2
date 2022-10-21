import { useState } from 'react';
import { useIsomorphicLayoutEffect } from '../../hooks/useIsomorphicLayoutEffect';
import { useToggle } from '../../hooks/useToggle';
import { useUIStore, useUserStore } from '../../zustand';
import { AddSection } from '../AddSection';
import { SectionsList } from '../Lists/SectionsList';
import { TodosSection } from '../Sections/TodosSection';
import { ContentContainer } from './ContentContainer';

export const InboxContent = () => {
  const { todos: allTodos, sections: allSections } = useUserStore();
  const { isAddTodoItemOpen } = useUIStore();

  const allTodosNotCompleted = allTodos.filter(
    (todo) => todo.project.id === 'inbox' && !todo.isCompleted
  );

  const [todos, setTodos] = useState(allTodosNotCompleted);

  const [sections, setSections] = useState(
    allSections.filter((section) => section.projectId === 'inbox')
  );

  console.log(allSections);

  const [hasAddSectionOpen, toggleHasAddSectionOpen] = useToggle(false);
  const [isAddSectionOpen, toggleIsAddSectionOpen] = useToggle(false);

  const toggleAddSection = () => {
    toggleIsAddSectionOpen();
    toggleHasAddSectionOpen();
  };

  useIsomorphicLayoutEffect(() => {
    setTodos(allTodosNotCompleted);
  }, [allTodos]);

  useIsomorphicLayoutEffect(() => {
    setSections(allSections);
  }, [allSections]);

  useIsomorphicLayoutEffect(() => {}, [sections]);

  const Heading = () => (
    <div className='flex items-center gap-2'>
      <h2 className='font-bold text-xl'>Inbox</h2>
    </div>
  );

  return (
    <ContentContainer
      heading={<Heading />}
      todos={todos}
      setTodos={setTodos}
      project={{ id: 'inbox', name: 'Inbox' }}
    >
      <div className='flex flex-col gap-1'>
        {/* {sections.map((section) => ( */}
        <SectionsList
          sections={sections}
          setSections={setSections}
          hasAddSectionOpen={hasAddSectionOpen}
          toggleHasAddSectionOpen={toggleHasAddSectionOpen}
        />
        {/* ))} */}
      </div>

      {!isAddTodoItemOpen && (
        <div>
          {sections.length === 0 && isAddSectionOpen ? (
            <AddSection
              index={0}
              projectId={'inbox'}
              close={toggleAddSection}
            />
          ) : (
            <div
              onClick={toggleAddSection}
              className='group opacity-0 hover:opacity-100 relative w-full flex items-center justify-center gap-2.5 h-fit cursor-pointer duration-200 ease-in transition-opacity'
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
