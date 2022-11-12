import { usePlacesGroupId } from '~/features/placesGroup';
import { RouterInput, trpc } from '~/utils/trpc';

type InputProps = {
  bounds?: RouterInput['place']['list']['bounds'];
};

export const usePlaces = (props: InputProps) => {
  const { bounds } = props;
  const placesGroupId = usePlacesGroupId();

  const placesGroupQuery = trpc.place.list.useQuery(
    {
      bounds,
      placeGroupId: placesGroupId as string,
    },
    {
      enabled: placesGroupId !== undefined && typeof placesGroupId === 'string',
    },
  );

  return placesGroupQuery;
};
