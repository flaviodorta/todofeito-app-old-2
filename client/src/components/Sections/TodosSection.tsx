import { nanoid } from 'nanoid';
import { useRef, useState } from 'react';
import { DraggableProvided } from 'react-beautiful-dnd';
import { isMobile } from 'react-device-detect';
import { ITodo, ITodosBySection } from '../../helpers/types';
import { useDimensions } from '../../hooks/useDimensions';
import { useToggle } from '../../hooks/useToggle';
import { useUpdateState } from '../../hooks/useUpdateState';
import useWindowSize from '../../hooks/useWindowSize';
import { AddSection } from '../AddSection';
import { AddTodo } from '../AddTodo';
import { EditDropdown } from '../Dropdowns/EditDropdown';
import { EditSection } from '../EditSection';
import {
  ChevronIcon,
  GripVerticalSolidIcon,
  PlusSolidIcon,
  TrashSolidIcon,
  MoreThreeDotsIcon,
} from '../Icons';
import { PenSolidIcon } from '../Icons/Icons/PenSolidIcon';
import { TodosList } from '../Lists/TodosList';

interface ITodosSection {
  section: ITodosBySection;
  todoInputOpenById: string | null;
  sectionInputOpenById: string | null;
  draggableProvided?: DraggableProvided;
  completeTodo: (todo: ITodo) => void;
  addTodo: (todo: ITodo) => void;
  editTodo: (todo: ITodo) => void;
  setTodoInputOpenById: (id: string | null) => void;
  setSectionInputOpenById: (id: string | null) => void;
  deleteSection: (sectionId: string) => void;
}

export const TodosSection = ({
  section,
  todoInputOpenById,
  sectionInputOpenById,
  draggableProvided,
  editTodo,
  addTodo,
  completeTodo,
  setTodoInputOpenById,
  setSectionInputOpenById,
  deleteSection,
}: ITodosSection) => {
  const [isTodoListOpen, toggleTodoListOpen] = useToggle(true);
  const [isHover, toggleHover] = useToggle(false);

  const [todos, setTodos] = useUpdateState(
    section.todos.filter((todo) => !todo.isCompleted),
    [section]
  );

  const toggleTodoList = () => {
    if (isTodoListOpen) setTodoInputOpenById(null);
    toggleTodoListOpen();
  };

  const [isOptionsDropdownOpen, setIsOptionsDropdown] = useState(false);

  const toggleOptionsDropdown = () =>
    isOptionsDropdownOpen
      ? setIsOptionsDropdown(false)
      : setIsOptionsDropdown(true);

  const { width } = useWindowSize();

  const mobileDraggable =
    isMobile || width < 768 ? { ...draggableProvided?.dragHandleProps } : {};

  const desktopDraggable =
    !isMobile && width >= 768 ? { ...draggableProvided?.dragHandleProps } : {};

  const editSectionIdRef = useRef(nanoid());
  const addSectionIdRef = useRef(nanoid());
  const addTodoIdRef = useRef(nanoid());

  const openAddSection = () => setSectionInputOpenById(addSectionIdRef.current);
  const openEditSection = () =>
    setSectionInputOpenById(editSectionIdRef.current);
  const openAddTodo = () => setTodoInputOpenById(addTodoIdRef.current);

  const [optionsIconSizes, optionsIconRef] = useDimensions();

  if (sectionInputOpenById === editSectionIdRef.current) {
    return (
      <EditSection
        section={section}
        setSectionInputOpenById={setSectionInputOpenById}
      />
    );
  }
  return (
    <div className='flex flex-col h-fit w-full'>
      <div {...mobileDraggable} className='sticky top-[76px] z-[2]'>
        <div
          onMouseEnter={toggleHover}
          onMouseLeave={toggleHover}
          className='relative flex justify-between items-center w-full text-sm  bg-white font-bold h-fit pb-1 border-b-[1px] border-gray-300'
        >
          <span className='flex items-center gap-2 text-center'>
            {section.name}
            <span className='font-light text-gray-600 text-xs relative top-[1px]'>
              {todos.length ? todos.length : undefined}
            </span>
          </span>

          {draggableProvided?.dragHandleProps && width >= 768 && !isMobile && (
            <span
              {...desktopDraggable}
              style={{ cursor: 'all-scroll' }}
              className={`${
                isHover ? 'opacity-100' : 'opacity-0'
              } absolute -left-14 -top-0.5 hover:opacity-100 group cursor-crosshair w-6 h-7 rounded-sm flex-center bg-white hover:bg-gray-200 duration-100`}
            >
              <GripVerticalSolidIcon className='fill-gray-400 group-hover:fill-gray-600 w-3 h-3.5' />
            </span>
          )}

          {/* open/close todos list */}
          <span
            onClick={toggleTodoList}
            className='group absolute -left-8 top-0 cursor-pointer w-6 h-6 rounded-sm z-[2] bg-white hover:bg-gray-200 flex items-center justify-center'
          >
            <ChevronIcon
              className={`${
                isTodoListOpen ? '' : '-rotate-90'
              } w-[20px] h-[20px] stroke-gray-500 group-hover:stroke-gray-600 duration-150 transition-all`}
            />
          </span>
          {/* open/close todos list */}
        </div>

        <span
          ref={optionsIconRef}
          onClick={toggleOptionsDropdown}
          className='group z-[1000] absolute right-0 top-0 flex-center w-6 h-6 cursor-pointer rounded-sm hover:bg-gray-200'
        >
          <MoreThreeDotsIcon className='hover:bg-gray-200 hover:fill-gray-600 duration-100 transition-all fill-gray-400' />

          {isOptionsDropdownOpen && (
            <EditDropdown
              sizes={optionsIconSizes}
              close={toggleOptionsDropdown}
            >
              <span
                onClick={openEditSection}
                className='w-full flex items-center gap-2 px-2 py-1 hover:bg-gray-300/30'
              >
                <PenSolidIcon className='fill-gray-400/70' />
                <span>Edit section</span>
              </span>

              <span
                onClick={() => deleteSection(section.id)}
                className='w-full flex items-center gap-2 px-2 py-1 hover:bg-gray-300/30'
              >
                <TrashSolidIcon className='fill-gray-400/70' />
                <span>Delete section</span>
              </span>
            </EditDropdown>
          )}
        </span>
      </div>

      <div className='w-full h-fit mb-2'>
        {isTodoListOpen && (
          <div className='w-full flex flex-col gap-2'>
            {/* Todo list */}
            <TodosList
              todos={todos}
              setTodos={setTodos}
              completeTodo={completeTodo}
              editTodo={editTodo}
              setTodoInputOpenById={setTodoInputOpenById}
              todoInputOpenById={todoInputOpenById}
            />

            {todoInputOpenById === addTodoIdRef.current ? (
              <AddTodo
                section={section}
                project={section.project}
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
        )}
      </div>

      {/* add new section */}
      <div className='w-full mb-5'>
        {sectionInputOpenById === addSectionIdRef.current ? (
          <AddSection
            previousSectionIndex={section.index}
            project={section.project}
            setSectionInputOpenById={setSectionInputOpenById}
          />
        ) : (
          <div
            onClick={openAddSection}
            className='group opacity-0 hover:opacity-100 relative w-full flex items-center justify-center gap-2.5 h-fit cursor-pointer duration-300 ease-in transition-opacity'
          >
            <span
              className={`${
                sectionInputOpenById === addSectionIdRef.current ? '' : 'block'
              } font-medium text-md text-blue-600 z-10 px-2 bg-white`}
            >
              Add section
            </span>
            <span className='group absolute h-[1px] w-full top-1/2 left-0 rounded-full bg-blue-600' />
          </div>
        )}
      </div>
      {/* add new section */}
    </div>
  );
};
