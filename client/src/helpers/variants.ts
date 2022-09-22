import { Variants } from 'framer-motion';

export const layout: Variants = {
  inital: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
  },
};

export const searchBar: Variants = {
  initial: {
    width: 180,
    transition: {
      duration: 0.1,
    },
  },
  animate: {
    width: 300,
    transition: {
      duration: 0.1,
    },
  },
};
