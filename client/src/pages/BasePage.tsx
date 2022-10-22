import { AnimatePresence } from 'framer-motion';
import { AddTodoModal } from '../components/AddTodoModal';
import { Navbar } from '../components/Navbar';
import { useToggle } from '../hooks/useToggle';
import { useUIStore } from '../zustand';
import { Sidebar } from '../components/Sidebar';
import { CreateProjectModal } from '../components/CreateProjectModal';
import useWindowSize from '../hooks/useWindowSize';
import { useEventListener } from '../hooks/useEventListener';
import { useMemo, useRef } from 'react';
import { EditProjectModal } from '../components/EditProjectModal';

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
  const [isEditProjectModalOpen, toggleEditProjectModalOpen] = useToggle(false);

  const { width } = useWindowSize();

  useEventListener('resize', () => {
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

      <div
        ref={contentRef}
        className={`${scrollWidth} top-12 fixed right-0 left-0 h-[calc(100%-48px)] overflow-x-hidden overflow-y-auto`}
      >
        <Sidebar
          toggleEditProjectModalOpen={toggleEditProjectModalOpen}
          isEditProjectModalOpen={isEditProjectModalOpen}
          toggleCreateProjectModalOpen={toggleCreateProjectModalOpen}
        />
        {content}
      </div>
    </>
  );
};
