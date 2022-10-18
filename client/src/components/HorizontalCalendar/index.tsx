import { getMonth } from 'date-fns';
import { useState } from 'react';
import {
  getDayNameInWeek,
  getDayNumberInMonth,
  getYearNumber,
  sortDaysByWeekOrder,
} from '../../helpers/functions';
import { IDay } from '../../helpers/types';
// import { Week } from './Day';

export const HorizontalCalendar = () => {
  const lang = window.navigator.language || 'default';
  const today = new Date();

  const [selectedDay, setSelectedDay] = useState(today);
  const [days, setDays] = useState<IDay[]>([]);

  const currentYear = getYearNumber(today);
  const currentDay: IDay = {
    numberInMonth: getDayNumberInMonth(selectedDay),
    nameInWeek: getDayNameInWeek(selectedDay, lang),
  };

  const weekDays = Array.from({ length: 7 }).map(
    (_, i) => new Date(currentYear, currentYear, currentDay.numberInMonth + i)
  );
  const weekDaysNamesSorted = sortDaysByWeekOrder(weekDays).map((date) =>
    getDayNameInWeek(date, lang)
  );

  const createWeekDays = (date: Date, lang: string) => {
    const arr: IDay[] = Array.from({ length: 7 });

    const year = getYearNumber(date);
    const month = getMonth(date);
    const day = getDayNumberInMonth(date);

    const numberInWeek = weekDaysNamesSorted.findIndex(
      (day) => day === getDayNameInWeek(date, lang)
    );

    console.log('number in week: ', numberInWeek);

    setDays([
      {
        numberInMonth: getDayNumberInMonth(date),
        nameInWeek: getDayNameInWeek(date, lang),
      },
    ]);

    Array.from({ length: numberInWeek }).forEach((_, idx) => {
      console.log('back: ', idx);
      setDays((days) => [
        {
          numberInMonth: getDayNumberInMonth(
            new Date(year, month, day - idx - 1)
          ),
          nameInWeek: getDayNameInWeek(
            new Date(year, month, day - idx - 1),
            lang
          ),
        },
        ...days,
      ]);
    });

    Array.from({ length: 7 - numberInWeek - 1 }).forEach((_, idx) => {
      console.log('front: ', idx + numberInWeek + 1);
      setDays((days) => [
        ...days,
        {
          numberInMonth: getDayNumberInMonth(
            new Date(year, month, day + idx + numberInWeek + 1)
          ),
          nameInWeek: getDayNameInWeek(
            new Date(year, month, day + idx + numberInWeek + 1),
            lang
          ),
        },
      ]);
      console.log(arr);
    });
    console.log(days);
  };

  console.log(createWeekDays(selectedDay, lang));
  // console.log(currentDay.nameInWeek);
  // console.log(
  //   weekDaysNamesSorted.findIndex((day) => day === currentDay.nameInWeek)
  // );

  // const [days, setDays] = useState<Date[]>([]);

  return (
    <div className='grid grid-cols-7 w-full auto-cols-max bg-green-600'>
      <div className='flex-center'>
        <span className='w-fit h-fit'>Day</span>
      </div>
      <div className='flex-center h-12'>
        <span className='w-fit h-fit'>Day</span>
      </div>
      <div className='flex-center h-12'>
        <span className='w-fit h-fit'>Day</span>
      </div>
      <div className='flex-center h-12'>
        <span className='w-fit h-fit'>Day</span>
      </div>
      <div className='flex-center h-12'>
        <span className='w-fit h-fit'>Day</span>
      </div>
      <div className='flex-center h-12'>
        <span className='w-fit h-fit'>Day</span>
      </div>
      <div className='flex-center h-12'>
        <span className='w-fit h-fit'>Day</span>
      </div>
    </div>
  );
};
