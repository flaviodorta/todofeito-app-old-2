import { nanoid } from 'nanoid';
import { useMemo, useRef } from 'react';
import { IProject } from '../../helpers/types';
import { useUpdateState } from '../../hooks/useUpdateState';
import { useTodosStore, useUIStore } from '../../zustand';
import { AddSection } from '../AddSection';
import { SectionsList } from '../Lists/SectionsList';
import { ContentContainer } from './ContentContainer';

export const InboxContent = () => {
  const { projects, sections } = useTodosStore();
  const { sectionInputOpenById, setSectionInputOpenById } = useUIStore();

  const [inboxTodos, setTodos] = useUpdateState(
    projects
      .filter((project) => project.id === 'inbox')[0]
      .todos.filter((todo) => !todo.isCompleted && !todo.section),
    [projects]
  );
  const [inboxSections, setSections] = useUpdateState(
    sections.filter((section) => section.project.id === 'inbox'),
    [sections]
  );

  const addSectionId = useRef(nanoid());

  const openAddSection = () => setSectionInputOpenById(addSectionId.current);

  const Heading = () => (
    <div className='flex items-center gap-2'>
      <h2 className='font-bold text-xl'>Inbox</h2>
    </div>
  );

  const inboxProject: IProject = {
    id: 'inbox',
    name: 'Inbox',
    color: {
      name: 'Blue',
      class: 'fill-blue-600',
    },
  };

  console.log(sections);

  return (
    <ContentContainer
      heading={<Heading />}
      todos={inboxTodos}
      setTodos={setTodos}
      project={inboxProject}
    >
      <div className='flex flex-col gap-1'>
        {/* {sections.map((section) => ( */}
        <SectionsList sections={inboxSections} setSections={setSections} />
        {/* ))} */}
      </div>

      {sections.length === 0 &&
      sectionInputOpenById === addSectionId.current ? (
        <AddSection previousSectionIndex={-1} project={inboxProject} />
      ) : (
        <div
          onClick={openAddSection}
          className='group opacity-0 hover:opacity-100 relative w-full flex items-center justify-center gap-2.5 h-fit cursor-pointer duration-200 ease-in transition-opacity'
        >
          <span
            className={`${
              sectionInputOpenById ? 'hidden' : 'block'
            } font-medium text-md text-blue-600 z-10 px-2 bg-white`}
          >
            Add section
          </span>
          <span className='group absolute h-[1px] w-full top-1/2 left-0 rounded-full bg-blue-600' />
        </div>
      )}
    </ContentContainer>
  );
};
