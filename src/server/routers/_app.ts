/**
 * This file contains the root router of your tRPC-backend
 */
import { publicProcedure, router } from '../trpc';
import { placeRouter } from './place';
import { placesGroupRouter } from './placesGroup';

export const appRouter = router({
  healthcheck: publicProcedure.query(() => 'yay!'),

  place: placeRouter,
  placesGroup: placesGroupRouter,
});

export type AppRouter = typeof appRouter;
