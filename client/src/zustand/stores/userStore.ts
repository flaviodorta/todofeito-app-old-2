import create from 'zustand';
import { IUserStore } from '../../helpers/types';

export const userStore = create<IUserStore>((set) => ({
  fullName: 'Flávio Dorta',
  email: 'dorta.dev@gmail.com',
}));
