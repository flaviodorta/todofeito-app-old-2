import create from 'zustand';
import { IUserStore } from '../../helpers/types';

export const userStore = create<IUserStore>((set, get) => ({
  fullName: 'Flávio Dorta',
  email: 'dorta.dev@gmail.com',
  language: 'en',
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
  setLanguage: (language: string) =>
    set((state) => ({
      ...state,
      language,
    })),
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
