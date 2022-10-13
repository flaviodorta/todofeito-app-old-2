import { Resizable } from 'react-resizable';
import { useUIStore } from '../zustand';
import { motion } from 'framer-motion';

export const Sidebar = () => {
  const { isSidebarOpen } = useUIStore();
  return (
    <Resizable height={100} width={306}>
      <motion.div
        initial={{ width: 306 }}
        animate={isSidebarOpen ? { translateX: 0 } : { translateX: '-100%' }}
        transition={{
          bounce: 0,
          duration: 0.3,
        }}
        className='pt-6 w-[306px] pl-12 pr-4 h-full fixed bg-red-300'
      >
        <div className='w-full flex'>
          <div className='ml-auto'>coll</div>
        </div>
      </motion.div>
    </Resizable>
  );
};
