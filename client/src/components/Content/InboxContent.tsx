import { nanoid } from 'nanoid';
import { useRef } from 'react';
import { IProject } from '../../helpers/types';
import { useUpdateState } from '../../hooks/useUpdateState';
import { useTodosStore, useUIStore } from '../../zustand';
import { AddSection } from '../AddSection';
import { AddTodo } from '../AddTodo';
import { PlusSolidIcon } from '../Icons';
import { SectionsList } from '../Lists/SectionsList';
import { TodosList } from '../Lists/TodosList';
import { ContentContainer } from './ContentContainer';

export const InboxContent = () => {
  const { projects, sections, editTodo, completeTodo, addTodo, deleteSection } =
    useTodosStore();
  const {
    sectionInputOpenById,
    setSectionInputOpenById,
    todoInputOpenById,
    setTodoInputOpenById,
  } = useUIStore();

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

  const id = nanoid();
  const addTodoId = useRef(id);

  const openAddTodo = () => setTodoInputOpenById(addTodoId.current);

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

  // console.log(sections);

  return (
    <ContentContainer heading={<Heading />}>
      <div className='w-full px-4 md:px-0 '>
        <TodosList
          todos={inboxTodos}
          setTodos={setTodos}
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
              <span className='font-light text-md text-gray-400 group-hover:text-blue-600'>
                Add task
              </span>
            </div>
          )}
        </div>
      </div>
      <div className='flex flex-col gap-1'>
        {/* {sections.map((section) => ( */}
        <SectionsList
          sections={inboxSections}
          setSections={setSections}
          todoInputOpenById={todoInputOpenById}
          sectionInputOpenById={sectionInputOpenById}
          completeTodo={completeTodo}
          addTodo={addTodo}
          editTodo={editTodo}
          setTodoInputOpenById={setTodoInputOpenById}
          setSectionInputOpenById={setSectionInputOpenById}
          deleteSection={deleteSection}
        />
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
