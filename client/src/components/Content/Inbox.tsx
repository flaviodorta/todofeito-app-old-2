import { useUIStore, useUserStore } from '../../zustand';
import { AddTodoItem } from '../AddTodoItem';
import { PlusSolidIcon } from '../Icons';
import { motion } from 'framer-motion';
import { TodosList } from '../TodosList';

export const Inbox = () => {
  const {
    editingTodoId,
    isSidebarOpen,
    isAddTodoItemOpen,
    openIsAddTodoItemOpen,
    setEditingTodoId,
  } = useUIStore();

  const { todos } = useUserStore();

  const openAddTodoItem = () => {
    setEditingTodoId(null);
    openIsAddTodoItemOpen();
  };

  return (
    <div className='h-full flex justify-center bg-white'>
      <motion.div
        initial={false}
        animate={isSidebarOpen ? { x: 0 } : { x: -48 }}
        transition={{ duration: 0.2, bounce: 0 }}
        className='max-w-[44rem] w-[44rem] align-bottom px-4 py-6 flex flex-col bg-white'
      >
        <div className='mb-6 flex items-center gap-2'>
          <h2 className='font-bold text-xl'>Inbox</h2>
        </div>

        <TodosList todos={todos.inbox} />

        {/* <div onClick={openAddTodoItem} className='flex-center'> */}
        {isAddTodoItemOpen && !editingTodoId ? (
          <AddTodoItem project={'inbox'} />
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
        {/* </div> */}
      </motion.div>
    </div>
  );
};
