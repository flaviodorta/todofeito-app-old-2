import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Project } from './Project.entity';

@Entity('sections')
export class Section {
  @PrimaryGeneratedColumn('uuid')
  readonly id: string;

  @Column()
  index: number;

  @Column()
  type: string;

  @Column()
  title: string;

  @Column({ type: 'timestamptz' })
  readonly date: Date;

  @OneToOne(() => Project)
  @JoinColumn({ name: 'project_id' })
  project: Project;
}
