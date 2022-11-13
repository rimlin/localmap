import { LatLngLiteral } from 'leaflet';
import { useEffect, useRef } from 'react';
import { useMapActionsState } from '~/features/map';
import { useModalState } from '~/features/modal';
import { CreatePlace } from '~/features/place';
import {
  BottomSheet,
  BottomSheetRef,
} from '~/ui-library/components/BottomSheet';
import { SelectPlace } from '../SelectPlace';
import { SheetPlaces } from '../SheetPlaces';
import styles from './MobileNavigation.module.scss';

export const MobileNavigation = () => {
  const sheetRef = useRef<BottomSheetRef>(null);
  const bottomSheetState = useModalState();
  const createPlaceState = useModalState<LatLngLiteral>();
  const mapActionsState = useMapActionsState();

  const onAddPlace = () => {
    mapActionsState.insertPlace();
  };

  useEffect(() => {
    if (mapActionsState.isInsertingPlace) {
      bottomSheetState.close();
    } else {
      createPlaceState.close();
      bottomSheetState.open();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mapActionsState.isInsertingPlace]);

  return (
    <>
      <BottomSheet
        className={styles.sheet}
        open={bottomSheetState.isOpen}
        blocking={false}
        expandOnContentDrag
        onDismiss={() => {
          sheetRef.current?.snapTo(() => {
            return 100;
          });
        }}
        defaultSnap={100}
        snapPoints={() => [100, window.innerHeight - 200]}
        ref={sheetRef}
      >
        <SheetPlaces onAdd={onAddPlace} />
      </BottomSheet>
      {mapActionsState.isInsertingPlace && (
        <>
          <SelectPlace onSubmit={createPlaceState.open} />
          {createPlaceState.isOpen && (
            <CreatePlace
              location={createPlaceState.data as LatLngLiteral}
              onCancel={createPlaceState.close}
              onCreated={mapActionsState.cancelInsertPlace}
            />
          )}
        </>
      )}
    </>
  );
};
