import { Portal } from 'react-portal';

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
    <Portal node={document && document.getElementById('root')}>
      <div
        style={style}
        className={`${className} z-[10000] fixed -translate-x-1/2 whitespace-nowrap bg-gray-900 text-xs text-white shadow-lg rounded-md px-3 py-2`}
      >
        {content}
      </div>
    </Portal>
  );
};
