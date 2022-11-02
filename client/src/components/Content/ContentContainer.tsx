import { useTodosStore, useUIStore } from '../../zustand';
import { motion } from 'framer-motion';
import { isDesktop } from 'react-device-detect';
import { forwardRef } from 'react';
import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd';
import { reorder } from '../../helpers/functions';
import { ITodo } from '../../helpers/types';
import { useDndPlaceholder } from '../../hooks/useDndPlaceholder';

interface IContentContainerProps {
  children?: React.ReactNode;
  heading: React.ReactNode;
  todos?: ITodo[];
}

export const ContentContainer = ({
  children,
  heading,
}: IContentContainerProps) => {
  const { isSidebarOpen, setRef, draggingElementId, setPlaceholderProps } =
    useUIStore();
  const { setTodos, todos, setSections, sections, projects } = useTodosStore();

  const { onDragStart, onDragUpdate } = useDndPlaceholder({
    setPlaceholderProps,
  });

  const onDragEnd = (result: DropResult) => {
    const { destination, source } = result;

    if (!destination) return;

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    )
      return;

    const sourceDroppableId = source.droppableId;
    const destinationDroppableId = destination.droppableId;

    const sourceIndex = source.index;
    const destinationIndex = destination.index;

    // const sourceSectionIndex = sections.findIndex(
    //   (s) => s.id === sourceDroppableId
    // );

    if (
      sourceDroppableId !== 'sections' &&
      destinationDroppableId !== 'sections'
    ) {
      const destinationSectionIndex = sections.findIndex(
        (s) => s.id === destinationDroppableId
      );
      const draggingTodo: ITodo = todos.filter(
        (todo) => todo.id === draggingElementId
      )[0];
      const draggingTodoIndexInTodosArray = todos.findIndex(
        (t) => t.id === draggingTodo.id
      );
      const editedTodo: ITodo = {
        ...draggingTodo,
        section: sections[destinationSectionIndex],
      };

      let todosCopy: ITodo[];

      const destinationTodosList = todos.filter((todo) =>
        editedTodo.section !== undefined
          ? todo.section?.id === destinationDroppableId
          : !todo.section && todo.project.id === 'inbox'
      );

      if (destinationTodosList.length === 0) {
        todosCopy = [...todos];
        todosCopy.splice(draggingTodoIndexInTodosArray, 1, editedTodo);
        setTodos(todosCopy);
        return;
      }

      if (destinationIndex === destinationTodosList.length) {
        todosCopy = todos.filter((todo) => todo.id !== editedTodo.id);
        const lastTodoIndexOfDestinationArrayInTodosArray = todos.findIndex(
          (el) => el.id === destinationTodosList[destinationIndex - 1].id
        );
        todosCopy.splice(
          lastTodoIndexOfDestinationArrayInTodosArray + 1,
          0,
          editedTodo
        );
        setTodos(todosCopy);
        return;
      }

      if (sourceDroppableId === destinationDroppableId) {
        todosCopy = [...todos];
        setTodos(
          reorder(
            todosCopy,
            draggingTodoIndexInTodosArray,
            draggingTodoIndexInTodosArray + destinationIndex - sourceIndex
          )
        );
        return;
      }

      if (sourceDroppableId !== destinationDroppableId) {
        todosCopy = [...todos];
        todosCopy.splice(draggingTodoIndexInTodosArray, 1);
        const i = todosCopy.findIndex(
          (t) => t.id === destinationTodosList[destinationIndex].id
        );
        todosCopy.splice(i, 0, editedTodo);
        setTodos(todosCopy);
        return;
      }
    }

    if (
      sourceDroppableId === 'sections' &&
      destinationDroppableId === 'sections'
    ) {
      setSections(reorder(sections, sourceIndex, destinationIndex));
      return;
    }
  };

  return (
    <DragDropContext
      onDragStart={onDragStart}
      onDragUpdate={onDragUpdate}
      onDragEnd={onDragEnd}
    >
      <div
        ref={setRef}
        className='z-[10] top-12 fixed right-0 left-0 h-[calc(100%-48px)] overflow-x-hidden overflow-y-auto'
      >
        <motion.div
          initial={false}
          animate={isSidebarOpen && isDesktop ? { left: 40 } : { left: 0 }}
          transition={{ duration: 0.3, bounce: 0 }}
          className={`h-fit md:w-[768px] md:max-w-[768px] md:min-w-[768px] relative px-4 sm:px-0 mx-auto w-full flex-center flex-col gap-4`}
        >
          <div className='flex sticky z-[3] w-full lg:w-[1000px] bg-white top-0 justify-center items-center gap-2'>
            <div className='w-full px-11 md:px-0 top-0 left-0 right-0 bg-white h-fit pt-12 flex-center'>
              <div style={{ width: 768 }} className='w-full'>
                {heading}
              </div>
            </div>
          </div>

          <div className='w-full pb-16'>{children}</div>
        </motion.div>
      </div>
    </DragDropContext>
  );
};
