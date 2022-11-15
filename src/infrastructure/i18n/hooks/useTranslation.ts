import { useTranslation as useTranslationReact } from 'react-i18next';
import { useTranslation as useTranslationNext } from 'next-i18next';

const useTranslationOrig = (arg1: string, arg2: any) => {
  return useTranslationNext(arg1, arg2);
};

/**
 * @types/i18next.d.ts типы не применяются для next-i18next
 */
export const useTranslation =
  useTranslationOrig as unknown as typeof useTranslationReact;
