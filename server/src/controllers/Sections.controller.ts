import { Request, Response } from 'express';
import { User } from '../entities/User.entity';
import { sectionsServices } from '../services/Sections.service';

interface IBody {
  id: string;
  title: string;
  type: string;
  index: number;
}

interface IRequest extends Request {
  body: IBody;
}

export class SectionsController {
  public async getAll(req: IRequest, res: Response): Promise<Response> {
    // const allProjects = await sectionsServices.getAll();
    const allSections = await sectionsServices.getAll();

    return res.json(allSections);
  }

  public async getById(req: IRequest, res: Response): Promise<Response> {
    const { id } = req.body;

    const section = await sectionsServices.getById({ id });

    return res.json(section);
  }

  public async getByTitle(req: IRequest, res: Response): Promise<Response> {
    const { title } = req.body;

    const section = await sectionsServices.getByTitle({ title });

    return res.json(section);
  }

  public async create(req: IRequest, res: Response): Promise<Response> {
    const { title, type, index } = req.body;

    const section = await sectionsServices.create({
      title,
      type,
      index,
    });

    return res.json(section);
  }

  public async update(req: IRequest, res: Response): Promise<Response> {
    const { id, title } = req.body;

    const section = await sectionsServices.update({
      id,
      title,
    });

    return res.json(section);
  }

  public async delete(req: IRequest, res: Response): Promise<Response> {
    const { id } = req.body;

    const section = await sectionsServices.delete({ id });

    return res.json(section);
  }
}

export const sectionsController = new SectionsController();
