import { resolve } from 'path';
import { User } from 'src/entities/User.entity';
import { UserRepository } from 'src/repositories';

interface IRequest {
  id: string;
  name: string;
  email: string;
  password: string;
  avatar: string;
}

export class UsersServices {
  public async getAll(): Promise<User[]> {
    const allUsers = UserRepository.find();

    return allUsers;
  }

  public async create({
    name,
    email,
    password,
  }: Pick<IRequest, 'name' | 'email' | 'password'>): Promise<User> {
    const emailExists = await UserRepository.findByEmail(email);

    if (emailExists) {
      throw new Error('Email addres already userd');
    }

    const user = await UserRepository.create({ name, email, password });

    await UserRepository.save(user);

    return user;
  }

  public async update({
    id,
    name,
    email,
    password,
    avatar,
  }: IRequest): Promise<User> {
    const user = await UserRepository.findById(id);

    if (!user) {
      throw new Error('User not found');
    }

    if (name) user.name = name;
    if (email) user.email = email;
    if (password) user.password = password;
    if (avatar) user.avatar = avatar;

    await UserRepository.save(user);

    return user;
  }

  public async delete({ id }: Pick<IRequest, 'id'>): Promise<void> {
    const user = await UserRepository.findById(id);

    if (!user) {
      throw new Error('user not found');
    }

    await UserRepository.remove(user);
  }
}

export const usersServices = new UsersServices();
