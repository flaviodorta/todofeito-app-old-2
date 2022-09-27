import { motion } from 'framer-motion';

export const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.15 }}
      className='h-full'
    >
      {children}
    </motion.div>
  );
};
