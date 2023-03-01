import { createTRPCRouter } from "./trpc";
import { eventRouter } from "./routers/event";
import { attendeeRouter } from "./routers/attendee";
import { contactRouter } from "./routers/contact";

export const appRouter = createTRPCRouter({
  event: eventRouter,
  attendee: attendeeRouter,
  contact: contactRouter
});

export type AppRouter = typeof appRouter;
