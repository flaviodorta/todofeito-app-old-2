import { nanoid } from 'nanoid';
import { useMemo, useRef, useState } from 'react';
import { IProject } from '../../helpers/types';
import { useTodosStore, useUIStore } from '../../zustand';
import { AddSection } from '../AddSection';
import { AddTodo } from '../AddTodo';
import { PlusSolidIcon } from '../Icons';
import { SectionsList } from '../Lists/SectionsList';
import { TodosList } from '../Lists/TodosList';
import { ContentContainer } from './ContentContainer';

export const InboxContent = () => {
  const {
    sections,
    todos,
    editTodo,
    completeTodo,
    addTodo,
    editSection,
    deleteSection,
    addSection,
  } = useTodosStore();
  const { placeholderProps } = useUIStore();

  const [todoInputOpenById, setTodoInputOpenById] = useState<string | null>(
    null
  );

  const [sectionInputOpenById, setSectionInputOpenById] = useState<
    string | null
  >(null);

  const inboxSections = useMemo(
    () => sections.filter((section) => section.project?.id === 'inbox'),
    [sections]
  );

  const inboxTodos = useMemo(
    () =>
      todos.filter(
        (todo) =>
          todo.project.id === 'inbox' && !todo.isCompleted && !todo.section
      ),
    [todos]
  );

  const addSectionId = useRef(nanoid());

  const openAddSection = () => setSectionInputOpenById(addSectionId.current);

  const id = nanoid();
  const addTodoId = useRef(id);

  const openAddTodo = () => setTodoInputOpenById(addTodoId.current);

  const inboxProject: IProject = {
    id: 'inbox',
    name: 'Inbox',
    color: {
      name: 'Blue',
      class: 'fill-blue-600',
    },
  };

  const Heading = () => (
    <div className='flex items-center gap-2'>
      <h2 className='font-bold text-xl'>Inbox</h2>
    </div>
  );

  return (
    <ContentContainer heading={<Heading />}>
      <div className='w-full px-9 md:px-0'>
        <TodosList
          // draggingElementId={draggingElementId}
          todos={inboxTodos}
          placeholderProps={placeholderProps}
          droppableId='inbox'
          completeTodo={completeTodo}
          editTodo={editTodo}
          setTodoInputOpenById={setTodoInputOpenById}
          todoInputOpenById={todoInputOpenById}
        />

        <div className='mb-6'>
          {todoInputOpenById === addTodoId.current ? (
            <AddTodo
              project={inboxProject}
              setTodoInputOpenById={setTodoInputOpenById}
              addTodo={addTodo}
            />
          ) : (
            <div
              onClick={openAddTodo}
              className='group w-full flex items-center gap-2.5 h-fit'
            >
              <span className='group p-0.5 rounded-full bg-white group-hover:bg-blue-600 flex-center'>
                <PlusSolidIcon className='stroke-[1px] fill-blue-600 group-hover:fill-white' />
              </span>

              <span className='cursor-pointer font-light text-md text-gray-400 group-hover:text-blue-600'>
                Add todo
              </span>
            </div>
          )}
        </div>
      </div>

      <div className='flex flex-col gap-1'>
        <SectionsList
          droppabledId='sections'
          sections={inboxSections}
          todos={todos}
          todoInputOpenById={todoInputOpenById}
          sectionInputOpenById={sectionInputOpenById}
          editSection={editSection}
          addSection={addSection}
          completeTodo={completeTodo}
          addTodo={addTodo}
          editTodo={editTodo}
          setTodoInputOpenById={setTodoInputOpenById}
          setSectionInputOpenById={setSectionInputOpenById}
          deleteSection={deleteSection}
        />
      </div>

      {sections.length === 0 && (
        <div>
          {sectionInputOpenById === addSectionId.current ? (
            <AddSection
              addSection={addSection}
              previousSectionIndex={-1}
              project={inboxProject}
              setSectionInputOpenById={setSectionInputOpenById}
            />
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
        </div>
      )}
    </ContentContainer>
  );
};
