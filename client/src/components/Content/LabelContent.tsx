import { omit } from 'lodash';
import { nanoid } from 'nanoid';
import { useCallback, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { ILabel, ITodo } from '../../helpers/types';
import { useTodosStore } from '../../zustand';
import { AddTodo } from '../AddTodo';
import { ArrowLeftLongSolidIcon, PlusSolidIcon } from '../Icons';
import { TodosList } from '../Lists/TodosList';
import { ContentContainer } from './ContentContainer';

export const LabelContent = () => {
  const { labels, editTodo, completeTodo, addTodo, setTodosByProject } =
    useTodosStore();

  const params = useParams();
  const navigate = useNavigate();

  const [todoInputOpenById, setTodoInputOpenById] = useState<string | null>(
    null
  );

  const label = useMemo(
    () => labels.filter((label) => label.id === params.labelId)[0],
    [labels]
  );

  const todos = useMemo(
    () =>
      labels
        .filter((label) => label.id === params.labelId)[0]
        .todos.filter((todo) => !todo.isCompleted && !todo.section),
    [labels]
  );

  const id = nanoid();
  const addTodoId = useRef(id);

  const openAddTodo = () => setTodoInputOpenById(addTodoId.current);

  const labelInfo: ILabel[] = [omit(label, 'todos')];

  const setTodos = useCallback((todos: ITodo[]) => {
    setTodosByProject({
      ...label,
      todos,
    });
  }, []);

  const Heading = () => (
    <div className='flex items-center gap-2'>
      <button
        onClick={() => navigate(-1)}
        className='group relative h-7 w-7 flex items-center justify-center hover:bg-gray-200 duration-100'
      >
        <ArrowLeftLongSolidIcon className='fill-gray-400 group-hover:fill-gray-500 h-5 w-5' />
      </button>
      <h2 className='font-bold text-xl'>{label.name}</h2>
    </div>
  );

  return (
    <ContentContainer todos={todos} setTodos={setTodos} heading={<Heading />}>
      <div className='w-full px-9 md:px-0'>
        <TodosList
          todos={todos}
          setTodos={setTodos}
          completeTodo={completeTodo}
          editTodo={editTodo}
          setTodoInputOpenById={setTodoInputOpenById}
          todoInputOpenById={todoInputOpenById}
        />

        <div className='mb-6'>
          {todoInputOpenById === addTodoId.current ? (
            <AddTodo
              labels={labelInfo}
              setTodoInputOpenById={setTodoInputOpenById}
              addTodo={addTodo}
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
    </ContentContainer>
  );
};
