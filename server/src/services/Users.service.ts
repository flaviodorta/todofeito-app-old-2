import path from 'path';
import fs from 'fs';
import { compare, hash } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { User } from '../entities/User.entity';
import { usersRepository, userTokensRepository } from '../repositories';
import { config } from '../config';
import { uploadConfig } from '../helpers/upload';
import { addHours, isAfter } from 'date-fns';

interface IRequest {
  id: string;
  name: string;
  email: string;
  password: string;
  avatar: string;
  token: string;
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
  }: Pick<IRequest, 'id' | 'email' | 'name' | 'password'>): Promise<User> {
    const user = await usersRepository.findById(id);

    if (!user) {
      throw new Error('User not found');
    }

    if (name) user.name = name;
    if (email) user.email = email;
    if (password) user.password = password;

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

  public async updateAvatar({
    id,
    avatar,
  }: Pick<IRequest, 'id' | 'avatar'>): Promise<User> {
    const user = await usersRepository.findById(id);

    if (!user) throw new Error('User not found');

    if (user.avatar) {
      const userAvatarFilepath = path.join(uploadConfig.directory, user.avatar);
      const userAvatarFileExist = await fs.promises.stat(userAvatarFilepath);

      if (userAvatarFileExist) {
        await fs.promises.unlink(userAvatarFilepath);
      }
    }

    user.avatar = avatar;

    await usersRepository.save(user);

    console.log(avatar);

    return user;
  }

  public async sendForgotPasswordEmail({
    email,
  }: Pick<IRequest, 'email'>): Promise<void> {
    const user = await usersRepository.findByEmail(email);

    if (!user) throw new Error('User not exist');

    console.log(user);

    const token = await userTokensRepository.generate(user.id);

    console.log(token);
  }

  public async resetForgotPasswordEmail({
    token,
    password,
  }: Pick<IRequest, 'token' | 'password'>): Promise<void> {
    const userToken = await userTokensRepository.findByToken(token);

    if (!userToken) throw new Error('User does not exist');

    const user = await usersRepository.findById(userToken.user_id);

    if (!user) throw new Error('User does not exist');

    const tokenCreatedAt = userToken.created_at;
    const compareDate = addHours(tokenCreatedAt, 2);

    if (isAfter(Date.now(), compareDate)) throw new Error('Token expired');

    user.password = await hash(password, 8);

    await usersRepository.save(user);
  }
}

export const usersServices = new UsersServices();