import React from 'react';
import { Backdrop } from '../Backdrop';

export const EditDropdown = ({
  children,
  close,
}: {
  children: React.ReactNode;
  close: () => void;
}) => {
  return (
    <>
      <Backdrop close={close} className='bg-black/50' />
      <div className='absolute text-[13px] font-normal flex flex-col h-fit w-40 left-1/2 -translate-x-1/2 top-7 border-[1px] rounded-sm bg-white shadow-xl py-1'>
        {children}
      </div>
    </>
  );
};
