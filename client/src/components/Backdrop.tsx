export const Backdrop = ({
  handleClose,
  className,
}: {
  handleClose: () => void;
  className?: string;
}) => {
  return (
    <div
      onClick={handleClose}
      className={`${className} fixed w-screen top-0 left-0 h-screen bg-black/0`}
    />
  );
};
