import { useTodosStore, useUIStore } from '../../zustand';
import { motion } from 'framer-motion';
import { isDesktop } from 'react-device-detect';
import { forwardRef } from 'react';
import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd';
import { reorder } from '../../helpers/functions';
import { ITodo } from '../../helpers/types';

interface IContentContainerProps {
  children?: React.ReactNode;
  heading: React.ReactNode;
  todos?: ITodo[];
}

export const ContentContainer = ({
  children,
  heading,
}: IContentContainerProps) => {
  const { isSidebarOpen, setRef } = useUIStore();
  const { setTodos, todos, setSections, sections, projects } = useTodosStore();

  return (
    // <DragDropContext onDragEnd={onDragEnd}>
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
    // </DragDropContext>
  );
};
