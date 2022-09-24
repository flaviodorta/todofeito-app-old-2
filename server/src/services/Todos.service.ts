import { Todo } from 'src/entities/Todo.entity';
import { Like } from 'typeorm';
import { TodoRepository } from '../repositories';

interface IRequest {
  id: string;
  title: string;
  description: string;
  searchedText: string;
}

export class TodosServices {
  public async findTodosBySearchedText({
    searchedText,
  }: IRequest): Promise<Todo[]> {
    const searchedTodosByTitle = await TodoRepository.findBy({
      title: Like(`%${searchedText}%`),
    });
    const searchedTodosByDescription = await TodoRepository.findBy({
      description: Like(`%${searchedText}%`),
    });
    const searchedTodos = [
      ...searchedTodosByTitle,
      ...searchedTodosByDescription,
    ];

    return searchedTodos;
  }

  public async getAllTodos(): Promise<Todo[]> {
    const allTodos = TodoRepository.find();

    return allTodos;
  }

  public async createTodo({ title, description }: IRequest) {
    const todo = TodoRepository.create({ title, description });

    await TodoRepository.save(todo);
  }

  public async updateTodo({ id, title, description }: IRequest): Promise<Todo> {
    const todo = await TodoRepository.findOneBy({ id });

    if (todo === null) {
      throw new Error('Todo not found');
    }

    if (title && description) {
      todo.title = title;
      todo.description = description;
    }

    if (title) {
      todo.title = title;
    }

    if (description) {
      todo.description = description;
    }

    await TodoRepository.save(todo);

    return todo;
  }

  public async deleteTodo({ id }: IRequest): Promise<void> {
    const todo = await TodoRepository.findOneBy({ id });

    if (!todo) {
      throw new Error('Todo not found');
    }

    await TodoRepository.remove(todo);
  }
}
