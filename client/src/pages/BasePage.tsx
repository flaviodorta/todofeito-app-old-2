import { DatePicker } from '../components/DatePicker';
import { TodayTodos } from '../components/Content/TodayTodos';
import { useUIStore } from '../zustand';
import {
  SelectProjectDropdown,
  SelectProjectOption,
} from '../components/Selects/SelectProjectDropdown';
import {
  SelectLabelDropdown,
  SelectLabelOption,
} from '../components/Selects/SelectLabelDropdown';
import {
  SelectPriorityDropdown,
  SelectPriorityOption,
} from '../components/Selects/SelectPriorityDropdown';

export const BasePage = ({ activePage }: { activePage: string }) => {
  const { dropdownPosition, selectsDropdowns, isSelectShow } = useUIStore();
  console.log(dropdownPosition.x);
  const projects = [
    'projeto 1',
    'projeto 2',
    'projeto 3',
    'projeto 4',
    'projeto 5',
    'projeto 6',
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
        <SelectProjectDropdown
          left={dropdownPosition.x}
          top={dropdownPosition.y}
        >
          {projects.map((project) => (
            <SelectProjectOption text={project} />
          ))}
        </SelectProjectDropdown>
      )}

      {isSelectShow('label') && (
        <SelectLabelDropdown left={dropdownPosition.x} top={dropdownPosition.y}>
          {projects.map((project) => (
            <SelectLabelOption text={project} />
          ))}
        </SelectLabelDropdown>
      )}

      {isSelectShow('priority') && (
        <SelectPriorityDropdown
          left={dropdownPosition.x}
          top={dropdownPosition.y}
        >
          {colors.map((color) => (
            <SelectPriorityOption text={color} flagColor={color} />
          ))}
        </SelectPriorityDropdown>
      )}
    </>
  );
};
