import { memo } from 'react';
import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from 'react-beautiful-dnd';
import { reorder } from '../../helpers/functions';
import { IProject, ISection, ITodo } from '../../helpers/types';
import { EditTodo } from '../EditTodo';
import { TodosSection } from '../Sections/TodosSection';

interface TodosSection {
  todos: ITodo[];
  id: string;
  index?: number | undefined;
  name: string;
  date: Date;
  project: IProject;
}

interface ISectionsListProps {
  sections: ISection[];
  sectionsTodos: TodosSection[];
  todoInputOpenById: string | null;
  sectionInputOpenById: string | null;
  addSection: (section: ISection) => void;
  completeTodo: (todo: ITodo) => void;
  addTodo: (todo: ITodo) => void;
  editTodo: (todo: ITodo) => void;
  setTodoInputOpenById: (id: string | null) => void;
  setSectionInputOpenById: (id: string | null) => void;
  deleteSection: (section: ISection) => void;
}

export const SectionsListMemoized = memo(
  ({
    sections,
    sectionsTodos,
    todoInputOpenById,
    sectionInputOpenById,
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
        <Droppable droppableId='sections' type='SECTIONS'>
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
                        todos={sectionsTodos[i].todos}
                        section={section}
                        draggableProvided={draggableProvided}
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
  }
);

export const SectionsList = memo(SectionsListMemoized);
