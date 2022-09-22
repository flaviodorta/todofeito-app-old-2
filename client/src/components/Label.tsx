export const Label = ({
  content,
  className,
}: {
  content: string;
  className?: string;
}) => {
  return (
    <div
      className={`${className} group-hover:opacity-100 whitespace-nowrap bg-gray-900 text-xs text-white rounded-md px-3 py-2 opacity-0 absolute left-1/2 -bottom-12 -translate-x-1/2`}
    >
      {content}
    </div>
  );
};
