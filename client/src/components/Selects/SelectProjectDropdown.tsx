import { useUIStore } from '../../zustand';
import { Backdrop } from '../Backdrop';
import { CircleIcon, InboxSolidIcon, LabelIcon } from '../Icons';

interface ISelectDropdownProps {
  className?: string;
  children: React.ReactNode;
  left: number;
  top: number;
}

interface ISelectProjectOptionProps {
  isInbox?: boolean;
  text: string;
}

export const SelectProjectOption = (
  props: ISelectProjectOptionProps
): JSX.Element => {
  return (
    <div className='hover:bg-gray-200 flex justify-start'>
      <span className='flex items-center justify-center p-2'>
        {props.isInbox ? <InboxSolidIcon /> : <CircleIcon />}
      </span>
      <span className='p-3 justify-self-start text-sm'>{props.text}</span>
    </div>
  );
};

export const SelectProjectDropdown = (props: ISelectDropdownProps) => {
  const { className } = props;
  const { setRenderedElements: setSelect } = useUIStore();

  return (
    <>
      <Backdrop handleClose={() => setSelect('project', false)} />
      <div
        style={{ position: 'absolute', left: props.left, top: props.top }}
        className='-translate-x-1/2 translate-y-2 absolute shadow-3xl border-[1px] border-gray-200 overflow-hidden z-[100] rounded-sm w-fit h-fit bg-white'
      >
        <div className='h-fit'>
          <input
            placeholder='Type a project'
            type='text'
            className='w-full border-b-[1px] py-2 px-2 outline-none text-[13px] placeholder:text-gray-400'
          />
        </div>
        <div className='dropdown-select overflow-y-scroll h-32 w-full'>
          {props.children}
        </div>
      </div>
    </>
  );
};
