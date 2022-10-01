import {
  AnimatePresence,
  motion,
  useIsomorphicLayoutEffect,
} from 'framer-motion';
import { useRef } from 'react';
import { useAddTodoStore, useCalendarStore, useUIStore } from '../zustand';
import { useDimensions } from '../hooks/useDimensions';
import Textarea from 'react-expanding-textarea';
import { FlagSolidIcon, InboxSolidIcon, LabelIcon } from './Icons';
import { CalendarRegularIcon } from './Icons/Icons/CalendarRegularIcon';
import { addTodoModal } from '../helpers/variants';
import { Backdrop } from './Backdrop';
import { getDayNumberInMonth, getMonthName } from '../helpers/functions';

export const LabelAddTodoModal = ({ label }: { label: string }) => {
  return (
    <span className='text-white px-2 py-1 tracking-[1px] w-fit flex-center whitespace-nowrap h-6 rounded-lg bg-blue-600 font-bold text-sm'>
      @{label}
    </span>
  );
};

export const AddTodoModal = () => {
  const {
    setDropdownPosition,
    setRenderedElements,
    renderedElements,
    isElementRendered,
  } = useUIStore();

  const {
    title,
    description,
    project,
    priority,
    labels,
    setTitle,
    setDescription,
  } = useAddTodoStore();

  const { selectedDay, lang } = useCalendarStore();

  const labelColors = [
    'fill-red-500',
    'fill-orange-500',
    'fill-yellow-500',
    'fill-blue-500',
    'fill-gray-400',
  ];

  const labelHoverColors = [
    'group-hover:fill-red-600',
    'group-hover:fill-orange-600',
    'group-hover:fill-yellow-600',
    'group-hover:fill-blue-600',
    'group-hover:fill-gray-500',
  ];

  const monthNameShort = getMonthName(selectedDay, lang).substring(0, 3);

  const addTodoModalRef = useRef<HTMLDivElement>(null);

  const [dueDateDimensions, dueDateRef, shouldMeasureDueDateDimensions] =
    useDimensions<HTMLDivElement>({ withInitialAnimation: true });
  const [projectDimensions, projectRef, shouldMeasureProjectDimensions] =
    useDimensions<HTMLDivElement>({ withInitialAnimation: true });
  const [labelDimensions, labelRef, shouldMeasureLabelDimensions] =
    useDimensions<HTMLDivElement>({ withInitialAnimation: true });
  const [priorityDimensions, priorityRef, shouldMeasurePriorityDimensions] =
    useDimensions<HTMLDivElement>({ withInitialAnimation: true });

  const onClickAddTodoButton = () => {
    // send data to the server
    setRenderedElements('add-todo', false);
  };

  const onClickDueData = () => {
    setRenderedElements('date-picker', true);
    setDropdownPosition(
      dueDateDimensions.x + dueDateDimensions.width / 2,
      dueDateDimensions.y + dueDateDimensions.height
    );
  };
  const onClickProject = () => {
    setRenderedElements('project', true);
    setDropdownPosition(
      projectDimensions.x + projectDimensions.width / 2,
      projectDimensions.y + projectDimensions.height
    );
  };
  const onClickLabel = () => {
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

  // measure dimensions when animation modal finishes
  const shouldMeasureDimensions = () => {
    shouldMeasureDueDateDimensions();
    shouldMeasureProjectDimensions();
    shouldMeasureLabelDimensions();
    shouldMeasurePriorityDimensions();
  };

  // set new measures when window sizes changes
  useIsomorphicLayoutEffect(() => {
    if (isElementRendered('date-picker'))
      setDropdownPosition(
        dueDateDimensions.x + dueDateDimensions.width / 2,
        dueDateDimensions.y + dueDateDimensions.height
      );

    if (isElementRendered('project'))
      setDropdownPosition(
        projectDimensions.x + projectDimensions.width / 2,
        projectDimensions.y + projectDimensions.height
      );

    if (isElementRendered('label'))
      setDropdownPosition(
        labelDimensions.x + labelDimensions.width / 2,
        labelDimensions.y + labelDimensions.height
      );

    if (isElementRendered('priority'))
      setDropdownPosition(
        priorityDimensions.x + priorityDimensions.width / 2,
        priorityDimensions.y + priorityDimensions.height
      );
  }, [
    dueDateDimensions,
    projectDimensions,
    labelDimensions,
    priorityDimensions,
  ]);

  return (
    <>
      <Backdrop handleClose={onClickCloseAddTodoModal} />
      <AnimatePresence>
        {isElementRendered('add-todo') && (
          <motion.div
            ref={addTodoModalRef}
            variants={addTodoModal}
            initial='initial'
            animate='animate'
            exit='exit'
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
            {labels.length > 0 && (
              <div className='w-full flex-wrap h-fit gap-1 flex justify-start'>
                {labels.map((label) => (
                  <LabelAddTodoModal label={label} />
                ))}
              </div>
            )}
            <input
              type='text'
              placeholder='Todo name'
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className='break-words w-full select-none outline-none font-medium placeholder:font-medium placeholder:text-gray-400'
            />
            <Textarea
              placeholder='Description'
              rows={2}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className='w-full select-none text-sm outline-none resize-none placeholder:text-400 placeholder:text-sm'
            />
            <div className='flex items-center justify-between '>
              <div className='flex gap-2 flex-wrap'>
                {/* select date */}
                <div
                  ref={dueDateRef}
                  onClick={onClickDueData}
                  className={`${
                    isElementRendered('date-picker') && 'bg-gray-200'
                  } w-22 select-none relative flex gap-1 p-1.5 text-gray-800 tracking-wide cursor-pointer items-center border-[1px] border-gray-300 rounded-sm`}
                >
                  <CalendarRegularIcon
                    width='11px'
                    height='11px'
                    className='fill-purple-700 -translate-y-[1px]'
                  />

                  <span className='text-xs capitalize'>
                    {selectedDay
                      ? `${monthNameShort} ${getDayNumberInMonth(selectedDay)}`
                      : 'Due data'}
                  </span>
                </div>

                {/* select project */}
                <div
                  ref={projectRef}
                  onClick={onClickProject}
                  className={`${
                    isElementRendered('project') && 'bg-gray-200'
                  } w-22 select-none relative flex gap-1 p-1.5 text-gray-800 tracking-wide cursor-pointer items-center border-[1px] border-gray-300 rounded-sm`}
                >
                  <InboxSolidIcon
                    width='11px'
                    height='11px'
                    className='fill-sky-600 -translate-y-[1px]'
                  />
                  <span className='text-xs capitalize'>
                    {project ? project : 'Inbox'}
                  </span>
                </div>
              </div>

              <div className='flex gap-2'>
                <div
                  ref={labelRef}
                  onClick={onClickLabel}
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
                    className={`${labelColors[priority - 1]} ${
                      labelHoverColors[priority - 1]
                    }  duration-100`}
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
                onClick={onClickAddTodoButton}
                className={`${
                  !title
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
