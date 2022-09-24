import { AppDataSource } from '../database';
import { Todo } from '../entities/Todo.entity';
import { User } from '../entities/User.entity';

export const TodoRepository = AppDataSource.getRepository(Todo);

export const UserRepository = AppDataSource.getRepository(User);
