import { Request, Response } from 'express';
import { todosServices } from '../services/Todos.service';
import { ILabel, IProject, ISection } from '../types';

interface IBody {
  id: string;
  title: string;
  description: string;
  searchedText: string;
  type: string;
  date: Date;
  priority: number;
  project: IProject;
  section: ISection;
  labels: ILabel[];
  isCompleted: boolean;
  todo: ITodo;
}

export type IDataTypes = 'project' | 'section' | 'label' | 'todo';

export interface ITodo {
  id: string;
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

interface IRequest extends Request {
  body: IBody;
}

class TodosController {
  public async getAll(req: Request, res: Response): Promise<Response> {
    const allTodos = await todosServices.getAll();

    return res.json(allTodos);
  }

  public async getByText(req: IRequest, res: Response): Promise<Response> {
    const { searchedText } = req.body;

    const todo = await todosServices.getBySearchedText({ searchedText });

    return res.json(todo);
  }

  public async create(req: IRequest, res: Response): Promise<Response> {
    const {
      todo,
      id,
      // title,
      // description,
      // type,
      // date,
      // priority,
      // project,
      // section,
      // labels,
      // isCompleted,
    } = req.body;

    const newTodo = await todosServices.create({
      todo,
      id,
      // title,
      // description,
      // type,
      // date,
      // priority,
      // project,
      // section,
      // labels,
      // isCompleted,
    });

    return res.json(newTodo);
  }

  public async update(req: IRequest, res: Response): Promise<Response> {
    // const { id, title, description, date, priority, isCompleted } = req.body;

    // const todo = await todosServices.update({
    //   id,
    //   title,
    //   description,
    //   date,
    //   priority,
    //   isCompleted,
    // });

    const { todo, id } = req.body;

    const updatedTodo = await todosServices.update({
      todo,
      id,
    });

    return res.json(updatedTodo);
  }

  public async delete(req: IRequest, res: Response): Promise<Response> {
    const { id } = req.body;

    await todosServices.delete({ id });

    return res.json([]);
  }
}

export const todoController = new TodosController();
