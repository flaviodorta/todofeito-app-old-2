import { AnimatePresence } from 'framer-motion';
import { AddTodoModal } from '../components/AddTodoModal';
import { TodayTodos } from '../components/Content/TodayTodos';
import { Navbar } from '../components/Navbar';
import { useToggle } from '../hooks/useToggle';
import { useUserStore } from '../zustand';

export const BasePage = ({ activePage }: { activePage: string }) => {
  const [isSidebarOpen, toggleSidebar] = useToggle(true);
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
      <TodayTodos />;
    </>
  );
};
