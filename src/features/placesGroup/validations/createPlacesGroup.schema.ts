import { z } from 'zod';

export const createPlacesGroupSchema = z.object({
  name: z.string().min(1),
});
