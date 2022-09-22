import { ReactComponent as SvgIcon } from '../../../assets/svgs/arrow-up-right-dots-solid.svg';

export function ArrowGrowthIcon({
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
