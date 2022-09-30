import { useUIStore } from '../../zustand';
import { Backdrop } from '../Backdrop';
import { FlagSolidIcon } from '../Icons';

interface ISelectDropdownProps {
  className?: string;
  children: React.ReactNode;
  left: number;
  top: number;
}

interface ISelectPriorityOptionProps {
  text: string;
  flagColor: string;
}

export const SelectPriorityOption = (
  props: ISelectPriorityOptionProps
): JSX.Element => {
  return (
    <div className='hover:bg-gray-200 flex justify-between'>
      <span className='flex items-center justify-center p-2'>
        <FlagSolidIcon className={`fill-${props.flagColor}-600`} />
      </span>
      <span className='p-3 justify-self-start text-sm'>{props.text}</span>
    </div>
  );
};

export const SelectPriorityDropdown = (props: ISelectDropdownProps) => {
  const { className } = props;
  const { setRenderedElements: setSelect } = useUIStore();

  return (
    <>
      <Backdrop handleClose={() => setSelect('priority', false)} />
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
