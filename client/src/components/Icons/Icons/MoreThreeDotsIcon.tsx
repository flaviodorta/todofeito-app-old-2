import { ReactComponent as SvgIcon } from '../../../assets/svgs/more-three-dots.svg';

export function MoreThreeDotsIcon({
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
