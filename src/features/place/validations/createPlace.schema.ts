import { z } from 'zod';

export const createPlaceApiSchema = z.object({
  placeGroupId: z.string(),
  location: z.object({
    lat: z.number(),
    lng: z.number(),
  }),
  name: z.string().min(1),
  description: z.string().optional(),
});

export const createPlaceFormSchema = z.object({
  name: z.string().min(1),
  description: z.string().optional(),
});
