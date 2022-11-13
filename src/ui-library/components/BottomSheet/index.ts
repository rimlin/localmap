import { BottomSheet as BottomSheetComponent } from 'react-spring-bottom-sheet';
import { Content } from './Content';
import { Header } from './Header';

export const BottomSheet = Object.assign(BottomSheetComponent, {
  Header,
  Content,
});

export type { BottomSheetRef } from 'react-spring-bottom-sheet';
