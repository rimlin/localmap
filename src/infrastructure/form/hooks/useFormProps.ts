import { UseFormProps as UseFormPropsRHK } from 'react-hook-form/dist/types';
import z from 'zod';
import { FieldValues } from 'react-hook-form/dist/types/fields';

export type UseFormProps<
  TFieldValues extends FieldValues = FieldValues,
  TContext = unknown,
> = Omit<UseFormPropsRHK<TFieldValues, TContext>, 'resolver'> & {
  schema?: z.AnyZodObject;
};
