import { GroupQueryParams, useQueryParams } from '~/features/router';

export const usePlacesGroupId = () => {
  const { group } = useQueryParams<GroupQueryParams>();

  return group;
};
