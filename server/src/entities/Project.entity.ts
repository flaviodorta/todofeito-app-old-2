import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne as ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Section } from './Section.entity';
import { User } from './User.entity';

@Entity('projects')
export class Project {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  type: string;

  @Column()
  title: string;

  @Column()
  colorName: string;

  @Column()
  className: string;

  @ManyToOne(() => User, (user) => user.projects)
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  user: User;

  @OneToMany(() => Section, (section) => section.project)
  // @JoinColumn({ name: 'section_id', referencedColumnName: 'id' })
  sections: Section[];
}
