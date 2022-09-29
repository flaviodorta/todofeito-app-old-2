import { motion, Variants } from 'framer-motion';
import { useLayoutEffect, useRef, useState } from 'react';
import { useOnClickOutside } from '../hooks/useOnClickOutside';
import { useCalendarStore, useUIStore } from '../zustand';
import Textarea from 'react-expanding-textarea';
import { InboxSolidIcon } from './Icons';
import { CalendarRegularIcon } from './Icons/Icons/CalendarRegularIcon';
import { DatePicker } from './DatePicker';
import { useDimensions } from '../hooks/useDimensions';

export const addTodoModal: Variants = {
  initial: {
    scale: 0.4,
    opacity: 0,
    y: -50,
    x: '-50%',
    transition: {
      duration: 0.1,
      type: 'tween',
      ease: 'linear',
    },
  },
  animate: {
    scale: 1,
    opacity: 1,
    y: -150,
    x: '-50%',
    transition: {
      duration: 0.1,
      type: 'tween',
      ease: 'linear',
    },
  },
};

export const AddTodoModal = () => {
  const {
    isAddTodoModalOpen,
    isDatePickerOpen,
    toggleDatePicker,
    toggleAddTodoModal,
    setDropdownPosition,
  } = useUIStore();

  const addTodoModalRef = useRef<HTMLDivElement>(null);
  const datePickerRef = useRef<HTMLDivElement>(null);
  // const dueDateRef = useRef<HTMLDivElement>(null);

  // const [dimensions, setDimensions] = useState({});

  // useLayoutEffect(() => {
  //   if (dueDateRef && dueDateRef.current)
  //     setDimensions(dueDateRef.current?.getBoundingClientRect());
  // }, []);

  const onClickOutSideAddTodoModal = () => {
    if (!isDatePickerOpen) return toggleAddTodoModal();
  };

  const [dueDateRef, dimensions] = useDimensions<HTMLDivElement>();

  console.log(dimensions);

  const onClickDueData = () => {
    // toggleDatePicker();
    setDropdownPosition(
      dimensions.x + dimensions.width / 2,
      dimensions.y + dimensions.height + 50
    );
  };

  useOnClickOutside(addTodoModalRef, onClickOutSideAddTodoModal, datePickerRef);
  useOnClickOutside(datePickerRef, toggleDatePicker);

  return (
    <div className='w-screen h-screen fixed z-30 left-0 top-0 bg-transparent'>
      <motion.div
        ref={addTodoModalRef}
        variants={addTodoModal}
        initial='initial'
        animate={isAddTodoModalOpen ? 'animate' : 'initial'}
        className='shadow-2xl z-20 border-gray-300 bg-white border-[1px] p-5 flex flex-col gap-4 fixed left-1/2 top-1/3 h-fit w-[36rem] rounded-sm'
      >
        <input
          className='w-full outline-none font-medium placeholder:font-medium placeholder:text-gray-400'
          type='text'
          placeholder='Todo name'
        />
        <Textarea
          placeholder='Description'
          rows={2}
          className='w-full outline-none resize-none placeholder:text-400 placeholder:text-sm'
        />
        <div className='flex items-center justify-between '>
          <div className='flex gap-2'>
            <div
              ref={dueDateRef}
              onClick={onClickDueData}
              className='w-22 relative flex gap-1 p-1.5 text-gray-800 tracking-wide cursor-pointer items-center border-[1px] border-gray-300 rounded-sm'
            >
              <InboxSolidIcon
                width='11px'
                height='11px'
                className='fill-sky-600'
              />
              <span className='text-xs'>Due data</span>
            </div>
            <div className='relative w-22 flex gap-1 p-1.5 text-gray-800 tracking-wide cursor-pointer items-center border-[1px] border-gray-300 rounded-sm'>
              <CalendarRegularIcon
                width='11px'
                height='11px'
                className='fill-purple-700'
              />
              <span className='text-xs'>Inbox</span>
            </div>
          </div>

          <div className='flex gap-2'>
            <span>icon</span>
            <span>icon</span>
            <span>icon</span>
          </div>
        </div>

        <div className='flex justify-end gap-2'>
          <button
            onClick={toggleAddTodoModal}
            className='text-center p-2 outline-none rounded-sm font-medium text-sm h-fit w-fit bg-gray-200 hover:bg-gray-300 hover:text-700 text-gray-600'
          >
            Cancel
          </button>
          <button className='text-center p-2 outline-none rounded-sm font-medium text-sm h-fit w-fit text-white hover:text-gray-200 bg-red-600 hover:bg-red-700'>
            Add todo
          </button>
        </div>
      </motion.div>
    </div>
  );
};
