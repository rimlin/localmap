import { LatLngLiteral } from 'leaflet';

export type CreatePlaceProps = {
  location: LatLngLiteral;
  onCreated: () => void;
  onCancel: () => void;
};
