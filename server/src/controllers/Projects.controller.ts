import { Request, Response } from 'express';
import { User } from '../entities/User.entity';
import { projectsServices } from '../services/Projects.service';

interface IBody {
  id: string;
  title: string;
  type: string;
  colorName: string;
  className: string;
  user: User;
}

interface IRequest extends Request {
  body: IBody;
}

export class ProjectsController {
  public async getAll(req: IRequest, res: Response): Promise<Response> {
    // const allProjects = await projectsServices.getAll();
    const allProjects = await projectsServices.getAll();

    return res.json(allProjects);
  }

  public async getById(req: IRequest, res: Response): Promise<Response> {
    const { id } = req.body;

    const project = await projectsServices.getById({ id });

    return res.json(project);
  }

  public async getByTitle(req: IRequest, res: Response): Promise<Response> {
    const { title } = req.body;

    const project = await projectsServices.getByTitle({ title });

    return res.json(project);
  }

  public async create(req: IRequest, res: Response): Promise<Response> {
    const { title, type, colorName, className, user } = req.body;

    const project = await projectsServices.create({
      title,
      type,
      colorName,
      className,
      // user,
    });

    return res.json(project);
  }

  public async update(req: IRequest, res: Response): Promise<Response> {
    const { id, title } = req.body;

    const project = await projectsServices.update({
      id,
      title,
    });

    return res.json(project);
  }

  public async delete(req: IRequest, res: Response): Promise<Response> {
    const { id } = req.body;

    const project = await projectsServices.delete({ id });

    return res.json(project);
  }
}

export const projectsController = new ProjectsController();
