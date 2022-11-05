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
        southWestLng: z.number(),
        southWestLat: z.number(),
        northEastLng: z.number(),
        northEastLat: z.number(),
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
       (coords, ST_MakeEnvelope ( ${input.southWestLng}::DECIMAL
                         , ${input.southWestLat}::DECIMAL
                         , ${input.northEastLng}::DECIMAL
                         , ${input.northEastLat}::DECIMAL
                         , 4326
                         )::geography('POLYGON')
       )`;

      return {
        result,
      };
    }),
  add: publicProcedure
    .input(
      z.object({
        lat: z.number(),
        lng: z.number(),
      }),
    )
    .mutation(async ({ input }) => {
      await prisma.$executeRaw`INSERT INTO marker(coords) VALUES(ST_SetSRID(ST_MakePoint(${input.lng}, ${input.lat}), 4326))`;

      return true;
    }),
});
