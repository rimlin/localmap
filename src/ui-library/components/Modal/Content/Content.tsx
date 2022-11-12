import cn from 'classnames';
import { FunctionComponent } from 'react';
import styles from './Content.module.scss';
import { ContentProps } from './ContentProps';

export const Content: FunctionComponent<ContentProps> = (props) => {
  const { children, className } = props;

  return <div className={cn(styles.root, className)}>{children}</div>;
};
