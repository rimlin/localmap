import { LatLng, LatLngExpression } from 'leaflet';
import { z } from 'zod';
import { localStorageService } from '~/features/storage';

const SavedPositionSchema = z.object({
  lat: z.number(),
  lng: z.number(),
});

class RestoreLocationService {
  private defaultPosition: LatLngExpression = [41.02446, 29.0169]; // Istanbul
  private positionKey = '_saved_location';

  save(position: LatLng) {
    localStorageService.setJson(this.positionKey, {
      lat: position.lat,
      lng: position.lng,
    });
  }

  get(): LatLngExpression {
    const parsed = SavedPositionSchema.safeParse(
      localStorageService.getJson(this.positionKey),
    );

    if (parsed.success) {
      return parsed.data;
    } else {
      return this.defaultPosition;
    }
  }
}

export const restoreLocationService = new RestoreLocationService();
