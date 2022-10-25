import { nanoid } from 'nanoid';
import { useState } from 'react';
import { IProject, ISection, ITodo } from '../../helpers/types';
import { useToggle } from '../../hooks/useToggle';
import { useTodosStore, useUIStore } from '../../zustand';
import { AddTodo } from '../AddTodo';
import { ChevronIcon, PlusSolidIcon } from '../Icons';
import { TodosList } from '../Lists/TodosList';

interface IUpcomingTodosSection {
  section: { id: string; name: string; date: Date; todos: ITodo[] };
}

export const UpcomingTodosSection = ({ section }: IUpcomingTodosSection) => {
  const { todoInputOpenById, setTodoInputOpenById } = useUIStore();
  const { sections } = useTodosStore();

  const [isTodoListOpen, toggleTodoListOpen] = useToggle(false);

  const [todos, setTodos] = useState(section.todos);

  const todoInputId = nanoid();

  const openAddTodo = () => setTodoInputOpenById(todoInputId);
  const closeAddTodo = () => setTodoInputOpenById(null);

  const toggleTodoList = () => {
    if (isTodoListOpen) closeAddTodo();
    toggleTodoListOpen();
  };

  const upcomingProject: IProject = {
    id: 'upcoming',
    name: 'Upcoming',
    color: {
      name: 'Blue',
      class: 'fill-blue-600',
    },
  };

  return (
    <div className='flex flex-col h-fit w-full'>
      <div className='sticky top-[151px] z-[2]'>
        <div className='relative flex justify-between items-center w-full text-sm  bg-white font-bold h-fit py-1 border-b-[1px] border-gray-300'>
          <span className='text-gray-500'>{section.name}</span>

          <span
            onClick={toggleTodoList}
            className='group absolute -left-7 top-[1.5px] cursor-pointer w-6 h-6 rounded-sm z-[2] bg-white hover:bg-gray-200 flex items-center justify-center'
          >
            <ChevronIcon
              className={`${
                isTodoListOpen ? '' : '-rotate-90'
              } w-[20px] h-[20px] stroke-gray-500 group-hover:stroke-gray-600 duration-150 transition-all`}
            />
          </span>
        </div>
      </div>

      {isTodoListOpen && (
        <div className='w-full h-fit'>
          <TodosList todos={todos} setTodos={setTodos} />
        </div>
      )}

      <div className='mt-3'>
        {todoInputOpenById === todoInputId ? (
          <AddTodo
            section={
              { id: section.id, index: 1, name: section.name } as ISection
            }
            project={upcomingProject}
          />
        ) : (
          <div
            onClick={openAddTodo}
            className='group w-full flex items-center gap-2.5 h-fit'
          >
            <span className='group p-0.5 rounded-full bg-white group-hover:bg-blue-600 flex-center'>
              <PlusSolidIcon className='stroke-[1px] fill-blue-600 group-hover:fill-white' />
            </span>
            <span className='font-light text-md text-gray-400 group-hover:text-blue-600'>
              Add task
            </span>
          </div>
        )}
      </div>
    </div>
  );
};
