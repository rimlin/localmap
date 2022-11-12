import classNames from 'classnames';
import React, {
  ButtonHTMLAttributes,
  forwardRef,
  PropsWithChildren,
} from 'react';
import { IconButtonProps } from './IconButtonProps';
import styles from './IconButton.module.scss';

export const IconButton = forwardRef<
  HTMLButtonElement,
  PropsWithChildren<IconButtonProps>
>((props, ref) => {
  const { size = 'normal', className, children, ...restProps } = props;

  const totalClassName = classNames(
    styles.button,
    styles.transparent,
    styles[size],
    className,
  );

  return (
    <button
      className={totalClassName}
      ref={ref as React.ForwardedRef<HTMLButtonElement>}
      type="button"
      {...(restProps as ButtonHTMLAttributes<HTMLButtonElement>)}
    >
      {children}
    </button>
  );
});
