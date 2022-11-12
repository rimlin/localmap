import { forwardRef } from 'react';
import styles from './Backdrop.module.scss';

export const Backdrop = forwardRef<HTMLDivElement, object>((_, ref) => {
  return <div className={styles.root} ref={ref} />;
});
