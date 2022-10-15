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
      className={`${className} fixed w-[300rem] h-[300rem] -translate-x-[150rem] -translate-y-[150rem] z-50 top-0 left-0 bg-black/0`}
    />
  );
};
