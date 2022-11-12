import { FunctionComponent } from 'react';
import { FormProps } from './FormProps';
import styles from './Form.module.scss';
import cn from 'classnames';

export const Form: FunctionComponent<FormProps> = (props) => {
  const { className, ...rest } = props;

  return <form {...rest} noValidate className={cn(styles.root, className)} />;
};
