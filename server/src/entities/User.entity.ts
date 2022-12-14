import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Todo } from './Todo.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  photoURL: string;

  @Column()
  language: string;

  @CreateDateColumn()
  created_at: Date;

  @OneToMany(() => Todo, (todo) => todo.user)
  todos: Todo[];
}
