/**
 *
 * This is an example router, you can delete this file and then update `../pages/api/trpc/[trpc].tsx`
 */
import { router, publicProcedure } from '../trpc';
import { z } from 'zod';
import { prisma } from '~/server/prisma';

export const markerGroupRouter = router({
  list: publicProcedure.query(async () => {
    const result = await prisma.markerGroup.findMany({
      orderBy: { id: 'desc' },
    });

    return result;
  }),
  add: publicProcedure
    .input(
      z.object({
        name: z.string(),
      }),
    )
    .mutation(async ({ input }) => {
      const markerGroup = await prisma.markerGroup.create({
        data: {
          name: input.name,
        },
      });

      return markerGroup;
    }),
});
