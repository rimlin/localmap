import { PlacesGroupQueryParams, useQueryParams } from '~/features/router';

export const usePlacesGroupId = () => {
  const { group } = useQueryParams<PlacesGroupQueryParams>();

  return group;
};
