import { FunctionComponent, PropsWithChildren } from 'react';
import classNames from 'classnames';
import { BiX } from 'react-icons/bi';
import { IconButton } from '~/ui-library/components/IconButton';
import { PopupProps } from './PopupProps';
import styles from './Popup.module.scss';

export const Popup: FunctionComponent<PropsWithChildren<PopupProps>> = (
  props,
) => {
  const { className, children, onClose } = props;

  return (
    <div className={styles.root}>
      <IconButton
        className={classNames(styles.closeButton, className)}
        onClick={() => onClose()}
      >
        <BiX />
      </IconButton>

      {children}
    </div>
  );
};
