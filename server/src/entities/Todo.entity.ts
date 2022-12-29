import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { IProject } from '../types';
import { Label } from './Label.entity';
import { Project } from './Project.entity';
import { Section } from './Section.entity';
import { User } from './User.entity';

@Entity('todos')
export class Todo {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  description?: string;

  @Column()
  type: string;

  @Column({ type: 'timestamptz' })
  date: Date;

  @Column()
  priority: number;

  @Column()
  isCompleted: boolean;

  @OneToOne(() => Project)
  @JoinColumn({ name: 'project_id', referencedColumnName: 'id' })
  project: IProject;

  @OneToOne(() => Section)
  @JoinColumn({ name: 'section_id', referencedColumnName: 'id' })
  section?: Section;

  @OneToMany(() => Label, (label) => label.todo, {
    cascade: true,
  })
  // @JoinColumn({ name: 'label_id', referencedColumnName: 'id'})
  labels: Label[];

  @ManyToOne(() => User, (user) => user.todos)
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  user: User;
}
