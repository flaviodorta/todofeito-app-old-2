// OK!

import { Fragment, useState } from 'react';
import { useTodosStore } from '../../zustand';
import { IDimensions, ILabel } from '../../helpers/types';
import { Backdrop } from '../Backdrop';
import { LabelIcon } from '../Icons';
import useWindowSize from '../../hooks/useWindowSize';
import { useDimensions } from '../../hooks/useDimensions';

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
        {thisLabel.title}
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
  sizes: IDimensions;
}

export const SelectLabel = ({
  inputedLabels,
  addLabel,
  deleteLabel,
  closeSelect,
  sizes,
}: ISelectLabelProps) => {
  const { labels } = useTodosStore();

  const [containerSizes, containerRef] = useDimensions();

  const { width } = useWindowSize();

  const resizeRight = containerSizes.width / 2 - (width - sizes.left);

  const resizeLeft = containerSizes.left;

  const resize =
    resizeRight > 0 ? resizeRight + 10 : resizeLeft < 0 ? -resizeLeft + 10 : 0;

  return (
    <Backdrop close={closeSelect} className='z-[2000]'>
      <div
        ref={containerRef}
        style={{
          left: sizes.left + sizes.width / 2 + resize,
          top: sizes.top + sizes.height,
        }}
        className='fixed -translate-x-1/2 z-[2001] shadow-3xl border-[1px] border-gray-200 overflow-hidden rounded-sm min-w-[140px] bg-white'
      >
        <div className='h-fit'>
          <input
            placeholder='Type a label'
            type='text'
            className='w-full border-b-[1px] py-2 px-2 outline-none text-[13px] placeholder:text-gray-400'
          />
        </div>

        <div className='dropdown-select overflow-y-scroll h-fit w-full'>
          {labels.length === 0 ? (
            <span className='text-xs px-2 text-gray-500'>No labels</span>
          ) : (
            labels
              .sort((a, b) => a.title.localeCompare(b.title))
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
    </Backdrop>
  );
};
