import { Backdrop } from './Backdrop';
import { SelectColor } from './Selects/SelectColors';
import { useTodosStore } from '../zustand';
import { useToggle } from '../hooks/useToggle';
import { useEffect, useRef, useState } from 'react';
import { useOnClickOutside } from '../hooks/useOnClickOutside';
import { onKeyUpEnter } from '../helpers/functions';
import { IProject } from '../helpers/types';
import { motion } from 'framer-motion';
import { useDimensions } from '../hooks/useDimensions';

interface IEditProjectModalProps {
  project: IProject;
  closeEditProjectModalOpen: () => void;
}

export const EditProjectModal = ({
  closeEditProjectModalOpen,
  project,
}: IEditProjectModalProps) => {
  const { editProject } = useTodosStore();

  const [inputs, setInputs] = useState({
    name: '',
    color: {
      name: 'Stone',
      class: 'fill-stone-600',
    },
    selectIconColor: 'bg-stone-600',
  });

  const setColor = (
    color: { name: string; class: string },
    selectIconColor: string
  ) => setInputs((state) => ({ ...state, color, selectIconColor }));

  const setName = (name: string) => setInputs((state) => ({ ...state, name }));

  const sendEditedProject = () => {
    if (!project.name) return;

    const editedProject: IProject = {
      id: project.id,
      name: inputs.name,
      color: inputs.color,
    };

    editProject(editedProject);

    closeEditProjectModalOpen();
  };

  const projectNameInputRef = useRef<HTMLInputElement>(null);

  const editProjectOnKeyEnterInputProjectName = onKeyUpEnter(
    sendEditedProject,
    projectNameInputRef
  );

  useEffect(() => {
    projectNameInputRef?.current?.focus();
  }, []);

  return (
    <Backdrop close={closeEditProjectModalOpen} className='bg-black/50 z-90'>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.15 }}
        className='fixed left-1/2 top-40 w-[90%] sm:w-96 h-fit -translate-x-1/2 z-[1000] bg-white rounded-lg'
      >
        <div className='py-3 px-6 text-center'>
          <span className='text-lg font-medium'>Add project</span>
        </div>

        <hr className='border-gray-300' />

        <div className='py-5 px-6'>
          <form className='w-full flex flex-col gap-1 mb-4'>
            <div className='flex justify-between'>
              <label htmlFor='project-name' className='text-sm font-medium'>
                Name
              </label>
              {project.name.length >= 100 && (
                <span className='text-xs text-red-600 font-light'>
                  Character limit: {project.name.length}/120
                </span>
              )}
            </div>
            <input
              ref={projectNameInputRef}
              id='project-name'
              type='text'
              value={project.name}
              maxLength={120}
              onChange={(e) => setName(e.target.value)}
              onKeyUp={editProjectOnKeyEnterInputProjectName}
              className='outline-none text-sm h-7 rounded-[3px] py-1 px-2 border-gray-300 focus:border-gray-400 border-[1px] duration-150 transition-all'
            />
          </form>

          <form className='relative w-full flex flex-col gap-1 mb-8'>
            <label htmlFor='project-color' className='text-sm font-medium'>
              Color
            </label>

            <SelectColor
              inputedColor={inputs.color}
              selectIconColor={inputs.selectIconColor}
              setColor={setColor}
              cssProperty='fill'
            />
          </form>

          <div className='flex justify-end gap-2'>
            <button
              onClick={closeEditProjectModalOpen}
              className='text-center select-none p-2 outline-none rounded-sm font-medium text-sm h-fit w-fit bg-gray-200 hover:bg-gray-300 hover:text-700 text-gray-600'
            >
              Cancel
            </button>

            <button
              onClick={sendEditedProject}
              onSubmit={(e) => {
                // e.preventDefault();
                sendEditedProject();
              }}
              className={`${
                !project.name
                  ? 'cursor-not-allowed bg-blue-400'
                  : 'bg-blue-600 hover:bg-blue-700'
              } text-center select-none py-2 px-4 outline-none rounded-sm font-medium text-sm h-fit w-fit text-white hover:text-gray-200`}
            >
              Add
            </button>
          </div>
        </div>
      </motion.div>
    </Backdrop>
  );
};
