import { ReactNode } from 'react';

export type ModalProps = {
  open: boolean;
  className?: string;
  onClose: () => void;
  children: ReactNode;
  hideBackdrop?: boolean;
};
