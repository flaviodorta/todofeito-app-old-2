export type IDataTypes = 'project' | 'section' | 'label' | 'todo';

export interface ITodo {
  id: string;
  user_id: string;
  type: IDataTypes;
  title: string;
  description: string;

  date: Date;
  priority: number;
  project: IProject;
  section?: ISection;
  labels: ILabel[];

  isCompleted: boolean;
}

export interface ISection {
  readonly id: string;
  user_id: string;
  index?: number;
  type: IDataTypes;
  title: string;
  readonly date: Date;
  project: IProject;
}

export interface ILabel {
  id: string;
  user_id: string;
  type: IDataTypes;
  title: string;
  color: {
    name: string;
    class: string;
  };
}

export interface IProject {
  id: string;
  user_id: string;
  type: IDataTypes;
  title: string;
  color: {
    name: string;
    class: string;
  };
}
