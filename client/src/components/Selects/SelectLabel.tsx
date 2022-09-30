import { useUIStore } from '../../zustand';
import { Backdrop } from '../Backdrop';
import { LabelIcon } from '../Icons';

interface ISelectLabelProps {
  className?: string;
  children: React.ReactNode;
  left: number;
  top: number;
}

interface ISelectLabelOptionProps {
  content: string;
}

export const SelectLabelOption = (
  props: ISelectLabelOptionProps
): JSX.Element => {
  return (
    <div className='hover:bg-gray-100 py-1.5 outline-none flex items-center justify-between'>
      <span className='flex items-center justify-center px-4'>
        <LabelIcon width='16px' height='16px' className='fill-gray-500' />
      </span>
      <span className='py-1 justify-self-start text-[13px]'>
        {props.content}
      </span>
      <div className='px-4 py-1 flex items-center justify-center'>
        <input
          type='checkbox'
          className='ring-0 w-4 rounded-none h-4 outline-none bg-gray-400'
        />
      </div>
    </div>
  );
};

export const SelectLabel = (props: ISelectLabelProps) => {
  const { className } = props;
  const { setRenderedElements: setSelect } = useUIStore();

  return (
    <>
      <Backdrop handleClose={() => setSelect('label', false)} />
      <div
        style={{ position: 'absolute', left: props.left, top: props.top }}
        className='-translate-x-1/2 translate-y-2 absolute shadow-3xl border-[1px] border-gray-200 overflow-hidden z-[100] rounded-sm w-fit h-fit bg-white'
      >
        <div className='h-fit'>
          <input
            placeholder='Type a label'
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
