import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from 'react-beautiful-dnd';
import { reorder } from '../../helpers/functions';
import { ISection } from '../../helpers/types';
import { TodosSection } from '../Sections/TodosSection';

interface ISectionsListProps {
  sections: ISection[];
  hasAddSectionOpen: boolean;
  toggleHasAddSectionOpen: () => void;
  setSections: (sections: ISection[]) => void;
}

export const SectionsList = ({
  sections,
  setSections,
  hasAddSectionOpen,
  toggleHasAddSectionOpen,
}: ISectionsListProps) => {
  const onDragEnd = (result: DropResult) => {
    const { destination, source } = result;

    if (!destination) return;

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    )
      return;

    setSections(reorder(sections, source.index, destination.index));
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
              {sections.map((section, i) => (
                <Draggable key={section.id} draggableId={section.id} index={i}>
                  {(draggableProvided, draggableSnapshot) => (
                    <div
                      ref={draggableProvided.innerRef}
                      {...draggableProvided.draggableProps}
                      style={
                        draggableProvided.draggableProps
                          .style as React.CSSProperties
                      }
                    >
                      <TodosSection
                        section={section}
                        hasAddSectionOpen={hasAddSectionOpen}
                        toggleHasAddSectionOpen={toggleHasAddSectionOpen}
                        draggableProvided={draggableProvided}
                      />
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
