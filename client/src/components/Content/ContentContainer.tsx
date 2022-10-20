import { useRef, useState } from 'react';
import { IProject } from '../../helpers/types';
import { useEventListener } from '../../hooks/useEventListener';
import { useUIStore } from '../../zustand';
import { AddTodoItem } from '../AddTodoItem';
import { PlusSolidIcon } from '../Icons';
import { TodosList } from '../TodosList';
import { motion } from 'framer-motion';
import { isDesktop } from 'react-device-detect';

interface IContentContainerProps {
  children: React.ReactNode;
  project: Pick<IProject, 'id' | 'name'>;
}

export const ContentContainer = ({
  children,
  project,
}: IContentContainerProps) => {
  const {
    editingTodoId,
    isAddTodoItemOpen,
    setEditingTodoId,
    openIsAddTodoItemOpen,
    isSidebarOpen,
    todosOnScreen,
    setTodosOnScreen,
  } = useUIStore();

  const openAddTodoItem = () => {
    setEditingTodoId(null);
    openIsAddTodoItemOpen();
  };

  const [todosListWidth, setTodosWidthList] = useState(768);

  const todosListRef = useRef<HTMLDivElement>(null);

  const getTodosListWidth = () => {
    const width = todosListRef?.current?.getBoundingClientRect().width;

    if (todosListRef.current && width) setTodosWidthList(width);
  };

  useEventListener('resize', getTodosListWidth);

  return (
    <motion.div
      initial={false}
      animate={isSidebarOpen && isDesktop ? { left: 40 } : { left: 0 }}
      transition={{ duration: 0.3, bounce: 0 }}
      className={` h-fit relative px-4 sm:px-0 mx-auto w-full flex-center flex-col`}
    >
      <div className='w-full px-4 md:px-0 top-0 left-0 right-0 bg-white h-fit pt-12 mb-4 flex-center'>
        <div style={{ width: todosListWidth }} className='w-full'>
          {children}
        </div>
      </div>

      <div
        ref={todosListRef}
        className='w-full px-4 md:px-0 md:w-[768px] md:max-w-[768px] md:min-w-[768px]'
      >
        <TodosList todos={todosOnScreen} setTodos={setTodosOnScreen} />

        {isAddTodoItemOpen && !editingTodoId ? (
          <AddTodoItem project={project} date={new Date()} />
        ) : (
          <div
            onClick={openAddTodoItem}
            className='group w-full flex items-center gap-2.5 h-fit'
          >
            <span className='group rounded-full bg-white group-hover:bg-blue-600 flex-center'>
              <PlusSolidIcon className='stroke-[1px] fill-blue-600 group-hover:fill-white' />
            </span>
            <span className='font-light text-md text-gray-400 group-hover:text-blue-600'>
              Add task
            </span>
          </div>
        )}
      </div>
    </motion.div>
  );
};
