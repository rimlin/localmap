import { LatLng } from 'leaflet';
import { atom } from 'nanostores';

type MapState = {
  center: LatLng | undefined;
};

export const mapStateStore = atom<MapState>({
  center: undefined,
});
