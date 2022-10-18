import { AnimatePresence } from 'framer-motion';
import { AddTodoModal } from '../components/AddTodoModal';
import { Navbar } from '../components/Navbar';
import { useToggle } from '../hooks/useToggle';
import { useUIStore } from '../zustand';
import { Sidebar } from '../components/Sidebar';
import { CreateProjectModal } from '../components/CreateProjectModal';
import useWindowSize from '../hooks/useWindowSize';
import { useEventListener } from '../hooks/useEventListener';
import { useMemo, useRef, useState } from 'react';
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

  const contentRef = useRef<HTMLDivElement>(null);

  const scrollWidth = useMemo(() => {
    if (!contentRef?.current) return;

    const el = contentRef.current;

    return el.offsetWidth - el.clientWidth;
  }, [contentRef]);

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

      <div
        ref={contentRef}
        className={`${scrollWidth} fixed top-12 right-0 left-0 h-full overflow-y-auto`}
      >
        {content}
      </div>
    </>
  );
};
