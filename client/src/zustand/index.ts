import { todosStore } from './stores/todosStore';
import { UIStore } from './stores/UIStore';
import { userStore } from './stores/userStore';

export const useUserStore = () => userStore((state) => state);

export const useUIStore = () => UIStore((state) => state);

export const useTodosStore = () => todosStore((state) => state);
