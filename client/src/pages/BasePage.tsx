import { DatePicker } from '../components/DatePicker';
import { TodayTodos } from '../components/Todos/TodayTodos';
import { useUIStore } from '../zustand';

export const BasePage = ({ activePage }: { activePage: string }) => {
  const { isDatePickerOpen, dropdownPosition } = useUIStore();
  console.log(dropdownPosition.x);

  return (
    <>
      <TodayTodos />

      {isDatePickerOpen && (
        <DatePicker
          left={dropdownPosition.x}
          top={dropdownPosition.y}
          className={`z-[100] absolute w-60 h-fit `}
        />
      )}
    </>
  );
};
