import { useRef, useState } from 'react';
import { IProject, ITodo } from '../../helpers/types';
import { useEventListener } from '../../hooks/useEventListener';
import { useTodosStore, useUIStore } from '../../zustand';
import { AddTodo } from '../AddTodo';
import { PlusSolidIcon } from '../Icons';
import { TodosList } from '../Lists/TodosList';
import { motion } from 'framer-motion';
import { isDesktop } from 'react-device-detect';
import { nanoid } from 'nanoid';

interface IContentContainerProps {
  children?: React.ReactNode;
  heading: React.ReactNode;
  todos: ITodo[];
  project: IProject;
  setTodos: (todos: ITodo[]) => void;
}

export const ContentContainer = ({
  children,
  todos,
  project,
  heading,
  setTodos,
}: IContentContainerProps) => {
  const { isSidebarOpen, todoInputOpenById, setTodoInputOpenById } =
    useUIStore();

  const [todosListWidth, setTodosWidthList] = useState(768);

  const todosListRef = useRef<HTMLDivElement>(null);

  const getTodosListWidth = () => {
    const width = todosListRef?.current?.getBoundingClientRect().width;

    if (todosListRef.current && width) setTodosWidthList(width);
  };

  useEventListener('resize', getTodosListWidth);

  const id = nanoid();
  const addTodoId = useRef(id);

  const openAddTodo = () => setTodoInputOpenById(addTodoId.current);

  console.log(addTodoId.current);

  return (
    <motion.div
      initial={false}
      animate={isSidebarOpen && isDesktop ? { left: 40 } : { left: 0 }}
      transition={{ duration: 0.3, bounce: 0 }}
      className={`h-fit md:w-[768px] md:max-w-[768px] md:min-w-[768px] relative px-4 sm:px-0 mx-auto w-full flex-center flex-col gap-4`}
    >
      <div className='flex sticky z-[3] w-full lg:w-[1000px] bg-white top-0 justify-center items-center gap-2'>
        <div className='w-full px-4 md:px-0 top-0 left-0 right-0 bg-white h-fit pt-12 flex-center'>
          <div style={{ width: todosListWidth }} className='w-full'>
            {heading}
          </div>
        </div>
      </div>

      {project.id !== 'upcoming' && (
        <div ref={todosListRef} className='w-full px-4 md:px-0 '>
          <TodosList todos={todos} setTodos={setTodos} />

          <div className='mb-6'>
            {todoInputOpenById === addTodoId.current ? (
              <AddTodo project={project} />
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
      )}

      <div className='w-full px-4 pb-16'>{children}</div>
    </motion.div>
  );
};
