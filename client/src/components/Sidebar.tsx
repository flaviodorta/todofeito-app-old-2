import { useTodosStore, useUIStore } from '../zustand';
import { AnimatePresence, motion } from 'framer-motion';
import {
  CalendarDaysSolidIcon,
  CalendarRegularIcon,
  ChevronIcon,
  InboxSolidIcon,
  LabelIcon,
  PlusSolidIcon,
  TrashSolidIcon,
} from './Icons';
import { useLocation, useNavigate } from 'react-router-dom';
import { project, projectsWrapper } from '../helpers/variants';
import { MoreThreeDotsIcon } from './Icons/Icons/MoreThreeDotsIcon';
import { isMobile } from 'react-device-detect';
import { Backdrop } from './Backdrop';
import { compareDesc, isToday } from 'date-fns';
import { useRef, useState } from 'react';
import useWindowSize from '../hooks/useWindowSize';
import { IProject } from '../helpers/types';
import { EditDropdown } from './Dropdowns/EditDropdown';
import { PenSolidIcon } from './Icons/Icons/PenSolidIcon';
import { EditProjectModal } from './EditProjectModal';
import { useToggle } from '../hooks/useToggle';
import { CreateProjectModal } from './CreateProjectModal';

interface ISidebarProps {}

export const Sidebar = (props: ISidebarProps) => {
  const { isSidebarOpen, toggleSidebar } = useUIStore();

  const [isEditProjectModalOpen, toggleEditProjectModalOpen] = useToggle(false);

  const { deleteProject, getProjects, projects, dates, labels } =
    useTodosStore();
  const location = useLocation();
  const navigate = useNavigate();

  const { width } = useWindowSize();
  const goToPage = (path: string) => {
    if (isMobile || width < 768) toggleSidebar();
    navigate(path);
  };

  const inboxLength = projects
    .filter((project) => project.id === 'inbox')[0]
    .todos.filter((todo) => !todo.isCompleted).length;

  const todayLength = dates
    .filter((date) => isToday(date.date))[0]
    .todos.filter((todo) => !todo.isCompleted).length;

  const upcomingLength = dates
    .filter((date) => compareDesc(date.date, new Date()) === -1)[0]
    .todos.filter((todo) => !todo.isCompleted).length;

  const labelsLength = labels.reduce(
    (acc, label) =>
      acc + label.todos.filter((todo) => !todo.isCompleted).length,
    0
  );

  const sidebarRef = useRef<HTMLDivElement>(null);

  const [isSidebarProjectsOpen, toggleSidebarProjects] = useToggle(false);

  const [editingProject, setEditingProject] = useState<IProject>({
    id: '',
    name: '',
    color: {
      name: '',
      class: '',
    },
  });

  const [optionsOpenByProjectId, setOptionsOpenByProjectId] = useState<
    string | null
  >(null);

  const [isCreateProjectModalOpen, toggleCreateProjectModalOpen] =
    useToggle(false);

  return (
    <>
      {isSidebarOpen && (
        <Backdrop
          close={toggleSidebar}
          className={`${
            isMobile ? 'z-40' : 'z-10 bg-black/50 md:hidden'
          } duration-150 `}
        />
      )}

      <AnimatePresence>
        {isCreateProjectModalOpen && (
          <CreateProjectModal
            closeCreateProjectModalOpen={toggleCreateProjectModalOpen}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isEditProjectModalOpen && (
          <EditProjectModal
            project={editingProject}
            closeEditProjectModalOpen={toggleEditProjectModalOpen}
          />
        )}
      </AnimatePresence>

      <motion.div
        ref={sidebarRef}
        initial={false}
        animate={isSidebarOpen ? { translateX: 0 } : { translateX: '-100%' }}
        transition={{
          bounce: 0,
          duration: 0.35,
          ease: 'easeInOut',
        }}
        className={`z-[50] fixed top-12 pt-6 pl-12 pr-1 w-[306px] h-screen bg-gray-100`}
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

        {/* projects */}
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
            {getProjects()
              .slice(1)
              .map((p) => (
                <motion.div
                  onClick={() => navigate(`/${p.name}`)}
                  className={`${
                    isSidebarProjectsOpen ? 'hover:bg-gray-200' : ''
                  } relative  group h-fit rounded-md p-1.5 w-full`}
                >
                  <motion.div
                    variants={project}
                    className='flex cursor-pointer items-center gap-4'
                  >
                    <span
                      className={`w-2.5 h-2.5 rounded-full ${p.color.class}`}
                    />
                    <span className='text-sm'>{p.name}</span>

                    <div className='relative ml-auto'>
                      <MoreThreeDotsIcon
                        onClick={() => setOptionsOpenByProjectId(p.id)}
                        className='relative group-hover:opacity-100 hover:fill-gray-600 opacity-0 duration-100 transition-all fill-gray-400 ml-auto'
                      />
                      {optionsOpenByProjectId === p.id && (
                        <EditDropdown
                          close={() => setOptionsOpenByProjectId(null)}
                        >
                          <span
                            onClick={() => {
                              setEditingProject(p);
                              setOptionsOpenByProjectId(null);
                              toggleEditProjectModalOpen();
                            }}
                            className='w-full flex items-center gap-2 px-2 py-1 hover:bg-gray-300/30'
                          >
                            <PenSolidIcon className='fill-gray-400/70' />
                            <span>Edit project</span>
                          </span>
                          <span
                            onClick={() => deleteProject(p.id)}
                            className='w-full flex items-center gap-2 px-2 py-1 hover:bg-gray-300/30'
                          >
                            <TrashSolidIcon className='fill-gray-400/70' />
                            <span>Delete section</span>
                          </span>
                        </EditDropdown>
                      )}
                    </div>
                  </motion.div>
                </motion.div>
              ))}
          </motion.div>
        </div>
      </motion.div>
    </>
  );
};
