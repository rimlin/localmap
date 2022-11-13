import { useRouter } from 'next/router';
import { usePlacesGroupId } from '~/features/placesGroup';
import { InsertPlaceQueryParams, useQueryParams } from '~/features/router';

export const useMapActionsState = () => {
  const router = useRouter();
  const placesGroupId = usePlacesGroupId();
  const { insertPlace } = useQueryParams<InsertPlaceQueryParams>();

  const onInsertPlace = () => {
    router.push({
      ...router,
      query: { ...router.query, insertPlace: '1' },
    });
  };

  const onCancelInsertPlace = () => {
    router.push({
      ...router,
      query: { ...router.query, insertPlace: undefined },
    });
  };

  const isInsertingPlace = placesGroupId !== undefined && insertPlace === '1';

  return {
    insertPlace: onInsertPlace,
    cancelInsertPlace: onCancelInsertPlace,
    isInsertingPlace,
  };
};
