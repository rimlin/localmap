import { useForm as useFormRHF } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { FieldValues, UseFormReturn } from 'react-hook-form/dist/types';
import { UseFormProps } from './useFormProps';

export function useForm<
  TFieldValues extends FieldValues = FieldValues,
  TContext = unknown,
>(
  props?: UseFormProps<TFieldValues, TContext>,
): UseFormReturn<TFieldValues, TContext> {
  return useFormRHF({
    ...props,
    resolver: props?.schema ? zodResolver(props.schema) : undefined,
  });
}
