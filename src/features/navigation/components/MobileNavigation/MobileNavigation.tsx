import { useRef } from 'react';
import { BottomSheet, BottomSheetRef } from 'react-spring-bottom-sheet';
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
        console.log(1);
        sheetRef.current?.snapTo(() => {
          return 100;
        });
      }}
      snapPoints={() => [100, window.innerHeight - 200]}
      ref={sheetRef}
    >
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
