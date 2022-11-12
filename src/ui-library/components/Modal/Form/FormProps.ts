import { FormProps as FormPropsOriginal } from '~/ui-library/components/Form';

export type FormProps = {
  stopPropagation?: boolean;
} & FormPropsOriginal;
