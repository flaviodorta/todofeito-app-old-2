import { Request, Response } from 'express';
import { usersServices } from '../services/Users.service';

interface IBody {
  id: string;
  name: string;
  email: string;
  password: string;
  photoURL: string;
  language: string;
  token: string;
}

interface IRequest extends Request {
  body: IBody;
}

class UsersController {
  public async getAll(req: IRequest, res: Response): Promise<Response> {
    const allUsers = await usersServices.getAll();

    return res.json(allUsers);
  }

  public async getById(req: IRequest, res: Response): Promise<Response> {
    const { id } = req.body;

    const user = await usersServices.getById({ id });

    return res.json(user);
  }

  public async create(req: IRequest, res: Response): Promise<Response> {
    const { name, email, password, photoURL, language } = req.body;

    const user = await usersServices.create({
      name,
      email,
      password,
      photoURL,
      language,
    });

    return res.json(user);
  }

  public async update(req: IRequest, res: Response): Promise<Response> {
    const { id, name, email, password, language, photoURL } = req.body;

    const user = await usersServices.update({
      id,
      name,
      email,
      password,
      language,
      photoURL,
    });

    return res.json(user);
  }

  public async delete(req: IRequest, res: Response): Promise<Response> {
    const { id } = req.body;

    const user = await usersServices.delete({ id });

    return res.json(user);
  }

  public async updatePhotoURL(req: IRequest, res: Response): Promise<Response> {
    const { id, photoURL } = req.body;

    const user = await usersServices.updatePhotoURL({
      id,
      photoURL,
    });

    return res.json(user);
  }

  public async sendForgotPasswordEmail(
    req: IRequest,
    res: Response
  ): Promise<Response> {
    const { email } = req.body;

    await usersServices.sendForgotPasswordEmail({ email });

    return res.status(204).json();
  }

  public async resetForgotPasswordEmail(
    req: IRequest,
    res: Response
  ): Promise<Response> {
    const { token, password } = req.body;

    await usersServices.resetForgotPasswordEmail({ token, password });

    return res.status(204).json();
  }

  // profile controller

  public async showProfile(req: Request, res: Response): Promise<Response> {
    const user_id = req.user.id;

    const user = await usersServices.showProfile({ user_id });

    return res.json(user);
  }

  public async updateProfile(req: Request, res: Response): Promise<Response> {
    const user_id = req.user.id;
    const { name, email, password, old_password } = req.body;

    const user = await usersServices.updateProfile({
      user_id,
      name,
      email,
      password,
      old_password,
    });

    return res.json(user);
  }
}

export const usersController = new UsersController();
