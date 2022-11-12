import React from 'react';
import { ModalSubmitActions } from '~/features/modal';
import { useForm } from '~/infrastructure/form';
import { FormCol, FormRow } from '~/ui-library/components/Form';
import { Modal } from '~/ui-library/components/Modal';
import { RouterInput, trpc } from '~/utils/trpc';
import { createPlacesGroupSchema } from '../../validations';
import { CreatePlacesGroupProps } from './CreatePlacesGroupProps';

type FormFields = RouterInput['placesGroup']['add'];

export const CreatePlacesGroup = (props: CreatePlacesGroupProps) => {
  const { onCancel, onCreated } = props;
  const utils = trpc.useContext();

  const addPlacesGroup = trpc.placesGroup.add.useMutation({
    async onSuccess(data) {
      onCreated(data);
      await utils.placesGroup.list.invalidate();
    },
  });

  const {
    handleSubmit,
    formState: { errors, isSubmitting },
    register,
  } = useForm<FormFields>({
    schema: createPlacesGroupSchema,
  });

  const submit = (values: FormFields) => {
    addPlacesGroup.mutate(values);
  };

  console.log(errors);

  return (
    <Modal open onClose={onCancel}>
      <Modal.Title>Создать список</Modal.Title>
      <Modal.Form onSubmit={handleSubmit(submit)}>
        <Modal.Content>
          <FormRow>
            <FormCol>
              <input
                type="text"
                placeholder="Название списка"
                {...register('name')}
              />
            </FormCol>
          </FormRow>
        </Modal.Content>
        <Modal.Actions>
          <ModalSubmitActions loading={isSubmitting} onCancel={onCancel} />
        </Modal.Actions>
      </Modal.Form>
    </Modal>
  );
};
