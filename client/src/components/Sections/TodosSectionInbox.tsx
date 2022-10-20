import { useState } from 'react';
import { ISection } from '../../helpers/types';
import { useToggle } from '../../hooks/useToggle';
import { useUIStore } from '../../zustand';
import { AddSection } from '../AddSection';
import { AddTodoItem } from '../AddTodoItem';
import { PlusSolidIcon } from '../Icons';
import { TodosList } from '../TodosList';

interface ITodosSection {
  children: React.ReactNode;
  hasAddSectionOpen: boolean;
  section: ISection;
}

export const TodosSectionInbox = ({
  children,
  section,
  hasAddSectionOpen,
}: ITodosSection) => {
  const {
    editingTodoId,
    isAddTodoItemOpen,
    setEditingTodoId,
    openIsAddTodoItemOpen,
    isSidebarOpen,
  } = useUIStore();

  const [isHover, toggleIsHover] = useToggle(false);

  const [isAddSectionOpen, toggleIsAddSectionOpen] = useToggle(false);

  const [todos, setTodos] = useState(section.todos);

  return (
    <div className='flex h-fit items-end pt-8 w-full'>
      <TodosList todos={todos} setTodos={setTodos} />

      {isAddSectionOpen ? (
        <AddSection close={toggleIsAddSectionOpen} />
      ) : (
        <div
          onClick={toggleIsAddSectionOpen}
          onMouseEnter={toggleIsHover}
          onMouseLeave={toggleIsHover}
          className='group opacity-0 hover:opacity-100 relative w-full flex items-center justify-center gap-2.5 h-fit cursor-pointer duration-300 ease-in transition-opacity'
        >
          <span className='font-medium text-md text-blue-600 z-10 px-2 bg-white'>
            Add section
          </span>
          <span className='group absolute h-[1px] w-full top-1/2 left-0 rounded-full bg-blue-600' />
        </div>
      )}
    </div>
  );
};
