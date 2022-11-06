/**
 * This file contains the root router of your tRPC-backend
 */
import { publicProcedure, router } from '../trpc';
import { markerRouter } from './marker';
import { markerGroupRouter } from './markerGroup';

export const appRouter = router({
  healthcheck: publicProcedure.query(() => 'yay!'),

  marker: markerRouter,
  markerGroup: markerGroupRouter,
});

export type AppRouter = typeof appRouter;
