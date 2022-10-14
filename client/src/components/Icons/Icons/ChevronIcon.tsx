import { ReactComponent as SvgIcon } from '../../../assets/svgs/chevron-down.svg';

export function ChevronIcon({
  height = '16px',
  width = '16px',
  className,
  ...restProps
}: {
  [key: string]: any;
}): JSX.Element {
  return (
    <SvgIcon
      height={height}
      width={width}
      className={className}
      {...restProps}
    />
  );
}
