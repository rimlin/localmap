import cn from 'classnames';
import { ElementType, forwardRef } from 'react';
import { PolymorphicRef } from '../utils/types';
import { ButtonComponent, ButtonProps } from './ButtonProps';
import styles from './Button.module.scss';

export const Button: ButtonComponent = forwardRef(
  <T extends ElementType = 'button'>(
    props: ButtonProps<T>,
    ref: PolymorphicRef<T>,
  ) => {
    const {
      as: Component = 'button',
      fullWidth,
      className,
      ...restProps
    } = props;

    return (
      <Component
        ref={ref}
        className={cn(className, {
          [styles.fullWidth as string]: fullWidth,
        })}
        {...restProps}
      />
    );
  },
);
