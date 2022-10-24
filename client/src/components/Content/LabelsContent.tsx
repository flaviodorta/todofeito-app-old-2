import { useState } from 'react';
import { IProject, ITodo } from '../../helpers/types';
import { useTodosStore } from '../../zustand';
import { ContentContainer } from './ContentContainer';

export const LabelsContent = () => {
  const { labels } = useTodosStore();

  const todos = labels.reduce(
    (acc, label) => [...acc, ...label.todos],
    [] as ITodo[]
  );

  const [labelsTodos, setTodos] = useState(todos);

  const labelsProject: IProject = {
    id: 'labels',
    name: 'Labels',
    color: {
      name: 'Blue',
      class: 'fill-blue-600',
    },
  };

  const Heading = () => (
    <div className='flex items-center gap-2  md:w-[768px] md:max-w-[768px] md:min-w-[768px]'>
      <h2 className='font-bold text-xl'>Labels</h2>
    </div>
  );

  return (
    <ContentContainer
      heading={<Heading />}
      todos={labelsTodos}
      setTodos={setTodos}
      project={labelsProject}
    ></ContentContainer>
  );
};
