import React, { useState } from 'react';
import { useToggle } from '../../hooks/useToggle';
import { useUIStore, useUserStore } from '../../zustand';
import { AddTodoItem } from '../AddTodoItem';
import { PlusSolidIcon } from '../Icons';
import { TodoItem } from '../TodoItem';
import {
  DragDropContext,
  DropResult,
  Droppable,
  Draggable,
  DragStart,
} from 'react-beautiful-dnd';
import { isEmpty } from 'lodash';
import { motion } from 'framer-motion';
import { TodosList } from '../TodosList';

export const Today = () => {
  const { isEditingTodo, isSidebarOpen } = useUIStore();
  const { todos } = useUserStore();

  const date = new Date();
  const month = date.toLocaleString('en', { month: 'short' });
  const dayOfWeek = date.toLocaleString('en', {
    weekday: 'short',
  });
  const dayOfMonth = date.getDate();

  const [isAddTodoItemOpen, toggleAddTodoItem] = useToggle(false);

  return (
    <div className='h-full flex justify-center bg-white'>
      <motion.div
        initial={false}
        animate={isSidebarOpen ? { x: 0 } : { x: -48 }}
        transition={{ duration: 0.2, bounce: 0 }}
        className='max-w-[44rem] w-[44rem] align-bottom px-4 py-6 flex flex-col bg-white'
      >
        <div className='mb-6 flex items-center gap-2'>
          <h2 className='font-bold text-xl'>Today</h2>
          <p className='text-gray-700 text-xs relative top-[3px]'>
            {dayOfWeek} {month} {dayOfMonth}
          </p>
        </div>

        <TodosList todos={todos.today} />

        {/* <div onClick={openAddTodoItem} className='flex-center'> */}
        {isAddTodoItemOpen && !isEditingTodo ? (
          <AddTodoItem
            close={toggleAddTodoItem}
            project={'today'}
            date={new Date()}
          />
        ) : (
          <div
            onClick={toggleAddTodoItem}
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
        {/* </div> */}
      </motion.div>
    </div>
  );
};
