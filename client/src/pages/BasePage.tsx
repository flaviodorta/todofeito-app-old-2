import { AnimatePresence } from 'framer-motion';
import { AddTodoModal } from '../components/AddTodoModal';
import { Navbar } from '../components/Navbar';
import { useToggle } from '../hooks/useToggle';
import { useUIStore } from '../zustand';
import { Sidebar } from '../components/Sidebar';
import { CreateProjectModal } from '../components/CreateProjectModal';
import useWindowSize from '../hooks/useWindowSize';
import { useEventListener } from '../hooks/useEventListener';
import { useState } from 'react';
import { motion } from 'framer-motion';

export const BasePage = ({ content }: { content: React.ReactNode }) => {
  const {
    isSidebarOpen,
    toggleSidebar,
    isMinorThanLargeScreen,
    setIsMinorThanLargeScreen,
  } = useUIStore();
  const [isAddTodoModalOpen, toggleAddTodoModal] = useToggle(false);
  const [isCreateProjectModalOpen, toggleCreateProjectModalOpen] =
    useToggle(false);
  const { width } = useWindowSize();

  useEventListener('resize', () => {
    console.log(isMinorThanLargeScreen);
    if (width < 1024 && !isMinorThanLargeScreen) {
      if (isSidebarOpen) toggleSidebar();
      setIsMinorThanLargeScreen(true);
    }

    if (width >= 1024 && isMinorThanLargeScreen) {
      if (!isSidebarOpen) toggleSidebar();
      setIsMinorThanLargeScreen(false);
    }
  });

  return (
    <>
      <Navbar
        isSidebarOpen={isSidebarOpen}
        toggleSidebar={toggleSidebar}
        toggleAddTodoModal={toggleAddTodoModal}
      />

      <AnimatePresence>
        {isAddTodoModalOpen && (
          <AddTodoModal closeAddTodoModal={toggleAddTodoModal} />
        )}

        {isCreateProjectModalOpen && (
          <CreateProjectModal
            closeCreateProjectModalOpen={toggleCreateProjectModalOpen}
          />
        )}
      </AnimatePresence>

      <Sidebar toggleCreateProjectModalOpen={toggleCreateProjectModalOpen} />

      <div className='w-full h-full flex'>
        <motion.div
          initial={false}
          animate={
            isSidebarOpen && !isMinorThanLargeScreen
              ? { width: '100%', minWidth: '306px' }
              : { width: 0, minWidth: 0 }
          }
          transition={{ duration: 0.35, bounce: 0 }}
          // style={{ minWidth: '306px' }}
          className='bg-transparent'
        />
        {/* <div className='min-w-[306px] w-full bg-red-600' /> */}
        {content}
        {/* <div
          style={{ transition: 'width 350ms ease' }}
          className='w-full bg-red-600 duration-[350ms] transition-width'
        /> */}
        <motion.div
          initial={false}
          animate={
            isSidebarOpen && !isMinorThanLargeScreen
              ? {
                  width: '100%',
                }
              : {
                  width: 0,
                }
          }
          transition={{ duration: 0.35, bounce: 0 }}
          className='w-full bg-transparent'
        />
      </div>
    </>
  );
};
