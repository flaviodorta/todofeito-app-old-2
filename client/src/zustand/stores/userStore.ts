import create from 'zustand';
import { IUserStore } from '../../helpers/types';
import i18next from 'i18next';

export const userStore = create<IUserStore>((set, get) => ({
  fullName: 'Flávio Dorta',
  email: 'dorta.dev@gmail.com',
  language: i18next.language,
  photoURL: null,
  homeView: 'inbox',
  setFullName: (fullName: string) =>
    set((state) => ({
      ...state,
      fullName,
    })),
  setEmail: (email: string) =>
    set((state) => ({
      ...state,
      email,
    })),
  setLanguage: (language: string) => i18next.changeLanguage(language),
  setPhotoURL: (photo: string | null) =>
    set((state) => ({
      ...state,
      photoURL: photo,
    })),
  setHomeView: (homeView: string) =>
    set((state) => ({
      ...state,
      homeView,
    })),
}));
