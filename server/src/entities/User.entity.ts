import Joi from 'joi';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { projectsController } from '../controllers/Projects.controller';
import { Project } from './Project.entity';
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
  @JoinColumn({ name: 'todo_id', referencedColumnName: 'id' })
  todos: Todo[];

  @OneToMany(() => Project, (project) => project.user)
  @JoinColumn({ name: 'project_id', referencedColumnName: 'id' })
  projects: Project[];
}
