import { ElementType, ReactNode } from 'react';

type TypographyType =
  | 'h1'
  | 'h2-regular-24'
  | 'h2-medium-24'
  | 'h3'
  | 'text-medium-18'
  | 'text-semibold-16'
  | 'text-regular-16'
  | 'text-italic-16'
  | 'text-italic-14'
  | 'text-medium-14'
  | 'text-regular-14';

type ColorType =
  | 'link'
  | 'primary'
  | 'secondary'
  | 'alert'
  | 'warning'
  | 'disable'
  | 'success'
  | 'control-secondary'
  | 'control-passive'
  | 'control-ghost'
  | 'control-faint'
  | 'control-disable'
  | 'control-link'
  | 'control-error';

export type TextProps = {
  as?: ElementType;
  className?: string;
  color?: ColorType;
  typography: TypographyType;
  children: ReactNode;
};
