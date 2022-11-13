import { useStore } from '@nanostores/react';
import { mapStateStore } from '~/features/map';
import { Text } from '~/ui-library/components/Text';
import { Button } from '~/ui-library/components';
import { PlaceAddressByLatLng } from '~/features/place';
import { SelectPlaceProps } from './SelectPlaceProps';
import styles from './SelectPlace.module.scss';

export const SelectPlace = (props: SelectPlaceProps) => {
  const { center } = useStore(mapStateStore);
  const { onSubmit } = props;

  const submit = () => {
    if (center) {
      onSubmit({
        lat: center.lat,
        lng: center.lng,
      });
    }
  };

  return (
    <div className={styles.root}>
      <div className={styles.inner}>
        <Text typography="text-semibold-16" color="secondary">
          Выберите место на карте
        </Text>
        <div className={styles.placeAddress}>
          {center && <PlaceAddressByLatLng lat={center.lat} lng={center.lng} />}
        </div>
      </div>
      <div className={styles.actions}>
        <Button fullWidth onClick={submit}>
          Выбрать
        </Button>
      </div>
    </div>
  );
};
