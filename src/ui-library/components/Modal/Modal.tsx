import ReactDOM from 'react-dom';
import { FunctionComponent, ReactNode, useEffect } from 'react';
import { Actions } from './Actions/Actions';
import { Backdrop } from './Backdrop/Backdrop';
import { Content } from './Content/Content';
import { Title } from './Title/Title';
import { Form } from './Form/Form';
import { Popup } from './Popup';
import { ModalProps } from './ModalProps';
import styles from './Modal.module.scss';

const ModalRoot: FunctionComponent<ModalProps> = (props) => {
  const { hideBackdrop, className, open, onClose, children } = props;

  useEffect(() => {
    const closeOnEscapeKeyDown = (event: KeyboardEvent) => {
      if (event.code === 'Escape') {
        onClose();
      }
    };

    document.body.addEventListener('keydown', closeOnEscapeKeyDown);
    return function cleanup() {
      document.body.removeEventListener('keydown', closeOnEscapeKeyDown);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return open
    ? ReactDOM.createPortal(
        <div className={styles.root}>
          {!hideBackdrop && <Backdrop />}

          <Popup className={className} onClose={onClose}>
            {children as ReactNode}
          </Popup>
        </div>,
        document.body,
      )
    : null;
};

export const Modal = Object.assign(ModalRoot, {
  Title: Title,
  Content: Content,
  Actions: Actions,
  Form: Form,
});
