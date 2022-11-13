import { useQuery } from '@tanstack/react-query';
import { BiMap } from 'react-icons/bi';
import { appFetch, URL_FACTORY } from '~/infrastructure/network';
import { NominatimLocationPlace } from '~/infrastructure/network/types/nominatim';
import { Text } from '~/ui-library/components/Text';
import { PlaceAddressByLatLngProps } from './PlaceAddressByLatLngProps';
import styles from './PlaceAddressByLatLng.module.scss';

export const PlaceAddressByLatLng = (props: PlaceAddressByLatLngProps) => {
  const { lat, lng } = props;

  const { data, isLoading } = useQuery<NominatimLocationPlace>({
    queryKey: ['place-address', lat, lng],
    queryFn: () => appFetch(URL_FACTORY.NOMINATIM.LOCATION(lat, lng)),
  });

  if (isLoading) {
    return (
      <div className={styles.root}>
        <BiMap className={styles.icon} type="solid" size={36} />
        <Text typography="text-medium-14">Определение местоположения...</Text>
      </div>
    );
  }

  return (
    <div className={styles.root}>
      <BiMap className={styles.icon} type="solid" size={36} />
      <div className={styles.address}>
        <Text typography="text-medium-14">
          {data?.address.road} {data?.address.suburb}
        </Text>
        <Text typography="text-regular-14">
          {data?.address.county} {data?.address.province}
        </Text>
      </div>
    </div>
  );
};
