import { isEqual } from 'lodash';
import { nanoid } from 'nanoid';
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import { reorder } from '../../helpers/functions';
import { IProject, ISection, ITodo } from '../../helpers/types';
import { useDndPlaceholder } from '../../hooks/useDndPlaceholder';
import { useUpdateState } from '../../hooks/useUpdateState';
import { useTodosStore, useUIStore } from '../../zustand';
import { AddSection } from '../AddSection';
import { AddTodo } from '../AddTodo';
import { PlusSolidIcon } from '../Icons';
import { SectionsList } from '../Lists/SectionsList';
import { TodosList } from '../Lists/TodosList';
import { ContentContainer } from './ContentContainer';

interface ITodosSection {
  todos: ITodo[];
  id: string;
  index?: number | undefined;
  name: string;
  date: Date;
  project: IProject;
}

export const InboxContent = () => {
  const {
    projects,
    sections,
    editTodo,
    completeTodo: completeT,
    addTodo: addT,
    deleteSection,
    // setTodos,
    setSections,
    addSection: addS,
    // editTodo,
    // completeTodo,
    // addTodo,
    // deleteSection,
    // setTodos,
    // setSections,
    // addSection,
    todos,
  } = useTodosStore();
  const { draggingElementId } = useUIStore();

  const [todoInputOpenById, setTodoInputOpenById] = useState<string | null>(
    null
  );

  const [sectionInputOpenById, setSectionInputOpenById] = useState<
    string | null
  >(null);

  // const inboxSections = useMemo(
  //   () => sections.filter((section) => section.project?.id === 'inbox'),
  //   [sections]
  // );

  const [inboxSections, setInboxSections] = useState(
    sections.filter((section) => section.project?.id === 'inbox')
  );

  const [inboxTodos, setInboxTodos] = useState(
    todos.filter(
      (todo) =>
        todo.project.id === 'inbox' && !todo.isCompleted && !todo.section
    )
  );

  const [inboxTodosSections, setInboxTodosSections] = useState<ITodosSection[]>(
    inboxSections.map((section) => ({
      ...section,
      todos: todos.filter(
        (todo) => todo.section?.id === section.id && !todo.isCompleted
      ),
    }))
  );

  // console.log(inboxTodosSections);

  // useLayoutEffect(() => {
  //   const lastTodoAdded = todos[todos.length - 1];
  //   const existTodosInState =
  //     inboxTodosSections.find((todo) => todo.id === lastTodoAdded.id) &&
  //     inboxTodos.find((todo) => todo.id === lastTodoAdded.id);
  //   console.log(lastTodoAdded);
  //   console.log(existTodosInState);
  //   console.log(inboxTodosSections);
  //   if (!existTodosInState && lastTodoAdded)
  //     lastTodoAdded.hasOwnProperty('section')
  //       ? setInboxTodosSections((state) =>
  //           state.map((sec) =>
  //             sec.id === todos[todos.length - 1].section?.id
  //               ? { ...sec, todos: [...sec.todos, todos[todos.length - 1]] }
  //               : sec
  //           )
  //         )
  //       : setInboxTodos((s) => [...s, todos[todos.length - 1]]);
  // }, [todos]);

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

  const addTodo = (todo: ITodo) => {
    if (!todo.section) setInboxTodos((state) => [...state, todo]);
    else if (todo.section) {
      setInboxTodosSections((state) =>
        state.map((section) =>
          todo.section?.id === section.id
            ? { ...section, todos: [...section.todos, todo] }
            : section
        )
      );
    }
    addT(todo);
  };

  // const editTodo = useCallback((todo: ITodo) => {
  //   editT(todo);
  // }, []);

  const completeTodo = useCallback((todo: ITodo) => {
    if (!todo.section)
      setInboxTodos((state) => state.filter((t) => t.id !== todo.id));
    else if (todo.section) {
      setInboxTodosSections((state) =>
        state.map((section) =>
          todo.section?.id === section.id
            ? {
                ...section,
                todos: section.todos.filter((t) => t.id !== todo.id),
              }
            : section
        )
      );
    }
    completeT(todo);
  }, []);

  // const deleteSection = useCallback((section: ISection) => {
  //   deleteS(section);
  // }, []);

  // const setTodos = useCallback((todos: ITodo[]) => {
  //   setT(todos);
  // }, []);

  const addSection = useCallback((section: ISection) => {
    setInboxTodosSections((state) => [...state, { ...section, todos: [] }]);
    setInboxSections((state) => [...state, section]);
    addS(section);
  }, []);

  // const setSections = useCallback((sections: ITodosSection[]) => {
  //   setInboxTodosSections(sections);
  // }, []);

  const { placeholderProps, onDragStart, onDragUpdate } = useDndPlaceholder();

  const onDragEnd = (result: DropResult) => {
    const { destination, source } = result;

    if (!destination) return;

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    )
      return;

    console.log(
      'source id ',
      source.index,
      ' destination id ',
      destination.index
    );

    const sourceTodosSectionIndex = sections.findIndex(
      (s) => s.id === source.droppableId
    );

    const destinationTodosSectionIndex = sections.findIndex(
      (s) => s.id === destination.droppableId
    );

    const destinationTodosSection =
      destinationTodosSectionIndex !== -1
        ? [...inboxTodosSections[destinationTodosSectionIndex].todos]
        : [];

    const draggingTodo: ITodo = todos.filter(
      (todo) => todo.id === draggingElementId
    )[0];

    const editedTodo: ITodo = {
      ...draggingTodo,
      section: inboxSections[destinationTodosSectionIndex],
    };

    console.log(inboxSections[destinationTodosSectionIndex]);

    if (
      source.droppableId === 'sections' &&
      destination.droppableId === 'sections'
    ) {
      // console.log('here');
      // console.log(reorder(inboxTodosSections, source.index, destination.index));
      setInboxSections(reorder(sections, source.index, destination.index));
      setInboxTodosSections(
        reorder(inboxTodosSections, source.index, destination.index)
      );
      return;
    }

    // inbox to inbox
    if (source.droppableId === 'inbox' && destination.droppableId === 'inbox') {
      const x = reorder(inboxTodos, source.index, destination.index);
      setInboxTodos(x);
      return;
    }

    // inbox to section
    else if (
      source.droppableId === 'inbox' &&
      destination.droppableId !== 'inbox'
    ) {
      const newInboxTodos = inboxTodos.filter(
        (todo) => todo.id !== editedTodo.id
      );
      destinationTodosSection.splice(destination.index, 0, editedTodo);
      const newInboxTodosSections = [...inboxTodosSections];
      newInboxTodosSections[destinationTodosSectionIndex].todos = [
        ...destinationTodosSection,
      ];
      setInboxTodos(newInboxTodos);
      setInboxTodosSections(newInboxTodosSections);
      return;
    } else if (
      source.droppableId !== 'inbox' &&
      destination.droppableId !== 'inbox'
    ) {
      if (source.droppableId === destination.droppableId) {
        const newInboxTodoSections = inboxTodosSections.map(
          (todosSection, i) => {
            if (i === sourceTodosSectionIndex)
              return {
                ...todosSection,
                todos: reorder(
                  todosSection.todos,
                  source.index,
                  destination.index
                ),
              };

            return todosSection;
          }
        );
        setInboxTodosSections(newInboxTodoSections);
        return;
      }

      const newInboxTodosSections = inboxTodosSections.map((todosSection, i) =>
        i === sourceTodosSectionIndex
          ? {
              ...todosSection,
              todos: todosSection.todos.filter(
                (todo) => todo.id !== draggingTodo.id
              ),
            }
          : todosSection
      );
      destinationTodosSection.splice(destination.index, 0, editedTodo);
      newInboxTodosSections[destinationTodosSectionIndex].todos =
        destinationTodosSection;
      setInboxTodosSections(newInboxTodosSections);
      return;
    }

    // section to inbox
    else if (
      source.droppableId !== 'inbox' &&
      destination.droppableId === 'inbox'
    ) {
      const newInboxTodosSections = inboxTodosSections.map((todosSection, i) =>
        i === sourceTodosSectionIndex
          ? {
              ...todosSection,
              todos: todosSection.todos.filter(
                (todo) => todo.id !== draggingTodo.id
              ),
            }
          : todosSection
      );
      const newInboxTodos = [...inboxTodos];
      newInboxTodos.splice(destination.index, 0, editedTodo);
      setInboxTodos(newInboxTodos);
      setInboxTodosSections(newInboxTodosSections);
      return;
    }

    editTodo(editedTodo);
  };

  const Heading = () => (
    <div className='flex items-center gap-2'>
      <h2 className='font-bold text-xl'>Inbox</h2>
    </div>
  );

  return (
    <ContentContainer heading={<Heading />}>
      <DragDropContext
        onDragStart={onDragStart}
        onDragUpdate={onDragUpdate}
        onDragEnd={onDragEnd}
      >
        <div className='w-full px-9 md:px-0'>
          <TodosList
            draggingElementId={draggingElementId}
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
            sections={sections!}
            sectionsTodos={inboxTodosSections!}
            todoInputOpenById={todoInputOpenById}
            sectionInputOpenById={sectionInputOpenById}
            draggingElementId={draggingElementId}
            setSections={setSections}
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
      </DragDropContext>
    </ContentContainer>
  );
};
