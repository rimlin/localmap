import { LatLngLiteral } from 'leaflet';

export type SelectPlaceProps = {
  onSubmit: (latLng: LatLngLiteral) => void;
};
