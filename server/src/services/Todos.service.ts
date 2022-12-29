import { todosRepository, usersRepository } from '../repositories';
import { Todo } from '../entities/Todo.entity';
import { Like } from 'typeorm';
import { ILabel, IProject, ISection } from '../types';
import { User } from '../entities/User.entity';

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
  todo: ITodo;
}

export type IDataTypes = 'project' | 'section' | 'label' | 'todo';

export interface ITodo {
  id?: string;
  type: IDataTypes;
  title: string;
  description: string;

  date: Date;
  priority: number;
  project: IProject;
  section?: ISection;
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
    const allTodos = await todosRepository.find({ relations: ['user'] });

    return allTodos;
  }

  public async create({
    // title,
    // description,
    // type,
    // date,
    // priority,
    // project,
    // section,
    // labels,
    // isCompleted,
    todo,
    id,
  }: Pick<
    IRequest,
    'todo' | 'id'
    // | 'title'
    // | 'description'
    // | 'type'
    // | 'date'
    // | 'priority'
    // | 'project'
    // | 'section'
    // | 'labels'
    // | 'isCompleted'
  >): Promise<Todo> {
    // if (!description) description = '';

    // const newTodo = await todosRepository.create({
    //   title,
    //   description,
    //   type,
    //   date,
    //   priority,
    //   project,
    //   section,
    //   labels,
    //   isCompleted,
    // });

    console.log(todo);

    const user = await usersRepository.findById(
      '4a52207f-994f-4949-a531-c3ceec633a8c'
    );

    console.log(user);

    const newTodo = await todosRepository.create({
      title: todo.title,
      description: todo.description,
      type: todo.type,
      priority: todo.priority,
      isCompleted: todo.isCompleted,
      date: todo.date,
      user: user as User,
    });

    await todosRepository.save(newTodo);

    return newTodo;
  }

  public async update({
    id,
    // title,
    // description,
    // date,
    // priority,
    // isCompleted,
    todo,
  }: Pick<
    IRequest,
    // 'id' | 'title' | 'description' | 'date' | 'priority' | 'isCompleted'
    'id' | 'todo'
  >): Promise<Todo> {
    const oldTodo = await todosRepository.findOneBy({ id });

    if (oldTodo === null) {
      throw new Error('Todo not found');
    }

    oldTodo.title = todo.title as string;
    oldTodo.description = todo.description as string;
    oldTodo.date = todo.date;
    oldTodo.priority = todo.priority;
    oldTodo.isCompleted = todo.isCompleted;

    await todosRepository.save(oldTodo);

    return oldTodo;
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
