import { isEqual } from 'lodash';
import { memo } from 'react';
import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from 'react-beautiful-dnd';
import { reorder } from '../../helpers/functions';
import { ITodo } from '../../helpers/types';
// import { useUIStore } from '../../zustand';
import { EditTodo } from '../EditTodo';
import { TodoItem } from './../TodoItem';

interface ITodosListProps {
  todos: ITodo[];
  setTodos: (todos: ITodo[]) => void;
  completeTodo: (todo: ITodo) => void;
  editTodo: (todo: ITodo) => void;
  setTodoInputOpenById: (id: string | null) => void;
  todoInputOpenById: string | null;
}

export const TodosListMemoized = ({
  todos,
  setTodos,
  completeTodo,
  editTodo,
  setTodoInputOpenById,
  todoInputOpenById,
}: ITodosListProps) => {
  const onDragEnd = (result: DropResult) => {
    const { destination, source } = result;

    if (!destination) return;

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    )
      return;

    setTodos(reorder(todos, source.index, destination.index));
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId='tasks'>
        {(droppableProvided, droppableSnapshot) => (
          <div
            ref={droppableProvided.innerRef}
            {...droppableProvided.droppableProps}
            className='relative flex flex-col'
          >
            {todos.map((todo, i) => (
              <Draggable key={todo.id} draggableId={todo.id} index={i}>
                {(draggableProvided, draggableSnapshot) => (
                  <div
                    ref={draggableProvided.innerRef}
                    {...draggableProvided.draggableProps}
                    style={
                      draggableProvided.draggableProps
                        .style as React.CSSProperties
                    }
                  >
                    {todoInputOpenById === todo.id ? (
                      <div className='w-full h-60'>
                        <EditTodo todo={todo} />
                      </div>
                    ) : (
                      <TodoItem
                        todo={todo}
                        completeTodo={completeTodo}
                        editTodo={editTodo}
                        setTodoInputOpenById={setTodoInputOpenById}
                        draggableProvided={draggableProvided}
                        draggableSnapshot={draggableSnapshot}
                      />
                    )}
                  </div>
                )}
              </Draggable>
            ))}

            {droppableProvided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

const todosListPropsAreEqual = (
  prevProps: Readonly<ITodosListProps>,
  nextProps: Readonly<ITodosListProps>
) => isEqual(prevProps.todos, nextProps.todos);

export const TodosList = memo(TodosListMemoized, todosListPropsAreEqual);
