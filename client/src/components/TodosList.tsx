import { isEmpty } from 'lodash';
import { useState } from 'react';
import {
  DragDropContext,
  Draggable,
  DragStart,
  Droppable,
  DropResult,
} from 'react-beautiful-dnd';
import { ITodo } from '../helpers/types';
import { useUIStore, useUserStore } from '../zustand';
import { AddTodoItem } from './AddTodoItem';
import { TodoItem } from './TodoItem';

interface ITodosListProps {
  todos: ITodo[];
}

export const TodosList = ({ todos }: ITodosListProps) => {
  const { reorderTodos } = useUserStore();
  const { editingTodoId } = useUIStore();
  const [placeholderProps, setPlaceholderProps] = useState({
    clientHeight: 0,
    clientWidth: 0,
    clientY: 0,
    clientX: 0,
  });

  const onDragEnd = (result: DropResult) => {
    const { destination, source } = result;

    if (!destination) return;

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    )
      return;

    setPlaceholderProps({
      clientHeight: 0,
      clientWidth: 0,
      clientY: 0,
      clientX: 0,
    });

    reorderTodos(todos, source.index, destination.index);
  };

  const queryAttr = 'data-rbd-drag-handle-draggable-id';

  const getDraggedDom = (draggableId: string) => {
    const domQuery = `[${queryAttr}='${draggableId}']`;
    const draggedDOM = document.querySelector(domQuery);

    return draggedDOM;
  };

  const handleDragStart = (event: DragStart) => {
    const draggedDOM = getDraggedDom(event.draggableId);

    if (!draggedDOM) return;

    const { clientHeight, clientWidth } = draggedDOM;
    const sourceIndex = event.source.index;
    var clientY =
      parseFloat(
        window.getComputedStyle(draggedDOM.parentNode as HTMLElement).paddingTop
      ) +
      [...(draggedDOM.parentNode as HTMLElement).children]
        .slice(0, sourceIndex)
        .reduce((total, curr) => {
          const style = window.getComputedStyle(curr);
          const marginBottom = parseFloat(style.marginBottom);
          return total + curr.clientHeight + marginBottom;
        }, 0);

    setPlaceholderProps({
      clientHeight,
      clientWidth,
      clientY,
      clientX: parseFloat(
        window.getComputedStyle(draggedDOM.parentNode as HTMLElement)
          .paddingLeft
      ),
    });
  };

  const handleDragUpdate = (event: DropResult) => {
    if (!event.destination) {
      return;
    }

    const draggedDOM = getDraggedDom(event.draggableId);

    if (!draggedDOM) {
      return;
    }

    const { clientHeight, clientWidth } = draggedDOM;
    const destinationIndex = event.destination.index;
    const sourceIndex = event.source.index;

    const childrenArray = [...(draggedDOM.parentNode as Element).children];
    const movedItem = childrenArray[sourceIndex];
    childrenArray.splice(sourceIndex, 1);

    const updatedArray = [
      ...childrenArray.slice(0, destinationIndex),
      movedItem,
      ...childrenArray.slice(destinationIndex + 1),
    ];

    var clientY =
      parseFloat(
        window.getComputedStyle(draggedDOM.parentNode as Element).paddingTop
      ) +
      updatedArray.slice(0, destinationIndex).reduce((total, curr) => {
        const style = window.getComputedStyle(curr);
        const marginBottom = parseFloat(style.marginBottom);
        return total + curr.clientHeight + marginBottom;
      }, 0);

    setPlaceholderProps({
      clientHeight,
      clientWidth,
      clientY,
      clientX: parseFloat(
        window.getComputedStyle(draggedDOM.parentNode as Element).paddingLeft
      ),
    });
  };

  return (
    <div className='h-fit mb-4'>
      <DragDropContext
        onDragStart={handleDragStart}
        onDragEnd={onDragEnd}
        onDragUpdate={handleDragUpdate}
      >
        <Droppable droppableId='tasks'>
          {(droppableProvided, droppableSnapshot) => (
            <div
              ref={droppableProvided.innerRef}
              {...droppableProvided.droppableProps}
              className='h-fit relative flex flex-col'
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
                      className={`${
                        todo.description.length > 0 && editingTodoId !== todo.id
                          ? 'h-20'
                          : 'h-16'
                      } 
                      ${editingTodoId === todo.id ? 'h-64' : ''}
                  ${
                    draggableSnapshot.isDragging
                      ? 'shadow-xl border-none'
                      : 'border-b-gray-200 border-b-[1px]'
                  }
                  ${draggableSnapshot.isDropAnimating ? 'shadow-lg' : ''}
                  outline-none
                  flex-center
                  transition-shadow
                  duration-75
                  `}
                    >
                      {editingTodoId === todo.id ? (
                        <div
                          {...draggableProvided.dragHandleProps}
                          className='w-full h-60'
                        >
                          <AddTodoItem
                            key={todo.id}
                            id={todo.id}
                            title={todo.title}
                            description={todo.description}
                            date={todo.date as Date}
                            project={todo.project}
                            checkedLabels={todo.checkedLabels}
                            priority={todo.priority}
                            labels={todo.labels}
                          />
                        </div>
                      ) : (
                        <TodoItem
                          todo={todo}
                          draggableProvided={draggableProvided}
                        />
                      )}
                    </div>
                  )}
                </Draggable>
              ))}

              {droppableProvided.placeholder}
              {!isEmpty(placeholderProps) && droppableSnapshot.isDraggingOver && (
                <div
                  className='bg-transparent absolute'
                  style={{
                    top: placeholderProps.clientY,
                    left: placeholderProps.clientX,
                    height: placeholderProps.clientHeight,
                    width: placeholderProps.clientWidth,
                  }}
                />
              )}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};
