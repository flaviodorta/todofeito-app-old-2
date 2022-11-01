import { isDesktop } from 'react-device-detect';
import create from 'zustand';

interface IUIStore {
  isSidebarOpen: boolean;
  isSidebarProjectsOpen: boolean;
  observediesHeights: number[];
  draggingElementId: string | null;
  ref: HTMLDivElement | null;
  setRef: (node: HTMLDivElement | null) => void;
  setDraggingElementId: (id: string | null) => void;
  addObservedHeight: (height: number) => void;
  setObservedHeight: (height: number, index: number) => void;
  toggleSidebar: () => void;
  toggleSidebarProjects: () => void;
}

const isMinorThanLargeScreen = window.innerWidth <= 1024;

export const UIStore = create<IUIStore>((set, get) => ({
  isSidebarOpen: !isDesktop ? false : isMinorThanLargeScreen ? false : true,
  isSidebarProjectsOpen: true,
  observediesHeights: [],
  draggingElementId: null,
  ref: null,
  setRef: (node: HTMLDivElement | null) =>
    set((state) => ({
      ...state,
      ref: node,
    })),
  setDraggingElementId: (id: string | null) =>
    set((state) => ({
      ...state,
      draggingElementId: id,
    })),
  addObservedHeight: (height: number) =>
    set((state) => ({
      observediesHeights: [...state.observediesHeights, height],
    })),
  setObservedHeight: (height: number, index: number) =>
    set((state) => {
      const newObservediresHeights = [...state.observediesHeights];
      newObservediresHeights[index] = height;

      return {
        observediesHeights: newObservediresHeights,
      };
    }),
  toggleSidebar: () =>
    set((state) => ({
      isSidebarOpen: !state.isSidebarOpen,
    })),
  toggleSidebarProjects: () =>
    set((state) => ({
      isSidebarProjectsOpen: !state.isSidebarProjectsOpen,
    })),
}));
