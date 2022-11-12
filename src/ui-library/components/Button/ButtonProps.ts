import { ElementType } from 'react';
import { PolymorphicComponentPropWithRef } from '../utils/types';

export type ButtonPropsInner = {
  variant?: 'default';
};

export type ButtonProps<T extends ElementType = 'button'> =
  PolymorphicComponentPropWithRef<T, ButtonPropsInner>;

export type ButtonComponent = <T extends React.ElementType = 'button'>(
  props: ButtonProps<T>,
) => React.ReactElement | null;
