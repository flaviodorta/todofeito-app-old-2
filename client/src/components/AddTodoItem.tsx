import { useCalendarStore } from '../zustand';
import Textarea from 'react-expanding-textarea';
import {
  CalendarRegularIcon,
  FlagSolidIcon,
  InboxSolidIcon,
  LabelIcon,
} from './Icons';
import { useIsomorphicLayoutEffect } from '../hooks/useIsomorphicLayoutEffect';
import { useDimensions } from '../hooks/useDimensions';
import {
  getDayNumberInMonth,
  getMonthName,
  sortAlphabetic,
} from '../helpers/functions';
import { useEffect, useState } from 'react';
import { LabelAddTodoModal } from './LabelAddTodoModal';
import { DatePicker } from './DatePicker';
import { SelectProject } from './Selects/SelectProject';
import { SelectLabel } from './Selects/SelectLabel';
import { SelectPriority } from './Selects/SelectPriority';
import { labelColors, labelHoverColors } from '../helpers/constants';
import { IPriorityLabelColors, IRenderableElements } from '../helpers/types';

export type IRenderedElement =
  | 'date-picker-select'
  | 'project'
  | 'label'
  | 'priority'
  | null;

export interface IAddTodoInputs {
  title: string;
  description: string;
  project: string;
  labels: string[];
  priority: number | null;
  priorityLabelColor: IPriorityLabelColors;
}

export const AddTodoItem = () => {
  const { selectedDay, lang } = useCalendarStore();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [selectedProject, setSelectedProject] = useState('');
  const [selectedPriority, setSelectedPriority] = useState(4);
  const [labels, setLabels] = useState<string[]>([
    'label 1',
    'label 2',
    'label 3',
    'label 4',
    'label 5',
  ]);
  const [checkedLabels, setCheckedLabels] = useState<string[]>([]);

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

  // need to be a complex state beacuse states changes simutaneous
  const [renderedSelect, setRenderedSelect] = useState<{
    type: IRenderableElements;
    position: { x: number; y: number };
  }>({
    type: null,
    position: {
      x: 0,
      y: 0,
    },
  });

  const monthNameShort = getMonthName(selectedDay, lang).substring(0, 3);

  const [dueDateDimensions, dueDateRef] = useDimensions<HTMLDivElement>();
  const [projectDimensions, projectRef] = useDimensions<HTMLDivElement>();
  const [labelDimensions, labelRef] = useDimensions<HTMLDivElement>();
  const [priorityDimensions, priorityRef] = useDimensions<HTMLDivElement>();

  const onClickAddTodoButton = () => {
    // send data to the server
  };

  const onClickDueData = () =>
    setRenderedSelect({
      type: 'date-picker-select',
      position: {
        x: dueDateDimensions.x + dueDateDimensions.width / 2,
        y: dueDateDimensions.y + dueDateDimensions.height,
      },
    });

  useEffect(() => console.log(renderedSelect));

  const onClickProject = () =>
    setRenderedSelect({
      position: {
        x: projectDimensions.x + projectDimensions.width / 2,
        y: projectDimensions.y + projectDimensions.height,
      },
      type: 'project-select',
    });

  const onClickLabel = () =>
    setRenderedSelect({
      position: {
        x: labelDimensions.x + labelDimensions.width / 2,
        y: labelDimensions.y + labelDimensions.height,
      },
      type: 'label-select',
    });

  const onClickPriority = () =>
    setRenderedSelect({
      position: {
        x: priorityDimensions.x + priorityDimensions.width / 2,
        y: priorityDimensions.y + priorityDimensions.height,
      },
      type: 'priority-select',
    });

  // const onClickCloseAddTodoModal = () => setElement('add-todo');

  // set new measures when window sizes changes
  useIsomorphicLayoutEffect(() => {
    if (renderedSelect.type === 'date-picker-select')
      setRenderedSelect((state) => ({
        ...state,
        position: {
          x: dueDateDimensions.x + dueDateDimensions.width / 2,
          y: dueDateDimensions.y + dueDateDimensions.height,
        },
      }));

    if (renderedSelect.type === 'project-select')
      setRenderedSelect((state) => ({
        ...state,
        position: {
          x: projectDimensions.x + projectDimensions.width / 2,
          y: projectDimensions.y + projectDimensions.height,
        },
      }));

    if (renderedSelect.type === 'label-select')
      setRenderedSelect((state) => ({
        ...state,
        position: {
          x: labelDimensions.x + labelDimensions.width / 2,
          y: labelDimensions.y + labelDimensions.height,
        },
      }));

    if (renderedSelect.type === 'priority-select')
      setRenderedSelect((state) => ({
        ...state,
        position: {
          x: priorityDimensions.x + priorityDimensions.width / 2,
          y: priorityDimensions.y + priorityDimensions.height,
        },
      }));

    return () => console.log(renderedSelect.position);
  }, [
    dueDateDimensions,
    projectDimensions,
    labelDimensions,
    priorityDimensions,
  ]);

  const projects = [
    'projeto 1',
    'projeto 2 asdasdas asd asd asd asd asdassd',
    'projeto 3',
    'projeto 4',
    'projeto 5',
    'projeto 6',
  ];

  const handleCloseSelect = () =>
    setRenderedSelect((state) => ({ ...state, type: null }));

  return (
    <>
      {renderedSelect.type === 'date-picker-select' && (
        <DatePicker
          left={renderedSelect.position.x}
          top={renderedSelect.position.y}
          renderedElement={renderedSelect.type}
          className={`z-[100] absolute w-60 h-fit `}
          handleCloseSelect={handleCloseSelect}
        />
      )}

      {renderedSelect.type === 'project-select' && (
        <SelectProject
          projects={projects}
          className='top-10'
          left={renderedSelect.position.x}
          top={renderedSelect.position.y}
          selectedProject={selectedProject}
          setSelectedProject={setSelectedProject}
          handleCloseSelect={handleCloseSelect}
        />
      )}

      {renderedSelect.type === 'label-select' && (
        <SelectLabel
          left={renderedSelect.position.x}
          top={renderedSelect.position.y}
          labels={labels}
          checkedLabels={checkedLabels}
          addCheckedLabel={addCheckedLabel}
          removeCheckedLabel={removeCheckedLabel}
          handleCloseSelect={handleCloseSelect}
          addLabel={addLabel}
          removeLabel={removeLabel}
        />
      )}

      {renderedSelect.type === 'priority-select' && (
        <SelectPriority
          left={renderedSelect.position.x}
          top={renderedSelect.position.y}
          selectedPriority={selectedPriority}
          setSelectedPriority={setSelectedPriority}
          handleCloseSelect={handleCloseSelect}
        />
      )}

      <div className='h-fit w-full'>
        <div className='border-gray-200 bg-white border-[1px] p-4 flex flex-col gap-4 h-fit w-full rounded-sm'>
          {checkedLabels.length > 0 && (
            <div className='w-full flex-wrap h-fit gap-1 flex justify-start'>
              {checkedLabels.map((label) => (
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
          <div className='flex items-center justify-between'>
            <div className='flex gap-2 flex-wrap'>
              {/* select date */}
              <div
                ref={dueDateRef}
                onClick={onClickDueData}
                className={`${
                  renderedSelect.type === 'date-picker-select' && 'bg-gray-200'
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
                  renderedSelect.type === 'project-select' && 'bg-gray-200'
                } w-22 select-none relative flex gap-1 p-1.5 text-gray-800 tracking-wide cursor-pointer items-center border-[1px] border-gray-300 rounded-sm`}
              >
                <InboxSolidIcon
                  width='11px'
                  height='11px'
                  className='fill-sky-600 -translate-y-[1px]'
                />
                <span className='text-xs capitalize'>
                  {selectedProject ? selectedProject : 'Inbox'}
                </span>
              </div>
            </div>

            <div className='flex gap-2'>
              <div
                ref={labelRef}
                onClick={onClickLabel}
                className={`${
                  renderedSelect.type === 'label-select' && 'bg-gray-200'
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
                  renderedSelect.type === 'priority-select' && 'bg-gray-200'
                } group cursor-pointer h-7 w-7 flex items-center justify-center hover:bg-gray-200 duration-100`}
              >
                <FlagSolidIcon
                  height='15px'
                  width='15px'
                  className={`${labelColors[selectedPriority]} ${labelHoverColors[selectedPriority]}  duration-100`}
                />
              </div>
            </div>
          </div>
        </div>
        <div className='mt-2 flex w-full justify-end gap-2'>
          <button
            // onClick={onClickCloseAddTodoModal}
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
      </div>
    </>
  );
};
