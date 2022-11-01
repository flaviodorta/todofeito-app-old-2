import { isEqual } from 'lodash';
import { memo, useEffect, useRef, useState } from 'react';
import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from 'react-beautiful-dnd';
import { reorder } from '../../helpers/functions';
import { ITodo } from '../../helpers/types';
import { useUpdateState } from '../../hooks/useUpdateState';
import { EditTodo } from '../EditTodo';
import { TodoItem } from './../TodoItem';

interface ITodosListProps {
  droppableId: string;
  todos: ITodo[];
  todoInputOpenById: string | null;
  draggingElementId: string | null;
  completeTodo: (todo: ITodo) => void;
  editTodo: (todo: ITodo) => void;
  setTodoInputOpenById: (id: string | null) => void;
}

export const TodosListMemoized = ({
  droppableId,
  todos,
  todoInputOpenById,
  draggingElementId,
  completeTodo,
  editTodo,
  setTodoInputOpenById,
}: ITodosListProps) => {
  return (
    <Droppable droppableId={`${droppableId}`} type='TODOS'>
      {(droppableProvided, droppableSnapshot) =>
        todos.length === 0 ? (
          <div
            className={`${
              droppableSnapshot.isDraggingOver
                ? 'h-16 bg-gray-400/20 rounded-md'
                : 'h-2'
            }`}
            ref={droppableProvided.innerRef}
            {...droppableProvided.droppableProps}
          />
        ) : (
          <div
            ref={droppableProvided.innerRef}
            {...droppableProvided.droppableProps}
            className={`
          relative flex flex-col`}
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
                        <EditTodo
                          todo={todo}
                          setTodoInputOpenById={setTodoInputOpenById}
                        />
                      </div>
                    ) : (
                      <TodoItem
                        todo={todo}
                        editTodo={editTodo}
                        completeTodo={completeTodo}
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
        )
      }
    </Droppable>
  );
};

export const TodosList = memo(TodosListMemoized);
