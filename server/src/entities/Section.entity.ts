import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Project } from './Project.entity';

@Entity('sections')
export class Section {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  index: number;

  @Column()
  type: string;

  @Column()
  title: string;

  @CreateDateColumn({ type: 'timestamptz' })
  date: Date;

  @ManyToOne(() => Project, (project) => project.sections)
  @JoinColumn({ name: 'project_id', referencedColumnName: 'id' })
  project: Project;
}
