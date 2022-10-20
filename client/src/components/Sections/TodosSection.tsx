import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { DraggableProvided, DraggableStateSnapshot } from 'react-beautiful-dnd';
import { IProject, ISection } from '../../helpers/types';
import { useToggle } from '../../hooks/useToggle';
import { useUIStore, useUserStore } from '../../zustand';
import { AddSection } from '../AddSection';
import { AddTodoItem } from '../AddTodoItem';
import { ChevronIcon, GripVerticalSolidIcon, PlusSolidIcon } from '../Icons';
import { TodosList } from '../Lists/TodosList';

interface ITodosSection {
  children: React.ReactNode;
  hasAddSectionOpen: boolean;
  section: ISection;
  toggleHasAddSectionOpen: () => void;
  draggableProvided?: DraggableProvided;
  draggableSnapshot?: DraggableStateSnapshot;
}

export const TodosSection = ({
  children,
  section,
  hasAddSectionOpen,
  toggleHasAddSectionOpen,
  draggableProvided,
  draggableSnapshot,
}: ITodosSection) => {
  const { sections } = useUserStore();
  const {
    editingTodoId,
    isAddTodoInSection,
    isAddTodoItemOpen,
    setEditingTodoId,
    openIsAddTodoItemOpen,
    setIsAddTodoInSection,
    closeIsAddTodoItemOpen,
  } = useUIStore();

  const [isAddSectionOpen, toggleIsAddSectionOpen] = useToggle(false);
  const [isTodoListOpen, toggleTodoListOpen] = useToggle(false);
  const [isHover, toggleHover] = useToggle(false);

  const [todos, setTodos] = useState(section.todos);

  const sectionIndex = sections.findIndex((s) => s.id === section.id);

  const toggleAddSection = () => {
    toggleIsAddSectionOpen();
    toggleHasAddSectionOpen();
  };

  const openAddTodoItem = () => {
    setEditingTodoId(null);
    openIsAddTodoItemOpen();
    setIsAddTodoInSection(section.id);
  };

  const toggleTodoList = () => {
    if (isTodoListOpen) {
      closeIsAddTodoItemOpen();
      setIsAddTodoInSection(null);
    }

    toggleTodoListOpen();
  };

  useEffect(() => {
    setTodos(section.todos);
  }, [section.todos]);

  useEffect(() => {
    toggleHasAddSectionOpen();
  }, []);

  return (
    <div className='relative flex flex-col h-fit w-full'>
      {/* {draggableProvided && ( */}

      <div className='sticky top-[68px] z-[2]'>
        <div
          onMouseEnter={toggleHover}
          onMouseLeave={toggleHover}
          className='relative w-full text-sm  bg-white font-bold h-fit pb-1 border-b-[1px] border-gray-300'
        >
          {section.title}

          <span
            // {...draggableProvided.dragHandleProps}
            style={{ cursor: 'all-scroll' }}
            className={`${
              isHover ? 'opacity-100' : 'opacity-0'
            } absolute -left-14 -top-0.5 hover:opacity-100 group cursor-crosshair w-6 h-7 rounded-sm flex-center bg-white hover:bg-gray-200 duration-100`}
          >
            <GripVerticalSolidIcon className='fill-gray-400 group-hover:fill-gray-600 w-3 h-3.5' />
          </span>
          {/* )} */}

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
        </div>
      </div>

      <div className='w-full h-fit mb-4'>
        {isTodoListOpen && (
          <div className='w-full'>
            <TodosList todos={todos} setTodos={setTodos} />

            {isAddTodoItemOpen && !editingTodoId && isAddTodoInSection ? (
              <AddTodoItem sectionId={section.id} />
            ) : (
              <div
                onClick={openAddTodoItem}
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

      <div className='w-full'>
        {isAddSectionOpen ? (
          <AddSection index={sectionIndex} close={toggleAddSection} />
        ) : (
          <div
            onClick={toggleAddSection}
            className='group opacity-0 hover:opacity-100 relative w-full flex items-center justify-center gap-2.5 h-fit cursor-pointer duration-300 ease-in transition-opacity'
          >
            <span
              className={`${
                hasAddSectionOpen ? '' : 'block'
              } font-medium text-md text-blue-600 z-10 px-2 bg-white`}
            >
              Add section
            </span>
            <span className='group absolute h-[1px] w-full top-1/2 left-0 rounded-full bg-blue-600' />
          </div>
        )}
      </div>
    </div>
  );
};
