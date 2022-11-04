import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getDatasByIds } from '../../helpers/functions';
import { ITodo } from '../../helpers/types';
import { useTodosStore, useUIStore } from '../../zustand';
import { TodoItem } from '../TodoItem';
import { ContentContainer } from './ContentContainer';

export const SearchResultsContent = () => {
  const { searchedText } = useParams();
  const { searchedInputs } = useUIStore();
  const { completeTodo, editTodo, todos } = useTodosStore();

  const [todoInputOpenById, setTodoInputOpenById] = useState<string | null>(
    null
  );

  const searchTextRegExp = new RegExp(searchedInputs.recentSearches[0]);

  const searchedTodos = todos.filter((todo) =>
    searchTextRegExp.test(todo.title)
  );

  const Heading = () => (
    <div className='flex items-center gap-2'>
      <h2 className='font-bold text-xl'>Results for "{searchedText}"...</h2>
    </div>
  );

  return (
    <ContentContainer heading={<Heading />}>
      {searchedTodos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          setTodoInputOpenById={setTodoInputOpenById}
          completeTodo={completeTodo}
          editTodo={editTodo}
          todoInputOpenById={todoInputOpenById}
          isDraggableDisabled={true}
        />
      ))}
    </ContentContainer>
  );
};
