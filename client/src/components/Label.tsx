export const Label = ({
  content,
  className,
  style,
}: {
  content: string;
  className?: string;
  style: React.CSSProperties;
}) => {
  return (
    <div
      style={style}
      className={`${className} z-[10000] fixed hidden md:group-hover:block -translate-x-1/2 whitespace-nowrap bg-gray-900 text-xs text-white shadow-lg rounded-md px-3 py-2`}
    >
      {content}
    </div>
  );
};
