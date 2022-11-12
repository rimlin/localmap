import { useStore } from '@nanostores/react';
import classNames from 'classnames';
import { LatLng } from 'leaflet';
import React, { useEffect, useRef, useState } from 'react';
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
} from 'react-leaflet';
import { usePlaces } from '~/features/place';
import { usePlacesGroupId } from '~/features/placesGroup';
import { RouterInput, trpc } from '~/utils/trpc';
import { restoreLocationService } from '../../services';
import { mapStateStore } from '../../stores';
import styles from './Map.module.css';
// import 'leaflet/dist/leaflet.css';

type HandlersProps = {
  onChangeBounds: (southWest: LatLng, northEast: LatLng) => void;
};

const Handlers = (props: HandlersProps) => {
  const placesGroupId = usePlacesGroupId();
  const { onChangeBounds } = props;
  const mapState = useStore(mapStateStore);

  const utils = trpc.useContext();

  const addPlace = trpc.place.add.useMutation({
    async onSuccess() {
      await utils.place.list.invalidate();
    },
  });

  const map = useMapEvents({
    click: (event) => {
      if (placesGroupId && mapState === 'insertMarker') {
        addPlace.mutate({
          location: {
            lat: event.latlng.lat,
            lng: event.latlng.lng,
          },
          placeGroupId: placesGroupId,
          name: 'place name',
        });
      }
    },
    moveend: () => {
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
};

const Map: React.FC = () => {
  const mapState = useStore(mapStateStore);

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
    <div
      className={classNames({
        [styles.insertMarker as string]: mapState === 'insertMarker',
      })}
    >
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
