import { ParsedUrlQuery } from 'querystring';

export const parseQuery = <T>(query: ParsedUrlQuery): Partial<T> => {
  return query as Partial<T>;
};
