import { motion } from 'framer-motion';

export const Backdrop = ({
  close,
  className,
}: {
  close: () => void;
  className?: string;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.15 }}
      onClick={close}
      className={`${className} fixed w-screen h-screen -translate-x-0 -translate-y-0 z-50 top-0 left-0 bg-black/0`}
    />
  );
};
