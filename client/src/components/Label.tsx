export const Label = ({
  content,
  className,
}: {
  content: string;
  className?: string;
}) => {
  return <div className={`${className} label`}>{content}</div>;
};
