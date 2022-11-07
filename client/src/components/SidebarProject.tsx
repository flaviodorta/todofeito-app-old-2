import { sidebarProjectWrapper } from '../helpers/variants';
import { AnimatePresence, motion } from 'framer-motion';
import { CircleSolidIcon, MoreThreeDotsIcon, TrashSolidIcon } from './Icons';
import { EditDropdown } from './Dropdowns/EditDropdown';
import { useTodosStore } from '../zustand';
import { useRef, useState } from 'react';
import { IProject } from '../helpers/types';
import { useToggle } from '../hooks/useToggle';
import { EditProjectModal } from './EditProjectModal';
import { PenSolidIcon } from './Icons/Icons/PenSolidIcon';
import { useDimensions } from '../hooks/useDimensions';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

export const SidebarProject = ({
  project,
  isSidebarProjectsOpen,
  projects,
  i,
  length,
  onClick,
}: {
  project: IProject;
  projects: IProject[];
  isSidebarProjectsOpen: boolean;
  i: number;
  length: number;
  onClick?: () => void;
}) => {
  const navigate = useNavigate();
  const { deleteProject, setTodos, todos } = useTodosStore();
  const [isOptionsDropdownOpen, setIsOptionsDropdownOpen] = useState<
    string | null
  >(null);

  const [editingProject, setEditingProject] = useState<IProject>({
    id: '',
    type: 'project',
    title: '',
    color: {
      name: '',
      class: '',
    },
  });

  const [isEditProjectModalOpen, toggleEditProjectModalOpen] = useToggle(false);

  const [isOptionsDropdownHover, toggleIsOptionsDropdownHover] =
    useToggle(false);

  const ref = useRef<HTMLDivElement>(null);

  const sidebarProjectRef = useRef<HTMLDivElement>(null!);

  const [optionsIconSizes, optionsIconRef, calcSizes] = useDimensions({
    parentRef: ref.current,
  });

  const onDeleteProject = () => {
    const findIndex = projects.findIndex((p) => p.id === project.id);
    const index =
      findIndex === -1
        ? projects.length - 1 >= 0
          ? projects.length
          : -1
        : findIndex;
    const projectId = projects[index - 1].id;
    setTodos(todos.filter((todo) => todo.project.id !== project.id));
    deleteProject(project);
    if (index === -1) navigate('/inbox');
    navigate(`/inbox/${projectId}`);
  };

  const [open, toggle] = useToggle(false);

  return (
    <>
      <AnimatePresence>
        {isEditProjectModalOpen && (
          <EditProjectModal
            project={editingProject}
            closeEditProjectModalOpen={toggleEditProjectModalOpen}
          />
        )}
      </AnimatePresence>

      {/* fix hover working before animation finish */}
      <motion.div
        initial={false}
        animate={
          isSidebarProjectsOpen
            ? { display: 'block', transition: { delay: i * 0.2 } }
            : { display: 'none', transition: { delay: (length - i) * 0.2 } }
        }
        onMouseEnter={toggle}
        onMouseLeave={toggle}
        className={`${
          isSidebarProjectsOpen ? 'hover:bg-gray-200' : ''
        } group relative cursor-pointer`}
      >
        <div
          className={`${
            isSidebarProjectsOpen ? '' : 'hidden'
          } absolute top-1/2 -translate-y-1/2 right-1 z-[2] ml-auto`}
        >
          <span
            ref={optionsIconRef}
            className='h-full w-5'
            onMouseEnter={toggleIsOptionsDropdownHover}
            onMouseLeave={toggleIsOptionsDropdownHover}
          >
            <MoreThreeDotsIcon
              onClick={() => {
                setIsOptionsDropdownOpen(project.id);
                calcSizes();
              }}
              className={`${
                isOptionsDropdownOpen === project.id
                  ? 'fill-gray-600 opacity-100'
                  : 'opacity-0 group-hover:opacity-100 hover:fill-gray-600'
              } relative duration-100 transition-all fill-gray-400 ml-auto z-[2]`}
            />
          </span>

          {isOptionsDropdownOpen === project.id && (
            <EditDropdown
              sizes={optionsIconSizes}
              close={() => setIsOptionsDropdownOpen(null)}
            >
              <span
                onClick={() => {
                  setEditingProject(project);
                  setIsOptionsDropdownOpen(null);
                  toggleEditProjectModalOpen();
                }}
                className='w-full flex items-center gap-2 px-2 py-1 hover:bg-gray-300/30'
              >
                <PenSolidIcon className='fill-gray-400/70' />
                <span>Edit project</span>
              </span>
              <span
                onClick={() => onDeleteProject()}
                className='w-full flex items-center gap-2 px-2 py-1 hover:bg-gray-300/30'
              >
                <TrashSolidIcon className='fill-gray-400/70' />
                <span>Delete section</span>
              </span>
            </EditDropdown>
          )}
        </div>

        <Link to={`/projects/${project.id}`}>
          <motion.div
            key={project.id}
            ref={ref}
            onAnimationComplete={calcSizes}
            className='relative group h-fit rounded-md p-1.5 w-full'
          >
            <motion.div
              variants={sidebarProjectWrapper}
              ref={sidebarProjectRef}
              onClick={(e) =>
                e.target === sidebarProjectRef.current ? undefined : undefined
              }
              className='flex items-center gap-4'
            >
              <CircleSolidIcon
                className={`w-2.5 h-2.5 rounded-full ${project.color.class}`}
              />

              <span className='text-sm'>{project.title}</span>
            </motion.div>
          </motion.div>
        </Link>
      </motion.div>
    </>
  );
};
