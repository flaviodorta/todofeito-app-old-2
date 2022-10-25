import { Variants } from 'framer-motion';
import { isDesktop } from 'react-device-detect';

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
    width: isDesktop ? 360 : 250,
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
  exit: {
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
};

export const sidebarProjectsWrapper: Variants = {
  initial: {
    transition: {
      staggerChildren: 0.2,
      staggerDirection: -1,
    },
  },
  animate: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

export const sidebarProjectWrapper: Variants = {
  initial: {
    opacity: 0,
    y: -20,
    transition: {
      bounce: 0,
      ease: [0.6, 0.05, -0.01, 0.9],
    },
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      bounce: 0,
      ease: [0.6, 0.05, -0.01, 0.9],
    },
  },
};
