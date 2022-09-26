import create from 'zustand';
import { isDesktop } from 'react-device-detect';
import { UIState } from '../helpers/types';

export const useUIStore = create<UIState>((set) => ({
  isMenuOpen: isDesktop ? true : false,
  toggleMenu: () => set((state) => ({ isMenuOpen: !state.isMenuOpen })),
}));

export interface IUser {
  fullName: string;
  email: string;
}

export const userUserStore = create<IUser>((set) => ({
  fullName: 'Flávio Dorta',
  email: 'dorta.dev@gmail.com',
}));
