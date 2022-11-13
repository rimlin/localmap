import { useState } from 'react';

type Props = {
  initialOpen?: boolean;
};

export const useModalState = <T>(props: Props = {}) => {
  const { initialOpen = false } = props;
  const [data, setData] = useState<T>();

  const [isOpen, setIsOpen] = useState(initialOpen);

  const open = (value?: T) => {
    setData(value);
    setIsOpen(true);
  };

  const close = () => {
    setIsOpen(false);
    setData(undefined);
  };

  const toggle = () => {
    setIsOpen((prevState) => !prevState);
  };

  return { data, open, close, isOpen, toggle };
};
