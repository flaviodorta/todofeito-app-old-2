import { useState } from 'react';
import { ITodo } from '../helpers/types';
import { useToggle } from '../hooks/useToggle';
import { useUserStore } from '../zustand';
import { InboxSolidIcon } from './Icons';
import { motion } from 'framer-motion';

export const TodoItem = ({ todo }: { todo: ITodo }) => {
  const { completeTodo } = useUserStore();
  const [checked, setChecked] = useState(todo.completed);

  const checkTodo = () => {
    setChecked(true);
    setTimeout(() => {
      completeTodo(todo.id);
    }, 200);
  };

  return (
    <>
      <div className='w-full h-fit p-2' key={todo.id}>
        <div className='flex items-center w-full'>
          <motion.input
            animate={checked ? { scale: [1, 1.3, 1] } : {}}
            transition={{ duration: 0.2 }}
            key={todo.id}
            checked={checked}
            onChange={checkTodo}
            type='checkbox'
            className='w-4 h-4 mr-2 outline-none'
          />
          <div className='flex flex-col'>
            <span className='text-sm w-full'>{todo.title}</span>
            <span className='w-full text-xs text-gray-600'>
              {todo.description.substring(0, 50)}
              {todo.description.length > 50 ? '...' : ''}
            </span>
          </div>
        </div>
        <div className='w-full gap-1 flex justify-end items-center h-fit text-xs color-gray-400'>
          <span className='capitalize'>{todo.project}</span>
          <InboxSolidIcon className='fill-blue-600 w-3 h-3' />
        </div>
      </div>
      <hr className='mb-2' />
    </>
  );
};
