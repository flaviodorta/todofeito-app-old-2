import { DatePicker } from '../components/DatePicker';
import { TodayTodos } from '../components/Todos/TodayTodos';
import { useUIStore } from '../zustand';

export const BasePage = ({ activePage }: { activePage: string }) => {
  const { isDatePickerOpen, dropdownPosition } = useUIStore();
  console.log(dropdownPosition.x);
  const x = 755;
  const y = 414;
  return (
    <>
      <TodayTodos />

      {isDatePickerOpen && (
        <DatePicker
          className={`left-[${dropdownPosition.x}px] top-[${dropdownPosition.y}px] z-[100] absolute w-60 h-fit `}
        />
      )}
    </>
  );
};
