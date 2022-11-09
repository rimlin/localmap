import { ElementType } from 'react';
import { PolymorphicComponentPropWithRef } from '../utils/types';

export type ButtonPropsInner = {
  variant?: 'default';
};

export type ButtonProps<T extends ElementType = 'button'> =
  PolymorphicComponentPropWithRef<T, ButtonPropsInner>;
