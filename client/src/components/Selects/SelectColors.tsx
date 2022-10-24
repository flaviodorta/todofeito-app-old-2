import { Fragment } from 'react';
import { Backdrop } from '../Backdrop';
import { selectColors } from '../../helpers/constants';

interface ISelectColorOptionProps {
  thisColor: {
    class: string;
    name: string;
  };
  inputedColor: {
    class: string;
    name: string;
  };
  setColor: (color: { class: string; name: string }) => void;
  closeSelect: () => void;
}

export const SelectColorOption = (
  props: ISelectColorOptionProps
): JSX.Element => {
  const { thisColor, inputedColor, setColor, closeSelect } = props;

  return (
    <div
      onClick={() => {
        setColor({ name: thisColor.name, class: thisColor.class });
        closeSelect();
      }}
      className='hover:bg-gray-200 flex justify-start'
    >
      <span className='flex items-center justify-center px-2'>
        <span className={`w-3 h-3 ${thisColor.class} rounded-full`} />
      </span>
      <span className='flex cursor-pointer w-full capitalize whitespace-nowrap justify-between items-center pl-1 pr-2 py-1.5 justify-self-start text-sm'>
        <span className='mr-2 capitalize'>{thisColor.name}</span>

        <span
          className={`${
            inputedColor.name === thisColor.name ? 'opacity-100' : 'opacity-0'
          } -translate-y-[1px] mx-1 h-2 w-3 scale-75 -rotate-45 border-l-[2px] border-b-[2px] border-gray-700 duration-100 transition-opacity`}
        />
      </span>
    </div>
  );
};

interface ISelectColorProps {
  inputedColor: {
    class: string;
    name: string;
  };
  setColor: (color: { class: string; name: string }) => void;
  closeSelect: () => void;
}

export const SelectColor = (props: ISelectColorProps) => {
  const { inputedColor, closeSelect, setColor } = props;
  const colorsEntries = Object.entries(selectColors).map((color) => ({
    name: color[0],
    class: color[1],
  }));

  return (
    <>
      <Backdrop close={closeSelect} className='z-[2000]' />

      <div className='top-14 absolute shadow-3xl border-[1px] border-gray-200 overflow-hidden z-[2001] rounded-sm w-full h-fit bg-white'>
        <div className='dropdown-select overflow-y-scroll h-48 w-full'>
          {colorsEntries.map((color, i) => (
            <Fragment key={i}>
              <SelectColorOption
                thisColor={color}
                inputedColor={inputedColor}
                setColor={setColor}
                closeSelect={closeSelect}
              />
            </Fragment>
          ))}
        </div>
      </div>
    </>
  );
};
