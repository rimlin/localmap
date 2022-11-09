import { ElementType, forwardRef } from 'react';
import { PolymorphicRef } from '../utils/types';
import { ButtonProps } from './ButtonProps';

type ButtonComponent = <T extends React.ElementType = 'button'>(
  props: ButtonProps<T>,
) => React.ReactElement | null;

export const Button: ButtonComponent = forwardRef(
  <T extends ElementType = 'button'>(
    props: ButtonProps<T>,
    ref: PolymorphicRef<T>,
  ) => {
    const { as: Component = 'button', variant, ...restProps } = props;

    return <Component ref={ref} {...restProps} />;
  },
);
