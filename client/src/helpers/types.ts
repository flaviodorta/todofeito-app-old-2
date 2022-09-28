// import { Day, Month } from '../components/DatePicker';

export interface UIState {
  isMenuOpen: boolean;
  toggleMenu: () => void;
}

export interface Country {
  name: {
    common: string;
  };
}

export interface IUser {
  fullName: string;
  email: string;
}
