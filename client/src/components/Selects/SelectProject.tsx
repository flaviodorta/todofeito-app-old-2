import { Fragment } from 'react';
import { IProject } from '../../helpers/types';
import { useTodosStore } from '../../zustand';
import { Backdrop } from '../Backdrop';

interface ISelectProjectOptionProps {
  thisProject: IProject;
  inputedProject: IProject;
  setProject: (project: IProject) => void;
  closeSelect: () => void;
}

export const SelectProjectOption = (
  props: ISelectProjectOptionProps
): JSX.Element => {
  const { thisProject, inputedProject, setProject, closeSelect } = props;

  return (
    <div
      onClick={() => {
        setProject(thisProject);
        closeSelect();
      }}
      className='hover:bg-gray-200 flex justify-start'
    >
      <span className='flex items-center justify-center px-2'>
        <span className='w-2 h-2 bg-gray-400 rounded-full' />
      </span>
      <span className='flex cursor-pointer w-full capitalize whitespace-nowrap justify-between items-center pl-1 pr-2 py-1.5 justify-self-start text-sm'>
        <span className='mr-2'>{thisProject.name}</span>

        <span
          className={`${
            inputedProject.id === thisProject.id ? 'opacity-100' : 'opacity-0'
          } -translate-y-[1px] mx-1 h-2 w-3 scale-75 -rotate-45 border-l-[2px] border-b-[2px] border-gray-700 duration-100 transition-opacity`}
        />
      </span>
    </div>
  );
};

interface ISelectProjectProps {
  inputedProject: IProject;
  setProject: (project: IProject) => void;
  closeSelect: () => void;
}

export const SelectProject = (props: ISelectProjectProps) => {
  const { inputedProject, setProject, closeSelect } = props;
  const { getProjects } = useTodosStore();

  return (
    <>
      <Backdrop close={closeSelect} className='z-[2000]' />
      <div className='top-9 -translate-x-1/4 absolute shadow-3xl border-[1px] border-gray-200 overflow-hidden z-[2001] rounded-sm w-fit h-fit bg-white'>
        <div className='h-fit'>
          <input
            placeholder='Type a project'
            type='text'
            className='w-full border-b-[1px] py-2 px-2 outline-none text-[13px] placeholder:text-gray-400'
          />
        </div>
        <div className='dropdown-select overflow-y-scroll h-fit w-full'>
          {getProjects().map((project, i) => (
            <Fragment key={i}>
              <SelectProjectOption
                thisProject={project}
                inputedProject={inputedProject}
                setProject={setProject}
                closeSelect={closeSelect}
              />
            </Fragment>
          ))}
        </div>
      </div>
    </>
  );
};
