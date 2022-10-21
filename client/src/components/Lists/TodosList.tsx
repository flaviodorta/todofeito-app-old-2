import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from 'react-beautiful-dnd';
import { reorder } from '../../helpers/functions';
import { ITodo } from '../../helpers/types';
import { useUIStore } from '../../zustand';
import { AddTodoItem } from './../AddTodoItem';
import { TodoItem } from './../TodoItem';

interface ITodosListProps {
  todos: ITodo[];
  setTodos: (todos: ITodo[]) => void;
}

export const TodosList = ({ todos, setTodos }: ITodosListProps) => {
  const { editingTodoId } = useUIStore();

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
    <div className='mb-4'>
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
                      {editingTodoId === todo.id ? (
                        <div className='w-full h-60'>
                          <AddTodoItem
                            key={todo.id}
                            id={todo.id}
                            title={todo.title}
                            description={todo.description}
                            date={todo.date as Date}
                            project={todo.project}
                            checkedLabels={todo.checkedLabels}
                            priority={todo.priority}
                            labels={todo.labelsIds}
                          />
                        </div>
                      ) : (
                        <TodoItem
                          todo={todo}
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
    </div>
  );
};
