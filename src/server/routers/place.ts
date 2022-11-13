/**
 *
 * This is an example router, you can delete this file and then update `../pages/api/trpc/[trpc].tsx`
 */
import { router, publicProcedure } from '../trpc';
import { z } from 'zod';
import { prisma } from '~/server/prisma';
import { createPlaceApiSchema, Place } from '~/features/place';

export const placeRouter = router({
  list: publicProcedure
    .input(
      z.object({
        placeGroupId: z.string(),
        bounds: z
          .object({
            southWestLng: z.number(),
            southWestLat: z.number(),
            northEastLng: z.number(),
            northEastLat: z.number(),
          })
          .optional(),
      }),
    )
    .query(async ({ input }) => {
      if (input.bounds) {
        const result = await prisma.$queryRaw<
          Place[]
        >`SELECT id, ST_X(ST_TRANSFORM(location,4326)) AS LONG, ST_Y(ST_TRANSFORM(location,4326)) AS LAT, name, description
       FROM place WHERE  ST_Intersects
       (location, ST_MakeEnvelope ( ${input.bounds.southWestLng}::DECIMAL
                         , ${input.bounds.southWestLat}::DECIMAL
                         , ${input.bounds.northEastLng}::DECIMAL
                         , ${input.bounds.northEastLat}::DECIMAL
                         , 4326
                         )::geography('POLYGON')) AND places_group_id=${input.placeGroupId}
       `;

        return result;
      } else {
        const result = await prisma.$queryRaw<
          Place[]
        >`SELECT id, ST_X(ST_TRANSFORM(location,4326)) AS LONG, ST_Y(ST_TRANSFORM(location,4326)) AS LAT, name, description
          FROM place WHERE  places_group_id=${input.placeGroupId}
       `;

        return result;
      }
    }),
  add: publicProcedure
    .input(createPlaceApiSchema)
    .mutation(async ({ input }) => {
      await prisma.$executeRaw`INSERT INTO place(places_group_id, location, name, description)
        VALUES(${input.placeGroupId}, ST_SetSRID(ST_MakePoint(${input.location.lng}, ${input.location.lat}), 4326), ${input.name}, ${input.description})`;

      return true;
    }),
});
