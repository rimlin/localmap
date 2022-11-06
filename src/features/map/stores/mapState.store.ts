import { atom } from 'nanostores';

type MapState = 'idle' | 'insertMarker';

export const mapStateStore = atom<MapState>('idle');
