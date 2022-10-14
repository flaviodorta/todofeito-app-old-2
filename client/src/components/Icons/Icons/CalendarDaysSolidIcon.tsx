import { ReactComponent as SvgIcon } from '../../../assets/svgs/calendar-days-solid.svg';

export function CalendarDaysSolidIcon({
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
