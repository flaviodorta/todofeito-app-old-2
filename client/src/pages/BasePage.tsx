import { AnimatePresence } from 'framer-motion';
import { AddTodoModal } from '../components/AddTodoModal';
import { Navbar } from '../components/Navbar';
import { useToggle } from '../hooks/useToggle';
import { useUIStore, useUserStore } from '../zustand';
import { Sidebar } from '../components/Sidebar';

export const BasePage = ({ content }: { content: React.ReactNode }) => {
  const { isSidebarOpen, toggleSidebar } = useUIStore();
  const [isAddTodoModalOpen, toggleAddTodoModal] = useToggle(false);

  const { todos } = useUserStore();

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

      <Sidebar />

      {content}
    </>
  );
};
