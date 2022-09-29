import { AnimatePresence, motion } from 'framer-motion';
import { useRef } from 'react';
import { useUIStore } from '../zustand';
import { useDimensions } from '../hooks/useDimensions';
import { useIsomorphicLayoutEffect } from '../hooks/useIsomorphicLayoutEffect';
import Textarea from 'react-expanding-textarea';
import { InboxSolidIcon } from './Icons';
import { CalendarRegularIcon } from './Icons/Icons/CalendarRegularIcon';
import { addTodoModal } from '../helpers/variants';

export const AddTodoModal = () => {
  const {
    isAddTodoModalOpen,
    toggleAddTodoModal,
    toggleDatePicker,
    setDropdownPosition,
  } = useUIStore();

  const addTodoModalRef = useRef<HTMLDivElement>(null);

  const [dimensions, dueDateRef, shouldMeasure] = useDimensions<HTMLDivElement>(
    { withInitialAnimation: true }
  );

  const onClickDueData = () => toggleDatePicker();

  useIsomorphicLayoutEffect(() => {
    setDropdownPosition(dimensions.x, dimensions.y + dimensions.height);
  }, [dimensions]);

  return (
    <AnimatePresence>
      {isAddTodoModalOpen && (
        <motion.div
          key='modal'
          ref={addTodoModalRef}
          variants={addTodoModal}
          initial='initial'
          animate='animate'
          exit='initial'
          onAnimationComplete={shouldMeasure}
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
                ref={dueDateRef as React.LegacyRef<HTMLDivElement> | undefined}
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
      )}
    </AnimatePresence>
  );
};
