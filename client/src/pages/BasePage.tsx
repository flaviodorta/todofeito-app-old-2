import { AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { AddTodoModal } from '../components/AddTodoModal';
import { TodayTodos } from '../components/Content/TodayTodos';
import { Navbar } from '../components/Navbar';
import { IRenderableElements } from '../helpers/types';
import { useToggle } from '../hooks/useToggle';

export const BasePage = ({ activePage }: { activePage: string }) => {
  const [isSidebarOpen, toggleSidebar] = useToggle(true);
  const [isAddTodoModalOpen, toggleAddTodoModal] = useToggle(false);

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
            toggleAddTodoModal={toggleAddTodoModal}
          />
        )}
      </AnimatePresence>
      <TodayTodos />;
    </>
  );
};
