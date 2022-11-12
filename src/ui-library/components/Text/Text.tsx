import classNames from 'classnames';
import { TextProps } from './TextProps';
import styles from './Text.module.scss';

export const Text = (props: TextProps) => {
  const {
    as: Component = 'span',
    className,
    color = 'primary',
    typography,
    ...restProps
  } = props;

  return (
    <Component
      className={classNames(
        className,
        styles[`font-${typography}`],
        styles[`color-${color}`],
      )}
      {...restProps}
    />
  );
};
