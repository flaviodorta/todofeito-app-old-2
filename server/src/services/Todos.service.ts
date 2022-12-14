import { todosRepository } from '../repositories';
import { Todo } from '../entities/Todo.entity';
import { Like } from 'typeorm';
import { ILabel, IProject, ISection } from '../types';

interface IRequest {
  id: string;
  title: string;
  description: string;
  searchedText: string;
  type: string;
  date: Date;
  priority: number;
  project: IProject;
  section: ISection;
  labels: ILabel[];
  isCompleted: boolean;
}

export class TodosServices {
  public async getBySearchedText({
    searchedText,
  }: Pick<IRequest, 'searchedText'>): Promise<Todo[]> {
    const searchedTodosByTitle = await todosRepository.findBy({
      title: Like(`%${searchedText}%`),
    });
    const searchedTodosByDescription = await todosRepository.findBy({
      description: Like(`%${searchedText}%`),
    });
    const searchedTodos = [
      ...searchedTodosByTitle,
      ...searchedTodosByDescription,
    ];

    return searchedTodos;
  }

  public async getAll(): Promise<Todo[]> {
    const allTodos = todosRepository.find();

    return allTodos;
  }

  public async create({
    title,
    description,
    type,
    date,
    priority,
    project,
    section,
    labels,
    isCompleted,
  }: Pick<
    IRequest,
    | 'title'
    | 'description'
    | 'type'
    | 'date'
    | 'priority'
    | 'project'
    | 'section'
    | 'labels'
    | 'isCompleted'
  >): Promise<Todo> {
    // if (!description) description = '';

    const todo = await todosRepository.create({
      title,
      description,
      type,
      date,
      priority,
      project,
      section,
      labels,
      isCompleted,
    });
    await todosRepository.save(todo);
    return todo;
  }

  public async update({
    id,
    title,
    description,
    date,
    priority,
    isCompleted,
  }: Pick<
    IRequest,
    'id' | 'title' | 'description' | 'date' | 'priority' | 'isCompleted'
  >): Promise<Todo> {
    const todo = await todosRepository.findOneBy({ id });

    if (todo === null) {
      throw new Error('Todo not found');
    }

    todo.title = title as string;
    todo.description = description as string;
    todo.date = date;
    todo.priority = priority;
    todo.isCompleted = isCompleted;

    await todosRepository.save(todo);

    return todo;
  }

  public async delete({ id }: Pick<IRequest, 'id'>): Promise<void> {
    const todo = await todosRepository.findOneBy({ id });

    if (!todo) {
      throw new Error('Todo not found');
    }

    await todosRepository.remove(todo);
  }
}

export const todosServices = new TodosServices();
