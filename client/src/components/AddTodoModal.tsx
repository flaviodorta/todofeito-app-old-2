import { AnimatePresence, motion } from 'framer-motion';
import { useRef, useState } from 'react';
import { useUIStore } from '../zustand';
import { useDimensions } from '../hooks/useDimensions';
import { useIsomorphicLayoutEffect } from '../hooks/useIsomorphicLayoutEffect';
import Textarea from 'react-expanding-textarea';
import { FlagSolidIcon, InboxSolidIcon, LabelIcon } from './Icons';
import { CalendarRegularIcon } from './Icons/Icons/CalendarRegularIcon';
import { addTodoModal } from '../helpers/variants';
import { Backdrop } from './Backdrop';

export const AddTodoModal = () => {
  const {
    setDropdownPosition,
    setRenderedElements,
    renderedElements,
    isElementRendered,
  } = useUIStore();

  const [input, setInput] = useState<{ title: string; description: string }>({
    title: '',
    description: '',
  });

  const addTodoModalRef = useRef<HTMLDivElement>(null);

  const [dueDateDimensions, dueDateRef, shouldMeasureDueDateDimensions] =
    useDimensions<HTMLDivElement>({ withInitialAnimation: true });
  const [projectDimensions, projectRef, shouldMeasureProjectDimensions] =
    useDimensions<HTMLDivElement>({ withInitialAnimation: true });
  const [labelDimensions, labelRef, shouldMeasureLabelDimensions] =
    useDimensions<HTMLDivElement>({ withInitialAnimation: true });
  const [priorityDimensions, priorityRef, shouldMeasurePriorityDimensions] =
    useDimensions<HTMLDivElement>({ withInitialAnimation: true });

  const onClickDueData = () => {
    setRenderedElements('date-picker', true);
    setDropdownPosition(
      dueDateDimensions.x + dueDateDimensions.width / 2,
      dueDateDimensions.y + dueDateDimensions.height
    );
  };
  const onClickProjects = () => {
    setRenderedElements('project', true);
    setDropdownPosition(
      projectDimensions.x + projectDimensions.width / 2,
      projectDimensions.y + projectDimensions.height
    );
  };
  const onClickLabels = () => {
    setRenderedElements('label', true);
    setDropdownPosition(
      labelDimensions.x + labelDimensions.width / 2,
      labelDimensions.y + labelDimensions.height
    );
  };
  const onClickPriority = () => {
    setRenderedElements('priority', true);
    setDropdownPosition(
      priorityDimensions.x + priorityDimensions.width / 2,
      priorityDimensions.y + priorityDimensions.height
    );
  };

  const onClickCloseAddTodoModal = () => setRenderedElements('add-todo', false);

  const shouldMeasureDimensions = () => {
    shouldMeasureDueDateDimensions();
    shouldMeasureProjectDimensions();
    shouldMeasureLabelDimensions();
    shouldMeasurePriorityDimensions();
  };

  return (
    <>
      <Backdrop handleClose={onClickCloseAddTodoModal} />
      <AnimatePresence>
        {isElementRendered('add-todo') && (
          <motion.div
            key='modal'
            ref={addTodoModalRef}
            variants={addTodoModal}
            initial='initial'
            animate='animate'
            exit='initial'
            onAnimationComplete={shouldMeasureDimensions}
            className={`${
              isElementRendered('add-todo') &&
              !renderedElements.includes('date-picker') &&
              !renderedElements.includes('project') &&
              !renderedElements.includes('label') &&
              !renderedElements.includes('priority') &&
              'z-[100]'
            } shadow-2xl border-gray-300 bg-white border-[1px] p-5 flex flex-col gap-4 fixed left-1/2 top-1/3 h-fit w-[36rem] rounded-sm`}
          >
            <input
              type='text'
              placeholder='Todo name'
              value={input.title}
              onChange={(e) => setInput({ ...input, title: e.target.value })}
              className='w-full select-none outline-none font-medium placeholder:font-medium placeholder:text-gray-400'
            />
            <Textarea
              placeholder='Description'
              rows={2}
              value={input.description}
              onChange={(e) =>
                setInput({ ...input, description: e.target.value })
              }
              className='w-full select-none text-sm outline-none resize-none placeholder:text-400 placeholder:text-sm'
            />
            <div className='flex items-center justify-between '>
              <div className='flex gap-2'>
                {/* select date */}
                <div
                  ref={dueDateRef}
                  onClick={onClickDueData}
                  className={`${
                    isElementRendered('date-picker') && 'bg-gray-200'
                  } w-22 select-none relative flex gap-1 p-1.5 text-gray-800 tracking-wide cursor-pointer items-center border-[1px] border-gray-300 rounded-sm`}
                >
                  <InboxSolidIcon
                    width='11px'
                    height='11px'
                    className='fill-sky-600'
                  />
                  <span className='text-xs'>Due data</span>
                </div>

                {/* select project */}
                <div
                  ref={projectRef}
                  onClick={onClickProjects}
                  className={`${
                    isElementRendered('project') && 'bg-gray-200'
                  } w-22 select-none relative flex gap-1 p-1.5 text-gray-800 tracking-wide cursor-pointer items-center border-[1px] border-gray-300 rounded-sm`}
                >
                  <CalendarRegularIcon
                    width='11px'
                    height='11px'
                    className='fill-purple-700'
                  />
                  <span className='text-xs'>Inbox</span>
                </div>
              </div>

              <div className='flex gap-2'>
                <div
                  ref={labelRef}
                  onClick={onClickLabels}
                  className={`${
                    isElementRendered('label') && 'bg-gray-200'
                  } group cursor-pointer h-7 w-7 flex items-center justify-center hover:bg-gray-200 duration-100`}
                >
                  <LabelIcon
                    height='16px'
                    width='16px'
                    className='fill-gray-400 group-hover:fill-gray-500 duration-100'
                  />
                </div>
                <div
                  ref={priorityRef}
                  onClick={onClickPriority}
                  className={`${
                    isElementRendered('priority') && 'bg-gray-200'
                  } group cursor-pointer h-7 w-7 flex items-center justify-center hover:bg-gray-200 duration-100`}
                >
                  <FlagSolidIcon
                    height='15px'
                    width='15px'
                    className='fill-gray-400 group-hover:fill-gray-500 duration-100'
                  />
                </div>
              </div>
            </div>

            <div className='flex justify-end gap-2'>
              <button
                onClick={onClickCloseAddTodoModal}
                className='text-center select-none p-2 outline-none rounded-sm font-medium text-sm h-fit w-fit bg-gray-200 hover:bg-gray-300 hover:text-700 text-gray-600'
              >
                Cancel
              </button>
              <button
                className={`${
                  !input.title
                    ? 'cursor-not-allowed bg-blue-400'
                    : 'bg-blue-600 hover:bg-blue-700'
                } text-center select-none p-2 outline-none rounded-sm font-medium text-sm h-fit w-fit text-white hover:text-gray-200`}
              >
                Add todo
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
