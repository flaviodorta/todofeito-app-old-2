import { omit } from 'lodash';
import { nanoid } from 'nanoid';
import { useCallback, useMemo, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { IProject, ITodo } from '../../helpers/types';
import { useUpdateState } from '../../hooks/useUpdateState';
import { useTodosStore, useUIStore } from '../../zustand';
import { AddSection } from '../AddSection';
import { AddTodo } from '../AddTodo';
import { PlusSolidIcon } from '../Icons';
import { SectionsList } from '../Lists/SectionsList';
import { TodosList } from '../Lists/TodosList';
import { ContentContainer } from './ContentContainer';

export const ProjectContent = () => {
  const {
    projects,
    todos,
    sections,
    editTodo,
    completeTodo,
    addTodo,
    deleteSection,
    setTodos,
    addSection,
    editSection,
  } = useTodosStore();
  const { draggingOverElementId, placeholderProps } = useUIStore();

  const params = useParams();

  const [todoInputOpenById, setTodoInputOpenById] = useState<string | null>(
    null
  );

  const [sectionInputOpenById, setSectionInputOpenById] = useState<
    string | null
  >(null);

  const project = useMemo(
    () => projects.filter((project) => project.id === params.projectId)[0],
    [projects]
  );

  const projectTodos = useMemo(
    () =>
      todos.filter(
        (todo) => !todo.isCompleted && project.id === params.projectId
      ),
    [todos]
  );

  const [projectSections, setSections] = useUpdateState(
    sections.filter((section) => section.project?.id === project.id),
    [sections]
  );

  console.log(sections.length);

  const addSectionId = useRef(nanoid());

  const openAddSection = () => setSectionInputOpenById(addSectionId.current);

  const id = nanoid();
  const addTodoId = useRef(id);

  const openAddTodo = () => setTodoInputOpenById(addTodoId.current);

  const Heading = () => (
    <div className='flex items-center gap-2'>
      <h2 className='font-bold text-xl'>{project.name}</h2>
    </div>
  );
  return (
    <ContentContainer heading={<Heading />}>
      <div className='w-full px-9 md:px-0'>
        <TodosList
          droppableId={project.id}
          todos={projectTodos}
          placeholderProps={placeholderProps}
          draggingOverElementId={draggingOverElementId}
          completeTodo={completeTodo}
          editTodo={editTodo}
          setTodoInputOpenById={setTodoInputOpenById}
          todoInputOpenById={todoInputOpenById}
        />

        <div className='mb-6'>
          {todoInputOpenById === addTodoId.current ? (
            <AddTodo
              project={project!}
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
        <SectionsList
          sections={projectSections}
          addSection={addSection}
          editSection={editSection}
          placeholderProps={placeholderProps}
          todos={projectTodos}
          droppabledId={project.id}
          draggingOverElementId={draggingOverElementId}
          todoInputOpenById={todoInputOpenById}
          sectionInputOpenById={sectionInputOpenById}
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
            <div></div>
          ) : (
            // <AddSection
            //   addSection={(section) => {}}
            //   previousSectionIndex={-1}
            //   project={project!}
            //   setSectionInputOpenById={setSectionInputOpenById}
            // />
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
