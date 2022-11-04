import { isDesktop } from 'react-device-detect';
import create from 'zustand';
import { ISearchedInputs } from '../../helpers/types';
import { IPlaceholderProps } from '../../hooks/useDndPlaceholder';

interface IUIStore {
  isSidebarOpen: boolean;
  isSidebarProjectsOpen: boolean;
  observediesHeights: number[];
  draggingElementId: string | null;
  draggingOverElementId: string | null;
  ref: HTMLDivElement | null;
  placeholderProps: IPlaceholderProps;
  searchedInputs: ISearchedInputs;
  setSearchedInputs: (searchInputs: ISearchedInputs) => void;
  setPlaceholderProps: (placeholderProps: IPlaceholderProps) => void;
  setRef: (node: HTMLDivElement | null) => void;
  setDraggingElementId: (id: string | null) => void;
  setDraggingOverElementId: (id: string | null) => void;
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
  draggingOverElementId: null,
  placeholderProps: {
    height: 0,
    width: 0,
    y: 0,
    x: 0,
  },
  ref: null,
  searchedInputs: {
    results: {
      projectsIds: [],
      sectionsIds: [],
      labelsIds: [],
      todosIds: [],
    },
    recentSearches: [],
    recentlyViewedIds: [],
  },
  setSearchedInputs: (searchInputs: ISearchedInputs) =>
    set((state) => ({
      ...state,
      searchedInputs: searchInputs,
    })),
  setPlaceholderProps: (placeholderProps: IPlaceholderProps) =>
    set((state) => ({
      ...state,
      placeholderProps,
    })),
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
  setDraggingOverElementId: (id: string | null) =>
    set((state) => ({
      ...state,
      draggingOverElementId: id,
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
