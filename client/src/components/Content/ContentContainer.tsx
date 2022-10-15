import { ITodo } from '../../helpers/types';
import { useUIStore } from '../../zustand';
import { AddTodoItem } from '../AddTodoItem';
import { PlusSolidIcon } from '../Icons';
import { TodosList } from '../TodosList';

interface IContentContainerProps {
  children: React.ReactNode;
  todos: ITodo[];
}

export const ContentContainer = ({
  children,
  todos,
}: IContentContainerProps) => {
  const {
    editingTodoId,
    isAddTodoItemOpen,
    setEditingTodoId,
    openIsAddTodoItemOpen,
    isSidebarOpen,
  } = useUIStore();

  const openAddTodoItem = () => {
    setEditingTodoId(null);
    openIsAddTodoItemOpen();
  };

  return (
    <div className='h-screen mx-auto w-full md:w-[672px] md:max-w-[672px] md:min-w-[672px] flex justify-center'>
      <div
        className={`${
          isSidebarOpen ? '' : 'md:-translate-x-12'
        } w-full py-6 px-4 flex flex-col bg-white duration-150 ease-in-out transition-transform`}
        // style={{ transition: 'position 3s ease' }}
      >
        {children}

        <TodosList todos={todos} />

        {isAddTodoItemOpen && !editingTodoId ? (
          <AddTodoItem project={'today'} date={new Date()} />
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
    </div>
  );
};
