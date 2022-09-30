import { DatePicker } from '../components/DatePicker';
import { TodayTodos } from '../components/Content/TodayTodos';
import { useUIStore } from '../zustand';
import {
  SelectProject,
  SelectProjectOption,
} from '../components/Selects/SelectProject';
import {
  SelectLabel,
  SelectLabelOption,
} from '../components/Selects/SelectLabel';
import {
  SelectPriority,
  SelectPriorityOption,
} from '../components/Selects/SelectPriority';
import { Fragment } from 'react';

export const BasePage = ({ activePage }: { activePage: string }) => {
  const { dropdownPosition, isElementRendered: isSelectShow } = useUIStore();

  const projects = [
    'projeto 1',
    'projeto 2',
    'projeto 3',
    'projeto 4',
    'projeto 5',
    'projeto 6',
  ];
  const labels = [
    'label 1',
    'label 2',
    'label 3',
    'label 4',
    'label 5',
    'label 6',
  ];
  const colors = ['red', 'yellow', 'blue', 'white'];

  return (
    <>
      <TodayTodos />

      {isSelectShow('date-picker') && (
        <DatePicker
          left={dropdownPosition.x}
          top={dropdownPosition.y}
          className={`z-[100] absolute w-60 h-fit `}
        />
      )}

      {isSelectShow('project') && (
        <SelectProject left={dropdownPosition.x} top={dropdownPosition.y}>
          {projects.map((project, i) => (
            <Fragment key={i}>
              <SelectProjectOption content={project} />
            </Fragment>
          ))}
        </SelectProject>
      )}

      {isSelectShow('label') && (
        <SelectLabel left={dropdownPosition.x} top={dropdownPosition.y}>
          {projects.map((project, i) => (
            <Fragment key={i}>
              <SelectLabelOption content={project} />
            </Fragment>
          ))}
        </SelectLabel>
      )}

      {isSelectShow('priority') && (
        <SelectPriority left={dropdownPosition.x} top={dropdownPosition.y}>
          {colors.map((color, i) => (
            <Fragment key={i}>
              <SelectPriorityOption content={color} flagColor={color} />
            </Fragment>
          ))}
        </SelectPriority>
      )}
    </>
  );
};
