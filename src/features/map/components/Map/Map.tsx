import { LatLng } from 'leaflet';
import React, { useEffect, useRef, useState } from 'react';
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
  CircleMarker,
} from 'react-leaflet';
import { usePlaces } from '~/features/place';
import { RouterInput } from '~/utils/trpc';
import { useMapActionsState } from '../../hooks';
import { restoreLocationService } from '../../services';
import { mapStateStore } from '../../stores';
import styles from './Map.module.css';
// import 'leaflet/dist/leaflet.css';

type HandlersProps = {
  onChangeBounds: (southWest: LatLng, northEast: LatLng) => void;
};

const Handlers = (props: HandlersProps) => {
  const { onChangeBounds } = props;
  const mapActionsState = useMapActionsState();

  const map = useMapEvents({
    move: () => {
      setCenter(map.getCenter());
    },
    moveend: () => {
      mapStateStore.set({ center: map.getCenter() });
      restoreLocationService.save(map.getCenter());
      onChangeBounds(
        map.getBounds().getSouthWest(),
        map.getBounds().getNorthEast(),
      );
    },
    locationfound: (event) => {
      map.panTo(event.latlng);
    },
  });

  const [center, setCenter] = useState(map.getCenter());

  useEffect(() => {
    map.locate();

    onChangeBounds(
      map.getBounds().getSouthWest(),
      map.getBounds().getNorthEast(),
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (mapActionsState.isInsertingPlace) {
    return (
      <CircleMarker
        center={center}
        pathOptions={{ color: 'red', fillOpacity: 1 }}
        radius={10}
      />
    );
  }
};

const Map: React.FC = () => {
  const [bounds, setBounds] = useState<
    RouterInput['place']['list']['bounds'] | undefined
  >(undefined);

  const defaultCenter = useRef(restoreLocationService.get()).current;

  const { data } = usePlaces({ bounds });

  const updateMarkers = async (southWest: LatLng, northEast: LatLng) => {
    setBounds({
      southWestLng: southWest.lng,
      southWestLat: southWest.lat,
      northEastLng: northEast.lng,
      northEastLat: northEast.lat,
    });
  };

  return (
    <div>
      <MapContainer className={styles.map} center={defaultCenter} zoom={10}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {data?.map((marker) => (
          <Marker key={marker.id} position={[marker.lat, marker.long]}>
            <Popup>{marker.id}</Popup>
          </Marker>
        ))}
        <Handlers onChangeBounds={updateMarkers} />
      </MapContainer>
    </div>
  );
};

export default Map;
