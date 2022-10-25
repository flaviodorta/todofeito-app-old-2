import { motion } from 'framer-motion';
import { useRef } from 'react';
import { Portal } from 'react-portal';

export const Backdrop = ({
  elementId,
  close,
  className,
  children,
}: {
  close: () => void;
  elementId?: string;
  className?: string;
  children?: React.ReactNode;
}) => {
  const backdropRef = useRef<HTMLDivElement>(null);

  return (
    <Portal
      node={document && document.getElementById(elementId ? elementId : 'root')}
    >
      <motion.div
        ref={backdropRef}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.15 }}
        onClick={(e) =>
          e.target === backdropRef.current ? close() : undefined
        }
        className={`${className} cursor-default fixed w-screen h-screen top-0 left-0`}
      >
        {children}
      </motion.div>
    </Portal>
  );
};
