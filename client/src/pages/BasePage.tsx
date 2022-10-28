import { Navbar } from '../components/Navbar';
import { useUIStore } from '../zustand';
import { Sidebar } from '../components/Sidebar';
import useWindowSize from '../hooks/useWindowSize';
import { useEventListener } from '../hooks/useEventListener';
import { useEffect, useMemo, useRef } from 'react';

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

  // const ref = useRef<HTMLDivElement>(null);

  // useEffect(() => {
  //   document.addEventListener('scroll', () => {
  //     console.log('cu');
  //   });

  //   return document.body.removeEventListener('scroll', () => {
  //     console.log('cu');
  //   });
  // }, []);

  return (
    <>
      <Navbar />

      <Sidebar />

      {content}
    </>
  );
};
