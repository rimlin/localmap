import { PlaceCard, usePlaces } from '~/features/place';
import { Button } from '~/ui-library/components';
import { BottomSheet } from '~/ui-library/components/BottomSheet';
import { SheetPlacesProps } from './SheetPlacesProps';

export const SheetPlaces = (props: SheetPlacesProps) => {
  const { onAdd } = props;
  const { data } = usePlaces({});

  const handleClickPlace = () => {};

  return (
    <>
      <BottomSheet.Header>Места</BottomSheet.Header>
      <BottomSheet.Content>
        <Button onClick={onAdd}>Добавить место</Button>

        {data?.map((item) => (
          <PlaceCard key={item.id} info={item} onClick={handleClickPlace} />
        ))}
      </BottomSheet.Content>
    </>
  );
};
