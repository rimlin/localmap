import { BiMap } from 'react-icons/bi';
import { Text } from '~/ui-library/components/Text';
import { PlaceCardProps } from './PlaceCardProps';
import styles from './PlaceCard.module.scss';

export const PlaceCard = (props: PlaceCardProps) => {
  const { info, onClick } = props;

  return (
    <div className={styles.root} onClick={onClick}>
      <BiMap className={styles.icon} type="solid" size={36} />
      <div className={styles.address}>
        <Text typography="text-medium-14">{info.name}</Text>
        <Text typography="text-regular-14">{info.description}</Text>
      </div>
    </div>
  );
};
