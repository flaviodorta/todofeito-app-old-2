import { Fragment, useEffect, useRef, useState } from 'react';
import { Backdrop } from '../Backdrop';
import { selectFillColors } from '../../helpers/constants';
import { useDimensions } from '../../hooks/useDimensions';
import useWindowSize from '../../hooks/useWindowSize';
import { useToggle } from '../../hooks/useToggle';
import { useOnClickOutside } from '../../hooks/useOnClickOutside';
import { CircleSolidIcon } from '../Icons';

interface ISelectColorOptionProps {
  thisColor: {
    class: string;
    name: string;
  };
  inputedColor: {
    class: string;
    name: string;
  };
  setColor: (color: { name: string; class: string }) => void;
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
        <CircleSolidIcon
          className={`w-3 h-3 ${thisColor.class} rounded-full`}
        />
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
  setColor: (color: { name: string; class: string }) => void;
}

export const SelectColor = ({ inputedColor, setColor }: ISelectColorProps) => {
  const colorsEntries = Object.entries(selectFillColors).map((color) => ({
    name: color[0],
    class: color[1],
  }));

  const [containerSizes, containerRef] = useDimensions();

  const [selectColorSizes, selectColorRef2] = useDimensions();

  const { width } = useWindowSize();

  const resizeRight =
    containerSizes.width / 2 - (width - selectColorSizes.left);

  const resizeLeft = containerSizes.left;

  const resize =
    resizeRight > 0 ? resizeRight + 10 : resizeLeft < 0 ? -resizeLeft + 10 : 0;

  const [isSelectColorOpen, toggleSelectColor] = useToggle(false);

  const [isSelectColorInputFocused, setIsSelectColorInputFocus] =
    useState(false);

  const focusSelectColorInput = () => setIsSelectColorInputFocus(true);
  const unfocusSelectColorInput = () => setIsSelectColorInputFocus(false);

  useEffect(() => {
    if (isSelectColorOpen === false) focusSelectColorInput();
  }, [isSelectColorOpen]);

  const selectColorRef = useRef<HTMLDivElement>(null);

  useOnClickOutside(selectColorRef, unfocusSelectColorInput);

  return (
    <>
      <div ref={selectColorRef2}>
        <div
          ref={selectColorRef}
          onClick={toggleSelectColor}
          className={`outline-none flex h-7 rounded-[3px] py-1  ${
            isSelectColorOpen ? 'border-gray-400' : 'border-gray-300'
          } ${
            isSelectColorInputFocused ? 'border-gray-400' : ''
          } border-[1px] duration-150 transition-all`}
        >
          {inputedColor && (
            <>
              <span className='flex items-center justify-center px-2'>
                <CircleSolidIcon
                  className={`w-3 h-3 ${inputedColor.class} rounded-full`}
                />
              </span>
              <span className='flex cursor-pointer w-full capitalize whitespace-nowrap justify-between items-center pl-1 pr-2 py-1.5 justify-self-start text-sm'>
                <span className='mr-2 capitalize'>{inputedColor.name}</span>
              </span>
            </>
          )}
        </div>
      </div>

      {isSelectColorOpen && (
        <Backdrop close={toggleSelectColor} className='z-[2000]'>
          <div
            ref={containerRef}
            style={{
              left: selectColorSizes.left + selectColorSizes.width / 2 + resize,
              top: selectColorSizes.top + selectColorSizes.height,
              width: selectColorSizes.width,
            }}
            className='fixed -translate-x-1/2 z-[2001] shadow-3xl border-[1px] border-gray-200 overflow-hidden rounded-sm w-full h-fit bg-white'
          >
            <div className='dropdown-select overflow-y-scroll h-48 w-full'>
              {colorsEntries.map((color, i) => (
                <Fragment key={i}>
                  <SelectColorOption
                    thisColor={color}
                    inputedColor={inputedColor}
                    setColor={setColor}
                    closeSelect={toggleSelectColor}
                  />
                </Fragment>
              ))}
            </div>
          </div>
        </Backdrop>
      )}
    </>
  );
};
