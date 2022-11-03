import { useTodosStore, useUIStore } from '../../zustand';
import { motion } from 'framer-motion';
import { isDesktop } from 'react-device-detect';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import { reorder } from '../../helpers/functions';
import { ITodo } from '../../helpers/types';
import { useDndPlaceholder } from '../../hooks/useDndPlaceholder';

interface IContentContainerProps {
  heading: React.ReactNode;
  children?: React.ReactNode;
  onDragEndPage?: (result: DropResult) => void;
}

export const ContentContainer = ({
  children,
  heading,
  onDragEndPage,
}: IContentContainerProps) => {
  const { isSidebarOpen, setRef, draggingElementId, setPlaceholderProps } =
    useUIStore();
  const { setTodos, todos, setSections, sections } = useTodosStore();

  const { onDragStart, onDragUpdate } = useDndPlaceholder({
    setPlaceholderProps,
  });

  // console.log(todos);

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

      const editedTodo: ITodo = {
        ...draggingTodo,
        section: sections[destinationSectionIndex],
      };

      const destinationTodosList = todos.filter((todo) =>
        editedTodo.section !== undefined
          ? todo.section?.id === destinationDroppableId
          : !todo.section && todo.project.id === 'inbox'
      );

      const destinationIndexInTodosArray = todos.findIndex(
        (t) => t.id === destinationTodosList[destinationIndex].id
      );
      const sourceIndexInTodosArray = todos.findIndex(
        (t) => t.id === draggingElementId
      );

      todos.splice(sourceIndexInTodosArray, 1);
      todos.splice(destinationIndexInTodosArray, 0, editedTodo);

      setTodos(todos);
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
      onDragEnd={onDragEndPage ? onDragEndPage : onDragEnd}
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
