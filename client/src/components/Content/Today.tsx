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

export const Today = () => {
  const { todos, reorderTodos } = useUserStore();
  const { isEditingTodo, isSidebarOpen } = useUIStore();
  const [placeholderProps, setPlaceholderProps] = useState({
    clientHeight: 0,
    clientWidth: 0,
    clientY: 0,
    clientX: 0,
  });

  const date = new Date();
  const month = date.toLocaleString('en', { month: 'short' });
  const dayOfWeek = date.toLocaleString('en', {
    weekday: 'short',
  });
  const dayOfMonth = date.getDate();

  const [isAddTodoItemOpen, toggleAddTodoItem] = useToggle(false);

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

    reorderTodos(todos.today, source.index, destination.index);
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
                  className='h-fit relative'
                >
                  {todos.today.map((todo, i) => (
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
                            todo.description.length > 0 ? 'h-20' : 'h-16'
                          } 
                          ${
                            draggableSnapshot.isDragging
                              ? 'shadow-xl border-none'
                              : 'border-b-gray-200 border-b-[1px]'
                          }
                          ${
                            draggableSnapshot.isDropAnimating ? 'shadow-lg' : ''
                          }
                          outline-none
                          flex-center
                          transition-shadow
                          duration-75
                          `}
                        >
                          <TodoItem
                            todo={todo}
                            draggableProvided={draggableProvided}
                          />
                        </div>
                      )}
                    </Draggable>
                  ))}

                  {droppableProvided.placeholder}
                  {!isEmpty(placeholderProps) &&
                    droppableSnapshot.isDraggingOver && (
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

        {/* <div onClick={openAddTodoItem} className='flex-center'> */}
        {isAddTodoItemOpen && !isEditingTodo ? (
          <AddTodoItem
            close={toggleAddTodoItem}
            selectedProject={'today'}
            selectedDate={new Date()}
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
