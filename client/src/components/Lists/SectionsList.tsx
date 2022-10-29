import { memo } from 'react';
import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from 'react-beautiful-dnd';
import { reorder } from '../../helpers/functions';
import { ITodo, ITodosBySection } from '../../helpers/types';
import { EditTodo } from '../EditTodo';
import { TodosSection } from '../Sections/TodosSection';

interface ISectionsListProps {
  sections: ITodosBySection[];
  setSections: React.Dispatch<React.SetStateAction<ITodosBySection[]>>;
  todoInputOpenById: string | null;
  sectionInputOpenById: string | null;
  completeTodo: (todo: ITodo) => void;
  addTodo: (todo: ITodo) => void;
  editTodo: (todo: ITodo) => void;
  setTodoInputOpenById: (id: string | null) => void;
  setSectionInputOpenById: (id: string | null) => void;
  deleteSection: (sectionId: string) => void;
}

export const SectionsList = ({
  sections,
  todoInputOpenById,
  sectionInputOpenById,
  setSections,
  completeTodo,
  addTodo,
  editTodo,
  setTodoInputOpenById,
  setSectionInputOpenById,
  deleteSection,
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
    <div className='mb-4 pl-11 pr-4 md:px-0'>
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
                        todoInputOpenById={todoInputOpenById}
                        sectionInputOpenById={sectionInputOpenById}
                        completeTodo={completeTodo}
                        addTodo={addTodo}
                        editTodo={editTodo}
                        setTodoInputOpenById={setTodoInputOpenById}
                        setSectionInputOpenById={setSectionInputOpenById}
                        deleteSection={deleteSection}
                        section={section}
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

// export const SectionsList = memo(SectionsListMemoized);
