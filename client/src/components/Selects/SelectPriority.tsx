import { useAddTodoStore, useUIStore } from '../../zustand';
import { Backdrop } from '../Backdrop';
import { FlagSolidIcon } from '../Icons';

interface ISelectPriorityProps {
  className?: string;
  children: React.ReactNode;
  left: number;
  top: number;
}

interface ISelectPriorityOptionProps {
  priority: number;
  flagColor: string;
}

export const SelectPriorityOption = (
  props: ISelectPriorityOptionProps
): JSX.Element => {
  const { setPriority } = useAddTodoStore();
  const { setRenderedElements } = useUIStore();

  const onClickProject = () => {
    setPriority(props.priority);
    setRenderedElements('project', false);
  };

  return (
    <div className='hover:bg-gray-200 flex justify-between'>
      <span className='flex items-center justify-center p-2'>
        <FlagSolidIcon className={`fill-${props.flagColor}-600`} />
      </span>
      <span className='p-3 justify-self-start text-sm'>
        Priority {props.priority}
      </span>
    </div>
  );
};

export const SelectPriority = (props: ISelectPriorityProps) => {
  const { className } = props;
  const { setRenderedElements } = useUIStore();

  return (
    <>
      <Backdrop handleClose={() => setRenderedElements('priority', false)} />
      <div
        style={{ position: 'absolute', left: props.left, top: props.top }}
        className='-translate-x-1/2 translate-y-2 absolute shadow-3xl border-[1px] border-gray-200 overflow-hidden z-[100] rounded-sm w-fit h-fit bg-white'
      >
        <div className='dropdown-select overflow-y-scroll h-32 w-full'>
          {props.children}
        </div>
      </div>
    </>
  );
};
