import { sidebarProjectWrapper } from '../helpers/variants';
import { AnimatePresence, motion } from 'framer-motion';
import { CircleSolidIcon, MoreThreeDotsIcon, TrashSolidIcon } from './Icons';
import { EditDropdown } from './Dropdowns/EditDropdown';
import { useTodosStore, useUIStore } from '../zustand';
import { useEffect, useRef, useState } from 'react';
import { IProject } from '../helpers/types';
import { useToggle } from '../hooks/useToggle';
import { EditProjectModal } from './EditProjectModal';
import { PenSolidIcon } from './Icons/Icons/PenSolidIcon';
import { useDimensions } from '../hooks/useDimensions';

export const SidebarProject = ({
  project,
  onClick,
  isSidebarProjectsOpen,
}: {
  project: IProject;
  onClick: () => void;
  isSidebarProjectsOpen: boolean;
}) => {
  const { withBackdropOpenById, setWithBackdropOpenById } = useUIStore();
  const { deleteProject } = useTodosStore();

  const [editingProject, setEditingProject] = useState<IProject>({
    id: '',
    name: '',
    color: {
      name: '',
      class: '',
    },
  });

  const [isEditProjectModalOpen, toggleEditProjectModalOpen] = useToggle(false);

  const [isOptionsDropdownHover, toggleIsOptionsDropdownHover] =
    useToggle(false);

  const [optionsIconSizes, optionsIconRef, shouldMeasure] = useDimensions();

  console.log(project.color);

  const ref = useRef<HTMLDivElement>(null);

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

      <motion.div
        ref={ref}
        key={project.id}
        onClick={(e) =>
          e.target === ref.current && !isOptionsDropdownHover
            ? onClick()
            : undefined
        }
        onAnimationComplete={shouldMeasure}
        className={`${
          isSidebarProjectsOpen ? 'hover:bg-gray-200' : ''
        } relative group h-fit rounded-md p-1.5 w-full`}
      >
        <motion.div
          variants={sidebarProjectWrapper}
          className='flex cursor-pointer items-center gap-4'
        >
          <CircleSolidIcon
            className={`w-2.5 h-2.5 rounded-full ${project.color.class}`}
          />

          <span className='text-sm'>{project.name}</span>

          <div className='relative ml-auto'>
            <span
              ref={optionsIconRef}
              className='h-full w-5 group hover:bg-red-600/30'
              onMouseEnter={toggleIsOptionsDropdownHover}
              onMouseLeave={toggleIsOptionsDropdownHover}
            >
              <MoreThreeDotsIcon
                onClick={() => setWithBackdropOpenById(project.id)}
                className={`${
                  withBackdropOpenById === project.id
                    ? 'fill-gray-600 opacity-100'
                    : 'opacity-0 group-hover:opacity-100 hover:fill-gray-600'
                } relative duration-100 transition-all fill-gray-400 ml-auto z-[2]`}
              />
            </span>

            {withBackdropOpenById === project.id && (
              <EditDropdown
                sizes={optionsIconSizes}
                close={() => setWithBackdropOpenById(null)}
              >
                <span
                  onClick={() => {
                    setEditingProject(project);
                    setWithBackdropOpenById(null);
                    toggleEditProjectModalOpen();
                  }}
                  className='w-full flex items-center gap-2 px-2 py-1 hover:bg-gray-300/30'
                >
                  <PenSolidIcon className='fill-gray-400/70' />
                  <span>Edit project</span>
                </span>
                <span
                  onClick={() => deleteProject(project.id)}
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
    </>
  );
};
