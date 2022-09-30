import { UIStore, userStore, calendarStore, addTodoStore } from './stores';

export const useUIStore = () => UIStore((state) => state);
export const useUserStore = () => userStore((state) => state);
export const useCalendarStore = () => calendarStore((state) => state);
export const useAddTodoStore = () => addTodoStore((state) => state);
