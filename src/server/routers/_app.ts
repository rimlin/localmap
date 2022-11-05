/**
 * This file contains the root router of your tRPC-backend
 */
import { publicProcedure, router } from '../trpc';
import { markerRouter } from './marker';

export const appRouter = router({
  healthcheck: publicProcedure.query(() => 'yay!'),

  marker: markerRouter,
});

export type AppRouter = typeof appRouter;
