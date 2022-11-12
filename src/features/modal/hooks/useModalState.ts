import { useState } from 'react';

type Props = {
  initialOpen?: boolean;
};

export const useModalState = (props: Props = {}) => {
  const { initialOpen = false } = props;

  const [isOpen, setIsOpen] = useState(initialOpen);

  const open = () => {
    setIsOpen(true);
  };

  const close = () => {
    setIsOpen(false);
  };

  const toggle = () => {
    setIsOpen((prevState) => !prevState);
  };

  return { open, close, isOpen, toggle };
};
