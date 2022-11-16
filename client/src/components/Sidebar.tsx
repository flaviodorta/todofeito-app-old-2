import { useTodosStore, useUIStore } from '../zustand';
import { AnimatePresence, motion } from 'framer-motion';
import {
  CalendarDaysSolidIcon,
  CalendarRegularIcon,
  ChevronIcon,
  InboxSolidIcon,
  LabelIcon,
  PlusSolidIcon,
} from './Icons';
import { useLocation, useNavigate } from 'react-router-dom';
import { sidebarProjectsWrapper } from '../helpers/variants';
import { isMobile } from 'react-device-detect';
import { Backdrop } from './Backdrop';
import { isToday } from 'date-fns';
import useWindowSize from '../hooks/useWindowSize';
import { useToggle } from '../hooks/useToggle';
import { CreateProjectModal } from './CreateProjectModal';
import { SidebarProject } from './SidebarProject';
import { useTranslation } from 'react-i18next';

export const Sidebar = () => {
  const {
    isSidebarOpen,
    toggleSidebar,
    isSidebarProjectsOpen,
    toggleSidebarProjects,
  } = useUIStore();

  const { todos, projects } = useTodosStore();
  const location = useLocation();
  const navigate = useNavigate();

  const { width } = useWindowSize();
  const goToPage = (path: string) => {
    if (isMobile || width < 768) toggleSidebar();
    navigate(path);
  };

  const inboxLength = todos.filter(
    (todo) => todo.project.id === 'inbox' && !todo.isCompleted
  ).length;

  const todayLength = todos.filter(
    (todo) => isToday(todo.date) && !todo.isCompleted
  ).length;

  const upcomingLength = todos.filter((todo) => !todo.isCompleted).length;

  const labelsLength = todos.filter((todo) => todo.labels.length > 0).length;

  // const [isSidebarProjectsOpen, toggleSidebarProjects] = useToggle(false);

  const [isCreateProjectModalOpen, toggleCreateProjectModalOpen] =
    useToggle(false);

  const isScreenMinorThanMedium = width < 768;

  const { t } = useTranslation();

  return (
    <>
      {isSidebarOpen && (isMobile || isScreenMinorThanMedium) && (
        <Backdrop
          elementId='layout'
          isShow={isSidebarOpen && (isMobile || isScreenMinorThanMedium)}
          close={toggleSidebar}
          className='md:hidden z-[20]'
        />
      )}

      <AnimatePresence>
        {isCreateProjectModalOpen && (
          <CreateProjectModal closeModal={toggleCreateProjectModalOpen} />
        )}
      </AnimatePresence>

      <motion.div
        initial={false}
        animate={isSidebarOpen ? { translateX: 0 } : { translateX: '-100%' }}
        transition={{
          bounce: 0,
          duration: 0.35,
          ease: 'easeInOut',
        }}
        className={`z-[40] fixed top-12 pt-6 pl-12 pr-1 w-[306px] h-screen bg-gray-100`}
      >
        <div className='w-full flex flex-col mb-6'>
          <div
            onClick={() => goToPage('/inbox')}
            className={`${
              location.pathname === '/inbox' ? 'bg-gray-200' : ''
            } w-full cursor-pointer hover:bg-gray-200 p-2 flex gap-3 items-center rounded-sm`}
          >
            <InboxSolidIcon className='fill-blue-600' />
            <span className='text-gray-800 text-sm'>{t('Sidebar.inbox')}</span>
            <span className='ml-auto text-gray-600 text-sm'>{inboxLength}</span>
          </div>

          <div
            onClick={() => goToPage('/today')}
            className={`${
              location.pathname === '/today' ? 'bg-gray-200' : ''
            } w-full cursor-pointer hover:bg-gray-200 p-2 flex gap-3 items-center rounded-sm`}
          >
            <CalendarRegularIcon className='fill-emerald-500' />
            <span className='text-gray-800 text-sm '>{t('Sidebar.today')}</span>
            <span className='ml-auto text-gray-600 text-sm'>{todayLength}</span>
          </div>

          <div
            onClick={() => goToPage('/upcoming')}
            className={`${
              location.pathname === '/upcoming' ? 'bg-gray-200' : ''
            } w-full cursor-pointer hover:bg-gray-200 p-2 flex gap-3 items-center rounded-sm`}
          >
            <CalendarDaysSolidIcon className='fill-orange-600' />
            <span className='text-gray-800 text-sm '>
              {t('Sidebar.upcoming')}
            </span>
            <span className='ml-auto text-gray-600 text-sm'>
              {upcomingLength}
            </span>
          </div>

          <div
            onClick={() => goToPage('/filters-labels')}
            className={`${
              location.pathname === '/filters-labels' ? 'bg-gray-200' : ''
            } w-full cursor-pointer hover:bg-gray-200 p-2 flex gap-3 items-center rounded-sm`}
          >
            <LabelIcon className='fill-violet-700' />
            <span className='text-gray-800 text-sm '>
              {t('Sidebar.labels')}
            </span>
            <span className='ml-auto text-gray-600 text-sm'>
              {labelsLength}
            </span>
          </div>
        </div>

        {/* projects */}
        <div>
          <div className='w-full flex items-center gap-1 p-2'>
            <span className='font-medium text-gray-500 text-md'>
              {t('Sidebar.projects')}
            </span>
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
            variants={sidebarProjectsWrapper}
            className='w-full flex flex-col py-2 pl-4'
          >
            {projects.slice(1).map((project, i, arr) => (
              <SidebarProject
                key={project.id}
                project={project}
                projects={projects}
                i={i}
                length={arr.length}
                isSidebarProjectsOpen={isSidebarProjectsOpen}
                // onClick={() =>
                //   navigate(`/projects/${project.id}`, { replace: true })
                // }
              />
            ))}
          </motion.div>
        </div>
      </motion.div>
    </>
  );
};
