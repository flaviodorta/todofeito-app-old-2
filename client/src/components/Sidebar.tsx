import { Resizable } from 'react-resizable';
import { useUIStore, useUserStore } from '../zustand';
import { motion } from 'framer-motion';
import {
  CalendarDaysSolidIcon,
  CalendarRegularIcon,
  ChevronIcon,
  InboxSolidIcon,
  LabelIcon,
  PlusSolidIcon,
} from './Icons';
import { useLocation, useNavigate } from 'react-router-dom';
import { project, projectsWrapper } from '../helpers/variants';
import { MoreThreeDotsIcon } from './Icons/Icons/MoreThreeDotsIcon';
import { isMobile } from 'react-device-detect';
import { Backdrop } from './Backdrop';
import { compareDesc, isToday } from 'date-fns';
import { useOnClickOutside } from '../hooks/useOnClickOutside';
import { useRef } from 'react';
import useWindowSize from '../hooks/useWindowSize';

interface ISidebarProps {
  toggleCreateProjectModalOpen: () => void;
}

export const Sidebar = (props: ISidebarProps) => {
  const {
    isSidebarOpen,
    isSidebarProjectsOpen,
    toggleSidebarProjects,
    toggleSidebar,
  } = useUIStore();
  const { toggleCreateProjectModalOpen } = props;
  const { todos, projects } = useUserStore();
  const { width } = useWindowSize();
  const location = useLocation();
  const navigate = useNavigate();

  const goToPage = (path: string) => {
    if (isMobile || width < 768) toggleSidebar();
    navigate(path);
  };

  // const projects = Object.entries(todos);

  const inboxLength = todos.filter(
    (todo) => todo.project.name.toLowerCase() === 'inbox' && !todo.isCompleted
  ).length;
  const todayLength = todos.filter(
    (todo) => isToday(todo.date as Date) && !todo.isCompleted
  ).length;
  const upcomingLength = todos.filter(
    (todo) =>
      compareDesc(todo.date as Date, new Date()) === -1 && !todo.isCompleted
  ).length;
  const labelsLength = todos.filter(
    (todo) => todo.labels.length > 0 && !todo.isCompleted
  ).length;

  const sidebarRef = useRef<HTMLDivElement>(null);

  useOnClickOutside(sidebarRef, () => {
    if (isSidebarOpen && width < 768) toggleSidebar();
  });

  return (
    // <Resizable height={100} width={326}>
    <>
      {isSidebarOpen && (
        <Backdrop
          close={toggleSidebar}
          className={`${
            isMobile ? 'z-40' : 'z-10 bg-black/50 md:hidden'
          } duration-150 `}
        />
      )}

      <motion.div
        ref={sidebarRef}
        animate={isSidebarOpen ? { translateX: 0 } : { translateX: '-100%' }}
        transition={{
          bounce: 0,
          duration: 0.35,
          ease: 'easeInOut',
        }}
        className={`z-50 fixed top-12 pt-6 pl-12 pr-1 w-[306px] h-screen bg-gray-100`}
      >
        <div className='w-full flex flex-col mb-6'>
          <div
            onClick={() => goToPage('/inbox')}
            className={`${
              location.pathname === '/inbox' ? 'bg-gray-200' : ''
            } w-full cursor-pointer hover:bg-gray-200 p-2 flex gap-3 items-center rounded-sm`}
          >
            <InboxSolidIcon className='fill-blue-600' />
            <span className='text-gray-800 text-sm'>Inbox</span>
            <span className='ml-auto text-gray-600 text-sm'>{inboxLength}</span>
          </div>

          <div
            onClick={() => goToPage('/today')}
            className={`${
              location.pathname === '/today' ? 'bg-gray-200' : ''
            } w-full cursor-pointer hover:bg-gray-200 p-2 flex gap-3 items-center rounded-sm`}
          >
            <CalendarRegularIcon className='fill-emerald-500' />
            <span className='text-gray-800 text-sm '>Today</span>
            <span className='ml-auto text-gray-600 text-sm'>{todayLength}</span>
          </div>

          <div
            onClick={() => goToPage('/upcoming')}
            className={`${
              location.pathname === '/upcoming' ? 'bg-gray-200' : ''
            } w-full cursor-pointer hover:bg-gray-200 p-2 flex gap-3 items-center rounded-sm`}
          >
            <CalendarDaysSolidIcon className='fill-orange-600' />
            <span className='text-gray-800 text-sm '>Upcoming</span>
            <span className='ml-auto text-gray-600 text-sm'>
              {upcomingLength}
            </span>
          </div>

          <div
            onClick={() => goToPage('/labels')}
            className={`${
              location.pathname === '/labels' ? 'bg-gray-200' : ''
            } w-full cursor-pointer hover:bg-gray-200 p-2 flex gap-3 items-center rounded-sm`}
          >
            <LabelIcon className='fill-violet-700' />
            <span className='text-gray-800 text-sm '>Labels</span>
            <span className='ml-auto text-gray-600 text-sm'>
              {labelsLength}
            </span>
          </div>
        </div>

        <div>
          <div className='w-full flex items-center gap-1 p-2'>
            <span className='font-medium text-gray-500 text-md'>Projects</span>
            <span
              onClick={toggleCreateProjectModalOpen}
              className='group cursor-pointer w-6 h-6 ml-auto rounded-sm hover:bg-gray-200 flex items-center justify-center'
            >
              <PlusSolidIcon className='fill-gray-500 group-hover:fill-gray-600' />
              {/* create project modal */}
            </span>

            <span
              onClick={toggleSidebarProjects}
              className='group cursor-pointer w-6 h-6 rounded-sm hover:bg-gray-200 flex items-center justify-center'
            >
              <ChevronIcon
                className={`${
                  isSidebarProjectsOpen ? '' : 'rotate-90'
                } w-[20px] h-[20px] stroke-gray-500 group-hover:stroke-gray-600 duration-150 transition-all`}
              />
            </span>
          </div>

          <motion.div
            initial={false}
            animate={isSidebarProjectsOpen ? 'animate' : 'initial'}
            variants={projectsWrapper}
            className='w-full flex flex-col py-2 pl-4'
          >
            {projects.slice(1).map((p) => (
              <motion.div
                onClick={() => navigate(`/${p.name}`)}
                className='hover:bg-gray-200 group h-fit rounded-md p-1.5 w-full overflow-hidden'
              >
                <motion.div
                  variants={project}
                  className='flex cursor-pointer items-center gap-4'
                >
                  <span
                    className={`w-2.5 h-2.5 rounded-full ${p.color.class}`}
                  />
                  <span className='text-sm'>{p.name}</span>
                  <MoreThreeDotsIcon className='group-hover:opacity-100 hover:fill-gray-600 opacity-0 duration-100 transition-all fill-gray-400 ml-auto' />
                  {/* edit project dropdown */}
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.div>
    </>
    // </Resizable>
  );
};
