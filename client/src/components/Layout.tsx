import { motion } from 'framer-motion';

export const Layout = ({ children }: { children: React.ReactNode }) => {
  return <motion.div>{children}</motion.div>;
};
