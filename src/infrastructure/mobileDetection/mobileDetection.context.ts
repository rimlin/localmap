import { createContext } from 'react';
import { MobileDetection } from './types';

export const MobileDetectionContext = createContext<MobileDetection>({
  isMobile: false,
});
