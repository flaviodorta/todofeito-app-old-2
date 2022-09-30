export const Backdrop = ({ handleClose }: { handleClose: () => void }) => {
  return (
    <div
      onClick={handleClose}
      className='absolute w-screen top-0 left-0 z-[90] h-screen bg-black/0'
    />
  );
};