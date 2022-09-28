import { useRef } from 'react';
import { getDayNumberInMonth } from '../../helpers/functions';

interface Props {
  className?: string;
  date: Date;
}

export const Day = (props: Props) => {
  const { className, date } = props;
  const ref = useRef<HTMLSpanElement>(null);

  return (
    <span
      ref={ref}
      className={`${className} relative flex items-center justify-center`}
    >
      {getDayNumberInMonth(date)}
    </span>
  );
};
