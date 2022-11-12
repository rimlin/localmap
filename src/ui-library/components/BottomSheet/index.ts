import { BottomSheet as BottomSheetComponent } from 'react-spring-bottom-sheet';
import { Header } from './Header';

export const BottomSheet = Object.assign(BottomSheetComponent, {
  Header,
});

export type { BottomSheetRef } from 'react-spring-bottom-sheet';
