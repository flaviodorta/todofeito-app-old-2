import { Draggable, Droppable } from 'react-beautiful-dnd';
import { ISection, ITodo } from '../../helpers/types';
import { IPlaceholderProps } from '../../hooks/useDndPlaceholder';
import { TodosSection } from '../Sections/TodosSection';

interface ISectionsListProps {
  droppabledId: string;
  todos: ITodo[];
  sections: ISection[];
  todoInputOpenById: string | null;
  sectionInputOpenById: string | null;
  placeholderProps: IPlaceholderProps;
  draggingOverElementId: string | null;
  editSection: (section: ISection) => void;
  addSection: (section: ISection) => void;
  completeTodo: (todo: ITodo) => void;
  addTodo: (todo: ITodo) => void;
  editTodo: (todo: ITodo) => void;
  setTodoInputOpenById: (id: string | null) => void;
  setSectionInputOpenById: (id: string | null) => void;
  deleteSection: (section: ISection) => void;
}

export const SectionsList = ({
  droppabledId,
  todos,
  sections,
  todoInputOpenById,
  sectionInputOpenById,
  placeholderProps,
  draggingOverElementId,
  editSection,
  addSection,
  completeTodo,
  addTodo,
  editTodo,
  setTodoInputOpenById,
  setSectionInputOpenById,
  deleteSection,
}: ISectionsListProps) => {
  return (
    <div className='mb-4 pl-11 pr-4 md:px-0'>
      <Droppable droppableId={`${droppabledId}`} type='SECTIONS'>
        {(droppableProvided, droppableSnapshot) => (
          <div
            ref={droppableProvided.innerRef}
            {...droppableProvided.droppableProps}
            className={`
              relative flex flex-col`}
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
                      todos={todos.filter(
                        (t) => t.section?.id === section.id && !t.isCompleted
                      )}
                      section={section}
                      draggableProvided={draggableProvided}
                      droppableSnapshot={droppableSnapshot}
                      draggableSnapshot={draggableSnapshot}
                      placeholderProps={placeholderProps}
                      draggingOverElementId={draggingOverElementId}
                      editSection={editSection}
                      addSection={addSection}
                      completeTodo={completeTodo}
                      addTodo={addTodo}
                      editTodo={editTodo}
                      setTodoInputOpenById={setTodoInputOpenById}
                      setSectionInputOpenById={setSectionInputOpenById}
                      deleteSection={deleteSection}
                    />
                  </div>
                )}
              </Draggable>
            ))}
            {droppableProvided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};

// export const SectionsList = memo(SectionsListMemoized);
