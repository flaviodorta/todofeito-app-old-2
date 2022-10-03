import Textarea from 'react-expanding-textarea';
import {
  CalendarRegularIcon,
  FlagSolidIcon,
  InboxSolidIcon,
  LabelIcon,
} from './Icons';
import { useIsomorphicLayoutEffect } from '../hooks/useIsomorphicLayoutEffect';
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
import { IRenderableElements } from '../helpers/types';
import { useDimensions } from '../hooks/useDimensions';

interface IAddTodoItemProps {
  close: () => void;
}

export const AddTodoItem = (props: IAddTodoItemProps) => {
  const { close } = props;

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [selectedProject, setSelectedProject] = useState('');
  const [selectedPriority, setSelectedPriority] = useState(4);
  const [labels, setLabels] = useState<string[]>([
    'label 1 as dsa asdasasd as <dsasda></dsasda>',
    'label 2 asd dsa dsa das ads asas asd ',
    'label 3d asdsa as sd asd asd as das as das sa',
    'label 4 das dsa asd asd asd sdsad as sad asd ',
    'label  dasd sadsa da sd asdsa dsa as da sdsa5',
  ]);
  const [checkedLabels, setCheckedLabels] = useState<string[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [renderedSelect, setRenderedSelect] =
    useState<IRenderableElements>(null);

  const dueDateRef = useRef<HTMLDivElement>(null);

  const addLabel = (label: string) =>
    setLabels((state) => sortAlphabetic([...state, label]));

  const removeLabel = (label: string) =>
    setLabels((state) =>
      state.filter((removedLabel) => label !== removedLabel)
    );
  const addCheckedLabel = (label: string) =>
    setCheckedLabels((state) => sortAlphabetic([...state, label]));

  const removeCheckedLabel = (label: string) =>
    setCheckedLabels((state) =>
      state.filter((removedLabel) => label !== removedLabel)
    );

  const sendTodo = () => {
    // send data to the server
  };

  const closeSelect = () => {
    setRenderedSelect(null);
    console.log('cu');
  };

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

  const monthNameShort = getMonthName(selectedDate, language).substring(0, 3);

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
          {checkedLabels.length > 0 && (
            <div className='w-full flex-wrap h-fit gap-1 flex justify-start'>
              {checkedLabels.map((label, i) => (
                <Fragment key={i}>
                  <LabelAddTodoModal label={label} />
                </Fragment>
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
                  {selectedDate
                    ? `${monthNameShort} ${getDayNumberInMonth(selectedDate)}`
                    : 'Due date'}
                </span>

                {renderedSelect === 'date-picker' && (
                  <DatePicker
                    closeSelect={closeSelect}
                    selectedDate={selectedDate}
                    setSelectedDate={setSelectedDate}
                    parentRef={dueDateRef}
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
                  {selectedProject ? selectedProject : 'Inbox'}
                </span>

                {renderedSelect === 'project-select' && (
                  <SelectProject
                    projects={projects}
                    selectedProject={selectedProject}
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
                    checkedLabels={checkedLabels}
                    addCheckedLabel={addCheckedLabel}
                    removeCheckedLabel={removeCheckedLabel}
                    labels={labels}
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
                  className={`${labelColors[selectedPriority]} ${labelHoverColors[selectedPriority]} duration-100`}
                />

                {renderedSelect === 'priority-select' && (
                  <SelectPriority
                    selectedPriority={selectedPriority}
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
              !title
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
