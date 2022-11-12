import React, { FunctionComponent } from 'react';
import cn from 'classnames';
import styles from './FormControl.module.scss';
import { FormControlProps } from './FormControlProps';

export const FormControl: FunctionComponent<FormControlProps> = (props) => {
  const { children, className, as = 'div', ...rest } = props;

  return React.createElement(
    as,
    {
      ...rest,
      className: cn(styles.root, className),
    },
    children,
  );
};
