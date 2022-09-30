import { useToggle } from '../../hooks/useToggle';
import { useAddTodoStore, useUIStore } from '../../zustand';
import { Backdrop } from '../Backdrop';
import { LabelIcon } from '../Icons';

interface ISelectLabelProps {
  className?: string;
  children: React.ReactNode;
  left: number;
  top: number;
}

interface ISelectLabelOptionProps {
  label: string;
}

export const SelectLabelOption = (
  props: ISelectLabelOptionProps
): JSX.Element => {
  const { addLabel, removeLabel, labels } = useAddTodoStore();
  const isChecked = labels.includes(props.label);
  const [checked, toggleChecked] = useToggle(isChecked);

  const onClickLabel = () => {
    if (!isChecked) addLabel(props.label);
    else removeLabel(props.label);
    toggleChecked();
  };

  return (
    <div
      onClick={onClickLabel}
      className='cursor-pointer w-full hover:bg-gray-100 py-1.5 outline-none flex items-center justify-start'
    >
      <span className='px-4'>
        <LabelIcon width='16px' height='16px' className='fill-gray-500' />
      </span>
      <span className='py-1 text-sm  whitespace-nowrap text-clip'>
        {props.label}
      </span>
      <div className='ml-auto px-4 py-1 flex items-center justify-center'>
        <input
          checked={checked}
          type='checkbox'
          className='ring-0 w-4 rounded-none h-4 outline-none bg-gray-400'
        />
      </div>
    </div>
  );
};

export const SelectLabel = (props: ISelectLabelProps) => {
  const { className } = props;
  const { setRenderedElements } = useUIStore();

  return (
    <>
      <Backdrop handleClose={() => setRenderedElements('label', false)} />
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
