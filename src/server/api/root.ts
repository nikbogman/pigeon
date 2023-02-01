import { createTRPCRouter } from "./trpc";
import { invitationRouter } from "./routers/invitation";
import { guestRouter } from "./routers/guest";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here
 */
export const appRouter = createTRPCRouter({
  invitation: invitationRouter,
  guest: guestRouter
});

// export type definition of API
export type AppRouter = typeof appRouter;
