import { ActionButton } from '~/ui-library/components/ActionButton';
import { ModalSubmitActionsProps } from './ModalSubmitActionsProps';
import styles from './ModalSubmitActions.module.scss';

export const ModalSubmitActions = (props: ModalSubmitActionsProps) => {
  const {
    submitLabel = 'Отправить',
    cancelLabel = 'Отмена',
    onCancel,
    loading,
  } = props;

  return (
    <div className={styles.root}>
      <ActionButton disabled={loading} type="submit">
        {submitLabel}
      </ActionButton>
      <ActionButton disabled={loading} onClick={onCancel}>
        {cancelLabel}
      </ActionButton>
    </div>
  );
};
