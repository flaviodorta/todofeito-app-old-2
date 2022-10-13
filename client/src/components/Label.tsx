export const Label = ({
  content,
  className,
}: {
  content: string;
  className?: string;
}) => {
  return <div className={`${className} label z-100`}>{content}</div>;
};
