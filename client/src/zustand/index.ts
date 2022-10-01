import { userStore } from './stores/userStore';

export const useUserStore = () => userStore((state) => state);
