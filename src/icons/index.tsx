import { FC, ComponentPropsWithoutRef } from 'react';

type Props = ComponentPropsWithoutRef<'svg'>;

export const ArrowFillIcon: FC<Props> = ({ style = {}, ...rest }) => {
  return (
    <svg
      {...rest}
      style={{ fill: 'white', ...style }}
      width='8'
      height='4'
      viewBox='0 0 8 4'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path d='M0 0L4 4L8 0H0Z' />
    </svg>
  );
};

export const CloseIcon: FC<Props> = ({ style = {}, ...rest }) => {
  return (
    <svg
      {...rest}
      style={{ stroke: 'black', ...style }}
      width='16'
      height='16'
      viewBox='0 0 16 16'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path d='M1 1L15 15M15 1L1 15' strokeWidth='1.8' />
    </svg>
  );
};