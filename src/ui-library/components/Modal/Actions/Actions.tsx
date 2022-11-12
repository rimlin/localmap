import { FunctionComponent, PropsWithChildren } from 'react';
import classNames from 'classnames';
import { ActionsProps } from './ActionsProps';
import styles from './Actions.module.scss';

export const Actions: FunctionComponent<PropsWithChildren<ActionsProps>> = (
  props,
) => {
  const { children, className } = props;

  return <div className={classNames(styles.root, className)}>{children}</div>;
};
