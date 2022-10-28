import { createRef } from 'react';
import { isDesktop } from 'react-device-detect';
import create from 'zustand';

interface IUIStore {
  isSidebarOpen: boolean;
  isSidebarProjectsOpen: boolean;
  todoInputOpenById: string | null;
  sectionInputOpenById: string | null;
  labelShowById: string | null;
  withBackdropOpenById: string | null;
  observediesRefs: HTMLDivElement[];
  setObservedRef: (el: HTMLDivElement) => void;
  toggleSidebar: () => void;
  toggleSidebarProjects: () => void;
  setTodoInputOpenById: (id: string | null) => void;
  setSectionInputOpenById: (id: string | null) => void;
  setLabelShowById: (id: string | null) => void;
  setWithBackdropOpenById: (id: string | null) => void;
}

const ref = createRef();

const isMinorThanLargeScreen = window.innerWidth <= 1024;

export const UIStore = create<IUIStore>((set, get) => ({
  isSidebarOpen: !isDesktop ? false : isMinorThanLargeScreen ? false : true,
  isSidebarProjectsOpen: true,
  todoInputOpenById: null,
  sectionInputOpenById: null,
  labelShowById: null,
  withBackdropOpenById: null,
  observediesRefs: [],
  setObservedRef: (el: HTMLDivElement) =>
    set((state) => ({
      observediesRefs: [...state.observediesRefs, el],
    })),
  toggleSidebar: () =>
    set((state) => ({
      isSidebarOpen: !state.isSidebarOpen,
    })),
  toggleSidebarProjects: () =>
    set((state) => ({
      isSidebarProjectsOpen: !state.isSidebarProjectsOpen,
    })),
  setTodoInputOpenById: (id: string | null) =>
    set((state) => ({ ...state, todoInputOpenById: id })),
  setSectionInputOpenById: (id: string | null) =>
    set((state) => ({ ...state, sectionInputOpenById: id })),
  setLabelShowById: (id: string | null) =>
    set((state) => ({
      ...state,
      labelShowById: id,
    })),
  setWithBackdropOpenById: (id: string | null) =>
    set((state) => ({
      ...state,
      withBackdropOpenById: id,
    })),
}));
