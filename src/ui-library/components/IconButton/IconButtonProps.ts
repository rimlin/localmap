import { ButtonHTMLAttributes } from 'react';

export type IconButtonSize = 'small' | 'normal' | 'large';

export type IconButtonProps = {
  size?: IconButtonSize;
} & ButtonHTMLAttributes<HTMLButtonElement>;
