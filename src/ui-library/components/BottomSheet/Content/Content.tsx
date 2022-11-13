import { ContentProps } from './ContentProps';
import styles from './Content.module.scss';

export const Content = ({ children }: ContentProps) => {
  return <div className={styles.root}>{children}</div>;
};
