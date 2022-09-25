import { todosRepository } from '../repositories';
import { Todo } from '../entities/Todo.entity';
import { Like } from 'typeorm';

interface IRequest {
  id: string;
  title: string;
  description: string;
  searchedText: string;
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
  }: Pick<IRequest, 'title' | 'description'>): Promise<Todo> {
    if (!description) description = '';

    const todo = await todosRepository.create({ title, description });
    await todosRepository.save(todo);
    return todo;
  }

  public async update({
    id,
    title,
    description,
  }: Pick<IRequest, 'id' | 'title' | 'description'>): Promise<Todo> {
    const todo = await todosRepository.findOneBy({ id });

    if (todo === null) {
      throw new Error('Todo not found');
    }

    todo.title = title as string;
    todo.description = description as string;

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
