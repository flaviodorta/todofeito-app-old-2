import { motion } from 'framer-motion';

export const Backdrop = ({
  close,
  className,
  children,
}: {
  close: () => void;
  className?: string;
  children?: React.ReactNode;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.15 }}
      onClick={close}
      className={`${className} fixed w-screen h-screen top-0 left-0 bg-transparent`}
    >
      {children}
    </motion.div>
  );
};
