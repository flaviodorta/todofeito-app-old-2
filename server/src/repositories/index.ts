import { User } from 'src/entities/User.entity';
import { AppDataSource } from '../database';
import { Todo } from '../entities/Todo.entity';

export const TodoRepository = AppDataSource.getRepository(Todo);

export const UserRepository = AppDataSource.getRepository(User);
