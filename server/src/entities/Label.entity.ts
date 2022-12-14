import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Todo } from './Todo.entity';

@Entity('labels')
export class Label {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  type: string;

  @Column()
  title: string;

  @Column()
  colorName: string;

  @Column()
  class: string;

  @ManyToOne(() => Todo, (todo) => todo.labels)
  @JoinColumn({ name: 'todo_id' })
  todo: Todo;
}
