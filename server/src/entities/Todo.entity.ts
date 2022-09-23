import { Column, CreateDateColumn, Entity, PrimaryColumn } from 'typeorm';

@Entity('todo')
export class Todo {
  @PrimaryColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @CreateDateColumn()
  created_at: Date;

  @CreateDateColumn()
  updated_at: Date;
}
