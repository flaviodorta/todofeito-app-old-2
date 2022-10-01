import { Fragment } from 'react';
import { IPriorityLabelColors } from '../../helpers/types';
import { Backdrop } from '../Backdrop';
import { FlagSolidIcon } from '../Icons';

interface ISelectPriorityOptionProps {
  priority: number;
  selectedPriority: number;
  setSelectedPriority: (priority: number) => void;
  handleCloseSelect: () => void;
}

export const SelectPriorityOption = (
  props: ISelectPriorityOptionProps
): JSX.Element => {
  const { priority, selectedPriority, setSelectedPriority, handleCloseSelect } =
    props;

  const colors: IPriorityLabelColors[] = [
    'fill-red-600',
    'fill-orange-600',
    'fill-yellow-600',
    'fill-blue-600',
    null,
  ];

  const onClickPriority = () => {
    setSelectedPriority(priority);
    // setPriorityLabelColor(colors[props.priority - 1] as IPriorityLabelColors);
    handleCloseSelect();
  };

  return (
    <div
      onClick={onClickPriority}
      className='hover:bg-gray-200 flex items-center justify-between'
    >
      <span className='flex items-center justify-center px-4 py-2'>
        <FlagSolidIcon
          stroke={'black'}
          className={`${colors[priority]} w-3 h-3`}
        />
      </span>
      <span className='text-sm whitespace-nowrap pr-4 py-2'>
        Priority {priority + 1}
      </span>

      <span
        className={`${
          selectedPriority === priority ? 'opacity-100' : 'opacity-0'
        } -translate-y-[1px] mx-1 mr-3 h-2 w-3 scale-75 -rotate-45 border-l-[2px] border-b-[2px] border-gray-700 duration-100 transition-opacity`}
      />
    </div>
  );
};

interface ISelectPriorityProps {
  className?: string;
  left: number;
  top: number;
  selectedPriority: number;
  setSelectedPriority: (priority: number) => void;
  handleCloseSelect: () => void;
}

export const SelectPriority = (props: ISelectPriorityProps) => {
  const {
    left,
    top,
    selectedPriority,
    handleCloseSelect,
    setSelectedPriority,
  } = props;

  return (
    <>
      <Backdrop handleClose={handleCloseSelect} className='z-70' />

      <div
        style={{ position: 'absolute', left: left, top: top }}
        className='-translate-x-1/2 translate-y-2 absolute shadow-3xl border-[1px] border-gray-200 overflow-hidden z-80 rounded-sm w-fit h-fit bg-white'
      >
        <div className='dropdown-select overflow-y-scroll h-fit w-full'>
          {Array.from({ length: 4 }).map((_, i) => (
            <Fragment key={i}>
              <SelectPriorityOption
                priority={i}
                selectedPriority={selectedPriority}
                setSelectedPriority={setSelectedPriority}
                handleCloseSelect={handleCloseSelect}
              />
            </Fragment>
          ))}
        </div>
      </div>
    </>
  );
};
