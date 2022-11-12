import cn from 'classnames';
import React, { ElementType, forwardRef } from 'react';
import { Button, ButtonComponent, ButtonProps } from '../Button';
import { PolymorphicRef } from '../utils/types';
import styles from './ActionButton.module.scss';

export const ActionButton: ButtonComponent = forwardRef(
  <T extends ElementType = 'button'>(
    props: ButtonProps<T>,
    ref: PolymorphicRef<T>,
  ) => {
    const { className, ...rest } = props;

    return (
      <Button
        {...rest}
        className={cn(styles.actionButton, className)}
        ref={ref}
      />
    );
  },
);
