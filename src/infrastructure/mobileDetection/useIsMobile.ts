import { useContext } from 'react';
import { MobileDetectionContext } from './mobileDetection.context';

export const useIsMobile = () => {
  const { isMobile } = useContext(MobileDetectionContext);

  return isMobile;
};
