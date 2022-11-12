import React, { FunctionComponent } from 'react';
import classNames from 'classnames';
import styles from './FormCol.module.scss';
import { FormColProps } from './FormColProps';

export const FormCol: FunctionComponent<FormColProps> = (props) => {
  const { className, ...rest } = props;

  return (
    <div
      data-form="col"
      {...rest}
      className={classNames(styles.formCol, className)}
    />
  );
};
