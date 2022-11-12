import { Text } from '../../Text';
import { HeaderProps } from './HeaderProps';
import styles from './Header.module.scss';

export const Header = ({ children }: HeaderProps) => {
  return (
    <div className={styles.root}>
      <Text typography="h2-medium-24">{children}</Text>
    </div>
  );
};
