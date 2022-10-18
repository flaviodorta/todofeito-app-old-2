import Textarea from 'react-expanding-textarea';
import {
  CalendarRegularIcon,
  FlagSolidIcon,
  InboxSolidIcon,
  LabelIcon,
} from './Icons';
import {
  getDayNumberInMonth,
  getMonthName,
  sortAlphabetic,
} from '../helpers/functions';
import { Fragment, useEffect, useRef, useState } from 'react';
import { LabelAddTodoModal } from './LabelAddTodoModal';
import { DatePicker } from './DatePicker';
import { SelectProject } from './Selects/SelectProject';
import { SelectLabel } from './Selects/SelectLabel';
import { SelectPriority } from './Selects/SelectPriority';
import { labelColors, labelHoverColors, language } from '../helpers/constants';
import { IRenderableElements, ITodo } from '../helpers/types';
import { Backdrop } from './Backdrop';
import { motion } from 'framer-motion';
import { addTodoModal } from '../helpers/variants';
import { nanoid } from 'nanoid';
import { useUserStore } from '../zustand';

interface IAddTodoModalProps {
  closeAddTodoModal: () => void;
}

export const AddTodoModal = (props: IAddTodoModalProps) => {
  const { closeAddTodoModal } = props;

  const { addTodo, projects } = useUserStore();

  const [inputs, setInputs] = useState({
    title: '',
    description: '',
    selectedProject: {
      id: 'inbox',
      name: 'inbox',
    },
    selectedPriority: 4,
    selectedDate: new Date(),
    labels: [
      'label 1 as dsa asdasasd as sjdi 129 mksm 1982 edkmsakmdask',
      'label 2 asd dsa dsa das ads asas asd',
      'label 3 dasdsa as sd asd asd as das as das sa',
      'label 4 das dsa asd asd asd sdsad as sad asd ',
      'label 5 dasd sadsa da sd asdsa dsa as da sdsa5',
    ],
    checkedLabels: [] as string[],
  });

  const [renderedSelect, setRenderedSelect] =
    useState<IRenderableElements>(null);

  // centerlize select
  const dueDateRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const addLabel = (label: string) =>
    setInputs((state) => ({
      ...state,
      labels: sortAlphabetic([...state.labels, label]),
    }));

  const removeLabel = (label: string) =>
    setInputs((state) => ({
      ...state,
      labels: state.labels.filter((removedLabel) => label !== removedLabel),
    }));

  const addCheckedLabel = (label: string) =>
    setInputs((state) => ({
      ...state,
      checkedLabels: sortAlphabetic([...state.checkedLabels, label]),
    }));

  const removeCheckedLabel = (label: string) =>
    setInputs((state) => ({
      ...state,
      checkedLabels: state.checkedLabels.filter(
        (removedLabel) => label !== removedLabel
      ),
    }));

  const resetInputs = () => {
    setInputs((state) => ({
      title: '',
      description: '',
      selectedProject: state.selectedProject,
      selectedPriority: 4,
      selectedDate: new Date(),
      checkedLabels: [],
      labels: state.labels,
    }));
  };

  const todo: ITodo = {
    id: nanoid(),
    title: inputs.title,
    description: inputs.description,
    date: inputs.selectedDate,
    labels: inputs.checkedLabels,
    priority: inputs.selectedPriority,
    project: inputs.selectedProject,
    checkedLabels: inputs.checkedLabels,
    isCompleted: false,
  };

  const sendTodo = () => {
    if (!inputs.title) return;

    addTodo(todo);

    resetInputs();

    closeAddTodoModal();
  };

  const closeSelect = () => setRenderedSelect(null);

  const openDatePicker = () => {
    if (!renderedSelect) setRenderedSelect('date-picker');
  };

  const openProjectSelect = () => {
    if (!renderedSelect) setRenderedSelect('project-select');
  };

  const openLabelsSelect = () => {
    if (!renderedSelect) setRenderedSelect('label-select');
  };

  const openPrioritySelect = () => {
    if (!renderedSelect) setRenderedSelect('priority-select');
  };

  const setTitle = (title: string) =>
    setInputs((state) => ({ ...state, title }));
  const setDescription = (description: string) =>
    setInputs((state) => ({ ...state, description }));
  const setSelectedProject = (selectedProjectName: string) =>
    setInputs((state) => ({
      ...state,
      selectedProject: { ...state.selectedProject, name: selectedProjectName },
    }));
  const setSelectedPriority = (selectedPriority: number) =>
    setInputs((state) => ({ ...state, selectedPriority }));
  const setSelectedDate = (selectedDate: Date) =>
    setInputs((state) => ({ ...state, selectedDate }));

  const monthNameShort = getMonthName(inputs.selectedDate, language).substring(
    0,
    3
  );

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

  const projectsNames = projects.map((project) => project.name);

  return (
    <>
      <Backdrop close={closeAddTodoModal} />

      <motion.div
        variants={addTodoModal}
        initial='initial'
        animate='animate'
        exit='exit'
        className='z-60 shadow-4xl border-gray-300 bg-white border-[1px] p-5 flex flex-col gap-4 fixed left-1/2 top-1/3 h-fit w-[90%] sm:w-[36rem] rounded-sm'
      >
        {/* labels checkeds */}
        {inputs.checkedLabels.length > 0 && (
          <div className='w-full flex-wrap h-fit gap-1 flex justify-start'>
            {inputs.checkedLabels.map((label, i) => (
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
                {inputs.selectedDate
                  ? `${monthNameShort} ${getDayNumberInMonth(
                      inputs.selectedDate
                    )}`
                  : 'Due data'}
              </span>

              {renderedSelect === 'date-picker' && (
                <DatePicker
                  className='left-28 sm:left-8'
                  closeSelect={closeSelect}
                  selectedDate={inputs.selectedDate}
                  setSelectedDate={setSelectedDate}
                  parentRef={dueDateRef}
                />
              )}
            </div>

            {/* select project */}
            <div
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
                {inputs.selectedProject.name
                  ? inputs.selectedProject.name
                  : 'Inbox'}
              </span>

              {renderedSelect === 'project-select' && (
                <SelectProject
                  projects={projectsNames}
                  selectedProject={inputs.selectedProject.name}
                  setSelectedProject={setSelectedProject}
                  closeSelect={closeSelect}
                />
              )}
            </div>
          </div>

          {/* label and priority select wrapper */}
          <div className='flex gap-2'>
            {/* label select */}
            <div
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
                  labels={inputs.labels}
                  checkedLabels={inputs.checkedLabels}
                  addCheckedLabel={addCheckedLabel}
                  removeCheckedLabel={removeCheckedLabel}
                  closeSelect={closeSelect}
                  addLabel={addLabel}
                  removeLabel={removeLabel}
                />
              )}
            </div>

            {/* priority select */}
            <div
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
                className={`${labelColors[inputs.selectedPriority]} ${
                  labelHoverColors[inputs.selectedPriority]
                } duration-100`}
              />

              {renderedSelect === 'priority-select' && (
                <SelectPriority
                  selectedPriority={inputs.selectedPriority}
                  setSelectedPriority={setSelectedPriority}
                  closeSelect={closeSelect}
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
    </>
  );
};
