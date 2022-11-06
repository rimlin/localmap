import { useRouter } from 'next/router';
import { parseQuery } from '../utils';

export const useQueryParams = <T>(): Partial<T> => {
  const router = useRouter();

  return parseQuery(router.query);
};
