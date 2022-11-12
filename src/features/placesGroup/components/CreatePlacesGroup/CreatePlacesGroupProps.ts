import { PlacesGroup } from '@prisma/client';

export type CreatePlacesGroupProps = {
  onCreated: (dto: PlacesGroup) => void;
  onCancel: () => void;
};
