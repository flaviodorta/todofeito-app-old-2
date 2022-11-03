import { Navbar } from '../components/Navbar';
import { useTodosStore, useUIStore } from '../zustand';
import { Sidebar } from '../components/Sidebar';
import useWindowSize from '../hooks/useWindowSize';
import { useEventListener } from '../hooks/useEventListener';
import { useEffect, useMemo, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

export const BasePage = ({ content }: { content: React.ReactNode }) => {
  const { isSidebarOpen, toggleSidebar } = useUIStore();
  const { projects } = useTodosStore();

  const { width } = useWindowSize();

  const navigate = useNavigate();

  useEventListener('resize', () => {
    if (width < 1024) {
      if (isSidebarOpen) toggleSidebar();
    }

    if (width >= 1024) {
      if (!isSidebarOpen) toggleSidebar();
    }
  });

  useEffect(() => {
    if (projects.length === 0) {
      navigate('/inbox');
    }
  }, [projects]);

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
