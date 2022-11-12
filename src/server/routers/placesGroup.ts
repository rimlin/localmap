/**
 *
 * This is an example router, you can delete this file and then update `../pages/api/trpc/[trpc].tsx`
 */
import { router, publicProcedure } from '../trpc';
import { prisma } from '~/server/prisma';
import { createPlacesGroupSchema } from '~/features/placesGroup';

export const placesGroupRouter = router({
  list: publicProcedure.query(async () => {
    const result = await prisma.placesGroup.findMany({
      orderBy: { id: 'desc' },
    });

    return result;
  }),
  add: publicProcedure
    .input(createPlacesGroupSchema)
    .mutation(async ({ input }) => {
      const placesGroup = await prisma.placesGroup.create({
        data: {
          name: input.name,
        },
      });

      return placesGroup;
    }),
});
