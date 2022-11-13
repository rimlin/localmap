import React from 'react';
import { ModalSubmitActions } from '~/features/modal';
import { usePlacesGroupId } from '~/features/placesGroup';
import { useForm } from '~/infrastructure/form';
import { FormCol, FormRow } from '~/ui-library/components/Form';
import { Modal } from '~/ui-library/components/Modal';
import { RouterInput, trpc } from '~/utils/trpc';
import { createPlaceFormSchema } from '../../validations';
import { CreatePlaceProps } from './CreatePlaceProps';

type FormFields = RouterInput['place']['add'];

export const CreatePlace = (props: CreatePlaceProps) => {
  const { location, onCancel, onCreated } = props;
  const placesGroupId = usePlacesGroupId();

  const utils = trpc.useContext();

  const addPlace = trpc.place.add.useMutation({
    async onSuccess() {
      onCreated();
      await utils.place.list.invalidate();
    },
  });

  const {
    handleSubmit,
    formState: { errors, isSubmitting },
    register,
  } = useForm<FormFields>({
    schema: createPlaceFormSchema,
  });

  const submit = (values: FormFields) => {
    addPlace.mutate({
      location,
      placeGroupId: placesGroupId as string,
      name: values.name,
      description: values.description,
    });
  };

  console.log(errors);

  return (
    <Modal open onClose={onCancel}>
      <Modal.Title>Добавить место</Modal.Title>
      <Modal.Form stopPropagation onSubmit={handleSubmit(submit)}>
        <Modal.Content>
          <FormRow>
            <FormCol>
              <input
                type="text"
                placeholder="Название места"
                {...register('name')}
              />
            </FormCol>
          </FormRow>
          <FormRow>
            <FormCol>
              <textarea
                placeholder="Описание места"
                {...register('description')}
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
