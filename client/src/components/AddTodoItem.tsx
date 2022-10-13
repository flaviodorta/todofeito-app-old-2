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
import { Fragment, useRef, useState } from 'react';
import { LabelAddTodoModal } from './LabelAddTodoModal';
import { DatePicker } from './DatePicker';
import { SelectProject } from './Selects/SelectProject';
import { SelectLabel } from './Selects/SelectLabel';
import { SelectPriority } from './Selects/SelectPriority';
import { labelColors, labelHoverColors, language } from '../helpers/constants';
import { IRenderableElements, ITodo } from '../helpers/types';
import { useUserStore } from '../zustand';
import { nanoid } from 'nanoid';
import { useCallback } from 'react';

interface IAddTodoItemProps {
  close: () => void;
  title?: string;
  description?: string;
  selectedProject: string;
  selectedPriority?: number;
  labels?: string[];
  checkedLabels?: string[];
  selectedDate?: Date;
}

export const AddTodoItem = (props: IAddTodoItemProps) => {
  const {
    close,
    title,
    description,
    selectedProject,
    selectedPriority,
    selectedDate,
    checkedLabels,
    labels,
  } = props;
  const { addTodo } = useUserStore();

  const [inputs, setInputs] = useState({
    title: title ? title : '',
    description: description ? description : '',
    selectedProject,
    selectedPriority: selectedPriority ? selectedPriority : 4,
    selectedDate: selectedDate ? selectedDate : new Date(),
    labels: labels
      ? labels
      : [
          'label 1 as dsa asdasasd as sjdi 129 mksm 1982 edkmsakmdask',
          'label 2 asd dsa dsa das ads asas asd',
          'label 3 dasdsa as sd asd asd as das as das sa',
          'label 4 das dsa asd asd asd sdsad as sad asd ',
          'label 5 dasd sadsa da sd asdsa dsa as da sdsa5',
        ],
    checkedLabels: checkedLabels ? checkedLabels : [],
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

  const sendTodo = useCallback(() => {
    if (!inputs.title) return;

    const todo: ITodo = {
      id: nanoid(),
      title: inputs.title,
      description: inputs.description,
      date: inputs.selectedDate,
      labels: inputs.checkedLabels,
      priority: inputs.selectedPriority,
      project: inputs.selectedProject,
      checkedLabels: inputs.checkedLabels,
      completed: false,
    };

    addTodo(todo);

    resetInputs();
  }, [
    addTodo,
    inputs.title,
    inputs.description,
    inputs.selectedDate,
    inputs.checkedLabels,
    inputs.selectedPriority,
    inputs.selectedProject,
  ]);

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
  const setSelectedProject = (project: string) =>
    setInputs((state) => ({ ...state, project }));
  const setSelectedPriority = (priority: number) =>
    setInputs((state) => ({ ...state, priority }));
  const setSelectedDate = (date: Date) =>
    setInputs((state) => ({ ...state, date }));

  console.log(inputs);

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

  const projects = [
    'projeto 1',
    'projeto 2',
    'projeto 3',
    'projeto 4',
    'projeto 5',
    'projeto 6',
  ];
  return (
    <>
      <div className='h-fit w-full'>
        <div className='border-gray-200 bg-white border-[1px] p-4 flex flex-col gap-4 h-fit w-full rounded-sm'>
          {/* checkeds labels */}
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
            type='text'
            placeholder='Todo name'
            value={inputs.title}
            onChange={(e) => setTitle(e.target.value)}
            onKeyUp={sendTodoOnKeyUpEnter}
            className='break-words w-full select-none outline-none font-medium placeholder:font-medium placeholder:text-gray-400'
          />

          <Textarea
            ref={textareaRef}
            placeholder='Description'
            rows={2}
            value={inputs.description}
            onChange={(e) => setDescription(e.target.value)}
            className='w-full select-none text-sm outline-none resize-none placeholder:text-400 placeholder:text-sm'
          />

          {/* date and project selects */}
          <div className='flex items-center justify-between'>
            {/* select date */}
            <div className='flex gap-2 flex-wrap'>
              <div
                onClick={openDatePicker}
                ref={dueDateRef}
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
                    : 'Due date'}
                </span>

                {renderedSelect === 'date-picker' && (
                  <DatePicker
                    closeSelect={closeSelect}
                    selectedDate={inputs.selectedDate}
                    setSelectedDate={setSelectedDate}
                    parentRef={dueDateRef}
                    className='left-8'
                  />
                )}
              </div>

              {/* project select */}
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
                  {inputs.selectedProject}
                </span>

                {renderedSelect === 'project-select' && (
                  <SelectProject
                    projects={projects}
                    selectedProject={inputs.selectedProject}
                    setSelectedProject={setSelectedProject}
                    closeSelect={closeSelect}
                  />
                )}
              </div>
            </div>

            {/* label and priority select */}
            <div className='flex gap-2'>
              {/* label select */}
              <div
                onClick={openLabelsSelect}
                className={`${
                  renderedSelect === 'label-select'
                    ? 'bg-gray-200 cursor-default'
                    : 'cursor-pointer'
                } group relative h-7 w-7 flex items-center justify-center hover:bg-gray-200 duration-100`}
              >
                <LabelIcon
                  height='16px'
                  width='16px'
                  className='fill-gray-400 group-hover:fill-gray-500 duration-100'
                />

                {renderedSelect === 'label-select' && (
                  <SelectLabel
                    checkedLabels={inputs.checkedLabels}
                    addCheckedLabel={addCheckedLabel}
                    removeCheckedLabel={removeCheckedLabel}
                    labels={inputs.labels}
                    addLabel={addLabel}
                    removeLabel={removeLabel}
                    closeSelect={closeSelect}
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
                } group relative h-7 w-7 flex items-center justify-center hover:bg-gray-200 duration-100`}
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
        </div>
        <div className='mt-2 flex w-full justify-end gap-2'>
          <button
            onClick={close}
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
      </div>
    </>
  );
};
