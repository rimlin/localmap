import { HTMLAttributes, ReactHTML, ReactNode } from 'react';

export type FormControlProps = {
  as?: keyof ReactHTML;
  children: ReactNode;
} & HTMLAttributes<HTMLElement>;
