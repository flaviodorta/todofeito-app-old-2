import { Project } from '../entities/Project.entity';
import { User } from '../entities/User.entity';
import { projectsRepository } from '../repositories';

interface IRequest {
  id: string;
  title: string;
  type: string;
  colorName: string;
  className: string;
  user: User;
}

export class ProjectsServices {
  public async getAll(): Promise<Project[]> {
    // const allProjects = projectsRepository.find();
    const allProjects = await projectsRepository.find();
    console.log(allProjects);

    return allProjects;
  }

  public async getById({ id }: Pick<IRequest, 'id'>): Promise<Project> {
    const project = await projectsRepository.findById(id);

    if (!project) {
      throw new Error('Project not exist');
    }

    return project;
  }

  public async getByTitle({
    title,
  }: Pick<IRequest, 'title'>): Promise<Project> {
    const project = await projectsRepository.findById(title);

    if (!project) {
      throw new Error('Project not exist');
    }

    return project;
  }

  public async create({
    title,
    type,
    colorName,
    className,
  }: // user,
  Pick<
    IRequest,
    'title' | 'type' | 'colorName' | 'className' /*| 'user'*/
  >): Promise<Project> {
    const projectExists = await projectsRepository.findByTitle(title);

    if (projectExists) {
      throw new Error('Project name already used');
    }

    const project = await projectsRepository.create({
      title,
      type,
      colorName,
      // user,
      className,
    });

    await projectsRepository.save(project);

    return project;
  }

  public async update({
    id,
    title,
  }: Pick<IRequest, 'id' | 'title'>): Promise<Project> {
    const project = await projectsRepository.findById(id);

    if (!project) {
      throw new Error('Project not found');
    }

    if (project) project.title = title;

    await projectsRepository.save(project);

    return project;
  }

  public async delete({ id }: Pick<IRequest, 'id'>): Promise<void> {
    const project = await projectsRepository.findById(id);

    if (!project) {
      throw new Error('Project not found');
    }

    await projectsRepository.remove(project);
  }
}

export const projectsServices = new ProjectsServices();
