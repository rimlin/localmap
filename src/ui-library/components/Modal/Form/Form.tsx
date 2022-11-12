import classNames from 'classnames';
import { FormEvent, FunctionComponent } from 'react';
import { Form as FormComponent } from '~/ui-library/components/Form';
import { FormProps } from './FormProps';
import styles from './Form.module.scss';

export const Form: FunctionComponent<FormProps> = (props) => {
  const { className, stopPropagation, onSubmit, ...restProps } = props;

  const onInternalSubmit = (event: FormEvent<HTMLFormElement>) => {
    if (stopPropagation) {
      event.stopPropagation();
    }

    onSubmit?.(event);
  };

  return (
    <FormComponent
      className={classNames(className, styles.root)}
      onSubmit={onInternalSubmit}
      {...restProps}
    />
  );
};
