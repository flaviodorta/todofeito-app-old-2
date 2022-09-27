import { useDatePickerStore } from '../../zustand/stores';

export { Day } from './Day';
export { Month } from './Month';

export const DatePicker = (): JSX.Element => {
  const { lang, calendar } = useDatePickerStore((state) => state);
  console.log(lang);
  return (
    <div onClick={() => console.log(calendar.goToNextMonth())}>
      year: {calendar.yearNumber} month: {calendar.month.number}
    </div>
  );
};
