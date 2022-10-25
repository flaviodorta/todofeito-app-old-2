import React from 'react';
import { IDimensions } from '../../helpers/types';
import { Backdrop } from '../Backdrop';

export const EditDropdown = ({
  children,
  close,
  sizes,
}: {
  children: React.ReactNode;
  close: () => void;
  sizes: IDimensions;
}) => {
  return (
    <Backdrop close={close} className='z-[100] bg-black/50'>
      <div
        style={{
          left: sizes.left + sizes.width / 2,
          top: sizes.top + sizes.height,
        }}
        className='absolute z-[101] text-[13px] font-normal flex flex-col h-fit w-40 left-1/2 -translate-x-1/2 top-7 border-[1px] rounded-sm bg-white shadow-xl py-1'
      >
        {children}
      </div>
    </Backdrop>
  );
};
