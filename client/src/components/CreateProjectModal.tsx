import { Backdrop } from './Backdrop';
import { SelectColor } from './Selects/SelectColors';
import { useTodosStore } from '../zustand';
import { useEffect, useRef, useState } from 'react';
import { onKeyUpEnter } from '../helpers/functions';
import { IProject } from '../helpers/types';
import { nanoid } from 'nanoid';
import { motion } from 'framer-motion';

interface ICreateProjectModalProps {
  closeModal: () => void;
}

export const CreateProjectModal = ({
  closeModal,
}: ICreateProjectModalProps) => {
  const { addProject } = useTodosStore();

  const [inputs, setInputs] = useState({
    name: '',
    color: {
      name: 'Stone',
      class: 'fill-stone-600',
    },
  });

  const setColor = (color: { name: string; class: string }) =>
    setInputs((state) => ({ ...state, color }));

  const setName = (name: string) => setInputs((state) => ({ ...state, name }));

  const createNewProject = () => {
    if (!inputs.name) return;

    const project: IProject = {
      id: nanoid(),
      name: inputs.name,
      color: inputs.color,
    };

    addProject(project);

    closeModal();
  };

  const projectNameInputRef = useRef<HTMLInputElement>(null);
  const createNewProjectOnKeyEnterInputProjectName = onKeyUpEnter(
    createNewProject,
    projectNameInputRef
  );

  useEffect(() => {
    projectNameInputRef?.current?.focus();
  }, []);

  return (
    <Backdrop close={closeModal} className='bg-black/50 z-[1000]'>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.15 }}
        className='fixed left-1/2 top-40 w-[90%] sm:w-96 h-fit -translate-x-1/2 z-100 bg-white rounded-lg'
      >
        <div className='py-3 px-6 text-center'>
          <span className='text-lg font-medium'>Add project</span>
        </div>

        <hr className='border-gray-300' />

        <div className='py-5 px-6'>
          <div className='w-full flex flex-col gap-1 mb-4'>
            <div className='flex justify-between'>
              <label htmlFor='project-name' className='text-sm font-medium'>
                Name
              </label>
              {inputs.name.length >= 100 && (
                <span className='text-xs text-red-600 font-light'>
                  Character limit: {inputs.name.length}/120
                </span>
              )}
            </div>
            <input
              ref={projectNameInputRef}
              id='project-name'
              type='text'
              value={inputs.name}
              maxLength={120}
              onChange={(e) => setName(e.target.value)}
              onKeyUp={createNewProjectOnKeyEnterInputProjectName}
              className='outline-none text-sm h-7 rounded-[3px] py-1 px-2 border-gray-300 focus:border-gray-400 border-[1px] duration-150 transition-all'
            />
          </div>

          <div className='relative w-full flex flex-col gap-1 mb-8'>
            <label htmlFor='project-color' className='text-sm font-medium'>
              Color
            </label>

            <SelectColor inputedColor={inputs.color} setColor={setColor} />
          </div>

          <div className='flex justify-end gap-2'>
            <button
              onClick={closeModal}
              className='text-center select-none p-2 outline-none rounded-sm font-medium text-sm h-fit w-fit bg-gray-200 hover:bg-gray-300 hover:text-700 text-gray-600'
            >
              Cancel
            </button>

            <button
              onClick={createNewProject}
              className={`${
                !inputs.name
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
