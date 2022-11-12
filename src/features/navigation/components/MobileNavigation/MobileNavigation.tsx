import { useRef } from 'react';
import {
  BottomSheet,
  BottomSheetRef,
} from '~/ui-library/components/BottomSheet';
import styles from './MobileNavigation.module.scss';

export const MobileNavigation = () => {
  const sheetRef = useRef<BottomSheetRef>(null);

  return (
    <BottomSheet
      className={styles.sheet}
      open
      blocking={false}
      expandOnContentDrag
      onDismiss={() => {
        sheetRef.current?.snapTo(() => {
          return 100;
        });
      }}
      snapPoints={() => [80, window.innerHeight - 200]}
      ref={sheetRef}
    >
      <BottomSheet.Header>Места</BottomSheet.Header>
      <button
        onClick={() => {
          // Full typing for the arguments available in snapTo, yay!!
          sheetRef.current?.snapTo(({ maxHeight }) => {
            return maxHeight;
          });
        }}
      >
        Expand to full height
      </button>
      <div style={{ height: 600 }}>thera a text</div>
    </BottomSheet>
  );
};
