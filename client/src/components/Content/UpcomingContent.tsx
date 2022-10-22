import { compareDesc, isEqual, isToday, isTomorrow } from 'date-fns';
import { nanoid } from 'nanoid';
import { useMemo, useState } from 'react';
import {
  capitalizeFirstLetter,
  getDayNameInWeek,
  getMonthName,
} from '../../helpers/functions';
import { ISection } from '../../helpers/types';
import { useIsomorphicLayoutEffect } from '../../hooks/useIsomorphicLayoutEffect';
import { useToggle } from '../../hooks/useToggle';
import { useUserStore } from '../../zustand';
import { HorizontalCalendar } from '../HorizontalCalendar';
import { TodosSection } from '../Sections/TodosSection';
import { UpcomingTodosSection } from '../Sections/UpcomingTodosSection';
import { ContentContainer } from './ContentContainer';

console.time('cu');
export const UpcomingContent = () => {
  const { todos: allTodos } = useUserStore();

  const allTodosNotCompleted = allTodos.filter(
    (todo) =>
      (compareDesc(todo.date as Date, new Date()) === -1 ||
        isEqual(todo.date as Date, new Date())) &&
      !todo.isCompleted
  );

  const today = new Date();
  const [selectedDate, setSelecteDate] = useState(today);

  const getDay = (year: number, month: number, day: number) =>
    new Date(year, month, day);

  console.time('time 1:');
  const sections = useMemo(
    () =>
      Array.from({ length: 365 * 2 }).map((_, i) => {
        const date = new Date(
          selectedDate.getFullYear(),
          selectedDate.getMonth(),
          selectedDate.getDate() + i
        );
        return {
          id: nanoid(),
          name: `${capitalizeFirstLetter(
            getMonthName(date).substring(0, 3)
          )}  ${date.getDate()} ${
            isToday(date) ? '‧ Today' : isTomorrow(date) ? '‧ Tomorrow' : ''
          } ‧ ${capitalizeFirstLetter(getDayNameInWeek(date))} `,
          todos: allTodosNotCompleted.filter((t) => t.date === date),
        } as ISection;
      }),
    [selectedDate]
  );
  console.timeEnd('time 1:');

  console.time('time 2:');
  const arr = useMemo(() => {
    const arr = [];

    for (let i = 0; i < 365 * 2; i++) {
      const date = new Date(
        selectedDate.getFullYear(),
        selectedDate.getMonth(),
        selectedDate.getDate() + i
      );

      arr.push({
        id: nanoid(),
        name: `${capitalizeFirstLetter(
          getMonthName(date).substring(0, 3)
        )}  ${date.getDate()} ${
          isToday(date) ? '‧ Today' : isTomorrow(date) ? '‧ Tomorrow' : ''
        } ‧ ${capitalizeFirstLetter(getDayNameInWeek(date))} `,
        todos: allTodosNotCompleted.filter((t) => t.date === date),
      } as ISection);
    }

    return arr;
  }, [selectedDate]);
  console.timeEnd('time 2:');

  // const sections = useMemo(
  //   () =>
  //     allTodosNotCompleted.map((todo) => {
  //       const date = todo.date;
  //       return {
  //         id: nanoid(),
  //         name: `${capitalizeFirstLetter(
  //           getMonthName(date).substring(0, 3)
  //         )} ${date.getDate()} ${
  //           isToday(date) ? '‧ Today' : isTomorrow(date) ? '‧ Tomorrow' : ''
  //         } ‧ ${capitalizeFirstLetter(getDayNameInWeek(date))} `,
  //         todos: allTodosNotCompleted.filter((t) => t.date === date),
  //       } as ISection;
  //     }),
  //   [allTodos]
  // );

  const [todos, setTodos] = useState(allTodosNotCompleted);

  const [hasAddSectionOpen, toggleHasAddSectionOpen] = useToggle(false);

  console.log(sections, allTodosNotCompleted);

  useIsomorphicLayoutEffect(() => {
    setTodos(allTodosNotCompleted);
  }, [allTodos]);

  return (
    <ContentContainer
      heading={
        <HorizontalCalendar
          selectedDate={selectedDate}
          setSelectedDate={setSelecteDate}
        />
      }
      todos={todos}
      setTodos={setTodos}
      project={{ id: 'upcoming', name: 'upcoming' }}
    >
      <div className='flex flex-col gap-8'>
        {arr.map((section) => (
          <UpcomingTodosSection
            section={section}
            hasAddSectionOpen={hasAddSectionOpen}
            toggleHasAddSectionOpen={toggleHasAddSectionOpen}
          />
        ))}
      </div>
    </ContentContainer>
  );
};
console.timeEnd('cu');
