import { compare, hash } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { User } from '../entities/User.entity';
import { usersRepository } from '../repositories';
import { config } from '../config';

interface IRequest {
  id: string;
  name: string;
  email: string;
  password: string;
  avatar: string;
}

export class UsersServices {
  public async getAll(): Promise<User[]> {
    const allUsers = usersRepository.find();

    return allUsers;
  }

  public async getById({ id }: Pick<IRequest, 'id'>): Promise<User> {
    const user = await usersRepository.findById(id);

    if (!user) {
      throw new Error('User not exist');
    }

    return user;
  }

  public async create({
    name,
    email,
    password,
  }: Pick<IRequest, 'name' | 'email' | 'password'>): Promise<User> {
    const emailExists = await usersRepository.findByEmail(email);

    if (emailExists) {
      throw new Error('Email addres already userd');
    }

    const hashedPassword = await hash(password, 8);

    const user = await usersRepository.create({
      name,
      email,
      password: hashedPassword,
    });

    await usersRepository.save(user);

    return user;
  }

  public async update({
    id,
    name,
    email,
    password,
    avatar,
  }: IRequest): Promise<User> {
    const user = await usersRepository.findById(id);

    if (!user) {
      throw new Error('User not found');
    }

    if (name) user.name = name;
    if (email) user.email = email;
    if (password) user.password = password;
    if (avatar) user.avatar = avatar;

    await usersRepository.save(user);

    return user;
  }

  public async delete({ id }: Pick<IRequest, 'id'>): Promise<void> {
    const user = await usersRepository.findById(id);

    if (!user) {
      throw new Error('user not found');
    }

    await usersRepository.remove(user);
  }

  public async createSessions({
    email,
    password,
  }: Pick<IRequest, 'email' | 'password'>): Promise<{
    user: User;
    token: string;
  }> {
    const user = await usersRepository.findByEmail(email);

    if (!user) throw new Error('User not exist');

    const isCorrectPassword = await compare(password, user.password);

    if (!isCorrectPassword) throw new Error('Incorrect password');

    const token = sign({}, config.jwt.secret, {
      subject: user.id,
      expiresIn: config.jwt.expiresIn,
    });

    return { user, token };
  }
}

export const usersServices = new UsersServices();
