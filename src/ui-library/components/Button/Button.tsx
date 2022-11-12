import { ElementType, forwardRef } from 'react';
import { PolymorphicRef } from '../utils/types';
import { ButtonComponent, ButtonProps } from './ButtonProps';

export const Button: ButtonComponent = forwardRef(
  <T extends ElementType = 'button'>(
    props: ButtonProps<T>,
    ref: PolymorphicRef<T>,
  ) => {
    const { as: Component = 'button', ...restProps } = props;

    return <Component ref={ref} {...restProps} />;
  },
);
