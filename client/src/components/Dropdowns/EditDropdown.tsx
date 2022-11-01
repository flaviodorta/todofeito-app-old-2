import { motion, Variants } from 'framer-motion';
import React from 'react';
import { IDimensions } from '../../helpers/types';
import { Backdrop } from '../Backdrop';

const variants: Variants = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
    transition: {
      duration: 0.115,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.85,
    },
  },
};

export const EditDropdown = ({
  children,
  close,
  sizes,
}: {
  children: React.ReactNode;
  close: () => void;
  sizes: IDimensions;
}) => {
  console.log(sizes.left + sizes.width / 2);
  return (
    <Backdrop close={close} className='z-[100] bg-black/50'>
      <motion.div
        variants={variants}
        initial='initial'
        animate='animate'
        exit='exit'
        style={{
          left: sizes.left + sizes.width / 2,
          top: sizes.top + sizes.height,
        }}
        className='absolute z-[101] text-[13px] font-normal flex flex-col h-fit w-40 left-1/2 -translate-x-1/2 top-7 border-[1px] rounded-sm bg-white shadow-xl py-1'
      >
        {children}
      </motion.div>
    </Backdrop>
  );
};
