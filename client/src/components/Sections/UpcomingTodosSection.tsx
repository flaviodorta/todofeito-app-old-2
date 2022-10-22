import { useEffect, useState } from 'react';
import { ISection } from '../../helpers/types';
import { useToggle } from '../../hooks/useToggle';
import { useUIStore, useUserStore } from '../../zustand';
import { AddSection } from '../AddSection';
import { AddTodoItem } from '../AddTodoItem';
import { ChevronIcon, PlusSolidIcon } from '../Icons';
import { TodosList } from '../Lists/TodosList';

interface IUpcomingTodosSection {
  hasAddSectionOpen: boolean;
  section: ISection;
  toggleHasAddSectionOpen: () => void;
}

export const UpcomingTodosSection = ({
  section,
  hasAddSectionOpen,
  toggleHasAddSectionOpen,
}: IUpcomingTodosSection) => {
  const {
    editingTodoId,
    isAddTodoInSection,
    isAddTodoItemOpen,
    setEditingTodoId,
    openIsAddTodoItemOpen,
    setIsAddTodoInSection,
    closeIsAddTodoItemOpen,
  } = useUIStore();

  const [isTodoListOpen, toggleTodoListOpen] = useToggle(false);

  const [todos, setTodos] = useState(
    section.todos.filter((todo) => !todo.isCompleted)
  );

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
    setTodos(section.todos.filter((todo) => !todo.isCompleted));
  }, [section.todos]);

  useEffect(() => {
    toggleHasAddSectionOpen();
  }, []);

  return (
    <div className='flex flex-col h-fit w-full'>
      <div className='sticky top-[151px] z-[2]'>
        <div className='relative flex justify-between items-center w-full text-sm  bg-white font-bold h-fit pb-1 border-b-[1px] border-gray-300'>
          <span className='text-gray-500'>{section.name}</span>
        </div>
      </div>

      {isTodoListOpen && (
        <div className='w-full'>
          <div className='w-full'>
            <TodosList todos={todos} setTodos={setTodos} />
          </div>
        </div>
      )}

      {/* {isTodoListOpen && ( */}
      <div>
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
      {/* )} */}
    </div>
  );
};
