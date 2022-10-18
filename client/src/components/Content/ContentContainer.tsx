import { useRef, useState } from 'react';
import { IProject, ITodo } from '../../helpers/types';
import { useEventListener } from '../../hooks/useEventListener';
import { useUIStore } from '../../zustand';
import { AddTodoItem } from '../AddTodoItem';
import { PlusSolidIcon } from '../Icons';
import { TodosList } from '../TodosList';

interface IContentContainerProps {
  children: React.ReactNode;
  todos: ITodo[];
  project?: IProject;
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

  const [todosListWidth, setTodosWidthList] = useState(672);

  const todosListRef = useRef<HTMLDivElement>(null);

  const getTodosListWidth = () => {
    const width = todosListRef?.current?.getBoundingClientRect().width;

    if (todosListRef.current && width) setTodosWidthList(width);
  };

  useEventListener('resize', getTodosListWidth);

  return (
    <>
      <div className='h-fit relative mx-auto w-full flex-center flex-col'>
        {/* <div
        className={`${
          isSidebarOpen ? '' : 'lg:-translate-x-12'
        } w-full h-fit py-6 px-4 flex flex-col bg-white duration-150 ease-in-out transition-transform`}
      > */}
        {/* <div className='w-full h-fit py-4 justify-center items-end bg-white z-30'> */}
        {/* <div
            // style={{ width: todosListWidth }}
            className={`${
              isSidebarOpen ? '' : 'lg:-translate-x-12'
            } py-2 duration-150 ease-in-out transition-transform`}
          >
            {children}
          </div> */}
        {/* </div> */}

        <div className='sticky top-0 left-0 right-0 z-50 bg-white w-full h-24 flex-center'>
          <div
            style={{ width: todosListWidth }}
            className={`${
              isSidebarOpen ? '' : 'lg:-translate-x-12'
            }  duration-150 ease-in-out transition-transform `}
          >
            {children}
          </div>
        </div>

        <div
          ref={todosListRef}
          className={`${
            isSidebarOpen ? '' : 'lg:-translate-x-12'
          } md:w-[672px] md:max-w-[672px] md:min-w-[672px] duration-150 ease-in-out transition-transform`}
        >
          <TodosList todos={todos} />

          {isAddTodoItemOpen && !editingTodoId ? (
            <AddTodoItem
              project={{ id: 'today', name: 'today' }}
              date={new Date()}
            />
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
        {/* </div> */}
      </div>
    </>
  );
};
