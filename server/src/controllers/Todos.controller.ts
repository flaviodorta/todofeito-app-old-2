import { Request, Response } from 'express';
import { todosServices } from '../services/Todos.service';

interface IBody {
  id: string;
  title: string;
  description: string;
  searchedText: string;
}

interface IRequest extends Request {
  body: IBody;
}

class TodosController {
  public async getAll(req: Request, res: Response): Promise<Response> {
    const todosList = await todosServices.getAll();

    return res.json(todosList);
  }

  public async getByText(req: IRequest, res: Response): Promise<Response> {
    const { searchedText } = req.body;

    const todo = await todosServices.getBySearchedText({ searchedText });

    return res.json({ todo });
  }

  public async create(req: IRequest, res: Response): Promise<Response> {
    const { title, description } = req.body;

    const todo = await todosServices.create({ title, description });

    return res.json({ todo });
  }

  public async update(req: IRequest, res: Response): Promise<Response> {
    const { id, title, description } = req.body;

    const todo = await todosServices.update({ id, title, description });

    return res.json({ todo });
  }

  public async delete(req: IRequest, res: Response): Promise<Response> {
    const { id } = req.body;

    await todosServices.delete({ id });

    return res.json([]);
  }
}

export const todoController = new TodosController();
