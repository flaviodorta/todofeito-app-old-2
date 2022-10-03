export const Backdrop = ({ close }: { close: () => void }) => {
  return (
    <div
      onClick={close}
      className='fixed w-[300rem] h-[300rem] -translate-x-[150rem] -translate-y-[150rem] z-50 top-0 left-0 bg-black/0'
    />
  );
};
