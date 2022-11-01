// OK!

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
  onKeyUpEnter,
} from '../helpers/functions';
import { Fragment, useEffect, useRef, useState } from 'react';
import { LabelAddTodoModal } from './LabelAddTodoModal';
import { DatePicker } from './DatePicker';
import { SelectProject } from './Selects/SelectProject';
import { SelectLabel } from './Selects/SelectLabel';
import { SelectPriority } from './Selects/SelectPriority';
import { labelColors, labelHoverColors } from '../helpers/constants';
import { ILabel, IProject, IRenderableElements, ITodo } from '../helpers/types';
import { useTodosStore } from '../zustand';
import { useDimensions } from '../hooks/useDimensions';

interface IEditTodoProps {
  todo: ITodo;
  setTodoInputOpenById: (id: string | null) => void;
}

export const EditTodo = ({ todo, setTodoInputOpenById }: IEditTodoProps) => {
  const { id, title, description, section, date, project, priority, labels } =
    todo;
  const { editTodo } = useTodosStore();

  const [inputs, setInputs] = useState({
    title,
    description,
    date,
    project,
    labels,
    priority,
  });

  const [renderedSelect, setRenderedSelect] =
    useState<IRenderableElements>(null);

  // centerlize select
  const containerRef = useRef<HTMLDivElement>(null!);

  const [dueDateSizes, dueDateRef] = useDimensions({ parentRef: containerRef });
  const [projectsSizes, projectsRef] = useDimensions({
    parentRef: containerRef,
  });
  const [labelsSizes, labelsRef] = useDimensions({ parentRef: containerRef });
  const [prioritySizes, priorityRef] = useDimensions({
    parentRef: containerRef,
  });

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

  const editedTodo: ITodo = {
    id,
    title: inputs.title,
    description: inputs.description,

    date: inputs.date,
    priority: inputs.priority,
    project: inputs.project,
    section: section ? section : undefined,
    labels: inputs.labels,

    isCompleted: false,
  };

  const sendEditedTodo = () => {
    if (!inputs.title) return;

    editTodo(editedTodo);

    setTodoInputOpenById(null);
  };

  const close = () => setTodoInputOpenById(null);

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

  const titleInputRef = useRef<HTMLInputElement>(null);

  const sendTodoOnKeyUpEnter = onKeyUpEnter(sendEditedTodo, titleInputRef);

  useEffect(() => {
    titleInputRef?.current?.focus();
  }, []);

  useEffect(() => {
    if (!containerRef?.current) return;

    containerRef.current.scrollIntoView({ behavior: 'smooth' });
  }, [renderedSelect]);

  return (
    <>
      <div
        ref={containerRef}
        className={`${renderedSelect ? 'mb-80' : 'mb-0'} h-fit w-full`}
      >
        <div className='border-gray-300 p-4 bg-white border-[1px] flex flex-col gap-4 h-fit w-full rounded-sm'>
          {/* checkeds labels */}
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
            className='break-words w-full select-none outline-none font-medium placeholder:font-medium placeholder:text-gray-400'
          />

          <Textarea
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
                    closeSelect={closeSelect}
                    inputedDate={inputs.date}
                    setDate={setDate}
                    className='left-24 sm:left-24'
                    sizes={dueDateSizes}
                  />
                )}
              </div>

              {/* project select */}
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
                  {inputs.project.name}
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

            {/* label and priority select */}
            <div className='flex gap-2'>
              {/* label select */}
              <div
                ref={labelsRef}
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
                } group relative h-7 w-7 flex items-center justify-center hover:bg-gray-200 duration-100`}
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
        </div>
        <div className='mt-2 flex w-full justify-end gap-2'>
          <button
            onClick={close}
            className='text-center select-none p-2 outline-none rounded-sm font-medium text-sm h-fit w-fit bg-gray-200 hover:bg-gray-300 hover:text-700 text-gray-600'
          >
            Cancel
          </button>
          <button
            onClick={sendEditedTodo}
            className={`${
              !inputs.title
                ? 'cursor-not-allowed bg-blue-400'
                : 'bg-blue-600 hover:bg-blue-700'
            } text-center select-none p-2 outline-none rounded-sm font-medium text-sm h-fit w-16 text-white hover:text-gray-200`}
          >
            Save
          </button>
        </div>
      </div>
    </>
  );
};
