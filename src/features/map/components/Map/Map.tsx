import { LatLng } from 'leaflet';
import { useRouter } from 'next/router';
import React, { useEffect, useRef, useState } from 'react';
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
} from 'react-leaflet';
import { useQueryParams } from '~/features/router';
import { RouterInput, trpc } from '~/utils/trpc';
import { restoreLocationService } from '../../services';
import styles from './Map.module.css';
// import 'leaflet/dist/leaflet.css';

type HandlersProps = {
  groupId: string | undefined;
  onChangeBounds: (southWest: LatLng, northEast: LatLng) => void;
};

const Handlers = (props: HandlersProps) => {
  const { groupId, onChangeBounds } = props;

  const utils = trpc.useContext();

  const addMarker = trpc.marker.add.useMutation({
    async onSuccess() {
      await utils.marker.list.invalidate();
    },
  });

  const map = useMapEvents({
    click: (event) => {
      addMarker.mutate({
        coords: {
          lat: event.latlng.lat,
          lng: event.latlng.lng,
        },
        groupId: groupId as string,
      });
    },
    moveend: (event) => {
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

  useEffect(() => {
    map.locate();

    onChangeBounds(
      map.getBounds().getSouthWest(),
      map.getBounds().getNorthEast(),
    );
  }, []);

  return null;
};

const Map: React.FC = (props) => {
  const { group } = useQueryParams<{ group: string }>();

  const [bounds, setBounds] = useState<
    RouterInput['marker']['list']['bounds'] | undefined
  >(undefined);

  const defaultCenter = useRef(restoreLocationService.get()).current;

  const markersQuery = trpc.marker.list.useQuery(
    {
      bounds: bounds as RouterInput['marker']['list']['bounds'],
      groupId: group as string,
    },
    {
      enabled: bounds !== undefined && typeof group === 'string',
    },
  );

  const updateMarkers = async (southWest: LatLng, northEast: LatLng) => {
    setBounds({
      southWestLng: southWest.lng,
      southWestLat: southWest.lat,
      northEastLng: northEast.lng,
      northEastLat: northEast.lat,
    });
  };

  return (
    <MapContainer className={styles.map} center={defaultCenter} zoom={10}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {markersQuery.data?.map((marker) => (
        <Marker key={marker.id} position={[marker.lat, marker.long]}>
          <Popup>{marker.id}</Popup>
        </Marker>
      ))}
      <Handlers groupId={group} onChangeBounds={updateMarkers} />
    </MapContainer>
  );
};

export default Map;
