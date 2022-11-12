import React, { FunctionComponent } from 'react';
import classNames from 'classnames';
import styles from './FormRow.module.scss';
import { FormRowProps } from './FormRowProps';

export const FormRow: FunctionComponent<FormRowProps> = (props) => {
  const { className, ...rest } = props;

  return (
    <div
      data-form="row"
      {...rest}
      className={classNames(styles.formRow, className)}
    />
  );
};
