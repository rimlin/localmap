/**
 *
 * This is an example router, you can delete this file and then update `../pages/api/trpc/[trpc].tsx`
 */
import { router, publicProcedure } from '../trpc';
import { z } from 'zod';
import { prisma } from '~/server/prisma';

type Marker = {
  id: string;
  long: number;
  lat: number;
};

export const markerRouter = router({
  list: publicProcedure
    .input(
      z.object({
        groupId: z.string(),
        bounds: z.object({
          southWestLng: z.number(),
          southWestLat: z.number(),
          northEastLng: z.number(),
          northEastLat: z.number(),
        }),
      }),
    )
    .query(async ({ input }) => {
      /**
       * For pagination docs you can have a look here
       * @see https://trpc.io/docs/useInfiniteQuery
       * @see https://www.prisma.io/docs/concepts/components/prisma-client/pagination
       */

      const result = await prisma.$queryRaw<
        Marker[]
      >`SELECT id, ST_X(ST_TRANSFORM(coords,4326)) AS LONG, ST_Y(ST_TRANSFORM(coords,4326)) AS LAT
       FROM marker WHERE  ST_Intersects
       (coords, ST_MakeEnvelope ( ${input.bounds.southWestLng}::DECIMAL
                         , ${input.bounds.southWestLat}::DECIMAL
                         , ${input.bounds.northEastLng}::DECIMAL
                         , ${input.bounds.northEastLat}::DECIMAL
                         , 4326
                         )::geography('POLYGON')) AND marker_group_id=${input.groupId}
       `;

      return result;
    }),
  add: publicProcedure
    .input(
      z.object({
        groupId: z.string(),
        coords: z.object({
          lat: z.number(),
          lng: z.number(),
        }),
      }),
    )
    .mutation(async ({ input }) => {
      await prisma.$executeRaw`INSERT INTO marker(marker_group_id, coords) VALUES(${input.groupId}, ST_SetSRID(ST_MakePoint(${input.coords.lng}, ${input.coords.lat}), 4326))`;

      return true;
    }),
});
