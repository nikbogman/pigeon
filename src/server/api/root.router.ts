import { createTRPCRouter } from "./trpc";
import { eventRouter } from "./routers/event.router";
import { attendeeRouter } from "./routers/attendee.router";
import { contactRouter } from "./routers/contact.router";

export const appRouter = createTRPCRouter({
  event: eventRouter,
  attendee: attendeeRouter,
  contact: contactRouter
});

export type AppRouter = typeof appRouter;
