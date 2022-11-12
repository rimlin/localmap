import classNames from 'classnames';
import { FunctionComponent } from 'react';
import { TitleProps } from './TitleProps';
import styles from './Title.module.scss';
import { Text } from '../../Text';

export const Title: FunctionComponent<TitleProps> = (props) => {
  const { className, children } = props;

  return (
    <Text
      typography="h2-medium-24"
      className={classNames(styles.root, className)}
    >
      {children}
    </Text>
  );
};
