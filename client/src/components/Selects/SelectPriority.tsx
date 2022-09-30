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
  const { setPriority, priority } = useAddTodoStore();
  const { setRenderedElements } = useUIStore();

  const onClickPriority = () => {
    setPriority(props.priority);
    setRenderedElements('priority', false);
  };

  const colors = [
    'fill-red-600',
    'fill-orange-600',
    'fill-yellow-600',
    'fill-blue-600',
  ];

  return (
    <div
      onClick={onClickPriority}
      className='hover:bg-gray-200 flex items-center justify-between'
    >
      <span className='flex items-center justify-center px-4 py-2'>
        <FlagSolidIcon
          stroke={'black'}
          className={`${colors[props.priority - 1]} w-3 h-3`}
        />
      </span>
      <span className='text-sm pr-4 py-2'>Priority {props.priority}</span>

      <span
        className={`${
          priority === props.priority ? 'opacity-100' : 'opacity-0'
        } -translate-y-[1px] mx-1 mr-3 h-2 w-3 scale-75 -rotate-45 border-l-[2px] border-b-[2px] border-gray-700 duration-100 transition-opacity`}
      />
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
        <div className='dropdown-select overflow-y-scroll h-fit w-full'>
          {props.children}
        </div>
      </div>
    </>
  );
};
