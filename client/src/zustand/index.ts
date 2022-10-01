import { userStore } from './stores/userStore';
import { calendarStore } from './stores/calendarStore';

export const useUserStore = () => userStore((state) => state);
export const useCalendarStore = () => calendarStore((state) => state);
