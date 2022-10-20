export const Label = ({
  content,
  className,
}: {
  content: string;
  className?: string;
}) => {
  return <div className={`${className} label fixed z-[10000]`}>{content}</div>;
};
