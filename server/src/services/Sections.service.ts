import { resolve } from 'path';
import { Section } from '../entities/Section.entity';
import { User } from '../entities/User.entity';
import { sectionsRepository } from '../repositories';

interface IRequest {
  id: string;
  title: string;
  type: string;
  index: number;
}

export class ProjectsServices {
  public async getAll(): Promise<Section[]> {
    // const allProjects = sectionsRepository.find();
    const allSections = await sectionsRepository.find();
    console.log(allSections);

    return allSections;
  }

  public async getById({ id }: Pick<IRequest, 'id'>): Promise<Section> {
    const section = await sectionsRepository.findById(id);

    if (!section) {
      throw new Error('Section not exist');
    }

    return section;
  }

  public async getByTitle({
    title,
  }: Pick<IRequest, 'title'>): Promise<Section> {
    const section = await sectionsRepository.findById(title);

    if (!section) {
      throw new Error('Section not exist');
    }

    return section;
  }

  public async create({
    title,
    type,
    index,
  }: Pick<IRequest, 'title' | 'type' | 'index'>): Promise<Section> {
    const sectionExists = await sectionsRepository.findByTitle(title);

    if (sectionExists) {
      throw new Error('Section name already used');
    }

    const section = await sectionsRepository.create({
      title,
      type,
      index,
    });

    await sectionsRepository.save(section);

    return section;
  }

  public async update({
    id,
    title,
  }: Pick<IRequest, 'id' | 'title'>): Promise<Section> {
    const section = await sectionsRepository.findById(id);

    if (!section) {
      throw new Error('Section not found');
    }

    if (section) section.title = title;

    await sectionsRepository.save(section);

    return section;
  }

  public async delete({ id }: Pick<IRequest, 'id'>): Promise<void> {
    const section = await sectionsRepository.findById(id);

    if (!section) {
      throw new Error('Section not found');
    }

    await sectionsRepository.remove(section);
  }
}

export const sectionsServices = new ProjectsServices();
