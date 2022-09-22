import create from 'zustand';
import { isDesktop } from 'react-device-detect';
import { UIState } from '../helpers/types';

export const useUIStore = create<UIState>((set) => ({
  isMenuOpen: isDesktop ? true : false,
  toggleMenu: () => set((state) => ({ isMenuOpen: !state.isMenuOpen })),
}));
