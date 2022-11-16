import Textarea from 'react-expanding-textarea';
import {
  CalendarRegularIcon,
  FlagSolidIcon,
  InboxSolidIcon,
  LabelIcon,
} from './Icons';
import { getDayNumberInMonth, getMonthName } from '../helpers/functions';
import { Fragment, useEffect, useRef, useState } from 'react';
import { LabelAddTodoModal } from './LabelAddTodoModal';
import { DatePicker } from './DatePicker';
import { SelectProject } from './Selects/SelectProject';
import { SelectLabel } from './Selects/SelectLabel';
import { SelectPriority } from './Selects/SelectPriority';
import {
  inboxProject,
  labelColors,
  labelHoverColors,
} from '../helpers/constants';
import { ILabel, IProject, IRenderableElements, ITodo } from '../helpers/types';
import { Backdrop } from './Backdrop';
import { motion } from 'framer-motion';
import { addTodoModal } from '../helpers/variants';
import { nanoid } from 'nanoid';
import { useTodosStore } from '../zustand';
import { useDimensions } from '../hooks/useDimensions';

interface IAddTodoModalProps {
  closeAddTodoModal: () => void;
}

export const AddTodoModal = (props: IAddTodoModalProps) => {
  const { closeAddTodoModal } = props;

  const { addTodo } = useTodosStore();

  const [inputs, setInputs] = useState({
    title: '',
    description: '',
    project: inboxProject,
    priority: 4,
    date: new Date(),
    labels: [] as ILabel[],
  });

  const [renderedSelect, setRenderedSelect] =
    useState<IRenderableElements>(null);

  // centerlize select
  const containerRef = useRef<HTMLDivElement>(null!);

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const [dueDateSizes, dueDateRef, shouldMeasureDueDate] = useDimensions({
    withInitialAnimation: true,
  });
  const [projectsSizes, projectsRef, shouldMeasureProject] = useDimensions({
    withInitialAnimation: true,
  });
  const [labelsSizes, labelsRef, shouldMeasureLabel] = useDimensions({
    withInitialAnimation: true,
  });
  const [prioritySizes, priorityRef, shouldMeasurePriority] = useDimensions({
    withInitialAnimation: true,
  });

  const shouldMeasureDimensions = () => {
    shouldMeasureDueDate();
    shouldMeasureProject();
    shouldMeasureLabel();
    shouldMeasurePriority();
  };

  const addLabel = (label: ILabel) =>
    setInputs((state) => ({
      ...state,
      labels: [...state.labels, label],
    }));

  const deleteLabel = (label: ILabel) =>
    setInputs((state) => ({
      ...state,
      labels: state.labels.filter(
        (deletedLabel) => label.id !== deletedLabel.id
      ),
    }));

  const todo: ITodo = {
    id: nanoid(),
    type: 'todo',
    title: inputs.title,
    description: inputs.description,

    date: inputs.date,
    labels: inputs.labels,
    priority: inputs.priority,
    project: inputs.project,

    isCompleted: false,
  };

  const sendTodo = () => {
    if (!inputs.title) return;

    addTodo(todo);

    closeAddTodoModal();
  };

  const closeSelect = () => setRenderedSelect(null);

  const openDatePicker = () =>
    !renderedSelect ? setRenderedSelect('date-picker') : undefined;

  const openProjectSelect = () =>
    !renderedSelect ? setRenderedSelect('project-select') : undefined;

  const openLabelsSelect = () =>
    !renderedSelect ? setRenderedSelect('label-select') : undefined;

  const openPrioritySelect = () =>
    !renderedSelect ? setRenderedSelect('priority-select') : undefined;

  const setTitle = (title: string) =>
    setInputs((state) => ({ ...state, title }));

  const setDescription = (description: string) =>
    setInputs((state) => ({ ...state, description }));

  const setProject = (project: IProject) =>
    setInputs((state) => ({
      ...state,
      project,
    }));

  const setPriority = (priority: number) =>
    setInputs((state) => ({ ...state, priority }));

  const setDate = (date: Date) => setInputs((state) => ({ ...state, date }));

  const monthNameShort = getMonthName(inputs.date).substring(0, 3);

  const sendTodoOnKeyUpEnter = (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (
      event.key === 'Enter' &&
      document.activeElement !== textareaRef.current
    ) {
      sendTodo();
    }
  };

  const titleInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    titleInputRef?.current?.focus();
  }, []);

  return (
    <Backdrop close={closeAddTodoModal} className='z-[1000]'>
      <motion.div
        ref={containerRef}
        variants={addTodoModal}
        initial='initial'
        animate='animate'
        exit='exit'
        onAnimationComplete={shouldMeasureDimensions}
        className='z-[1001] shadow-4xl border-gray-300 bg-white border-[1px] p-5 flex flex-col gap-4 fixed left-1/2 top-1/3 h-fit w-[90%] sm:w-[36rem] rounded-sm'
      >
        {/* labels checkeds */}
        {inputs.labels.length > 0 && (
          <div className='w-full flex-wrap h-fit gap-1 flex justify-start'>
            {inputs.labels.map((label, i) => (
              <Fragment key={i}>
                <LabelAddTodoModal label={label} />
              </Fragment>
            ))}
          </div>
        )}

        <input
          ref={titleInputRef}
          type='text'
          placeholder='Todo name'
          value={inputs.title}
          onChange={(e) => setTitle(e.target.value)}
          onKeyUp={sendTodoOnKeyUpEnter}
          className='break-words w-full outline-none font-medium placeholder:font-medium placeholder:text-gray-400'
        />
        <Textarea
          ref={textareaRef}
          placeholder='Description'
          rows={2}
          value={inputs.description}
          onChange={(e) => setDescription(e.target.value)}
          className='w-full text-sm outline-none resize-none placeholder:text-400 placeholder:text-sm'
        />

        {/* date and project select wrapper */}
        <div className='flex items-center justify-between'>
          <div className='flex gap-2 flex-wrap'>
            {/* select date */}
            <div
              ref={dueDateRef}
              onClick={openDatePicker}
              className={`${
                renderedSelect === 'date-picker'
                  ? 'bg-gray-200 cursor-default'
                  : 'cursor-pointer'
              } w-22 relative flex gap-1 p-1.5 text-gray-800 tracking-wide items-center border-[1px] border-gray-300 rounded-sm`}
            >
              <CalendarRegularIcon
                width='11px'
                height='11px'
                className='fill-purple-700 -translate-y-[1px]'
              />

              <span className='text-xs capitalize'>
                {inputs.date
                  ? `${monthNameShort} ${getDayNumberInMonth(inputs.date)}`
                  : 'Due date'}
              </span>

              {renderedSelect === 'date-picker' && (
                <DatePicker
                  inputedDate={inputs.date}
                  setDate={setDate}
                  closeSelect={closeSelect}
                  className='left-28 sm:left-8'
                  sizes={dueDateSizes}
                />
              )}
            </div>

            {/* select project */}
            <div
              ref={projectsRef}
              onClick={openProjectSelect}
              className={`${
                renderedSelect === 'project-select'
                  ? 'bg-gray-200 cursor-default'
                  : 'cursor-pointer'
              } w-22 relative flex gap-1 p-1.5 text-gray-800 tracking-wide items-center border-[1px] border-gray-300 rounded-sm`}
            >
              <InboxSolidIcon
                width='11px'
                height='11px'
                className='fill-sky-600 -translate-y-[1px]'
              />
              <span className='text-xs capitalize'>
                {inputs.project.title ? inputs.project.title : 'Inbox'}
              </span>

              {renderedSelect === 'project-select' && (
                <SelectProject
                  inputedProject={inputs.project}
                  setProject={setProject}
                  closeSelect={closeSelect}
                  sizes={projectsSizes}
                />
              )}
            </div>
          </div>

          {/* label and priority select wrapper */}
          <div className='flex gap-2'>
            {/* label select */}
            <div
              ref={labelsRef}
              onClick={openLabelsSelect}
              className={`${
                renderedSelect === 'label-select'
                  ? 'bg-gray-200 cursor-pointer'
                  : 'cursor-default'
              } group relative h-7 w-7 flex items-center justify-center hover:bg-gray-200 duration-100`}
            >
              <LabelIcon
                height='16px'
                width='16px'
                className='fill-gray-400 group-hover:fill-gray-500 duration-100'
              />

              {renderedSelect === 'label-select' && (
                <SelectLabel
                  inputedLabels={inputs.labels}
                  addLabel={addLabel}
                  deleteLabel={deleteLabel}
                  closeSelect={closeSelect}
                  sizes={labelsSizes}
                />
              )}
            </div>

            {/* priority select */}
            <div
              ref={priorityRef}
              onClick={openPrioritySelect}
              className={`${
                renderedSelect === 'priority-select'
                  ? 'bg-gray-200 cursor-default'
                  : 'cursor-pointer'
              } group relative cursor-pointer h-7 w-7 flex items-center justify-center hover:bg-gray-200 duration-100`}
            >
              <FlagSolidIcon
                height='15px'
                width='15px'
                className={`${labelColors[inputs.priority]} ${
                  labelHoverColors[inputs.priority]
                } duration-100`}
              />

              {renderedSelect === 'priority-select' && (
                <SelectPriority
                  inputedPriority={inputs.priority}
                  setPriority={setPriority}
                  closeSelect={closeSelect}
                  sizes={prioritySizes}
                />
              )}
            </div>
          </div>
        </div>

        {/* buttons to close and send todo */}
        <div className='flex justify-end gap-2'>
          <button
            onClick={closeAddTodoModal}
            className='text-center select-none p-2 outline-none rounded-sm font-medium text-sm h-fit w-fit bg-gray-200 hover:bg-gray-300 hover:text-700 text-gray-600'
          >
            Cancel
          </button>

          <button
            onClick={sendTodo}
            className={`${
              !inputs.title
                ? 'cursor-not-allowed bg-blue-400'
                : 'bg-blue-600 hover:bg-blue-700'
            } text-center select-none p-2 outline-none rounded-sm font-medium text-sm h-fit w-fit text-white hover:text-gray-200`}
          >
            Add todo
          </button>
        </div>
      </motion.div>
    </Backdrop>
  );
};
