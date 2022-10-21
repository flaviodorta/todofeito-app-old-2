import React from 'react';

export const EditDropdown = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='absolute text-[13px] font-normal flex flex-col h-fit w-40 left-1/2 -translate-x-1/2 top-7 border-[1px] rounded-sm bg-white shadow-xl py-1'>
      {children}
    </div>
  );
};
