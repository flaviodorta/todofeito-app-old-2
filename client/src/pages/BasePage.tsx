import { AnimatePresence } from 'framer-motion';
import { AddTodoModal } from '../components/AddTodoModal';
import { Navbar } from '../components/Navbar';
import { useToggle } from '../hooks/useToggle';
import { useUIStore, useUserStore } from '../zustand';
import { Resizable } from 'react-resizable';
import { motion } from 'framer-motion';

export const BasePage = ({ content }: { content: React.ReactNode }) => {
  const { isSidebarOpen, toggleSidebar } = useUIStore();
  // const [isSidebarOpen, toggleSidebar] = useToggle(true);
  const [isAddTodoModalOpen, toggleAddTodoModal] = useToggle(false);

  const { todos } = useUserStore();
  console.log(todos);

  return (
    <>
      <Navbar
        isSidebarOpen={isSidebarOpen}
        toggleSidebar={toggleSidebar}
        toggleAddTodoModal={toggleAddTodoModal}
      />

      <AnimatePresence>
        {isAddTodoModalOpen && (
          <AddTodoModal
            isAddTodoModalOpen={isAddTodoModalOpen}
            closeAddTodoModal={toggleAddTodoModal}
          />
        )}
      </AnimatePresence>

      <Resizable height={100} width={306}>
        <motion.div
          initial={{ width: 306 }}
          animate={isSidebarOpen ? { translateX: 0 } : { translateX: '-100%' }}
          transition={{
            bounce: 0,
          }}
          className='pt-6 w-[306px] pl-12 pr-4 h-full fixed bg-red-300'
        >
          <div className='w-full flex'>
            <div className='ml-auto'>coll</div>
          </div>
        </motion.div>
      </Resizable>

      {content}
    </>
  );
};
