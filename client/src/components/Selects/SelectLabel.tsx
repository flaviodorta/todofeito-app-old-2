// OK!

import { Fragment, useState } from 'react';
import { useTodosStore } from '../../zustand';
import { ILabel } from '../../helpers/types';
import { Backdrop } from '../Backdrop';
import { LabelIcon } from '../Icons';

interface ISelectLabelOptionProps {
  thisLabel: ILabel;
  inputedLabels: ILabel[];
  addLabel: (label: ILabel) => void;
  deleteLabel: (label: ILabel) => void;
}

export const SelectLabelOption = (
  props: ISelectLabelOptionProps
): JSX.Element => {
  const { thisLabel, inputedLabels, addLabel, deleteLabel } = props;

  const isChecked = inputedLabels.some((label) => label.id === thisLabel.id);

  const [checked, toggleChecked] = useState(isChecked);

  const onClickLabel = () => {
    if (!isChecked) addLabel(thisLabel);
    else deleteLabel(thisLabel);
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
      <span className='text-sm py-2 whitespace-nowrap text-clip'>
        {thisLabel.name}
      </span>
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
  inputedLabels: ILabel[];
  addLabel: (label: ILabel) => void;
  deleteLabel: (label: ILabel) => void;
  closeSelect: () => void;
}

export const SelectLabel = (props: ISelectLabelProps) => {
  const { inputedLabels, addLabel, deleteLabel, closeSelect } = props;

  const { getLabels } = useTodosStore();

  return (
    <>
      <Backdrop close={closeSelect} className='z-[6000]' />

      <div className='top-9 absolute -translate-x-1/4 md:translate-x-0 shadow-3xl border-[1px] border-gray-200 overflow-hidden z-[6001] rounded-sm min-w-[140px] bg-white'>
        <div className='h-fit'>
          <input
            placeholder='Type a label'
            type='text'
            className='w-full border-b-[1px] py-2 px-2 outline-none text-[13px] placeholder:text-gray-400'
          />
        </div>

        <div className='dropdown-select overflow-y-scroll h-fit w-full'>
          {getLabels().length === 0 ? (
            <span className='text-xs px-2 text-gray-500'>No labels</span>
          ) : (
            getLabels()
              .sort((a, b) => a.name.localeCompare(b.name))
              .map((label, i) => (
                <Fragment key={i}>
                  <SelectLabelOption
                    thisLabel={label}
                    inputedLabels={inputedLabels}
                    addLabel={addLabel}
                    deleteLabel={deleteLabel}
                  />
                </Fragment>
              ))
          )}
        </div>
      </div>
    </>
  );
};
