import { Todo } from 'src/entities/Todo.entity';
import { Like } from 'typeorm';
import { TodoRepository } from '../repositories';

interface IRequest {
  searchedText: string;
}

export class TodosServices {
  public async findBySearchedText({ searchedText }: IRequest): Promise<Todo[]> {
    const searchedTodos = TodoRepository.findBy({
      name: Like(`%${searchedText}%`),
      description: Like(`%${searchedText}%`),
    });

    return searchedTodos;
  }
}
