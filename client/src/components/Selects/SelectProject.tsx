import { Fragment } from 'react';
import { Backdrop } from '../Backdrop';

interface ISelectProjectOptionProps {
  project: string;
  selectedProject: string;
  setSelectedProject: (project: string) => void;
  handleCloseSelect: () => void;
}

export const SelectProjectOption = (
  props: ISelectProjectOptionProps
): JSX.Element => {
  const { project, selectedProject, setSelectedProject, handleCloseSelect } =
    props;

  const onClickProject = () => {
    setSelectedProject(project);
    handleCloseSelect();
  };

  return (
    <div
      onClick={onClickProject}
      className='hover:bg-gray-200 flex justify-start'
    >
      <span className='flex items-center justify-center px-2'>
        <span className='w-2 h-2 bg-gray-400 rounded-full' />
      </span>
      <span className='flex w-full whitespace-nowrap justify-between items-center pl-1 pr-2 py-1.5 justify-self-start text-sm'>
        <span className='mr-2'>{project}</span>

        <span
          className={`${
            selectedProject === project ? 'opacity-100' : 'opacity-0'
          } -translate-y-[1px] mx-1 h-2 w-3 scale-75 -rotate-45 border-l-[2px] border-b-[2px] border-gray-700 duration-100 transition-opacity`}
        />
      </span>
    </div>
  );
};

interface ISelectProjectProps {
  className?: string;
  left: number;
  top: number;
  projects: string[];
  selectedProject: string;
  handleCloseSelect: () => void;
  setSelectedProject: (project: string) => void;
}

export const SelectProject = (props: ISelectProjectProps) => {
  const {
    className,
    left,
    top,
    projects,
    selectedProject,
    handleCloseSelect,
    setSelectedProject,
  } = props;

  return (
    <>
      <Backdrop handleClose={handleCloseSelect} className='z-80' />
      <div
        style={{ position: 'absolute', left: left, top: top }}
        className={`${className} -translate-x-1/2 translate-y-2 absolute shadow-3xl border-[1px] border-gray-200 overflow-hidden z-90 rounded-sm w-fit h-fit bg-white`}
      >
        <div className='h-fit'>
          <input
            placeholder='Type a project'
            type='text'
            className='w-full border-b-[1px] py-2 px-2 outline-none text-[13px] placeholder:text-gray-400'
          />
        </div>
        <div className='dropdown-select overflow-y-scroll h-32 w-full'>
          {projects.map((project, i) => (
            <Fragment key={i}>
              <SelectProjectOption
                project={project}
                selectedProject={selectedProject}
                setSelectedProject={setSelectedProject}
                handleCloseSelect={handleCloseSelect}
              />
            </Fragment>
          ))}
        </div>
      </div>
    </>
  );
};
