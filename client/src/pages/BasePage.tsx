import { Navbar } from '../components/Navbar';
import { useUIStore } from '../zustand';
import { Sidebar } from '../components/Sidebar';
import useWindowSize from '../hooks/useWindowSize';
import { useEventListener } from '../hooks/useEventListener';
import { useMemo, useRef } from 'react';

export const BasePage = ({ content }: { content: React.ReactNode }) => {
  const { isSidebarOpen, toggleSidebar } = useUIStore();

  const { width } = useWindowSize();

  useEventListener('resize', () => {
    if (width < 1024) {
      if (isSidebarOpen) toggleSidebar();
    }

    if (width >= 1024) {
      if (!isSidebarOpen) toggleSidebar();
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
      <Navbar />

      <Sidebar />

      <div
        ref={contentRef}
        className={`${scrollWidth} z-[10] top-12 fixed right-0 left-0 h-[calc(100%-48px)] overflow-x-hidden overflow-y-auto`}
      >
        {content}
      </div>
    </>
  );
};
