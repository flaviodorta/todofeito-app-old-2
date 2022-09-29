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

export const addTodoModal: Variants = {
  initial: {
    scale: 0.4,
    opacity: 0,
    y: -50,
    x: '-50%',
    transition: {
      duration: 0.1,
      type: 'tween',
      ease: 'linear',
    },
  },
  animate: {
    scale: 1,
    opacity: 1,
    y: -150,
    x: '-50%',
    transition: {
      duration: 0.1,
      type: 'tween',
      ease: 'linear',
    },
  },
};
