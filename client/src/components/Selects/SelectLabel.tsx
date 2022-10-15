import { Fragment, useState } from 'react';
import { Backdrop } from '../Backdrop';
import { LabelIcon } from '../Icons';

interface ISelectLabelOptionProps {
  label: string;
  checkedLabels: string[];
  addCheckedLabel: (label: string) => void;
  removeCheckedLabel: (label: string) => void;
}

export const SelectLabelOption = (
  props: ISelectLabelOptionProps
): JSX.Element => {
  const { label, checkedLabels, addCheckedLabel, removeCheckedLabel } = props;

  const isChecked = checkedLabels.includes(label);

  const [checked, toggleChecked] = useState(isChecked);

  const onClickLabel = () => {
    if (!isChecked) addCheckedLabel(label);
    else removeCheckedLabel(label);
    toggleChecked((checked) => !checked);
  };

  return (
    <div
      onClick={onClickLabel}
      className='cursor-pointer w-full hover:bg-gray-100 outline-none flex items-center justify-start'
    >
      <span className='px-4'>
        <LabelIcon width='16px' height='16px' className='fill-gray-500' />
      </span>
      <span className='text-sm py-2 whitespace-nowrap text-clip'>{label}</span>
      <div className='ml-auto px-4 py-2 flex items-center justify-center'>
        <input
          checked={checked}
          onChange={(e) => toggleChecked(e.target.checked)}
          type='checkbox'
          className='ring-0 w-4 h-4 rounded-none outline-none bg-gray-400'
        />
      </div>
    </div>
  );
};

interface ISelectLabelProps {
  labels: string[];
  checkedLabels: string[];
  closeSelect: () => void;
  addLabel: (label: string) => void;
  removeLabel: (label: string) => void;
  addCheckedLabel: (label: string) => void;
  removeCheckedLabel: (label: string) => void;
}

export const SelectLabel = (props: ISelectLabelProps) => {
  const {
    labels,
    closeSelect,
    checkedLabels,
    addCheckedLabel,
    removeCheckedLabel,
  } = props;

  return (
    <>
      <Backdrop close={closeSelect} />
      <div className='top-9 absolute shadow-3xl border-[1px] border-gray-200 overflow-hidden z-60 rounded-sm -translate-x-24 w-[340px] sm:w-fit h-fit bg-white'>
        <div className='h-fit'>
          <input
            placeholder='Type a label'
            type='text'
            className='w-full border-b-[1px] py-2 px-2 outline-none text-[13px] placeholder:text-gray-400'
          />
        </div>
        <div className='dropdown-select overflow-y-scroll h-32 w-full'>
          {labels.map((label, i) => (
            <Fragment key={i}>
              <SelectLabelOption
                label={label}
                checkedLabels={checkedLabels}
                addCheckedLabel={addCheckedLabel}
                removeCheckedLabel={removeCheckedLabel}
              />
            </Fragment>
          ))}
        </div>
      </div>
    </>
  );
};
