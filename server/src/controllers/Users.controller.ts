import { Request, Response } from 'express';
import { usersServices } from 'src/services/User.service';

interface IBody {
  id: string;
  name: string;
  email: string;
  password: string;
}

interface IRequest extends Request {
  body: IBody;
}

class UsersController {
  public async getAll(req: Request, res: Response): Promise<Response> {
    const allUsers = await usersServices.getAll();

    return res.json(allUsers);
  }

  public async create(req: Request, res: Response): Promise<Response> {
    const { name, email, password } = req.body;

    const user = await usersServices.create({ name, email, password });

    return res.json(user);
  }
}

export const usersController = new UsersController();
